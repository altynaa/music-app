const {I} = inject();

interface TableDataCell {
    value: string;
}

interface TableDataRow {
    cells: TableDataCell[];
}

interface TableData {
    rows: TableDataRow[];
}

    Given('I am on login page', () => {
        I.amOnPage('/login');
    });

    When('I enter form fields:', (tableData: TableData) => {
        tableData.rows.forEach(row => {
            const [fieldName, fieldValue] = row.cells;
            I.fillField(fieldName.value, fieldValue.value);
        });
    });

    When('I click {string} button', (buttonName: string) => {
        I.click(`//button[contains(text(),"${buttonName}")]`);
    });

    When('I click {string} button.', async (buttonName: string) => {
        I.click(`//button[contains(text(),"${buttonName}")]`);
    });

    When('I click {string} listItem', (menuItemName: string) => {
        I.click(`//li[contains(text(),"${menuItemName}")]`);
    });

    Then('I should see {string} in App Tool Bar', (text: string) => {
        I.see(text);
    });



    Given('I am on the registration page', () => {
        I.amOnPage('/register');
    });

    When('I enter form fields:', (tableData: TableData) => {
        tableData.rows.forEach(row => {
            const [fieldName, fieldValue] = row.cells;
            I.fillField(fieldName.value, fieldValue.value);
        });
    });

    When('I click the {string} button', (buttonName: string) => {
        I.click(`//button[contains(text(),"${buttonName}")]`);
        I.attachFile('input[name="avatar"]', 'test.png');
        I.wait(10);
    });

    When('I click the {string} button', (buttonName: string) => {
        I.click(`//button[contains(text(),"${buttonName}")]`);
    });

    Then(/^I should navigate to main page "(.*?)" with loginned user in the application$/, () => {
        I.see('Artists');
    });





