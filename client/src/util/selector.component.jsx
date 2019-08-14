import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Error from './error.component.jsx';

class Archive extends Component {
  constructor() {
    super();
    
    this.state = {
      loading: true, 
      error: false, 
      items: []
    };
    
    this.selectItem = this.selectItem.bind(this);
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
  
  selectItem(event) {
    var itemId = event.target.name;
    
    this.state.loading = true;
    this.setState(this.state);
 
    fetch('/api' + this.props.select + '/details/' + itemId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item)
    })
    .then((response) => {
      return response.ok ? response.json() : response.json().then(json => {throw json});
    })
    .then((json) => {
      this.state.loading = false;
      //this.state.items = json;
        
      this.setState(this.state);
      Materialize.toast(json.message, 4000, 'teal lighten-2');
    })
    .catch((exception) => {
      this.state.loading = false;
      this.state.error = exception.message;

      this.setState(this.state);
      Materialize.toast(exception.message, 4000, 'deep-orange');
    });
    
    event.preventDefault();
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
        <h5>{this.props.children}</h5>
        <div className="divider"></div>
        <form ref="form" role="form" >
          <ul className="collection with-header">
            {
              this.state.items.map((item, index) => { 
                return (
                  <li key={item.id} className="collection-item">
                    <div className="avatar">
                    
                      <div className="secondary-content">
                        <button ref={item.id} name={item.id} className="btn btn-floating waves-effect materialize-red" onClick={this.selectItem}><i className="material-icons">add</i></button>
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
