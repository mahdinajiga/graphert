import Idea from './index';
import Mentor from '../mentor';
import Team from '../team';

Idea.addLinks({
    mentor:{
        type:"one",
        collection: Mentor,
        field: "mentorId"
    },
    teams:{
        type:"many",
        collection: Team,
        field: "teamLinks",
        metadata: true,
    }
});