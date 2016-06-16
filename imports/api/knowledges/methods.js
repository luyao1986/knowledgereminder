import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { KnowledgeReminders } from './knowledgereminders.js';

export const addReminder = new ValidatedMethod({
    name: 'reminders.insert',
    validate: new SimpleSchema({
        title: { type: String },
        url: { type: String, optional: true },
        description: { type: String },
    }).validator(),
    run(knowledge) {
        console.log("add reminder:", knowledge);
        return KnowledgeReminders.insert({...knowledge, createdBy: Meteor.userId()});
    },
});

export const setKnowledgeReviewed = new ValidatedMethod({
    name: 'knowledge.setReviewed',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        console.log("update knowledge reviewed of id:", _id);
        let updates = { reviewed:true, reminder:false };
        return KnowledgeReminders.update({_id}, {$set: updates});
    },
});

export const updateKnowledgeDescription = new ValidatedMethod({
    name: 'knowledge.updateDescription',
    validate: new SimpleSchema({
        _id: { type: String },
        description: { type: String },
    }).validator(),
    run({ _id, description }) {
        console.log("update knowledge description of id:", _id);
        let updates = { description };
        return KnowledgeReminders.update({_id}, {$set: updates});
    },
});
