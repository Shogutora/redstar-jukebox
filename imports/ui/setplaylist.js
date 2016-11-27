import {Playlists} from '../api/playlists.js';

Template.setPlaylist.events({
    "submit .set-playlist" (){
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;
        Meteor.call("Playlists.create",text);
        FlowRouter.go("/list/"+text);
    },
    "click .login-spotify" () {
        var options = {
            showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
            requestPermissions: ['playlist-modify-public', 'playlist-modify-private'] // Spotify access scopes.
        };
        Meteor.loginWithSpotify(options, function(err) {
            console.log(err || "No error");
        });
    }
});