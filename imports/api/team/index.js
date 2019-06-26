import { Mongo } from 'meteor/mongo';

const Team = new Mongo.Collection('team');

Team.addReducers({
    Comps:{
        body:{
            teamName:1,
            ideas:{
                teams:{
                    teamName:1
                }
            }
        },
        reduce(object) {
            var currentTeamName = object.teamName;
            return object.ideas.reduce((acc, idea) => {
                return [...acc, ...idea.teams.reduce((res, team) => {
                    return team.teamName!=currentTeamName ? [...res,team.teamName] : res;
                }, [])];
            }, []).reduce((acc, teamName) => {
                return !acc.includes(teamName) ? [...acc, teamName] : acc;
            },[]);
        }
    }
});


export default Team;