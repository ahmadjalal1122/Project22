const {Given,When ,Then } = require('@cucumber/cucumber'); 


Given('I open the website on a website browser', function() {
   return browser
               .url('https://magento.jsmartfix.com/')
               .pause(1*1000)
});
When('I click on the customer services', function(){
  // console.log(searchTerm);
   browser
   .click('body > div.page-wrapper > footer > div > ul > li:nth-child(5) > a')
   .pause(1*1000)
});

Given('I add the {string}',async function (string){
  
   browser
  .clearValue('#name')
  .setValue('#name',[string,browser.Keys.ENTER])
  .pause(1*1000)
  
});
Given('type valid {string}', function(string) {
   browser 
   .clearValue('#email')
  .setValue('#email',[string,browser.Keys.ENTER])
});
Given('type {string}', function(string) {
   browser 
          .clearValue('#telephone')
          .setValue('#telephone',[string,browser.Keys.ENTER])
});
Given('add {string}', function(string) {
   browser 
           .clearValue('#comment')
           .setValue('#comment',[string,browser.Keys.ENTER])
           .click('#contact-form > div > div > button')
});