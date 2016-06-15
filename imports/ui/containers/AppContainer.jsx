import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { KnowledgeReminders } from '../../api/knowledges/knowledgereminders.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router'
import { routerdefinition } from '../constants/router.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let {loading, knowledgelist, reminderNum} = this.props;
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Home</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem><Link to={"/"+routerdefinition.addreminder}>Add Knowledge</Link></NavItem>
                            <NavItem>
                                <Link to={"/"+routerdefinition.reminders}>Knowledge Reminders <Badge>{reminderNum}</Badge> </Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    { React.cloneElement(this.props.children, {loading, knowledgelist}) }
                </div>
            </div>)
    };
}

export default createContainer(() => {
    const reminderHandle = Meteor.subscribe('knowledges.all');
    const loading = !reminderHandle.ready();
    return {
        loading,
        knowledgelist: KnowledgeReminders.find({}, {
          sort: KnowledgeReminders.sortFields
        }).fetch() || [],
        reminderNum: KnowledgeReminders.find({reminder: true}).count()
    };
}, App);
