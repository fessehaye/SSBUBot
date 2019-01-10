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