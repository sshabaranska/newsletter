var User = require('./models/user').User;

var user = new User({
	username: "tester"
});

user.save(function(err, user, affected){
	console.log(arguments);
})