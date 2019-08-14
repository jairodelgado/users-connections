import React, { Component } from 'react';
import {Link, } from 'react-router';

import { Graph } from 'react-d3-graph';

class ConnectionGraph extends Component {
  constructor() {
    super();
    
    this.state = {
      loading: true, 
      error: false,
      data: {
        nodes: [{id : 'root'}],
        links: []
      },
      config: {
        nodeHighlightBehavior: true,
        directed: true,
        node: {
          color: 'lightgreen',
          size: 120,
          highlightStrokeColor: 'blue',
          labelProperty: 'name'
        },
        link: {
          highlightColor: 'lightblue'
        }
      }
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then((response) => {
        return response.ok ? response.json() : response.json().then(json => {throw json});
      })
      .then((users) => {
        this.state.loading = false;
        this.state.data.nodes = users || [{id: 'root', name: 'No registered users'}];

        this.setState(this.state);
      })
      .catch((exception) => {
        this.state.loading = false;
        this.state.error = exception.message;

        this.setState(this.state);
        Materialize.toast(exception.message, 4000, 'deep-orange');
      });
      
    fetch('/api/connections')
      .then((response) => {
        return response.ok ? response.json() : response.json().then(json => {throw json});
      })
      .then((connections) => {
        this.state.loading = false;
        this.state.data.links = connections;

        this.setState(this.state);
      })
      .catch((exception) => {
        this.state.loading = false;
        this.state.error = exception.message;

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
        <h5>Connection graph</h5>
        <div className="divider"></div>
        <Graph id="graph-id" data={this.state.data} config={this.state.config} className="userView"/>
      </div>);
  }
}

export default ConnectionGraph;
