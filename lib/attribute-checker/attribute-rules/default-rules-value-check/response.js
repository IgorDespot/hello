exports = module.exports = function(x,y) {
  return {
    "type": "geo:point",
    "coordinates": [ x , y ],
    "metadata": {
      "date": new Date()
    }
  }
};
