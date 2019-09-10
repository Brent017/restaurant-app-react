import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MenuContainer from '../MenuContainer';
// import CitySearch from '../CitySearch';
import FavoritesList from '../FavoritesList';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurants: [],
			username: '',
			city: '',
			search: '',
			favorites: []
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

	deleteFavorite = async (id) => {
		try {
			const deleteFavorite = await fetch('http://localhost:8000/api/v1/' + this.state.favorites.id, {
				method: "DELETE"
			})
			if(deleteFavorite.status !== 200) {
				throw Error('An error occurred on delete')
			}
		const deleteFavoriteJson = await deleteFavorite.json();
		this.setState({
			favorites: this.state.favorites.filter((favorite) => favorite.id !== id)
			})
		} catch(err) {
			console.log(err, 'errror in delete');
			return err
		}
	}

	render() {
		// console.log(this.state, "this.state in profile render");
		return (
			<Grid stackable columns={3} padded className='Profile'>
				<Grid.Row>
					<Grid.Column width={5}>
						<h3>Welcome {this.props.userInfo.username}!</h3>
					</Grid.Column>
					<Grid.Column width={5}>
						<h3>Search Restaurants</h3>
						<div class="ui action input">
  							<input type="text" placeholder="" name='restaurant' onChange={this.handleSearchChange} />
  							<button onClick={this.getMenu} type="submit" class="ui button"><h4>Search</h4></button>
						</div>
					</Grid.Column>
					<Grid.Column width={5}>
						<h3>Favorites</h3>
						<FavoritesList favorites={this.state.favorites} deleteFavorite={this.deleteFavorite} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column style={{ marginLeft: '5px' }} width={5}>
						<MenuContainer restaurants={this.state.restaurants} favorites={this.state.favorites} />
					</Grid.Column>
					<Grid.Column width={10}>
						
					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
	}
}

export default Profile;