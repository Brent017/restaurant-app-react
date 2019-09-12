import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import '../App.css';



class Logout extends Component {
	state={}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu inverted>
				<Menu.Item
					
					as={ Link } to=''
					name='logout'
					active={activeItem === 'logout'}
					onClick={this.handleItemClick}
				>	
						<h5>Log Out</h5>
				</Menu.Item>
				
				<Menu.Item style={{ padding: '5px' }}>
					<img src='http://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32447-fork-and-knife-icon.png' alt='fork and knife icon' />
					<h4 style={{ marginBottom: '25px', marginRight: '10px' }}>Menu Finder</h4>
				</Menu.Item>
			</Menu>
		)
	}
}

export default Logout;
