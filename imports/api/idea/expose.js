import { AllIdeas, IdeaToBothQuery} from './queries';

AllIdeas.expose();

IdeaToBothQuery.expose({
    firewall(userId, params) {
        if(!!params.ideaName && params.ideaName == "idea0 of mentor3")
        {
            if(!params.access)
                throw new Meteor.Error("Access denied");
        }
    }
});