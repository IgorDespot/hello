const response = require('./response');
const moment   = require('moment');
const config   = require('configValue.json');

const allowedStatus = config['status'];
const allowedMadeOf = config['madeof'];

function commaNumToUnits(oldNum) {
  var newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  if (newNum === newNum) {
    return newNum;
  } else {
    return null;
  }
}

function stringToArray(string) {
  if (string) {
    return string.split(',').map((raw) => {
      return raw.trim();
    });
  } else {
    return null;
  }
}

function dateCheck(date) {
  if (!date) {
    return "";
  }

  if (!moment(date, moment.ISO_8601).isValid()) {
    return null
  }

    return date;
}

function mandatoryCheck(attribute) {
  if (!attribute) {
    return null;
  }

    return attribute;
}

function fillingLevelCheck(fillingLevel) {
  if (!fillingLevel) {
    return 'null'
  }

  let value = Number(fillingLevel);

  if (value >= 0 && value <= 1) {
    return value;
  }

  return 'null';
}

function statusCheck(status) {
  if (!status) {
    return "";
  }

  if (!allowedStatus.includes(status)) {
    return null;
  }

    return status;
}

function madeofCheck(madeof) {
  if (!madeof) {
    return "";
  }

  if (!allowedMadeOf.includes(madeof)) {
    return null;
  }

    return madeof;
}

function locationCheck(location) {
  if (!location) {
    return response('','');
  }

  let data = location.substring(location.indexOf('[') + 1,location.indexOf(']'));
  let coordinates = data.split(",",2);

  let x = Number(coordinates[0]);
  let y = Number(coordinates[1]);

  if (data.length === 0) {
    return null
  }

  if (typeof x == 'number' || typeof x == 'number') {
    return response(x,y);
  }

    return null;
}

exports = module.exports = {
  locationCheck,
  commaNumToUnits,
  stringToArray,
  dateCheck,
  mandatoryCheck,
  fillingLevelCheck,
  statusCheck,
  madeofCheck
}
