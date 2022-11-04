// const {Given, Then, When, Before} = require('@cucumber/cucumber');

// Given(/^I open the Rijksmuseum page$/, function() {
//   return browser.navigateTo('https://www.rijksmuseum.nl/en');
// });

// Given(/^I dismiss the cookie dialog$/, async function() {
//   const cookieDialogVisible = await browser.isVisible({
//     selector: '.cookie-consent-bar-wrap',
//     suppressNotFoundErrors: true
//   });

//   if (cookieDialogVisible) {
//     return browser.click('.cookie-consent-bar-wrap button.link');
//   }
// });

// Given(/^I search "([^"]*)"$/, async function(searchTerm) {
//   // FIXME: chaining the click command to the rest of the commands causes an uncaughtRejection in case of an element locate error
//   await browser.pause(1000).click('a[aria-label="Search"]');

//   return browser.waitForElementVisible('#rijksmuseum-app')
//     .setValue('input.search-bar-input[type=text]', [searchTerm, browser.Keys.ENTER])
//     .pause(1000);
// });

// Then(/^the title is "([^"]*)"$/, function(title) {
//   console.log("aaa")
//   return browser.assert.titleEquals(title);
// });

// Then(/^Body contains "([^"]*)"$/, function(contains) {
//   return  browser.assert.textContains('.search-results', contains);
// });

const {Given,When ,Then } = require('@cucumber/cucumber');
const { WebElement } = require('selenium-webdriver');

Given(/^I logged in as a valid user$/, function() {
 return  browser
                .url('https://magento.jsmartfix.com/')
                .click("body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a")
            
                .verify.title('Customer Login')
         
                .waitForElementVisible('body',3000)
                .clearValue('#email')
                .clearValue('#pass')
                .setValue('#email','madnij@gmail.com')
                .setValue('#pass','123abc__')
                .click('#send2')
                .pause(4*1000)
                
});

Given('I open edit shipping address page', function() {
   return browser
                .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome > span > button')
                .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome.active > div > ul > li:nth-child(1)')
                .click('#maincontent > div.columns > div.column.main > div.block.block-dashboard-addresses > div.block-content > div.box.box-shipping-address > div.box-actions > a')
                .pause(1*1000)
});
When('I enter {string}',async function(string){
  // console.log(searchTerm);
   browser
  .verify.title('Add New Address')
  .clearValue('#firstname')
  .setValue('#firstname',[string,browser.Keys.ENTER])
   .pause(1*1000)
});

Given('I enter1 {string}',async function (string){
  console.log("when");
   browser
  .clearValue('#lastname')
  .setValue('#lastname',[string,browser.Keys.ENTER])
  .pause(1*1000)
  
});
Given('I enter2 {string}', function(string) {
   browser 
   .clearValue('#telephone')
  .setValue('#telephone',[string,browser.Keys.ENTER])
});
Given('I enter3 {string}', function(string) {
   browser 
          .clearValue('#street_1')
          .setValue('#street_1',[string,browser.Keys.ENTER])
});
Given('I enter4 {string}', function(string) {
   browser 
           .clearValue('#zip')
           .setValue('#zip',[string,browser.Keys.ENTER])
});

Given('I enter5 {string}', function(string) {
   browser 
          .clearValue('#city')
          .setValue('#city',[string,browser.Keys.ENTER])
});
Given('I enter6 {string}', function(string) {
   browser 
           .clearValue('#country')
           .setValue('#country',[string,browser.Keys.ENTER])
});
Given('I clicks on save address button', function() {
   browser
                .click('#form-validate > div > div.primary > button')    
                .pause(3*1000)
});
Then('my shipping address has been saved', function(title) {

  return browser
                .assert.titleEquals(title)
                .pause(3*1000)
});
