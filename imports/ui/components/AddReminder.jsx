import React from 'react';
import ReactDOM from 'react-dom'
import { Button, FormGroup, Label, ControlLabel, FormControl } from 'react-bootstrap';
import { addReminder } from '../../api/knowledges/methods.js';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';

export class AddReminder extends React.Component {
  constructor(props) {
    super(props);
  };

  addReminder(e) {
    e.preventDefault();
    let title = ReactDOM.findDOMNode(this.refs.title).value
    let url = ReactDOM.findDOMNode(this.refs.url).value || `${Meteor.absoluteUrl("reminders")}`
    let description = ReactDOM.findDOMNode(this.refs.description).value
    let knowledge = {title, description, url};
    addReminder.call(knowledge, ()=>{ Bert.alert({
      title: '+1 knowledge into reminder list',
      type: 'info',
      style: 'growl-top-right'
    })});
    this.refs.title.value = "";
    this.refs.description.value = "";
    this.refs.url.value = "";
  };

    render() {
      const tooltip = (
          <Tooltip id="addreminder">Put into your reminders!</Tooltip>
      );
        return (
            <form onSubmit={this.addReminder.bind(this)}>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" placeholder="Enter title(*)" ref="title"/>
              </FormGroup>
              <FormGroup controlId="url">
                <ControlLabel>URL</ControlLabel>
                <FormControl type="text" placeholder="Enter url(not necessary)" ref="url"/>
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter the main content here(*)" ref="description"/>
              </FormGroup>
              <OverlayTrigger placement="right" overlay={tooltip}>
                <Button bsStyle="primary" type="submit">Add</Button>
              </OverlayTrigger>
            </form>
        );
    };
}
