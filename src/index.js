function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('OceanoBe')
    .addItem('Export', 'export')
    .addSeparator()
    .addSubMenu(ui.createMenu('Import').addItem('From Tempo CSV', 'importFromTempoCsv'))
    .addToUi();
}

function importFromTempoCsv() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('import_tempo_csv').setTitle(
    'Import from Tempo CSV'
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

function addNewItem(formData) {
  //    SpreadsheetApp.getUi().alert("addNewItem");
  const csv = formData.csv.contents;
  //    csv.replace(/[ \t]+$/gm, '');
  //    SpreadsheetApp.getUi().alert('line 23');
  const csvData = Utilities.parseCsv(csv, ',');

  SpreadsheetApp.getUi().alert(csvData[1][5]);
}

global.onOpen = onOpen;
global.importFromTempoCsv = importFromTempoCsv;
global.addNewItem = addNewItem;
