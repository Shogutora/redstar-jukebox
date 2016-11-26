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
            //console.log(results);
            var tempTracks = [];
            var length = 5;
            if (results.data.tracks.items.length > 0){
                //console.log("Got some results..");
                for (i = 0; i < length; i++) {
                    var tempTrack = {};
                    tempTrack.songname = results.data.tracks.items[i].name;
                    tempTrack.artist = results.data.tracks.items[i].artists[0].name;
                    ///tempTrack.thumbnail = results.data.tracks.items[i].album.images[0];
                    tempTrack.songid = results.data.tracks.items[i].id;
                    tempTrack.time = Math.round(results.data.tracks.items[i].duration_ms/1000);

                    var tmp2 = Meteor.http.call("GET", results.data.tracks.items[i].artists[0].href);
                    tempTrack.thumbnail = tmp2.data.images[0];

                    tempTracks.push(tempTrack);
                    console.log(tempTrack);


                }


            }
            return tempTracks;
        }
    });
}
