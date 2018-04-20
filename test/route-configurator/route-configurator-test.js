var routeConfigurator = require('lib/route-configurator');

describe('route-configurator', function () {

    it('Should be a function', function () {
        expect(routeConfigurator).toEqual(jasmine.any(Function));
    });

    it('Should throw when no arguments are passed', function () {
        expect(() => {
            routeConfigurator();
        }).toThrow();
    });
});