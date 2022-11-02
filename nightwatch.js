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

// Given(/^I logged in as a valid user$/, function() {
//  return  browser
//                 .url('http://magento2demo.firebearstudio.com/')
//                 .click("body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a")
            
//                 .verify.title('Customer Login')
         
//                 .waitForElementVisible('body',3000)
//                 .clearValue('#email')
//                 .clearValue('#pass')
//                 .setValue('#email','madnijalal1880561@gmail.com')
//                 .setValue('#pass','_ahmad1122')
//                 .click('#send2')
//                 .pause(4*1000)
                
// });

// Given('I open edit shipping address page', function() {
//    return browser
//                 .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome > span > button')
//                 .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome.active > div > ul > li:nth-child(1)')
//                 .click('#maincontent > div.columns > div.column.main > div.block.block-dashboard-addresses > div.block-content > div.box.box-shipping-address > div.box-actions > a')
//                 .pause(1*1000)
// });

// When('I enter first name,last name,phone no,street address,Zip code,city,country', function() {
//   return browser
//                .verify.title('Edit Address')
//                .clearValue('#firstname')
//                .setValue('#firstname','Amjad')
//                .clearValue('#lastname')
//                .setValue('#lastname','Islam')
//                .clearValue('#company')
//                .setValue('#company','NESPak')
//                .clearValue('#telephone')
//                .setValue('#telephone','03477704011')
//                .clearValue('#street_1')
//                .setValue('#street_1','404 Multan Road Sabzazar')
//                .setValue('#country','Pakistan')
//                .clearValue('#region')
//                .setValue('#region','Sindh')
//                .clearValue('#city')
//                .setValue('#city','Karachi')
//                .clearValue('#zip')
//                .setValue('#zip','123456')
               
//                .pause(1*1000)
// });
// Given('I clicks on save address button', function() {
//   return browser
//                 .click('#form-validate > div > div.primary > button')    
//                 .pause(1*1000)
// });
// Then('my shipping address has been saved', function(title) {

//   return browser
//                 .assert.titleEquals(title)
//                 .pause(3*1000)
// });



Given('I open the website on a website browser', function(){
  return browser
               .url('http://magento2demo.firebearstudio.com/men.html')
               .click('#maincontent > div.columns > div.sidebar.sidebar-main > div.widget.block.block-static-block > div > ul:nth-child(2) > li:nth-child(2) > a')
               
});
When('I click on the relevant product', function(){
   return browser
                .click('#product-item-info_340 > a > span')
              
});
Given('I click on the Review tab', function(){
  return browser
               .click('#tab-label-reviews')
               
});
Given('add the Rating', function(){
  // browser.elementIdElements r=findElement(By.id("#Rating_1"));
  return browser
               .click('input[type=radio]')
});
Given('type Nickname', function(){
  return browser
                 .clearValue('#nickname_field')
                 .setValue('#nickname_field','niki')
              
});
Given('type Summary', function(){
  return browser
              .clearValue('#summary_field')
              .setValue('#summary_field','warm jacket')
              
});

Given('add Review', function(){
  return browser
              .clearValue('#review_field')
              .setValue('#review_field','very noice jacket')
              
});
Given('click on submit review  button', function(){
  return browser
               .click('#review-form > div > div > button')
              .pause(5*1000)
});
