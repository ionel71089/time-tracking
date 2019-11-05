/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */

import _ from 'lodash';
import dayjs from 'dayjs';

function importWorkLog(data) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const namedRanges = sheet.getNamedRanges();

  const employees = _.find(namedRanges, o => o.getName() === 'Oct2019employees');
  const employeesRange = employees.getRange();
  const employeesValues = _.flatten(employeesRange.getValues());

  const days = _.find(namedRanges, o => o.getName() === 'Oct2019days');
  const daysRange = days.getRange();
  const daysValues = _.flatten(daysRange.getValues());

  const startRow = parseInt(employeesRange.getRow());
  const startColumn = parseInt(daysRange.getColumn());

  for (const i in employeesValues) {
    const name = employeesValues[i];
    for (const j in daysValues) {
      const day = parseInt(daysValues[j], 10);
      const date = dayjs(new Date(2019, 10 - 1, day)).format('YYYY-MM-DD');
      const value = data[name][date];
      const row = startRow + parseInt(i);
      const column = startColumn + parseInt(j);

      if (value != null) {
        sheet.getRange(row, column).setValue(value);
      }
    }
  }
}

export default importWorkLog;
