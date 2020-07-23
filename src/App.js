import React from 'react';
import './App.css';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Upload_Button from './Upload_Button';
import Auth from './Auth';
import Registration from './Registration';

class App extends React.Component {
  render() {
    const Main = () => (
      <main>
        <Switch>
          <Route exact path='/' component={Upload_Button}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/auth' component={Auth}/>
        </Switch>
      </main>
    )
    
    const Header = () => (
      <header>
        <nav>
          <ul>
            <li><Link to='/' className="li">Upload</Link></li>
            <li><Link to='/registration' className="li">Registration</Link></li>
            <li><Link to='/auth' className="li">Auth</Link></li>
          </ul>
        </nav>
      </header>
    )
    return (
    <div>
      <Header />
      <Main />
    </div>
    )
  }
}

export default withRouter(App)