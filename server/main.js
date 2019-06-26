import { Meteor } from 'meteor/meteor';

// collections
import '../imports/api/idea';
import '../imports/api/mentor';
import '../imports/api/team';

// links
import '../imports/api/idea/links';
import '../imports/api/mentor/links';
import '../imports/api/team/links';

// queries
import '../imports/api/mentor/queries';
import '../imports/api/idea/queries';
import '../imports/api/team/queries';

// expose
import '../imports/api/mentor/expose';
import '../imports/api/idea/expose';
import '../imports/api/team/expose';

Meteor.startup(() => {

});
