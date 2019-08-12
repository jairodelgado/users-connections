import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Error from './error.component.jsx';

class Editor extends Component {
  constructor() {
    super();

    this.state = {
      loading: true, 
      error: false,
      item: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    fetch('/api' + this.props.of + '/details/' + this.props.id)
      .then((response) => {
        return response.ok ? response.json() : response.json().then(json => {throw json});
      })
      .then((json) => {
        var state = this.state;

        state.loading = false;
        state.item = json;
        
        this.setState(state);
        this.props.onItemChange(json);

        /** JQuery plugin of materialize to display character counter in inputs */
        $('[data-length]').characterCounter();
      })
      .catch((exception) => {
        this.state.loading = false;
        this.state.error = exception.message;
        this.state.item = {};

        this.setState(this.state);
        Materialize.toast(exception.message, 4000, 'deep-orange');
      });
  }

  updateState(event) {
    this.state.item[event.target.name] = event.target.value;
    this.setState(this.state);
    this.props.onItemChange(this.state.item);
  }

  handleSubmit(event) {
    this.state.loading = true;
    this.setState(this.state);

    fetch('/api' + this.props.of + '/details/' + this.props.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item)
    })
    .then((response) => {
      return response.ok ? response.json() : response.json().then(json => {throw json});
    })
    .then((json) => {
      Materialize.toast(json.message, 4000, 'teal lighten-2');
      browserHistory.push(this.props.of);
    })
    .catch((exception) => {
      this.state.loading = false;
      this.state.error = exception.message;
      this.state.item = {};

      this.setState(this.state);
      Materialize.toast(exception.message, 4000, 'deep-orange');
    });

    event.preventDefault();
  }

  render() {
    if(this.state.loading) {
      return <div className="progress"><div className="indeterminate"></div></div>;
    }

    if(this.state.error) {
      return <Error>{this.state.error}</Error>;
    }

    return (
      <div className="row">
        <h5>{this.props.display}</h5>
        <div className="divider"></div>
        <form ref="form" className="col s10 offset-s1" role="form" onSubmit={this.handleSubmit} onChange={this.updateState}>
          {this.props.children}

          <div className="section right">
            <button type="submit" className="btn waves-effect">Save</button>{' '}
            <Link className="btn waves-effect blue-grey" to={this.props.of}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Editor;
