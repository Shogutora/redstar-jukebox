if (Meteor.isServer) {
    Meteor.methods({
        querySpotify: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://api.spotify.com/v1/search?query=abba&offset=0&limit=20&type=track");
        }
    });
}
