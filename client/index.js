import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import App from './src/app/app.component.jsx';

import User from './src/user/user.component.jsx';
import UserCreate from './src/user/user.create.component.jsx';
import UserDetails from './src/user/user.details.component.jsx';

var application = (<App>
  <Router history={browserHistory}>
      <Route path="/users" component={User}/>
      <Route path="/users/create" component={UserCreate}/>
      <Route path="/users/details/:id" component={UserDetails}/>
  </Router>
</App>);

ReactDOM.render(application, document.getElementById('app'));
