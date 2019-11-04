/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */

import Papa from 'papaparse';
import { objectMap, groupBy } from './helpers';

function getRows(values, columns) {
  const rows = [];
  values.forEach(function(item) {
    const row = objectMap(columns, function(value) {
      return item[value];
    });
    rows.push(row);
  });
  return rows;
}

function stripTime(row) {
  let workDate = row.workDate;
  let split = workDate.split(' ');
  row.workDate = workDate.split(' ')[0];
  return row;
}

function parseValues(values) {
  const Columns = {
    workDate: 3,
    username: 4,
    fullName: 5,
    hours: 2
  };

  if (!values) {
    Logger.log('parseValues: values was nil');
    return [];
  }

  const rows = getRows(values, Columns).map(stripTime);
  // Logger.log(JSON.stringify(rows));
  const rowsByUser = groupBy(rows, 'fullName');
  const rowsByUserByDay = objectMap(rowsByUser, function(userLogs) {
    const workByDate = groupBy(userLogs, 'workDate');
    return objectMap(workByDate, function(items) {
      return items
        .map(function(item) {
          return parseFloat(item.hours);
        })
        .reduce(function(acc, val) {
          return acc + val;
        }, 0);
    });
  });

  return rowsByUserByDay;
}

function processTempoCSV(formData) {
  const csv = formData.csv.contents;
  const csvData = Papa.parse(csv, { skipEmptyLines: true }).data;
  csvData.shift();
  const data = parseValues(csvData);

  const ui = SpreadsheetApp.getUi();
  ui.alert(JSON.stringify(data));
}

export default processTempoCSV;
