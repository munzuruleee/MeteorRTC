Meteor.subscribe('users');
Accounts.ui.config({
  	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.userlist.helpers({
	users: function () {
	  	return Meteor.users.find(
			{
				'profile.isStreaming': { $not: false}
			},
			{
				sort: {'username': 1}
			}
	  	);
	}
});

Template.userlist.events({
	'click .stream': function() {
		// client.peerInit(Session.get('selected_user'));
	}
})

Template.user.helpers({
	selected: function() {
	  	return Session.equals('selected_user', this._id) ? 'selected' : '';
	}
});

Template.user.events({
  	'click .user': function() {
    	Session.set('selected_user', this._id);
  	}
});

Template.localstream.helpers({
	streamButtonText: function(){
		return Meteor.user().profile.isStreaming ? 'Stop' : 'Start';
	}
});

Template.localstream.events({
	'click': function() {
		if(Meteor.user().profile.isStreaming){
			camera.stop()
			.then(function(result){
				Meteor.users.update(
					{_id: Meteor.user()._id},
					{$set: 
						{'profile.isStreaming': false}
					}
				);
			}).catch(function(err) {
				console.log(err);
			});
		} else {
			camera.start()
			.then(function(result){
				Meteor.users.update(
					{_id: Meteor.user()._id},
					{$set: 
						{'profile.isStreaming': true}
					}
				);
			}).catch(function(err) {
				console.log(err);
			});
		}
	}
});

Template.localstream.onRendered(function () {
	camera = new CameraService(window.document.getElementById('localVideo'));
});

Meteor.startup(function() {
	// client = new PeerManager(stream, Meteor.userId());
});