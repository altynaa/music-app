Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  Scenario: User Login
    Given I am on login page
    When I enter form fields:
      | username | Jane Smith |
      | password | 123      |
    And I click "Sign In" button
    Then I see "Jane S" in user menu.
