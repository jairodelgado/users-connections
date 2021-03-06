import React, { Component } from 'react';
import {Link} from 'react-router';

import Archive from '../util/archive.component.jsx';

class User extends Component {
  render(){
    return <Archive of="/users" display="name" create edit connections delete>Users</Archive>;
  }
}

export default User;
