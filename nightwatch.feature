Feature: Review
Background: Background name
  Given I open the website on a website browser

@a @b
Scenario: Add Review
  When I click on the relevant product
  And I click on the Review tab
  And add the Rating
  And type Nickname
  And type Summary
  And add Review
  And click on submit review  button