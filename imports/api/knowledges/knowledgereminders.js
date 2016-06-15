import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export const total_stages = 7;
export const stage2color = ["#ff0000", "#ff9b00", "#ffff00", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffffff"];
export const reviewedcolor = "#808080";
export const stage2progress = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];

class KnowledgesCollection extends Mongo.Collection {
    insert(Knowledge, callback) {
        return super.insert(Knowledge, callback);
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
    update(selector, callback) {
        return super.update(selector, callback);
    }
}

export const KnowledgeReminders = new KnowledgesCollection('KnowledgeReminders');  //define a collection/table using uppercase

KnowledgeReminders.deny({                                                       //you can not operate collection in client console now
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

KnowledgeReminders.attachSchema(new SimpleSchema({
    title: { type: String },
    url: { type: SimpleSchema.RegEx.Url, optional: true },              //url is optional
    description: { type: String },
    stage: { type: Number, defaultValue: 0, max:total_stages},          //total 7 stages
    reviewed: { type: Boolean, defaultValue: true},                     //the first time you add the knowledge means you have reviewed it
    reviewedAt: { type: Date, defaultValue: new Date()},                //camelCased field names
    reminder: { type: Boolean, defaultValue: false},                    //set reminder when some time later
}));
//state machine of (stage, reviewed, reminder) as below:
//(0,true,false)->(1,false,true)->(1,true,false)->(2,false,true)......->(6,false,true)->(7,true,false)  total 8 times you need review:)

KnowledgeReminders.publicFields = {
    title: 1,
    url: 1,
    description: 1,
    stage: 1,
    reviewed: 1,
    reviewedAt: 1,
    reminder: 1,
};
KnowledgeReminders.sortFields = {
    reminder: -1,
    reviewedAt: 1,
    stage: 1,
};

Factory.define('knowledge', KnowledgeReminders, {
  title: faker.name.jobTitle(),
  url: faker.internet.url(),
  description: "test",
});

KnowledgeReminders.helpers({
    hasDone() { return this.stage==total_stages },
    isReminder() { return this.reminder; },
});
