Meteor.startup(function () {
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};
		user.profile.isStreaming = false;
		return user;
	});

	Meteor.publish('users', function(){
		return Meteor.users.find(
			{}, 
			{fields: 
				{'username': 1, 'profile': 1}
			}
		);
	});

	stream.permissions.read(function(eventName) {
	  	return (eventName == this.userId);
	});

	stream.permissions.write(function(eventName) {
	  	return true;
	});
});