import React, { Component } from 'react';
import { Button, Grid, Message, Segment, Header, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';


class Register extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			email: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}

	handleSubmit = async(e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('username', this.state.username)
		data.append('password', this.state.password)
		data.append('email', this.state.email)

		console.log(data.entries(), '<--data from register');
		console.log(this.state.username, 'this.state.username after append');
		for(let pair of data.entries()) {
			console.log(pair[0], ', ', pair[1], '<--each key value pair from register');
		}
		console.log(data, '<--data before registerFunction');
		const registerFunction = this.props.register(data);

		registerFunction.then((data) => {
			console.log(data, 'data in registerFunction');
			if(data.status.message === 'Success') {
				console.log('HELLOOOO');
				this.props.history.push('/profile')
			} else {
				console.log(data, '<--should be error message in registerFunction');
			}
		})
	} 

	render() {
		return (
			<Grid className='login' textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
				<Grid.Column style={{ maxWidth: 450, backgroundColor: 'black' }}>
					<Header className='title' textAlign='center'>
						<img src='http://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32447-fork-and-knife-icon.png' alt='fork and knife icon'/>
						<h2>Menu Finder</h2>
					</Header>

					<Form onSubmit={this.handleSubmit}>
						<Segment style={{ backgroundColor: 'grey' }} stacked>
							<h4>Username:</h4>
						<Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange} />
						Password:
						<Form.Input fluid icon='lock' iconPosition='left' placeholder='password' type='text' name='password' onChange={this.handleChange} />
						Email:
						<Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' onChange={this.handleChange} />
						<Button fluid size='large' type='submit'>Register</Button>
						<Message>
							Already A Member? <Link to='/login'>Login</Link>
						</Message>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
			)
	}
}

export default Register;