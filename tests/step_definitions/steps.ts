const { I } = inject();

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

Then('I see {string} in user menu.', (text: string) => {
  const upperCaseText = 'Hello, ' + text;
  I.see(upperCaseText.toUpperCase())
});
