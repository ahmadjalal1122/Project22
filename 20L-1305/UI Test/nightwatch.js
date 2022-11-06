
const {Given,When ,Then } = require('@cucumber/cucumber'); 

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

Given('I have a valid item to search', function() {    
   return browser
   .navigateTo('https://magento.jsmartfix.com/')
   .waitForElementVisible('body',1000);
});

When('I enter the {string} in the search textbox', function(searchTerm) {
   browser.click('#search')
   return browser
   .waitForElementVisible('body > div.page-wrapper > header > div.header.content > a > img')
   .setValue('input.input-text[type=text]',[searchTerm, browser.Keys.ENTER]);
 });

 Then('the {string} appears on a search page', function(title) {
  return browser.assert.titleEquals(title);
});
