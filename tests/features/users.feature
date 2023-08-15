Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userLoginAndLogout
  Scenario: User Login and Logout
    Given I am on login page
    When I enter form fields:
      | username | Jane Smith |
      | password | 123        |
    And I click "Sign In" button
    And I click "Jane S" button.
    And I click "Logout" listItem
    Then I should see "Music app" in App Tool Bar


  @userRegistration
  Scenario: New User Registration
    Given I am on the registration page
    When I enter form fields:
      | username    | donaldr |
      | password    | 123     |
      | displayName | Donald  |
    And I click "Browse" button
    And I click the "Sign up" button
    Then I should navigate to main page "/" with loginned user in the application

