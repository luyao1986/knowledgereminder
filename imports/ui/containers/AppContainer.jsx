import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { KnowledgeReminders } from '../../api/knowledges/knowledgereminders.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router'
import { routerdefinition } from '../constants/router.js';
import { PublicHeader } from '../components/PublicHeader.jsx';
import { AuthenticatedHeader } from '../components/AuthenticatedHeader.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let {loading, knowledgelist, reminderNum, hasUser} = this.props;
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
                        { hasUser ? <AuthenticatedHeader reminderNum={reminderNum}/> : <PublicHeader /> }
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    { React.cloneElement(this.props.children, {loading, knowledgelist}) }
                </div>
            </div>)
    };
}

export default createContainer(() => {
    const reminderHandle = Meteor.subscribe('knowledges.all', Meteor.user());
    const loading = !reminderHandle.ready();
    const hasUser = Meteor.user();
    return {
        loading,
        knowledgelist: KnowledgeReminders.find({}, {
          sort: KnowledgeReminders.sortFields
        }).fetch() || [],
        reminderNum: KnowledgeReminders.find({reminder: true}).count(),
        hasUser
    };
}, App);
