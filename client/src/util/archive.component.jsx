import React, {Component} from 'react';
import {Link} from 'react-router';

import Error from './error.component.jsx';

class Archive extends Component {
  constructor() {
    super();
    this.state = {
      loading: true, 
      error: false, 
      items: []
    };
  }
  
  componentDidMount() {
    fetch('/api' + this.props.of) 
      .then((response) => {
        return response.ok ? response.json() : response.json().then(json => {throw json});
      })
      .then((json) => {
        this.state.loading = false;
        this.state.items = json;

        this.setState(this.state);
      })
      .catch((exception) => {
        this.state.loading = false;
        this.state.error = exception.message;
        this.state.items = [];

        this.setState(this.state);
        Materialize.toast(exception.message, 4000, 'deep-orange');
      });
  }
  
  render(){
    if(this.state.loading) {
      return <div className="progress"><div className="indeterminate"></div></div>;
    }

    if(this.state.error) {
      return <Error>{this.state.error}</Error>;
    }

    return (
      <div className="row">
        <Link to={this.props.of + '/create'} className="secondary-content">
          Create new
        </Link>
        <h5>{this.props.children}</h5>
        <div className="divider"></div>
        <ul className="collection with-header">
          {
            this.state.items.map((item, index) => { 
              return (
                <li key={item.id} className="collection-item">
                  <div>
                    {item[this.props.display]}

                    <Link to={this.props.of + '/details/' + item.id} className="secondary-content">
                      <i className="material-icons">mode_edit</i>
                    </Link>
                  </div>
                </li>);
            })
          }
          {this.state.items.length == 0 ? <li className="collection-item center-align grey-text">There is nothing to show here.</li> : false}
        </ul>
      </div>
    );
  }
}

export default Archive;
