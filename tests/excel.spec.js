const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

/**
 * Reads Excel file and updates value
 */
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');

  const output = readExcel(worksheet, searchText);

  if (output.row === -1) {
    throw new Error(`Text "${searchText}" not found in Excel sheet`);
  }

  const cell = worksheet.getCell(
    output.row + change.rowChange,
    output.column + change.colChange
  );

  cell.value = replaceText;

  await workbook.xlsx.writeFile(filePath);
}

/**
 * Finds row and column of search text
 */
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });

  return output;
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  // 1️⃣ Download Excel file
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;

  const filePath = await download.path(); // auto system path

  // 2️⃣ Update Excel file
  await writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 }, // price column offset
    filePath
  );

  // 3️⃣ Upload modified file
  await page.locator('#fileinput').setInputFiles(filePath);

  // 4️⃣ Validate updated value in UI
  const desiredRow = page.getByRole('row').filter({
    has: page.getByText(textSearch),
  });

  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});