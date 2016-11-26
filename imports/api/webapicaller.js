import {Meteor} from 'meteor/meteor';
import {Http} from 'meteor/http';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Session} from 'meteor/session';

if (Meteor.isServer) {
    Meteor.methods({
        'querySpotify': function (text) {
            check(text, String);
            //this.unblock();
            var results = Meteor.http.call("GET", "https://api.spotify.com/v1/search?query="+text+"&offset=0&limit=20&type=track");
            //unique ID
            //first five results, name of the song, artist

            //var items = results.data.tracks.items[0];
            var tempTracks = [];
            var length = 5;
            for (i = 0; i < length; i++) {
                var tempTrack = {};
                tempTrack.songname = results.data.tracks.items[i].name;
                tempTrack.artist = results.data.tracks.items[i].artists[0].name;
                tempTrack.thumbnail = results.data.tracks.items[i].album.images[2];
                tempTrack.songid = results.data.tracks.items[i].id;
                tempTracks.push(tempTrack);
            }

            return tempTracks;


        }
    });
}
