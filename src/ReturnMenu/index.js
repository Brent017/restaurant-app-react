import React, { Component } from 'react';

class ReturnMenu extends Component {
	constructor(props) {
		super();

		this.state= {
			selectedUrl: '',
			content: []
		}
	}

	onUrlSelect = (e, url) => {
		e.preventDefault();
		console.log(url, 'selectedUrl');
		this.setState({
			selectedUrl: url
		})
	}

	componentWillMount() {
		this.loadData(this.state.selectedUrl)
	}

	loadData = (url) => {
		fetch(url)
		.then(function (response) {
			console.log(url + "->" + response.ok);
			return response.body
		})
		.then(function (data) {
			console.log(data, 'data');
			this.setState({
				content: [...data]
			});
		}.bind(this))
		.catch(function (err) {
			console.log('failed to load', url, err.stack);
		});
	}

	render() {
		return (
			<div>
				{this.state.content}
			</div>
		)
	}
}

export default ReturnMenu;