import { AuthorsArticleContentBlock } from '../../components/articleContent/AuthorsArticleContentBlock.js';
import { BaseViewArticlePage } from './BaseViewArticlePage.js';

export class InternalViewArticlePage extends BaseViewArticlePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.articleContentBlock = new AuthorsArticleContentBlock(
      this.page,
      userId
    );
  }
}
