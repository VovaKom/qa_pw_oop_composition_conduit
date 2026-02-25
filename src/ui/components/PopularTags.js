import { BaseComponent } from "./BaseComponent";

export class PopularTags extends BaseComponent {
  #tagLocator;

  constructor(page, userId = 0) {
    super(page, userId);
  }

  initTagLocator(articleTag) {
    this.#tagLocator = this.page.getByText(articleTag);
  }

  async clickOnTag(articleTag) {
    this.initTagLocator(articleTag);
    await this.step(`Click on the '${articleTag}' in the Popular Tags section`,
      async () => {
        await this.#tagLocator.click();
    });
  }
}