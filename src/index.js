import processTempoCSV from './tempo';

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('OceanoBe')
    .addItem('Export', 'export')
    .addSeparator()
    .addSubMenu(ui.createMenu('Import').addItem('From Tempo CSV', 'showSidebarImportFromTempoCsv'))
    .addToUi();
}

function showSidebarImportFromTempoCsv() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('import_tempo_csv').setTitle(
    'Import from Tempo CSV'
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

global.onOpen = onOpen;
global.showSidebarImportFromTempoCsv = showSidebarImportFromTempoCsv;
global.processTempoCSV = processTempoCSV;
