import React from 'react';
import {
  Route,
  Redirect,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
// JS files
import MyStuff from '../Components/MyStuff/MyStuff';
import SignUp from '../Components/SignUp/SignUp';
import fbConnection from '../helpers/data/connection';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import Home from '../Components/Home/Home';
import usersData from '../helpers/data/usersData';
// STYLES
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


fbConnection();

const PublicRoute = ({
  component: Component,
  authed,
  ...rest
}) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({
  component: Component,
  authed,
  ...rest
}) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    useruid: '',
    username: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, useruid: user.uid });
        this.getUserName();
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getUserName = () => {
    usersData.getUsers(this.state.useruid)
      .then((user) => {
        this.setState({ username: user[0].username });
      })
      .catch(err => console.error('no user logged in', err));
  };

  removeUsername = () => {
    this.setState({ username: '' });
  };

  render() {
    const {
      authed,
      useruid,
      username,
    } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar
              authed={authed}
              useruid={useruid}
              username={username}
              removeUsername={this.removeUsername}
            />
            <div className="wrapper d-flex">
              <div className="col">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute path="/signup" component={SignUp} authed={authed} />
                  {/* <PrivateRoute path="/signup" component={() => (<SignUp />)} authed={authed} /> */}
                  <PrivateRoute path="/home" component={Home} authed={authed} />
                  <PrivateRoute path="/mystuff/:id" className="" component={MyStuff} authed={authed} />
                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
