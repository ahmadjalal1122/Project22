Feature: Magento Change Shipping Address
Background:Login
  Given I logged in as a valid user

Scenario Outline: User will able search a product
  Given I have a valid item to search
  When I enter the <Search item> in the search textbox
  Then the <Search message> appears on a search page

Examples:
|Search item       |Search message                                           |  
|"Men's jackets"   |"Search results for: 'Men's jackets'"                      |  
|"Watches"         |"Search results for: 'Watches'"                            |
