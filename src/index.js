/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import processTempoCSV from './tempo';

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('OceanoBe')
    .addItem('Export', 'export')
    .addSeparator()
    .addSubMenu(ui.createMenu('Import').addItem('From Tempo CSV', 'showSidebarImportFromTempoCsv'))
    .addItem('Test', 'test')
    .addToUi();
}

function showSidebarImportFromTempoCsv() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('import_tempo_csv').setTitle(
    'Import from Tempo CSV'
  );

  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

function test() {}

global.onOpen = onOpen;
global.showSidebarImportFromTempoCsv = showSidebarImportFromTempoCsv;
global.processTempoCSV = processTempoCSV;
global.test = test;
