Feature: Magento Change Shipping Address
Background:
  Given I logged in as a valid user

Scenario Outline: change shipping address of customer
  Given I open edit shipping address page
  When I enter <first name>
  And I enter1 <last name>
  And I enter2 <phone no>
  And I enter3 <street address>
  And I enter4 <Zip code>
  And I enter5 <city>
  And I enter6 <country>
  And I clicks on save address button
  Then my shipping address has been saved

Examples:
|first name |last name |phone no      |street address         |Zip code   |city        |country   |
|"Ahmad"    |"alii"     |"03477704011" |"404 A block Sabzazar" |"554433"   |"islamabad" |"Pakistan"|