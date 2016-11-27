import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import "./webapicaller";

export const Playlists = new Mongo.Collection('playlists');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish Playlists that are public or belong to the current user
    Meteor.publish('playlists', function tracksPublication() {
        //console.log(this);
        //console.log(Meteor.users.findOne({_id: this.userId}));
        return Playlists.find({});
    });
}

Meteor.methods({
    'Playlists.insertSong' (plname, song) {
        check(plname, String);
        check(song, Object);
        //console.log(song);
        Playlists.upsert({name: plname}, {$addToSet: {tracks: song}});
        Meteor.call("addSong",plname,song)
    },
    "Playlists.create" (name) {
        check(name,String);
        //console.log(name);
        Meteor.call("createPlaylist",name);
    }
});
