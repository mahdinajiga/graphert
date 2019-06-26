import Team from './index';

export var AllTeams = Team.createQuery('allTeams', {
    $postFilters:{
        teamName : {$ne: "team"}
    },
    teamName:1
});

export var TeamsToIdeaQuery = Team.createQuery('teamToIdeaQuery', {
    $filter({filters, options, params}) {
        filters.teamName = params.teamName;
    },
    teamName:1,
    ideas:{
        ideaName:1,
        mentor: {
            mentorName:1
        }
    }
});

export var TeamsComp = Team.createQuery('teamCopm', {
    $filter({filters, options, params}) {
        filters.teamName = params.teamName
    },
    Comps:1
});