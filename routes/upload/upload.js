/** import dependency packages */
let express = require('express');
let router = express.Router();
let {get, post} = require('services/upload/rest');

/** making a route with GET request */
router.get('/', function (req, res, next) {
    get(req, res, next);
});

/** making a route with POST request */
router.post('/', (req, res) => {
    post(req, res);
});

/** exporting routes so they can be used in other files */
module.exports = router;