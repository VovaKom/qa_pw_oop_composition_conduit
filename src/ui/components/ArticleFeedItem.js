import { BaseComponent } from "./BaseComponent";
import { expect } from '../../common/helpers/pw';

export class ArticleFeedItem extends BaseComponent {
  #articleLocator;
  #titleLocator;
  #authorLocator;

  constructor(page, userId = 0) {
    super(page, userId);
  }

  initLocators(articleTitle, articleCreator) {
    this.#articleLocator = this.page.locator(
      '.article-preview',
      { has: this.page.getByRole(
        'heading',
        { name: articleTitle },
      )
      });
    this.#titleLocator = this.#articleLocator.getByRole(
      'heading',
      { name: articleTitle }
    );
    this.#authorLocator = this.#articleLocator.locator(
      'a.author',
      { hasText: articleCreator }
    );
  }

  async assertArticleTitleIsVisible(articleTitle) {
    this.initLocators(articleTitle);
    await this.step(
      `Assert article title '${articleTitle}' is visible`,
      async () => {
        await expect(this.#articleLocator).toBeVisible({ timeout: 15000 });
        await expect(this.#titleLocator).toBeVisible();
    });
  }

  async assertArticleAuthorIsVisible(articleTitle, articleCreator) {
    this.initLocators(articleTitle, articleCreator);
    await this.step(
      `Assert article author '${articleCreator}' is visible`,
      async () => {
        await expect(this.#authorLocator).toContainText(articleCreator);
    });
  }

  async openArticle(articleTitle) {
    this.initLocators(articleTitle);
    await this.step(`Open article '${articleTitle}'`, async () => {
      await this.#titleLocator.click();
    });
  }
}