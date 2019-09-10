import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Logout extends Component {
	state={}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu>
				<Menu.Item

					as={ Link } to='login'
					name='logout'
					active={activeItem === 'logout'}
					onClick={this.handleItemClick}
				>	
						Log Out
				</Menu.Item>
			</Menu>
		)
	}
}

export default Logout;
