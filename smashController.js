import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import 'dotenv/config';
import {GET_TOURNEY} from './query';

const client = new ApolloClient({
    uri: 'https://api.smash.gg/gql/alpha',
    request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.SMASH_GG_API}`,
      },
    });
  },
});

export default class SmashController {
    constructor(){
        this.slug = process.env.SMASH_GG_SLUG;   
    }

    getStats(tag){
        console.log(tag);
    }

    getInfo(){
        const uniqueElements = arr => [...new Set(arr)];

        return client
            .query({
                query: GET_TOURNEY,
                variables: {
                    slug: this.slug,
                },
            })
            .then((q) => {
                const name = q.data.tournament.name;
                const city = q.data.tournament.city;
                const entrants = q.data.tournament.participants.pageInfo.total;
                const games = uniqueElements(q.data.tournament.events.map((e) => e.videogame.name));
                
                return `The Tournament ${name}, is being held in ${city} with ${entrants} unique entrants. Game(s) Featured at this event are ${games.join(', ')}.`;   
            });
    }
}