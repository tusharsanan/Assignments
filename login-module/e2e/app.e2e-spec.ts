import { LoginModulePage } from './app.po';

describe('login-module App', () => {
  let page: LoginModulePage;

  beforeEach(() => {
    page = new LoginModulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
