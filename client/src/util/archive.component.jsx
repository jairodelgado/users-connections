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
    
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  
  handleSubmit(event) {
    event.preventDefault();
  }
  
  deleteItem(event) {
    fetch('/api' + this.props.of + '/details/' + event.target.name, {
        method: 'DELETE',
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
        
        return fetch('/api' + this.props.of); 
      })
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
       {this.props.create && <Link to={'/create' + this.props.of} className="secondary-content">Create new</Link>}
        <h5>{this.props.children}</h5>
        <div className="divider"></div>
        <form ref="form" role="form" onSubmit={this.handleSubmit}>
          <ul className="collection with-header">
            {
              this.state.items.map((item, index) => { 
                return (
                  <li key={item.id} className="collection-item">
                    <div className="avatar">
                    
                      <div className="secondary-content">
                        {this.props.edit && <Link className="btn btn-floating waves-effect" to={'/details' + this.props.of + '/' + item.id}><i className="material-icons">edit</i></Link>}
                        {this.props.connections && <Link className="btn btn-floating waves-effect" to={'/connections/' + item.id}><i className="material-icons">perm_identity</i></Link>}
                        {this.props.delete && <button ref={item.id} name={item.id} className="btn btn-floating waves-effect materialize-red" onClick={this.deleteItem}><i className="material-icons">delete</i></button>}
                      </div>
                    
                      <div className="title">{item[this.props.display]}</div>
                      <p></p>
                      
                    </div>
                  </li>);
              })
            }
            {this.state.items.length == 0 ? <li className="collection-item center-align grey-text">There is nothing to show here.</li> : false}
          </ul>
        </form>
      </div>
    );
  }
}

export default Archive;
