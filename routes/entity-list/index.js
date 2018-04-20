let express = require('express');
let router = express.Router();
let {get} = require('services/entities/rest');

router.get('/', function (req, res, next) {
    get(req, res, next);
});



module.exports = router;
