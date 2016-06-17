import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile ? user.profile.name : '';
    return user ? `${name.first} ${name.last}` : '';
};

export const AuthenticatedHeader = ({ reminderNum }) => (
    <div>
        <Nav>
            <LinkContainer to="/addreminder">
                <NavItem eventKey={ 2 } href="/addreminder">Add Knowledge</NavItem>
            </LinkContainer>
            <LinkContainer to="/reminders">
                <NavItem eventKey={ 3 } href="/reminders">Reminders <Badge>{reminderNum}</Badge></NavItem>
            </LinkContainer>
        </Nav>
        <Nav pullRight>
            <NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
                <MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    </div>
);
