var User = require('./../models/user').User; // user model

// new costructor
function CreateDB(){};

CreateDB.prototype.createAdminUser = function () {
    User.findOne({'local.username' : 'admin'}, function(err, admin){
    //if no admin user - create it
        if (!err && !admin){
            var admin = new User({
                local:{
                    username: "admin",
					role: "admin"
                }
            });
            
            //generating password for admin
            admin.local.password = admin.generateHash("1234");

            //save admin user
            admin.save( function(err, admin, affected){
                if (err) {
                	console.log(err);
                } else {
                	console.log(admin);
                }
                    
            });
        } else {
        	console.log("user 'admin' exist");
        }
    });
}

module.exports.checkDB = new CreateDB();