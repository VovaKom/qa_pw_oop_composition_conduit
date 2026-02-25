import { test } from "../../_fixtures/fixtures";
import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";

test.beforeEach(async ({ page, user, articleWithOneTag }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithOneTag);
});

test('Logged-in user views own article in the Global Feed section', async ({
  user,
  articleWithOneTag,
  internalHomePage,
}) => {
  await internalHomePage.open();
  await internalHomePage.globalFeedTab.open();
  await internalHomePage.globalFeedTab.assertArticleVisible(
    articleWithOneTag.title,
    user.username,
  );
});

test('Logged-in user views own article in the Tag Feed section', async ({
    user,
    articleWithOneTag,
    internalHomePage,
}) => {
  await internalHomePage.open();
  await internalHomePage.popularTags.clickOnTag(articleWithOneTag.tags);
  await internalHomePage.tagFeedTab.assertTabSelected(articleWithOneTag.tags);
  await internalHomePage.tagFeedTab.assertArticleVisible(
    articleWithOneTag.title,
    user.username,
  );
});