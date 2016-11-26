import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Tracks} from '../api/tracks.js';
import {Session} from 'meteor/session';


import './task.js';
import './track.js';
import './body.html';
import './track.html';
import './playlistitem.html'

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
});

Template.body.helpers({
    tracks() {
        return Tracks.find({}, {sort: {createdAt: -1}});
    },
    incompleteCount() {
        return Tracks.find({checked: {$ne: true}}).count();
    },
    tempTracks(){
        var tracks = Session.get("tempTracks");
        console.log(tracks);
        return tracks;
    }
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        var tracks = Meteor.call('querySpotify', text, function(err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            Session.set('tempTracks', data);


        });



        // Clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});
