import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { renderRoutes } from './Router.jsx'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('app'));
});