import React, { Component } from 'react';
import {Link} from 'react-router';

class Index extends Component {
  render(){
    return (
      <div className="row">
        <h5>Home page</h5>
        <div className="divider"></div>
        
        <ul>
          <li><Link className="btn waves-effect btn-large btn-flat" to='/users'><i className="material-icons left">perm_identity</i> Users</Link></li>
          <li><Link className="btn waves-effect btn-large btn-flat" to='/graph'><i className="material-icons left">dashboard</i> Connection graph</Link></li>
        </ul>
      </div>
    );
  }
}

export default Index;
