import React, { Component } from 'react';

class CitySearch extends Component {
	constructor() {
		super();

		this.state = {
			cities: [],
			city: 'Denver',
			cityId: 305
		}
	}

	getCity = async() => {
		try {
			const city = await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.city}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
            		'user-key': 'b0639e223ba019c8af3a7232ba72d6fa'
				}
			})
			const cityJson = await city.json();
			return cityJson
		} catch(err) {
			console.log(err, 'getCity error');
			return err;
		}
	}

	componentDidMount() {
		this.getCity()
			.then((data) => {
				// console.log(data, 'data from componentDidMount');
				this.setState({
					city: data
				})
				// console.log(this.state, "this.state");
			})
	}

	handleChange = (e) => {
		this.setState({
			city: e.currentTarget.value
		})
	}

	render() {
		let { cities } = this.state;
		console.log(cities, 'cities in Render');
		// console.log(this.props.search, 'this.props.search in Render');
		return (
			<main>
				
				<tr>
					{cities.map(city => (
  							<div class="content">
							    <div class="header">{city.city.name}</div>
							    <div class="meta">{city.state.name}</div>
  							</div>
					))}	
				</tr>
			</main>
			)
	}
}

// export default CitySearch;

