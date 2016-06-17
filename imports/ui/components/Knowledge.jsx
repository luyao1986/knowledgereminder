import React from 'react'
import ReactDOM from 'react-dom'
import { Col, Thumbnail, Button, ProgressBar, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { setKnowledgeReviewed, updateKnowledgeDescription } from '../../api/knowledges/methods.js';
import { stage2color, stage2progress, reviewedcolor, total_stages } from '../../api/knowledges/knowledgereminders.js';
import { Radium } from 'radium';
import { Link } from 'react-router'

export class Knowledge extends React.Component {
    constructor(props) {
        super(props);
    };
    setReviewed(_id) {
        let description = ReactDOM.findDOMNode(this.refs.description).value
        if(description !== '') {
            updateKnowledgeDescription.call({_id, description})
        }
        setKnowledgeReviewed.call({_id});
        ReactDOM.findDOMNode(this.refs.description).value = '';
    };
    render() {
      let knowledge = this.props.knowledge;
      const color = knowledge.isReminder() ? stage2color[knowledge.stage] : reviewedcolor;
        const step = knowledge.stage+ (knowledge.reviewed ? 1 : 0);
      const progress = stage2progress[step]
      return (
        <Col xs={12} md={12}>
          <Thumbnail responsive>
              <h4><Link style={{color: color}} to={knowledge.url}>{knowledge.title}</Link></h4>
              <p style={{color: color}}>previous description: ${knowledge.description}</p>
              <FormGroup controlId="description">
                  <FormControl componentClass="textarea" placeholder="please write done your new understanding:" ref="description" disabled={!knowledge.isReminder()}/>
              </FormGroup>
            <ProgressBar bsStyle="success" now={progress} label={`${step}/${total_stages+1}`}></ProgressBar>
            <p><Button bsStyle="primary" disabled={!knowledge.isReminder()} onClick={this.setReviewed.bind(this, knowledge._id)}>Review</Button></p>
          </Thumbnail>
        </Col>
      );
    };
}
