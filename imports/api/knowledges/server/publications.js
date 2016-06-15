import { Meteor } from 'meteor/meteor';
import { KnowledgeReminders } from '../knowledgereminders.js';

Meteor.publish('knowledges.all', function() {
    return KnowledgeReminders.find({}, {
        fields: KnowledgeReminders.publicFields,  //TODO understand why not useful
        sort: KnowledgeReminders.sortFields,
    });
});

Meteor.publish('knowledges.reminder', function() {
    return KnowledgeReminders.find({reminder:true}, {
        fields: KnowledgeReminders.publicFields,
        sort: KnowledgeReminders.sortFields,
    });
});
