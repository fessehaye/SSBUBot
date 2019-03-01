import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import 'dotenv/config';
import { GET_TOURNEY } from './query';

export default class SmashController {
	constructor(slug = '') {
		this.slug = slug;

		this.client = new ApolloClient({
			uri: 'https://api.smash.gg/gql/alpha',
			request: operation => {
				operation.setContext({
					headers: {
						authorization: `Bearer ${process.env.SMASH_GG_API}`,
					},
				});
			},
		});
	}

	getStats(tag) {
		console.log(tag);
	}

	setSlug(slug) {
		this.slug = slug;
	}

	parseInfo(data) {
		const name = data.tournament.name;
		const city = data.tournament.city;
		const entrants = data.tournament.participants.pageInfo.total;
		const games = uniqueElements(data.tournament.events.map(e => e.videogame.name));

		return `The Tournament ${name}, is being held in ${city} with ${entrants} unique entrants. Game(s) Featured at this event are ${games.join(', ')}.`;
	}

	getInfo() {
		const uniqueElements = arr => [...new Set(arr)];

		return this.client
			.query({
				query: GET_TOURNEY,
				variables: {
					slug: this.slug,
				},
			})
			.then(q => {
				return this.pageInfo(q.data);
			});
	}
}
