import {Meteor} from 'meteor/meteor';
import {Http} from 'meteor/http';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

if (Meteor.isServer) {
    Meteor.methods({
        'querySpotify': function (text) {
            check(text, String);
            this.unblock();
            var results = Meteor.http.call("GET", "https://api.spotify.com/v1/search?query=abba&offset=0&limit=20&type=track");
            //unique ID
            //first five results, name of the song, artist
            //var items = [results.items[0],results.items[1],results.items[2],results.items[3],results.items[4]];
            var items = results.data.tracks.items[0];
            console.log(items);
            console.log("I am here.");
        }
    });
}
