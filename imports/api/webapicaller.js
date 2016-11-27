import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {HTTP} from 'meteor/http'
import {Playlists} from "./playlists";

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
            if (results.data.tracks.items.length > 0) {
                //console.log("Got some results..");
                for (i = 0; i < length; i++) {
                    var tempTrack = {};
                    tempTrack.songname = results.data.tracks.items[i].name;
                    tempTrack.artist = results.data.tracks.items[i].artists[0].name;
                    ///tempTrack.thumbnail = results.data.tracks.items[i].album.images[0];
                    tempTrack.songid = results.data.tracks.items[i].id;
                    tempTrack.songUri = results.data.tracks.items[i].uri;
                    tempTrack.time = Math.round(results.data.tracks.items[i].duration_ms / 1000);

                    var tmp2 = Meteor.http.call("GET", results.data.tracks.items[i].artists[0].href);
                    tempTrack.thumbnail = tmp2.data.images[0];

                    tempTracks.push(tempTrack);
                    //console.log(tempTrack);


                }


            }
            return tempTracks;
        },
        'createPlaylist': function (name) {
            var user = Meteor.users.findOne({_id: this.userId});
            var result = Meteor.http.call("POST",
                "https://api.spotify.com/v1/users/" + user.services.spotify.id + "/playlists/",
                {
                    data: {
                        "name": name,
                        "public": false
                    },
                    headers: {
                        "Authorization": "Bearer " + user.services.spotify.accessToken
                    }
                },
            );
            //console.log(name);
            //console.log(result);
            Playlists.insert({name: name, spotifyId: result.data.id, uri: result.data.uri});
        },
        'addSong': function (name, song) {
            var user = Meteor.users.findOne({_id: this.userId});
            var playList = Playlists.findOne({name: name});
            //console.log(playList);
            //console.log(song);
            var result = Meteor.http.call("POST",
                "https://api.spotify.com/v1/users/" + user.services.spotify.id + "/playlists/"+playList.spotifyId+"/tracks",
                {
                    data: {
                            "uris": [song.songUri]
                    },
                    headers: {
                        "Authorization": "Bearer " + user.services.spotify.accessToken
                    }
                },
                function (data) {
                    console.log(data);
                }
            );
        },
        'startPlaylist': function (name) {
            var user = Meteor.users.findOne({_id: this.userId});
            var uri = Playlists.findOne({name: name}).uri;
            console.log(uri);
            var result = HTTP.put(
                "https://api.spotify.com/v1/me/player/play/",
                {
                    data: {
                        context_uri: uri
                    },
                    headers: {
                        "Authorization": "Bearer " + user.services.spotify.accessToken
                    }
                });
            console.log(result);
        }
    });
}
