import Idea from './index';

export var AllIdeas = Idea.createQuery('allIdeas', {
    ideaName: 1
});

export var IdeaToBothQuery = Idea.createQuery('ideaToBothQuery', {
    $filter({filters, options, params}) {
        filters.ideaName = params.ideaName;
    },
    ideaName:1,
    mentor:{
        mentorName:1
    },
    teams:{
        teamName:1
    }
});