import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
  await pages[0].waitForTimeout(15000);
});

test('Unlogged user views other user article in the Global Feed section',
  async ({
    articleWithoutTags,
    pages,
    users,
  }) => {
    const externalHomePage = new ExternalHomePage(pages[1], 2);

    await externalHomePage.open();
    await externalHomePage.globalFeedTab.open();
    await externalHomePage.globalFeedTab.assertArticleVisible(
      articleWithoutTags.title,
      users[0].username,
    );
});

test('Unlogged user opens other user article from the Global Feed section',
  async ({
    articleWithoutTags,
    pages,
    users,
  }) => {
    const externalHomePage = new ExternalHomePage(pages[1], 2);

    await externalHomePage.open();
    await externalHomePage.globalFeedTab.open();
    await externalHomePage.globalFeedTab.assertArticleVisible(
      articleWithoutTags.title,
      users[0].username,
    );
    await externalHomePage
      .globalFeedTab
      .articleFeedItem
      .openArticle(
        articleWithoutTags.title
    );

    const externalViewArticlePage = new ExternalViewArticlePage(pages[1], 2)
    
    await externalViewArticlePage
      .articleContentBlock
      .assertArticleTitleIsVisible(
        articleWithoutTags.title
      );
    await externalViewArticlePage
      .articleContentBlock
      .assertArticleTextIsVisible(
        articleWithoutTags.text
      );
    await externalViewArticlePage
      .articleContentBlock
      .assertArticleAuthorNameIsVisible(
        users[0].username
      );
});
