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
    channels: [process.env.TWITCH_CHANNEL]
};

const smashController = new SmashController();
const client = new tmi.client(options);

client.connect();

client.on('connected', (address,port) => {
    client.action(process.env.TWITCH_CHANNEL,'Connected to channel');
});

client.on('chat',(channel, user, message, self) => {
    if (message === '!bestGame') {
        client.action(process.env.TWITCH_CHANNEL,'Melee is the best game!');
    }

    if (message === '!tourneyInfo') {
        smashController.getInfo()
            .then((msg) => client.action(process.env.TWITCH_CHANNEL,msg));
    }

    if (message.startsWith("!playerResults")) {
        const [x,gamerTag] = message.split(/\s+/);
        
        smashController.getStats(gamerTag);
        client.action(process.env.TWITCH_CHANNEL,msg);
    }
});