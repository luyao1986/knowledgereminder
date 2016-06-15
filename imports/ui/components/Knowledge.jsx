import React from 'react';
import { Col, Thumbnail, Button, ProgressBar } from 'react-bootstrap';
import { setKnowledgeReviewed } from '../../api/knowledges/methods.js';
import { stage2color, stage2progress, reviewedcolor, total_stages } from '../../api/knowledges/knowledgereminders.js';
import { Radium } from 'radium';
import { Link } from 'react-router'

export class Knowledge extends React.Component {
    constructor(props) {
        super(props);
    };
    setReviewed(_id) {
        setKnowledgeReviewed.call({_id});
    };
    render() {
      let knowledge = this.props.knowledge;
      const color = knowledge.isReminder() ? stage2color[knowledge.stage] : reviewedcolor;
        const step = knowledge.stage+ (knowledge.reviewed ? 1 : 0);
      const progress = stage2progress[step]
      return (
        <Col xs={12} md={12}>
          <Thumbnail responsive>
              <h3 style={{color: color}}>{knowledge.title}</h3>
              <h4><Link to={knowledge.url}>{knowledge.url}</Link></h4>
              <p>{knowledge.description}</p>
            <ProgressBar bsStyle="success" now={progress} label={`${step}/${total_stages+1}`}></ProgressBar>
            <p><Button bsStyle="primary" disabled={!knowledge.isReminder()} onClick={this.setReviewed.bind(this, knowledge._id)}>Review</Button></p>
          </Thumbnail>
        </Col>
      );
    };
}
