const express = require('express');
const router = express.Router();
const { get, post, patch } = require('services/api/rest');

router.get('/entities', function (req, res, next) {
    get.entities(req, res, next);
});

router.get('/entities/:id', function (req, res, next) {
    get.entity(req, res, next);
});

router.get('/entities/type/:id', function (req, res, next) {
    get.entityType(req, res, next);
});

router.get('/types', function (req, res, next) {
    get.types(req, res, next);
});

router.get('/types/:id', function (req, res, next) {
    get.type(req, res, next);
});

router.post('/entities', function (req, res, next) {
    post.createEntity(req,res, next);
});

router.post('/entities/update', function (req, res, next) {
    patch.updateEntity(req, res, next);
});

module.exports = router;