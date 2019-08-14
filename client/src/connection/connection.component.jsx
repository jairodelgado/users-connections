import React, { Component } from 'react';
import {Link, } from 'react-router';

import Archive from '../util/archive.component.jsx';

class User extends Component {

  constructor() {
    super();
    
    this.state = {
      loading: true, 
      error: false,
      user: {}
    };
  }

  componentDidMount() {
    fetch('/api/users/details/' + this.props.params.id) 
      .then((response) => {
        return response.ok ? response.json() : response.json().then(json => {throw json});
      })
      .then((json) => {
        this.state.loading = false;
        this.state.user = json;

        this.setState(this.state);
      })
      .catch((exception) => {
        this.state.loading = false;
        this.state.error = exception.message;
        this.state.user = {};

        this.setState(this.state);
        Materialize.toast(exception.message, 4000, 'deep-orange');
      });
  }
  
  render(){
    return (
      <div>
        <Archive of={'/connections/' + this.props.params.id} display="name" create delete>Connections of {this.state.user.name}</Archive>
        <div className="section right">
          <Link className="btn waves-effect" to="/users">Back to user list</Link>
        </div>
      </div>
    );
  }
}

export default User;
