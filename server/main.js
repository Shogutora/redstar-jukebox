import '../imports/api/playlists.js';
import '../imports/api/webapicaller.js'

ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
        $set: {
            "clientId": "ecdf5040c7ce475a9fd581ec5c9fa162",
            "secret": "fb22a0c9254749a1b559cbf1b386ceec"
        }
    },
    { upsert: true }
);

