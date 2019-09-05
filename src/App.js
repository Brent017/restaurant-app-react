import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const my404 = () => {
  return (
    <div>
      Page not found :-\
    </div>
    )
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      isAuth: false
    }
  }

  logIn = async(loginInfo) => {
    try {
      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false,
          isAuth: true
        }
      })

      return parsedResponse
    } catch(err) {
      console.log(err, 'Error in login');
    }
  }

  register = async(data) => {
    console.log(data);
    try {
      const registerResponse = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json();
      console.log(parsedResponse);

      this.setState({
        ...parsedResponse.data,
        loading: false,
        isAuth: true
      })
      return parsedResponse;
    } catch(err) {
      console.log(err);
    }
  }

  logout = () => {
    this.setState({
      isAuth: false
    })
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/login' render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path='/register' render={(props) => <Register {...props} register={this.register} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} userInfo={this.state}/> } />
          <Route component={my404} />
        </Switch>
      </main>
  );
  }
}
  

export default App;
