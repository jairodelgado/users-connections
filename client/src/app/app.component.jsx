import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    $(this.refs.navButton).sideNav();
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul className="left hide-on-med-and-down">
              <li><a ref="navButton" className="waves-effect" href="#" data-activates="slide"><i className="material-icons">menu</i></a></li>
            </ul>
          </div>
        </nav>

        <ul id="slide" className="side-nav">
          <li><a className="subheader">Actions</a></li>
          <li><div className="divider"></div></li>
          <li><a className="waves-effect" href="/"><i className="material-icons left">home</i>Home</a></li>
          <li><a className="waves-effect" href="/users"><i className="material-icons left">perm_identity</i>Users</a></li>
          <li><a className="waves-effect" href="/graph"><i className="material-icons left">dashboard</i>Connections</a></li>
        </ul>
        
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
