import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      notValid: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);

    const login = this.props.logIn(this.state);

    login
      .then(data => {
        if (data.status.message === "Success") {
          this.props.history.push("/profile");
        } else {
          this.setState({
            notValid: true
          });
        }
      })
      .catch(err => {
        console.log(err, "Error in handleSubmit login");
        this.setState({
          notValid: true
        });
      });
  };

  render() {
    return (
      <Grid className="login" textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450, backgroundColor: "aquamarine" }}>
          <Header className="title" textAlign="center">
            <img
              src="http://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32447-fork-and-knife-icon.png"
              alt="fork and knife icon"
            />
            <h2>Menu Finder</h2>
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Segment style={{ backgroundColor: "grey" }} stacked>
              <h3 style={{ backgroundColor: "grey" }}>Username</h3>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="username"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
              <h3 style={{ backgroundColor: "grey" }}>Password</h3>
              <Form.Input
                style={{ backgroundColor: "black" }}
                fluid
                icon="asterisk"
                iconPosition="left"
                placeholder="password"
                type="text"
                name="password"
                onChange={this.handleChange}
              />
              <Button
                style={{ backgroundColor: "black" }}
                fluid
                size="large"
                type="submit"
              >
                <h3 style={{ borderRadius: "10px", backgroundColor: "black" }}>
                  Login
                </h3>
              </Button>
              {this.state.notValid ? (
                <div
                  style={{
                    fontSize: "25px",
                    color: "red",
                    fontWeight: "bold",
                    textShadow:
                      "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                  }}
                >
                  Invalid username or password
                </div>
              ) : null}
              <Message>
                <h3 style={{ backgroundColor: "white", color: "black" }}>
                  Not registered?
                </h3>{" "}
                <Link to="/register">
                  <h4 style={{ fontSize: "25px" }}>Click here to Register</h4>
                </Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
