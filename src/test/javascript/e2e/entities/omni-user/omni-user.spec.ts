import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OmniUserComponentsPage, OmniUserDeleteDialog, OmniUserUpdatePage } from './omni-user.page-object';

const expect = chai.expect;

describe('OmniUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let omniUserComponentsPage: OmniUserComponentsPage;
  let omniUserUpdatePage: OmniUserUpdatePage;
  let omniUserDeleteDialog: OmniUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OmniUsers', async () => {
    await navBarPage.goToEntity('omni-user');
    omniUserComponentsPage = new OmniUserComponentsPage();
    await browser.wait(ec.visibilityOf(omniUserComponentsPage.title), 5000);
    expect(await omniUserComponentsPage.getTitle()).to.eq('omniviewfrontApp.omniUser.home.title');
    await browser.wait(ec.or(ec.visibilityOf(omniUserComponentsPage.entities), ec.visibilityOf(omniUserComponentsPage.noResult)), 1000);
  });

  it('should load create OmniUser page', async () => {
    await omniUserComponentsPage.clickOnCreateButton();
    omniUserUpdatePage = new OmniUserUpdatePage();
    expect(await omniUserUpdatePage.getPageTitle()).to.eq('omniviewfrontApp.omniUser.home.createOrEditLabel');
    await omniUserUpdatePage.cancel();
  });

  it('should create and save OmniUsers', async () => {
    const nbButtonsBeforeCreate = await omniUserComponentsPage.countDeleteButtons();

    await omniUserComponentsPage.clickOnCreateButton();

    await promise.all([
      omniUserUpdatePage.setEmailInput('o4gk_-@p.Fqmzm'),
      omniUserUpdatePage.setPasswordInput('password'),
      omniUserUpdatePage.setNameInput('name'),
      omniUserUpdatePage.setSurnameInput('surname'),
      omniUserUpdatePage.setAboutInput('about')
    ]);

    expect(await omniUserUpdatePage.getEmailInput()).to.eq('o4gk_-@p.Fqmzm', 'Expected Email value to be equals to o4gk_-@p.Fqmzm');
    expect(await omniUserUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');
    expect(await omniUserUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await omniUserUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await omniUserUpdatePage.getAboutInput()).to.eq('about', 'Expected About value to be equals to about');

    await omniUserUpdatePage.save();
    expect(await omniUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await omniUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OmniUser', async () => {
    const nbButtonsBeforeDelete = await omniUserComponentsPage.countDeleteButtons();
    await omniUserComponentsPage.clickOnLastDeleteButton();

    omniUserDeleteDialog = new OmniUserDeleteDialog();
    expect(await omniUserDeleteDialog.getDialogTitle()).to.eq('omniviewfrontApp.omniUser.delete.question');
    await omniUserDeleteDialog.clickOnConfirmButton();

    expect(await omniUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
