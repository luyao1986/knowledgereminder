import { Meteor } from 'meteor/meteor';
import { addReminder, setKnowledgeReviewed } from '../../api/knowledges/methods.js';
import { KnowledgeReminders } from '../../api/knowledges/knowledgereminders.js';
import _ from 'lodash';
import { Random } from 'meteor/random';
import faker from 'faker';

Meteor.startup(function() {
    if (Meteor.isDevelopment && KnowledgeReminders.find().count()==0) {
        _.times(10, function () {
            let _id = addReminder.call({title: faker.name.jobTitle(), description: faker.name.jobDescriptor(), url: faker.internet.url()});
            if(Random.fraction() > 0.5) { setKnowledgeReviewed.call({_id}) }
        });
    }
});
