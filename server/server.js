Meteor.startup(function () {
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};
		return user;
	});

	Meteor.publish('users', function(){
		return Meteor.users.find({}, {fields: {'username': 1}});
	});

	Messages.allow({
		insert: function (userId, doc) {
			return (userId && doc.id === userId);
		}
	});
});