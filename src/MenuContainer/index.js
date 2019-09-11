import React, { Component } from 'react';


class MenuContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurants: [],
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

	addFavorite = async (props) => {
		try {
			// console.log("TRY in POST route");
			const addFavorite = await fetch('http://localhost:8000/api/v1/', {
				method: "POST",
				body: JSON.stringify(this.state.data),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			// console.log(addFavorite, "addFavorite status before status");
			if(addFavorite.status !==200) {
				throw Error('404 from server')
			}
			const addFavoriteResponse = await addFavorite.json();
			// console.log(addFavoriteResponse, "Favorites DATA");
			this.setState({
				favorites: [{...addFavoriteResponse.data}]
			})
			// console.log(this.props, "props in addFavorite");
			this.props.getFavorites()
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

	componentDidMount() {
		this.setRestaurants();
	}

	render() {
		return (
			<main>
				
				<tr>
					{this.props.restaurants.map(restaurant => (
					<div>
						<a className="ui card" href={restaurant.restaurant.menu_url} target="_blank" rel="noopener noreferrer">
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
	}
}

export default MenuContainer;