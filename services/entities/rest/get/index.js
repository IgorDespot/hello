const getAll = require('lib/orion-module-new').listEntities;
const path = require('lib/orion-module-new').orionPath;

exports = module.exports = function(req, res, next) {

  getAll().then(function(entities) {
    console.log(entities)
    res.render('entities', {data: entities});
  }).catch((error) => {
    res.render('entities', {msg: error});
  });

}
