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

function test() {
  let ui = SpreadsheetApp.getUi();
  let sheet = SpreadsheetApp.getActiveSheet();
  let namedRanges = sheet.getNamedRanges();
  let employees = namedRanges.find(o => o.getName() === 'Oct2019employees');
  // let days = namedRanges.find(o => o.getName() === 'Oct2019days');
  let employeesRange = employees.getRange().getA1Notation();
  // let daysRange = ui.alert(days.getRange().getA1Notation());

  ui.alert(employeesRange);
  sheet.getRange(employeesRange).activate();
}

global.onOpen = onOpen;
global.showSidebarImportFromTempoCsv = showSidebarImportFromTempoCsv;
global.processTempoCSV = processTempoCSV;
global.test = test;
