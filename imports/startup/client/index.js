import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { renderRoutes } from './Router.jsx'
import './initBert.js'

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('app'));
});
