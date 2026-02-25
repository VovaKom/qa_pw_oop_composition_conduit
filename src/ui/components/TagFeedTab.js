import { BaseComponent } from "./BaseComponent";
import { ArticleFeedItem } from './ArticleFeedItem';
import { expect } from '../../common/helpers/pw';

export class TagFeedTab extends BaseComponent {
  #tagFeedTab;

  constructor(page, userId = 0) {
    super(page, userId);
    this.articleFeedItem = new ArticleFeedItem(this.page, userId);
  }

  initTagFeedTab(articleTag) {
    this.#tagFeedTab = this.page.getByText(`${articleTag}`).first();
  }

  async assertTabSelected(articleTag) {
    this.initTagFeedTab(articleTag);
    await this.step(`Assert '${articleTag}' Tag Feed tab is selected`,
      async () => {
        await expect(this.#tagFeedTab).toBeVisible();
    });
  }

  async assertArticleVisible(articleTitle, articleCreator) {
    await this
      .articleFeedItem
      .assertArticleTitleIsVisible(
        articleTitle
      );
    await this
      .articleFeedItem
      .assertArticleAuthorIsVisible(
        articleTitle,
        articleCreator);
  }
}