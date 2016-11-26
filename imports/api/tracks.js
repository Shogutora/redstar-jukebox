import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tracks = new Mongo.Collection('Tracks');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish Tracks that are public or belong to the current user
    Meteor.publish('Tracks', function tracksPublication() {
        return Tracks.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId},
            ],
        });
    });
}

Meteor.methods({

    'tracks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tracks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tracks.remove'(trackId) {
        check(trackId, String);

        const task = Tracks.findOne(trackId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tracks.remove(trackId);
    },
    'tracks.setChecked'(trackId, setChecked) {
        check(trackId, String);
        check(setChecked, Boolean);

        const task = Tracks.findOne(trackId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Tracks.update(trackId, {$set: {checked: setChecked}});
    },
    'tracks.setPrivate'(trackId, setToPrivate) {
        check(trackId, String);
        check(setToPrivate, Boolean);

        const task = Tracks.findOne(trackId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tracks.update(trackId, {$set: {private: setToPrivate}});
    },
});
