import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import App from './src/app/app.component.jsx';
import Index from './src/app/index.component.jsx';


import User from './src/user/user.component.jsx';
import UserCreate from './src/user/user.create.component.jsx';
import UserDetails from './src/user/user.details.component.jsx';

import Connection from './src/connection/connection.component.jsx';
import ConnectionCreate from './src/connection/connection.create.component.jsx';
import ConnectionGraph from './src/connection/connection.graph.component.jsx';

var application = (<App>
  <Router history={browserHistory}>
    <Route path="/" component={Index}/>
    <Route path="/users" component={User}/>
    <Route path="/create/users" component={UserCreate}/>
    <Route path="/details/users/:id" component={UserDetails}/>
    
    <Route path="/connections/:id" component={Connection}/>
    <Route path="/create/connections/:id" component={ConnectionCreate}/>
    <Route path="/graph" component={ConnectionGraph}/>
  </Router>
</App>);

ReactDOM.render(application, document.getElementById('app'));
