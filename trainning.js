var jwt = require('jsonwebtoken');

var data = { username: 'nupacachi' }
// jwt.sign(data, '123456', {
//     expiresIn: 60
// }, function(err, data) {
//     console.log('data', data);
// });
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im51cGFjYWNoaSIsImlhdCI6MTcxMDE1MDgzOSwiZXhwIjoxNzEwMTUwODY5fQ.XRMGJRqJUkIH0ccDZIEXqRhmc5cz07Et0QDYj4dRyH8';
var ketqua = jwt.verify(token, '123456');
console.log(ketqua)