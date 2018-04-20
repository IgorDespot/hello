var moment = require('moment');

var DepositPoint = {
    id: String,
    type: String,
    serialNumber: String,
    refSortingType: mandatoryCheck,
    description: String,
    refDepositPointType: mandatoryCheck,
    storedWasteOrigin: String,
    location: parseLocation,
    address: ['address', 'location', addCheck],
    fillingLevel: commaNumToUnits,
    cargoWeight: commaNumToUnits,
    temperature: commaNumToUnits,
    methaneConcentration: commaNumToUnits,
    regulation: stringToArray,
    responsible: String,
    owner: String,
    dateServiceStarted: dateCheck,
    dateLastEmptying: dateCheck,
    nextActuationDeadline: dateCheck,
    actuationHours: String,
    openingHours: String,
    dateLastCleaning: dateCheck,
    nextCleaningDeadline: dateCheck,
    refcollectionPointlsle: tempSolution,
    status: String,
    color: String,
    image: String,
    annotations: stringToArray,
    areaServed: String,
    dateModified: dateCheck,
    refDevice: stringToArray
};

function commaNumToUnits(oldNum) {
    var newNum = oldNum ?
        Number(oldNum.replace('.', '').replace(',', '.')) :
        0;
    if (newNum === newNum) {
        return newNum
    }
    return null;
}

function toGeoJson(x, y) {
    x = commaNumToUnits(x);
    y = commaNumToUnits(y);
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return null;
    }
    return {
        "type": "Point",
        "coordinates": [x, y]
    };
}

function stringToArray(string) {
    if (string) {
        return string.split(',').map(function (raw) {
            return raw.trim();
        });
    } else {
        return null;
    }
}

function parseLocation(location) {
    var data = location;
    var open = data.indexOf("[");
    var close = data.indexOf("]");
    var result = data.substring(open + 1, close);
    var temp = result.split(",", 2);
    var x = temp[0];
    var y = temp[1];
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return null;
    }
    return {
        "type": "geo:point",
        "coordinates": [x, y],
        "metadata": {
            "date": moment()
          }
    };
}

function valiDate(input) {
    if (typeof input === "string" && !input) {
        return "";
    }
    return (new Date(input)).toJSON();
}

function dateCheck(date) {
    if(!date) {
      return "";
    }
    if (!moment(date, moment.ISO_8601).isValid()) {
        return null;
    }
    return date;
}

function statusCheck(status) {
    var allowedStatus = ['ok', 'lidOpen', 'dropped', 'moved'];
    if(!status) {
        return "";
    }
    if (!allowedStatus.includes(status)) {
        return null;
    }
    return status;
}

function mandatoryCheck(attribute) {
    if (!attribute) {
        return null;
    }
    return attribute;
}


function addCheck(address, location) {
  if (address) {
    return address;
  }
  if (location) {
    return "";
  }
  return null;
}

function locCheck(location, address) {
  var arr = ['',''];
  if(location)
    parseLocation(location);
  if(address)
     return {
        "type": "geo:point",
        "coordinates": arr,
        "metadata": {
          "date": moment()
        }
    };
  else
    return null;
}

function fillingLevelCheck(fillingLevel) {
  var allowed = ['0', '1'];
  if (allowed.includes(fillingLevel)) {
    return commaNumToUnits(fillingLevel);
  } else {
    return 'null';
  }

}

function tempSolution(refDepositPointIsle){
    return ""
}

module.exports = DepositPoint;
