Meteor.subscribe('users');
Accounts.ui.config({
  	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.userlist.users = function() {
  return Meteor.users.find(
		{
			'profile.isStreaming': { $not: false}
		},
		{
			sort: {'username': 1}
		}
  	);
};

Template.userlist.events({
	'click .stream': function() {
		// client.peerInit(Session.get('selected_user'));
	}
})

Template.user.selected = function() {
  	return Session.equals('selected_user', this._id) ? 'selected' : '';
};

Template.user.events({
  	'click .user': function() {
    	Session.set('selected_user', this._id);
  	}
});

Template.localstream.events({
	'click': function() {
		Meteor.users.update(
			{_id: Meteor.user()._id},
			{$set: 
				{'profile.isStreaming': !Meteor.user().profile.isStreaming}
			}
		);
	}
});

Meteor.startup(function() {
	// client = new PeerManager(stream, Meteor.userId());
});