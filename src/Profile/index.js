import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MenuContainer from '../MenuContainer';
// import CitySearch from '../CitySearch';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurants: [],
			username: '',
			city: '',
			search: ''
		}
	}

	getMenu = async() => {
				try {
			const menu = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&q=${this.state.search}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
            		'user-key': 'b0639e223ba019c8af3a7232ba72d6fa'
				}
			})
			const menuJson = await menu.json();
			// return menuJson;
			console.log(menuJson, "MENU JSON");

			this.setState({
					restaurants: menuJson.restaurants,
					isLoaded: true
				}, () => {
					// console.log("RENDER")
					this.render()
				})
			
		} catch(err) {
			console.log(err, 'getMenu error');
			return err;
		}
	}

	componentDidMount() {
		this.getMenu()
	}

	handleSearchChange = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	handleCityChange = () => {
		this.setState({
			city: this.city.value
		})
	}

	render() {
		// console.log(this.state, "this.state in profile render");
		return (
			<Grid stackable columns={3} padded className='Profile'>
				<Grid.Row>
					<Grid.Column style={{ fontSize: '25px', margin: '10px', padding: '5px' }} width={4}>
						Welcome {this.props.userInfo.username}!<br/><br/>Search Restaurants:
					</Grid.Column>
					<Grid.Column width={6}>
						<div class="ui action input">
  							<input type="text" placeholder="Search..." name='restaurant' onChange={this.handleSearchChange} />
  							<button onClick={this.getMenu} type="submit" class="ui button">Search</button>
						</div>
					</Grid.Column>
					<Grid.Column style={{ marginTop: '5px' }} width={4}>
						
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column style={{ marginLeft: '5px' }} width={4}>
						<MenuContainer restaurants={this.state.restaurants} />
					</Grid.Column>
					<Grid.Column width={4}>
						
					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
	}
}

export default Profile;