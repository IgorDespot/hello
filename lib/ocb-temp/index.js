var request = require('request');

let data = { "id": 'DepositPoint:007',
"type": 'DepositPoint',
"location": {"type":"Point","coordinates":[-2.864028341,-2.864028341]},
"POINT_X": -2.864028341,
"POINT_Y": -2.864028341 } 

request({
  method: 'POST',
  url: 'http://localhost:1026/v2/entities?options=keyValues',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});