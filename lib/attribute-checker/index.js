/**
 * @module AttributeChecker
 */

var implementation = require('./attribute-checker');

/**
 * <b>
 *  tl;dr: Check and adapt attributes
 * </b>
 *
 * <p>
 *  This method takes an array of valid JS objects,
 *  checks if the "type" property exists and if the
 *  ruleset for it has been defined.
 *  If the ruleset exists, all objects within the array
 *  are checked and adapted according to the ruleset
 * <p>
 *
 * @method checkAttributes
 * @param {Object[]} data
 * @param callback
 * @param {Object} [options]
 */
exports = module.exports = implementation;

/**
 * <b>
 *  Return promise that checks and adapts attributes
 * </b>
 *
 * <p>
 *  Same as the checkAttributes method,
 *  but wrapped in Promise API
 * </p>
 *
 * @method promise
 * @param {Object[]} data
 * @param {Object} [options]
 */
exports.promise = implementation.promise;

/**
 * <b>
 *  tl;dr: Add new ruleset at runtime.
 * </b>
 *
 * <p>
 *  The ruleset object should ensure the following:
 *  <ol>
 *   <li>
 *      Contain properties which will persist after the check
 *   </li>
 *   <li>
 *      The value of the desired ruleset properties can be a Function or an Array
 *   </li>
 *   <li>
 *      If the ruleset property value is a Function, that function will check
 *      and adapt the property value of the entity after the attribute check
 *   </li>
 *   <li>
 *      If the ruleset property value is an Array, the Array must have an
 *      attribute checking function as the last element, while all the other elements
 *      are Strings representing the property keys of input entities.
 *      Warning! The order of these keys is important as they will be passed to
 *      the attribute checking function in the given order
 *   </li>
 *  <ol>
 * </p>
 *
 * @example
 * var firstRuleset = {
 *   simpleCheck: function (simpleCheck) {
 *     if (simpleCheck) return simpleCheck;
 *   }
 * }
 *
 * @example
 * var secondRuleset = {
 *   compCheck = [
 *     'expectedEntityProp1',
 *     'expectedEntityProp2',
 *     function(expectedEntityProp1, expectedEntityProp2) {
 *       if (prop1+prop2) {
 *          return expectedEntityProp1 + expectedEntityProp2;
 *       }
 *     }
 *   ]
 * }
 *
 * @method addAttributeRuleSet
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = implementation.addAttributeRuleSet;