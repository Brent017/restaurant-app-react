import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MenuContainer from '../MenuContainer';

class Profile extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			search: ''
		}
	}

	getRestaurant = async (e) => {
		e.preventDefault();
		
	}

	handleChange = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	render() {
		return (
			<Grid stackable columns={3} padded className='Profile'>
				<Grid.Row>
					<Grid.Column width={4}>
						Welcome {this.props.userInfo.username}!<br/>Please enter restaurant name:
					</Grid.Column>
					<Grid.Column width={4}>
						<div onSubmit={this.getRestaurant} class="ui action input">
  							<input type="text" placeholder="Search..." name='restaurant' onChange={this.handleChange} />
  							<button type="submit" class="ui button">Search</button>
						</div>
					</Grid.Column>
					<Grid.Column width={4}>
						
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={6}>
						<MenuContainer getRestaurant={this.getRestaurant} />
					</Grid.Column>
					<Grid.Column width={6}>

					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
	}
}

export default Profile;