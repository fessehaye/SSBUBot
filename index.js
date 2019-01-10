const tmi = require('tmi.js');
import 'dotenv/config';
import SmashController from "./smashController";

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: ['ssbuniversity']
};

const smashController = new SmashController();
const client = new tmi.client(options);

client.connect();

client.on('connected', (address,port) => {
    client.action('ssbuniversity','Connected to channel');
});

client.on('chat',(channel, user, message, self) => {
    if (message === '!bestGame') {
        client.action('ssbuniversity','Melee is the best game!');
    }

    if (message === '!tourneyInfo') {
        smashController.getInfo()
            .then((msg) => client.action('ssbuniversity',msg));
    }

    if (message.startsWith("!smashStats")) {
        const [x,gamerTag] = message.split(/\s+/);
        let msg = gamerTag + " is doing great!";
        smashController.getStats(gamerTag);
        client.action('ssbuniversity',msg);
    }
});