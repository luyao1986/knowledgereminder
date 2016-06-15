import { SyncedCron } from 'meteor/percolate:synced-cron';
import { KnowledgeReminders, total_stages } from '../../api/knowledges/knowledgereminders.js';
import moment from 'moment';

//setKnowledgeReminder only used in server-side crontab job
export const setKnowledgeReminder = (knowledge) => {  //
  console.log("update knowledge reminder of:", knowledge);
  let updates = {reviewed:false, reminder:true, stage: knowledge.stage+1};
  return KnowledgeReminders.update({_id: knowledge._id}, {$set: updates});
};

const reminderTime = Meteor.settings.reminderTime || 10;
const reminderUnit = Meteor.settings.reminderUnit || "seconds";

SyncedCron.add({
  name: 'set KnowledgeReminders.reminder to true when time is up',
  schedule: function(parser) {
    let interval = Meteor.settings.cronInterval || "1 minutes";
    console.log(`cronjob runs every ${interval}`);
    return parser.text(`every ${interval}`);
  },
  job: function() {
    KnowledgeReminders.find({//find condition make sure it's a reminder
      $and: [
        { reminder: false },
        { stage: { $lt: total_stages } }
      ]
      }).forEach(function(knowledge) {
        const time_passed = moment().diff(knowledge.reviewedAt, reminderUnit);
        if(time_passed > reminderTime) {  //TODO need a new function with stage
          setKnowledgeReminder(knowledge);
        }
    });
    return true;
  }
});

Meteor.startup(function(){
  SyncedCron.start();
});
