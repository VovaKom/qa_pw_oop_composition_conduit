import { ArticleContentBlock } from '../../components/articleContent/ArticleContentBlock';
import { BasePage } from '../BasePage';

export class BaseViewArticlePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.articleContentBlock = new ArticleContentBlock(this.page, userId);
  }
}