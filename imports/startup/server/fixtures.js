import { Meteor } from 'meteor/meteor';
import { addReminder, setKnowledgeReviewed } from '../../api/knowledges/methods.js';
import { KnowledgeReminders } from '../../api/knowledges/knowledgereminders.js';
import _ from 'lodash';
import { Random } from 'meteor/random';
import faker from 'faker';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
        name: { first: 'Carl', last: 'Winslow' },
    },
    roles: ['admin'],
}];

Meteor.startup(function() {
    if (Meteor.isDevelopment && KnowledgeReminders.find().count()==0) {
        _.times(10, function () {
            let _id = addReminder.call({title: faker.name.jobTitle(), description: faker.name.jobDescriptor(), url: faker.internet.url()});
            if(Random.fraction() > 0.5) { setKnowledgeReviewed.call({_id}) }
        });
    }

    users.forEach(({ email, password, profile, roles }) => {
        const userExists = Meteor.users.findOne({ 'emails.address': email });

        if (!userExists) {
            const userId = Accounts.createUser({ email, password, profile });
            Roles.addUsersToRoles(userId, roles);
        }
    });
});
