import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Editor from '../util/editor.component.jsx';

class UserDetails extends Component {
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
      <Editor id={this.props.params.id} of="/users" display="Edit user details" onItemChange={this.updateItem}>
        <div className="section">
          <div className="input-field">
            <i className="material-icons prefix">perm_identity</i>
            <input ref="name" name="name" type="text" className="validate" value={this.state.item.name || ""} required data-length="20" pattern="[a-zA-Z]{5,20}"/>{' '}
            <label className="active" data-error="You must provide only letters bettween 5 and 20 characters long.">Name</label>{' '}
          </div>
        </div>
      </Editor>
    );
  }
}

export default UserDetails;
