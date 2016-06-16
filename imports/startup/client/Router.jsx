import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import { HomePage } from '../../ui/components/HomePage.jsx';
import { AddReminder } from '../../ui/components/AddReminder.jsx';
import { ReminderList } from '../../ui/components/ReminderList.jsx';
import { NotFoundPage } from '../../ui/pages/NotFoundPage.jsx';
import { routerdefinition } from '../../ui/constants/router.js';
import { Login } from '../../ui/pages/login';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer} >
            <IndexRoute component={HomePage}/>
            <Route name={routerdefinition.addreminder} path={routerdefinition.addreminder} component={AddReminder} onEnter={ requireAuth } />
            <Route name={routerdefinition.reminders} path={routerdefinition.reminders} component={ReminderList} onEnter={ requireAuth } />
            <Route name="login" path="/login" component={ Login } />
            <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
            <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
            <Route name="signup" path="/signup" component={ Signup } />            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);
