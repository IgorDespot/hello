/**
 * A module that sets up routes on an express app
 * based on given config js object
 * @module routeConfigurator
 */
var path = require('path');


/**
 * <b>
 *  tl;dr: Populate express app routes based on config object 
 * </b>
 *
 * <p>
 *   Calling 'app.use(somePath, someRouter)' in a sequence becomes tedious
 *   and ugly fast. To avoid this ugly phenomena, You can call this function,
 *   passing to it an initialized express app, config object and the mandatory
 *   basepath
 * </p>
 * <p>
 *   The config object should have exress app paths as property names
 *   and path strings referencing js scripts with exported epress Route objects.
 *   The third 'basePath' argument is there to set the base path upon which the
 *   config object values will be appended 
 * </p>
 * @example
 * var config = JSON.parse(
 *   {
 *      "/route":"./relative/path/to/route"
 *   }
 * );
 * var routeConfigurator = require('path/to/routeConfigurator');
 * routeConfigurator(app, config, __dirname);
 *
 * @param {Object} expressApp - An object created via 'express' method
 * @param {Object} config 
 * @param {String} basePath
 */
module.exports = function configureRoutes(expressApp, config, basePath) {
    if (!basePath) {
        throw "You did not specify the base Route path."
    }
    var mapᐸpathͺRouteᐳ = getPathToRouteMapping(config, basePath);
    mount(expressApp, mapᐸpathͺRouteᐳ);
}

function getPathToRouteMapping(config, basePath) {
    var mountPaths = Object.getOwnPropertyNames(config);
    var mapᐸpathͺRouteᐳ = {}
    mountPaths.forEach((mountPath) => {
        mapᐸpathͺRouteᐳ[mountPath] = require(
            path.join(basePath, config[mountPath])
        );
    });
    return mapᐸpathͺRouteᐳ;
}

function mount(expressApp, mountPathToRouteMap) {
    var mountPaths = Object.getOwnPropertyNames(mountPathToRouteMap);
    mountPaths.forEach((mountPath) => {
        expressApp.use(mountPath, mountPathToRouteMap[mountPath]);
    });
}
