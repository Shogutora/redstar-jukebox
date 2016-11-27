import {Playlists} from '../api/playlists.js';

Template.setPlaylist.events({
    "submit .set-playlist" (){
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;
        Meteor.call("Playlists.create",text);
        FlowRouter.go("/list/"+text);
    }
});