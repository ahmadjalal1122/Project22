Feature: Magento Contact Us

Scenario Outline: User tries to fill contact form with valid fields.
  Given I open the website on a website browser
  When I click on the customer services
  And I add the <Name>
  And type valid <Email>
  And type <phone>
  And add <summary>
  Then form is submitted  

Examples:
|Name       |Email                 |phone         |summary                                  |
|"Laiq"     |"Laiq@gmail.com"      |"03477704011" |"I don’t receive my product yet"         |
|"Farhan"   |"Farhan@gmail.com"    |"03477704011" |"I face issue in add to art the product."|