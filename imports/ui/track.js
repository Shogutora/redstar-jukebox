import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './track.html';

Template.track.events({
    'click .add-song'(event) {

        event.preventDefault();
        console.log(this);
        console.log("You clicked a .player element");
        // Add the song to the Tracks database
        Meteor.call('tracks.insert',this);


    }
});


