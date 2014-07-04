Meteor.startup(function () {
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};
		user.profile.isStreaming = false;
		return user;
	});

	Meteor.publish('users', function(){
		return Meteor.users.find({}, {fields: {'username': 1}});
	});
});