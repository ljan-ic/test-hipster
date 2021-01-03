import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConferenceComponentsPage, ConferenceDeleteDialog, ConferenceUpdatePage } from './conference.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Conference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conferenceComponentsPage: ConferenceComponentsPage;
  let conferenceUpdatePage: ConferenceUpdatePage;
  let conferenceDeleteDialog: ConferenceDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Conferences', async () => {
    await navBarPage.goToEntity('conference');
    conferenceComponentsPage = new ConferenceComponentsPage();
    await browser.wait(ec.visibilityOf(conferenceComponentsPage.title), 5000);
    expect(await conferenceComponentsPage.getTitle()).to.eq('omniviewfrontApp.conference.home.title');
    await browser.wait(ec.or(ec.visibilityOf(conferenceComponentsPage.entities), ec.visibilityOf(conferenceComponentsPage.noResult)), 1000);
  });

  it('should load create Conference page', async () => {
    await conferenceComponentsPage.clickOnCreateButton();
    conferenceUpdatePage = new ConferenceUpdatePage();
    expect(await conferenceUpdatePage.getPageTitle()).to.eq('omniviewfrontApp.conference.home.createOrEditLabel');
    await conferenceUpdatePage.cancel();
  });

  it('should create and save Conferences', async () => {
    const nbButtonsBeforeCreate = await conferenceComponentsPage.countDeleteButtons();

    await conferenceComponentsPage.clickOnCreateButton();

    await promise.all([
      conferenceUpdatePage.setNameInput('name'),
      conferenceUpdatePage.setThumbnailInput(absolutePath),
      conferenceUpdatePage.setStartDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      conferenceUpdatePage.setExpectedEndDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      conferenceUpdatePage.setDescriptionInput('description'),
      conferenceUpdatePage.setPriceInput('5')
    ]);

    expect(await conferenceUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await conferenceUpdatePage.getThumbnailInput()).to.endsWith(
      fileNameToUpload,
      'Expected Thumbnail value to be end with ' + fileNameToUpload
    );
    expect(await conferenceUpdatePage.getStartDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDateTime value to be equals to 2000-12-31'
    );
    expect(await conferenceUpdatePage.getExpectedEndDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected expectedEndDateTime value to be equals to 2000-12-31'
    );
    expect(await conferenceUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await conferenceUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');

    await conferenceUpdatePage.save();
    expect(await conferenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await conferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Conference', async () => {
    const nbButtonsBeforeDelete = await conferenceComponentsPage.countDeleteButtons();
    await conferenceComponentsPage.clickOnLastDeleteButton();

    conferenceDeleteDialog = new ConferenceDeleteDialog();
    expect(await conferenceDeleteDialog.getDialogTitle()).to.eq('omniviewfrontApp.conference.delete.question');
    await conferenceDeleteDialog.clickOnConfirmButton();

    expect(await conferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
