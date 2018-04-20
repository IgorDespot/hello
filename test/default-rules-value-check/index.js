const {
  locationCheck,
  stringToArray,
  commaNumToUnits,
  dateCheck,
  mandatoryCheck,
  fillingLevelCheck,
  statusCheck,
  madeofCheck
} = require(
  'lib/attribute-checker/attribute-rules/default-rules-value-check'
);

describe('Attribute function cheks', () => {

  it('should return json object when given correct string value/format', () => {
    expect(locationCheck('" ""geometry"": { ""type"": ""Point"", ""coordinates"": [ -2.884903846, 43.29140194 ] } }"')).toEqual(jasmine.any(Object));
  });

  it('should return geo:point object when no value is given', () => {
    expect(locationCheck('')).toEqual(jasmine.any(Object));
  });

  it('should return null when given value is not a number', () => {
    expect(locationCheck('Igor')).toBeNull();
  })

  it('shoudl return array when given none empty string', () => {
    expect(stringToArray('1,2,3,4,')).toEqual(jasmine.any(Array));
  });

  it('shoudl return null when given none empty string', () => {
    expect(stringToArray('')).toBeNull();
  });

  it('shoudl return number when given valid string', () => {
    expect(commaNumToUnits('21212,2121.20')).toEqual(jasmine.any(Number));
  });

  it('shoudl return number when given valid string', () => {
    expect(commaNumToUnits('')).toBe(0);
  });

  it('shoudl return null when given valid string', () => {
    expect(commaNumToUnits('adasdasd')).toBeNull();
  });

  it('should return valid date when correct format is passed', () => {
    expect(dateCheck('2018-04-01')).toEqual(jasmine.any(String));
  });

  it('should return null when wrong date format is passed', () => {
    expect(dateCheck('2018-2-12')).toBeNull();
  });

  it('should return attribute when if we provede none falsy value', () => {
    expect(mandatoryCheck('refDepositPointType')).toEqual(jasmine.any(String));
  });

  it('should return null when falsy value is provided', () => {
    expect(mandatoryCheck('')).toBeNull();
  });

  it('should return null string if empty value is provided', () => {
    expect(fillingLevelCheck('')).toEqual('null');
  });

  it('should return number in range of 0-1 if valid value is provided', () => {
    expect(fillingLevelCheck('0.8')).toEqual(0.8);
  });

  it('should return empty string when no value is provided', () => {
    expect(statusCheck('')).toEqual('');
  });

  it('should return lidOpen when ti is given as value', () => {
    expect(statusCheck('lidOpen')).toEqual('lidOpen');
  });

  it(`
    should return null when value provided is not in array of allowedStatus
    values
    `, () => {
      expect(statusCheck('Igor')).toBeNull();
    });

    it('should return empty string when no value is provided', () => {
      expect(madeofCheck('')).toEqual('');
    });

    it('should return lidOpen when ti is given as value', () => {
      expect(madeofCheck('metal')).toEqual('metal');
    });

    it(`
      should return null when value provided is not in array of allowedMadeOf
      values
      `, () => {
        expect(statusCheck('Igor')).toBeNull();
    });
});
