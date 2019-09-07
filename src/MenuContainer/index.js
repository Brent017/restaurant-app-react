import React, { Component } from 'react';
import MenuList from '../MenuList';

class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurants: [],
			isLoaded: false
		}
	}

	getMenu = async() => {
		
		try {
			const menu = await fetch("https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&q=" + this.props.search, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
            		'user-key': 'b0639e223ba019c8af3a7232ba72d6fa'
				}
			})
			const menuJson = await menu.json();
			return menuJson;
			
		} catch(err) {
			console.log(err, 'getMenu error');
			return err;
		}
	}

	componentDidMount() {
		this.getMenu()
			.then((data) => {
				// console.log(data, 'data from componentDidMount');
				this.setState({
					restaurants: data,
					isLoaded: true
				})
				// console.log(this.state, "this.state");
			})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	render() {

		let { isLoaded, restaurants } = this.state;
		console.log(restaurants.restaurants, 'restaurants in Render');

		if(!isLoaded) {
			return<div>Loading...</div>;
		}

		else {
		return (
			<main>
				
				<tr>
					{restaurants.restaurants.map(restaurant => (
						<a class="ui card" href={restaurant.restaurant.menu_url} target="_blank">
  							<div class="content">
							    <div class="header">{restaurant.restaurant.name}</div>
							    <div class="meta">{restaurant.restaurant.cuisine}</div>
							    <div class="description">
							      {restaurant.restaurant.location.address}
								</div>
  							</div>
						</a>
					))}	
				</tr>
			</main>
			)
		}
	}
}

export default Menu;