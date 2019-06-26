import Mentor from './index';
import Idea from '../idea';

Mentor.addLinks({
    ideas: {
        collection: Idea,
        inversedBy: 'mentor'
    }
});