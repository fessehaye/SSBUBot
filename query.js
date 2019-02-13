import { gql } from 'apollo-boost';

export const GET_TOURNEY = gql`
            query TournamentQuery($slug: String) {
                tournament(slug: $slug){
                    name,
                    city,
                    events{
                        videogame {
                            name
                        }
                    },
                    participants(query:{}){
                        pageInfo{
                            total
                        }
                    }
                }
	        }
        `;

export const GET_RESULTS = gql`
    query TournamentQuery($slug: String,$player: String) {
		tournament(slug: $slug){
			name
			participants(
                query:{
                    perPage:1,
                    filter:{
                        search:{
                            searchString:$player,
                            fieldsToSearch:"gamerTag"
                        }
                    }
                }
            ){
            nodes{
                gamerTag,
                events{
                    name,
                    numEntrants,
                    state,
                    standings(
                        query:{
                            filter:{
                                search:{
                                    searchString:$player,
                                    fieldsToSearch:"gamerTag"
                                }
                            }
                        }
                    ){
                    nodes{
                        standing
                    }
                }
            }
        }
    	}
		}
	}`;