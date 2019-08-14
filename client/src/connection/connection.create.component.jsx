import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Selector from '../util/selector.component.jsx';

class ConnectionCreate extends Component {

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
        <Selector of={'/users'} display="name" select={'/connections/' + this.props.params.id} >Add new connections for user {this.state.user.name}</Selector>
        <div className="section right">
          <Link className="btn waves-effect" to={'/connections/' + this.props.params.id}>Finish</Link>
        </div>
     </div>
    );
  }
}

export default ConnectionCreate;
