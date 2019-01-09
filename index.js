const tmi = require('tmi.js');
require('dotenv').config();

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

const client = new tmi.client(options);

client.connect();

client.on('connected', (address,port) => {
    client.action('ssbuniversity','Connected to channel');
});

client.on('chat',(channel, user, message, self) => {
    if (message === '!bestGame') {
        client.action('ssbuniversity','Melee is the best game!');
    }

    if (message.startsWith("!smashStats")) {
        let msg = message.split("!smashStats")[1].trim() + " is doing great!"
        client.action('ssbuniversity',msg);
    }
});