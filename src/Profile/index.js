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

	getFavorites = async () => {
		console.log(this.state.favorites, 'favorites list in getFavorites');
		console.log(this.props.userInfo.id, '<--userInfo.id in getFavorites');
		try {
			const responseGetFavorites = await fetch('http://localhost:8000/api/v1/' + this.props.userInfo.id)

			// console.log(responseGetFavorites, 'responseGetFavorites');
			const favoritesResponse = await responseGetFavorites.json();
			console.log(await favoritesResponse, '<-favoritesResponse');
			if(favoritesResponse.status.code !== 200) {
				throw Error('404 from server')
			}
			this.setState({
				favorites: favoritesResponse.data
			})
		} catch(err) {
			console.log(err, 'err from getFavorites');
			return err
		}
	}

	componentDidMount() {
		console.log(this.props.userInfo, 'userInfo in componentDidMount');
		this.getFavorites();
	}

	handleSearchChange = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	// handleCityChange = () => {
	// 	this.setState({
	// 		city: this.city.value
	// 	})
	// }

	deleteFavorite = async (id) => {
		// console.log(this.state.favorites, 'favorites id in deleteFavorite');
		try {
			const deleteFavorite = await fetch('http://localhost:8000/api/v1/' + id, {
				method: "DELETE"
			})
			// console.log(deleteFavorite.status, 'deleteFavorite.status');
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
						<h5 style={{ fontSize: '30px', textAlign: 'center' }}>Click to view menu</h5>
					</Grid.Column>
					<Grid.Column width={5}>
						<h3>Search Restaurants</h3>
						<div class="ui action input">
  							<input style={{ fontSize: '20px' }} type="text" placeholder="" name='restaurant' onChange={this.handleSearchChange} />
  							<button onClick={this.getMenu} type="submit" class="ui button"><h4>Search</h4></button>
						</div>
					</Grid.Column>
					<Grid.Column width={5}>
						<h3>Favorites</h3>
						<h5 style={{ fontSize: '30px', textAlign: 'center' }}>Click to view menu</h5>
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