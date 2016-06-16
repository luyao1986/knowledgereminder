import { Meteor } from 'meteor/meteor';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { _ } from 'lodash';
import { KnowledgeReminders } from './knowledgereminders.js';
import { addReminder, setKnowledgeReviewed } from './methods.js';
import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

if (Meteor.isServer) {
  require('./server/publications.js');

  describe('knowledge reminders', () => {
    describe('mutators', () => {
      it('builds correctly from factory', () => {
        const knowledge = Factory.create('knowledge');
        assert.typeOf(knowledge, 'object');
        assert.equal(knowledge.description, 'test');
        assert.equal(knowledge.stage, 0);
      });
    });

    it('method: test addReminder', () => {
      let knowledge_count = KnowledgeReminders.find().count();
      addReminder.call({title: faker.name.jobTitle(), description: faker.name.jobDescriptor(), url: faker.internet.url()});
      let count_now = KnowledgeReminders.find().count();
      assert.equal(knowledge_count+1, count_now);
    });

    it('method: test setKnowledgeReviewed', () => {
      let { _id, reviewed } = Factory.create('knowledge', {reviewed: false});
      assert.equal(reviewed, false);
      setKnowledgeReviewed.call({_id});
      let updated_knowledge = KnowledgeReminders.findOne({_id});
      assert.equal(updated_knowledge.reviewed, true);
    });

    describe('publications', () => {
      const num = 2;
      before(() => {
        resetDatabase();
        _.times(num, () => {
          Factory.create('knowledge', { reminder: true });
          Factory.create('knowledge');
        });
      });

      it('test knowledges.reminder', (done) => {
        const collector = new PublicationCollector();
        collector.collect('knowledges.reminder', ({ KnowledgeReminders }) => {
          chai.assert.equal(KnowledgeReminders.length, num);
          done();
        });
      });

      it('test knowledges.all', (done) => {
        const collector = new PublicationCollector();
        collector.collect('knowledges.all', (collections) => {
          chai.assert.equal(collections.KnowledgeReminders.length, num*2);
          done();
        });
      });
    });
  });
}
