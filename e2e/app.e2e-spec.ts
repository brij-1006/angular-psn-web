import { PsnWebPage } from './app.po';

describe('psn-web App', () => {
  let page: PsnWebPage;

  beforeEach(() => {
    page = new PsnWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
