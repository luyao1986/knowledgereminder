import { Meteor } from 'meteor/meteor';
import { KnowledgeReminders } from '../knowledgereminders.js';

Meteor.publish('knowledges.all', function() {
    const userId = this.userId;
    return KnowledgeReminders.find({createdBy:userId}, {
        fields: KnowledgeReminders.publicFields,  //TODO understand why not useful
        sort: KnowledgeReminders.sortFields,
    });
});

Meteor.publish('knowledges.reminder', function() {
    const userId = this.userId;
    return KnowledgeReminders.find({createdBy:userId, reminder:true}, {
        fields: KnowledgeReminders.publicFields,
        sort: KnowledgeReminders.sortFields,
    });
});
