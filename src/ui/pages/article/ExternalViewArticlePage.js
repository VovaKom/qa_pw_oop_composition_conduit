import { BaseViewArticlePage } from './BaseViewArticlePage.js';

export class ExternalViewArticlePage extends BaseViewArticlePage {
  constructor(page, userId = 0) {
    super(page, userId)
  }
}