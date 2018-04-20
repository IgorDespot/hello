var WasteContainerType = {
    id: String,
    type: String,
    name: String,
    description: String,
    width: commaNumToUnits,
    height: commaNumToUnits,
    depth: commaNumToUnits,
    weight: commaNumToUnits,
    cargoVolume: commaNumToUnits,
    maximunLoad: commaNumToUnits,
    recommendedLoad: commaNumToUnits,
    category: categoryCheck,
    insertHolesNumber: commaNumToUnits,
    insertHoleWidth: commaNumToUnits,
    insertHoleHeight: commaNumToUnits,
    loadType: loadTypeCheck,
    madeof: madeof,
    madeOfCode: String,
    brandName: String,
    modelName: String,
    manufacturerName: String,
    colors: String,
    image: String,
    compliantWith: String,
    accessLimitation: String,
    userldentification: String,
    inputControl: String,
    inputnControlVolume: commaNumToUnits,
    maximumInputVolume: commaNumToUnits,
    features: stringToArray
}

function commaNumToUnits(oldNum) {
    var newNum = oldNum ?
        Number(oldNum.replace('.','').replace(',','.')) :
        0;
    if (newNum === newNum) {
        return newNum;
    }
    return 0;
}

function stringToArray(string) {
    return string.split(',').map( function (raw) {
        return raw.trim();
    });
}

function categoryCheck(category) {
    var allowedCategory = ['bulk', 'trashCan', 'wheelieBin', 'bag', 'fixed collection centers', 'mobile collection centers', 'underground', 'pneumatic', 'portable'];
    var category = stringToArray(category);
    if (!category)
        return "";
    else
        return arrayFilt(category, allowedCategory);

}

function loadTypeCheck(loadType) {
    var allowedLoadType = ['side', 'upper', 'back']
    if(!loadType)
        return "";
    if(!allowedLoadType.includes(loadType))
        return null;
    else
        return loadType
}

function madeof(madeof) {
    var allowed = ['plastic', 'wood', 'metal', 'other'];
    if (!madeof) {
        return "";
    }
    if (!allowed.includes(madeof)) {
        return null;
    }
    return madeof;
}

function arrayFilt(array,allowed) {
    var result = [];
    array.forEach(element => {
        if (allowed.includes(element))
            result.push(element);
    });
    if (result.length == 0) {
        return null;
    }
    return result
}

module.exports = WasteContainerType;