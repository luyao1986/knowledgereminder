import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import { HomePage } from '../../ui/components/HomePage.jsx';
import { AddReminder } from '../../ui/components/AddReminder.jsx';
import { ReminderList } from '../../ui/components/ReminderList.jsx';
import { NotFoundPage } from '../../ui/pages/NotFoundPage.jsx';
import { routerdefinition } from '../../ui/constants/router.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={HomePage}/>
            <Route path={routerdefinition.addreminder} component={AddReminder} />
            <Route path={routerdefinition.reminders} component={ReminderList} />
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);
