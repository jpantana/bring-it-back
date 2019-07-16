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
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, useruid: user.uid });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, useruid } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} useruid={useruid} />
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute path="/signup" component={SignUp} authed={authed} />
                  <PrivateRoute path="/home" className="container" component={Home} authed={authed} />
                  <PrivateRoute path="/mystuff/:id" className="container" component={MyStuff} authed={authed} />
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
