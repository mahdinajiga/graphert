import Mentor from './index';

export var MentorToIdeaQuery = Mentor.createQuery('getIdeas', {
    $filter({filters, options, params}) {
        filters.mentorName = params.mentorName; 
    },
    mentorName:1,
    ideas:{
        ideaName:1,
        teams:{
            teamName:1
        }
    }
})

export var AllMentors = Mentor.createQuery('getAllMentors', {
    mentorName:1
})