import React, { Component } from 'react';


class MenuContainer extends Component {
	constructor() {
		super();

		this.state = {
			restaurants: [],
			isLoaded: false,
			favorites: [],
			data: {
				id: '',
				name: '',
				cuisine: '',
				address: '',
				menu_url: ''
			}
		}
	}

	setRestaurants = () => {
		this.setState({
			restaurants: this.props.restaurants
		})
	}

	addFavorite = async () => {
		try {
			console.log("TRY in POST route");
			const addFavorite = await fetch('http://localhost:8000/api/v1/', {
				method: "POST",
				body: JSON.stringify(this.state.data),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log(addFavorite, "addFavorite status before status");
			if(addFavorite.status !==200) {
				throw Error('404 from server')
				console.log(addFavorite.status, 'addFavorite.status error');
			}
			const addFavoriteResponse = await addFavorite.json();
			console.log(addFavoriteResponse, "Favorites DATA");
			this.setState({
				favorites: {...addFavoriteResponse.data}
			})
			console.log(this.state.favorites);
		} catch(err) {
			console.log(err, 'addFavorite error');
			return err
		}
	}

	handleCheckboxChange = async (e) => {
		
		this.setState({
			data: {
				name: e.currentTarget.name,
				id: e.currentTarget.id,
				cuisine: e.currentTarget.value,
				address: e.currentTarget.title,
				menu_url: e.currentTarget.src
			}
		}, () => {
			console.log(this.state.data, 'this.state.data in handleCheckboxChange');
			this.addFavorite()
		})
	}
		

	getFavorites = async () => {
		try {
			console.log(this.props, 'props in get');
			const responseGetFavorites = await fetch('http://localhost:8000/api/v1/' + this.props.userInfo.id)

			console.log(responseGetFavorites, 'responseGetFavorites');
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
		this.setRestaurants();
		this.setState({
			isLoaded: true
		})

	}

	render() {

		let { isLoaded, restaurants } = this.state;
		
		// if(!isLoaded) {
		// 	return<div>Loading...</div>;
		// }

		// else {
		return (
			<main>
				
				<tr>
					{this.props.restaurants.map(restaurant => (
					<div>
						<a className="ui card" href={restaurant.restaurant.menu_url} target="_blank">
  							<div style={{ backgroundColor: 'aquamarine' }} className="content">
							    <div className="header">{restaurant.restaurant.name}</div>
							    <div className="meta">{restaurant.restaurant.cuisines}</div>
							    
							    <div className="description">{restaurant.restaurant.location.address}</div>
							    <div style={{ opacity: ".01" }} className="description">{restaurant.restaurant.id}</div>
								<input onChange={this.handleCheckboxChange} type='checkbox'
									id={restaurant.restaurant.id} 
									name={restaurant.restaurant.name} 
									value={restaurant.restaurant.cuisines} 
									title={restaurant.restaurant.location.address} 
									src={restaurant.restaurant.menu_url}
								/>Add to Favorites						
  							</div>
						</a>
					</div>
					))}
				</tr>
			</main>
			)
		// }
	}
}

export default MenuContainer;