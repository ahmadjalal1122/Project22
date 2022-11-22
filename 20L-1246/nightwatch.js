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
  .verify.title('Edit Address')
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