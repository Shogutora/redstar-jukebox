import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tracks = new Mongo.Collection('Tracks');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish Tracks that are public or belong to the current user
    Meteor.publish('Tracks', function tracksPublication() {
        return Tracks.find({});
    });
}

Meteor.methods({

    'tracks.insert'(song) {
        console.log(song);
        Tracks.insert(song);
    },
    'tracks.remove'(trackId) {
        check(trackId, String);

        const task = Tracks.findOne(trackId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Tracks.remove(trackId);
    }
});
