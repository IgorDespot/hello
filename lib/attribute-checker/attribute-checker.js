var attributeRules = require('./attribute-rules');

var defaultOptions = {
    strictEntityCheck: false,
    strictEntityPropertyCheck: false,
    strictAttributeImposterCheck: false
}

function checkAttributes(data, callback, options = defaultOptions) {
    var {err, result} = getRuleset(data).andProcess(options);
    callback(err, result);
}

function getRuleset(data) {
    var dataType = data[0].type;
    try {
        var ruleset = getAttributeRules(dataType);
    } catch (e) {
        return {
            andProcess: function rulesetDoesntExist() {
                return {
                    err: e,
                    result: null
                }
            }
        }
    }
    return {
        andProcess: function rulesetExists(options) {
            return processAttributes(ruleset, data, options);
        }
    }
}

function getAttributeRules(type) {
    if (attributeRules.hasOwnProperty(type)) {
        return attributeRules[type];
    }
    throw new Error(
        `Attribute ruleset for ${type} type is not defined/doesnt exist`
    );
}

function processAttributes(ruleset, data, options = defaultOptions) {
    var result = [];
    var err = [];
    data.forEach((entity) => {
        var processedEntity;
        try {
            result.push(processEntity(ruleset, entity, options));
        } catch (error) {
            err.push(error);
        }
    });
    return {
        err: getErrorsIfTheyExist(),
        result
    };

    function getErrorsIfTheyExist() {
        return err.length ? err : null;
    }
}

function processEntity(ruleset, entity, options = defaultOptions) {
    if (options.strictAttributeImposterCheck) {
        checkForImpostersInAttributes(ruleset, entity, options);
    }
    return processEntityProperties(ruleset, entity, options);
}

function checkForImpostersInAttributes(ruleset, entity, options) {
    var entityProperties = Object.getOwnPropertyNames(entity);
    var rulesetProperties = Object.getOwnPropertyNames(ruleset);
    if (options.strictEntityPropertyCheck) {
        entityProperties.forEach((entityProperty) => {
            if (!ruleset[entityProperty]) {
                throw new Error(`${entityProperty} is an imposter!!!`);
            }
        });
    } else {
        let entityPropertiesLowCase = entityProperties.map(string => string.toLowerCase());
        let rulesetPropertiesLowCase = rulesetProperties.map(string => string.toLowerCase());
        let ruleHashMap = {};
        rulesetPropertiesLowCase.forEach((rule) => {
            ruleHashMap[rule] = true;
        });
        entityPropertiesLowCase.forEach((property) => {
            if (!ruleHashMap[property]) {
                throw new Error(`${property} is an imposter!!!`);
            }
        });
    }
}

function processEntityProperties(ruleset, entity, options = defaultOptions) {
    var result = {};
    var rules = Object.getOwnPropertyNames(ruleset);
    rules.forEach((property) => {
        try {
            result[property] = processEntityProperty(
                ruleset,
                entity,
                property,
                options
            )
        } catch (e) {
            if (options.strictEntityCheck) {
                throw new Error(`property ${property} failed the attribute check`);
            }
        }
    });
    return result;
}

function processEntityProperty(ruleset, entity, property, options) {
    var ruleComposite;
    if (typeof ruleset[property] === 'function') {
        ruleComposite = [property, ruleset[property]];
    } else if (ruleset[property] instanceof Array) {
        ruleComposite = ruleset[property];
    } else {
        throw new Error(`Ruleset ${property} rule was not of supported type`);
    }
    var checkerResult = convertPropertyWithInjections(
        ruleComposite,
        entity,
        options
    );
    return checkerResult;
}

function convertPropertyWithInjections(array, entity, options) {
    let arrayDuplicate = array.slice();
    let rule = arrayDuplicate.pop();
    var mappingFunction;
    if (options.strictEntityPropertyCheck) {
        mappingFunction = function strictPropertyMapping(property) {
            if (entity[property] !== undefined) {
                return entity[property];
            }
            throw new Error(`Property ${property} doesn't exist`);
        }
    } else {
        mappingFunction = function caseInsensitivePropertyMapping(property) {
            var caseInsensitiveProperty = findProperty(entity, property);
            if (caseInsensitiveProperty !== undefined) {
                return entity[caseInsensitiveProperty];
            }
            throw new Error(`Property ${property} doesn't exist`);
        }
    }
    let args = arrayDuplicate.map(mappingFunction);
    return rule.apply(null, args);
}

function findProperty(target, property) {
    var targetProperties = Object.getOwnPropertyNames(target);
    var viableProperties = targetProperties.filter((targetProperty) => {
        return (property.toLowerCase() === targetProperty.toLowerCase());
    });
    return viableProperties[0];
}

/**
 * Check and adapt attributes
 * @method checkAttributes
 * @param {Object[]} data
 * @param callback
 * @param {Object} [options]
 */
exports = module.exports = checkAttributes;

/**
 * Return promise that checks and adapts attributes
 * @param {Object[]} data
 * @param {Object} [options]
 */
exports.promise = function (data, options = defaultOptions) {
    return new Promise(function (res, rej) {
        checkAttributes(data, function (err, result) {
            if(err) {
                rej({err, result});
            } else {
                res(result);
            }
        }, options);
    });
}

/**
 * Add new ruleset at runtime
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = function (key, ruleset) {
    if (!attributeRules.hasOwnProperty(key)) {
        attributeRules[key] = ruleset;
        return true;
    } else {
        throw new Error(
            `There already exists a ruleset named ${key}`
        );
    };
}