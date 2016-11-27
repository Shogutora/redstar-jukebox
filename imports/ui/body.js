import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Playlists} from '../api/playlists.js';
import {Session} from 'meteor/session';


import './track.js';
import './body.html';
import './track.html';
import './playlistitem.html'

Template.mainLayout.onCreated(function bodyOnCreated() {
    console.log("hello");
    this.state = new ReactiveDict();
    Meteor.subscribe('playlists');

});

Template.mainLayout.helpers({
    sessionActive(){
        return Playlists.findOne({name: Session.get("playListName")});
    },
    playList() {
        if (Playlists.findOne({name: Session.get("playListName")})) {
            return Playlists.findOne({name: Session.get("playListName")}, {sort: {createdAt: -1}}).tracks;
        }
    },
    tempTracks(){
        var tracks = Session.get("tempTracks");
        console.log(tracks);
        return tracks;
    },
    playListName () {
        return Session.get("playListName");
    }
});

Template.mainLayout.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        var tracks = Meteor.call('querySpotify', text, function (err, data) {
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

