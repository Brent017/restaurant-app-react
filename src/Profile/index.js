import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class Profile extends Component {
	constructor() {
		super();

		this.state = {
			username: ''
		}
	}

	render() {
		return (
			<Grid stackable columns={3} padded className='Profile'>
				<Grid.Row>
					<Grid.Column width={4}>
						Welcome {this.props.userInfo.username}!
					</Grid.Column>
					<Grid.Column width={4}>
						What type of cuisine would you like to search?
					</Grid.Column>
					<Grid.Column width={4}>

					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
	}
}

export default Profile;