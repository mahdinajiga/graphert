import { AllTeams, TeamsToIdeaQuery, TeamsComp } from './queries';

AllTeams.expose();

TeamsToIdeaQuery.expose({
    firewall(userId, params) {
        if(!!params.teamName && params.teamName=="teamE")
        {
            if(!params.access)
                throw new Meteor.Error("Access denied");
        }
    }
});

TeamsComp.expose();