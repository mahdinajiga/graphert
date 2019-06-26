import Team from './index';
import Idea from '../idea';

Team.addLinks({
    ideas:{
        collection: Idea,
        inversedBy: "teams"
    }
});