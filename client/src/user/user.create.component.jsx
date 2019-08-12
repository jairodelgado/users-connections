import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Creator from '../util/creator.component.jsx';

class UserCreate extends Component {

  constructor() {
    super();

    this.state = {
      item: {}
    };

    this.updateItem = this.updateItem.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateItem(item) {
    this.state.item = item;
    this.setState(this.state);
  }
  
  updateState(event) {
  }
    
  render(){
    return (
      <Creator of="/users" display="Create user" onItemChange={this.updateItem}>
        <div className="section">
          <div className="input-field">
            <i className="material-icons prefix">perm_identity</i>
            <input ref="name" name="name" type="text" className="validate" value={this.state.item.name || ""} required data-length="20" pattern="[a-zA-Z]{1,20}"/>{' '}
            <label className="active" data-error="You must provide only letters bettween 1 and 20 characters long.">Name</label>{' '}
          </div>
        </div>
      </Creator>
    );
  }
}

export default UserCreate;
