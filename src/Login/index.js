import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}

	handleSubmit = async(e) => {
		e.preventDefault();

		const data = new FormData()
		data.append('username', this.state.username)
		data.append('password', this.state.password)

		const login = this.props.logIn(this.state);

		login.then((data) => {
			if(data.status.message === 'Success'){
				this.props.history.push('/profile')
			} else {
				console.log(data, this.props);
			}
		}).catch((err) => {
			console.log(err, 'Error in handleSubmit login');
		})
	} 

	render() {
		return (
			<Grid className='login' textAlign='center' verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450}}>
					<Header className='title' as='h2' textAlign='center'>
						Menu Finder
					</Header>
					<Form onSubmit={this.handleSubmit} >
						<Segment stacked>
						Username:
						<Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange} />
						Password:
						<Form.Input fluid icon='asterisk' iconPosition='left' placeholder='password' type='text' name='password' onChange={this.handleChange} />
						<Button fluid size='large' type='submit'>Login</Button>
						<Message>
							Not registered? <Link to='/register'>Register Now!</Link>
						</Message>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
			)
	}
}

export default Login;