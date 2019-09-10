import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FavoritesList = (props) => {
	console.log(props, 'props in FavoritesList');

	const menuList = props.favorites.map((favorite) => {
		return (
			<tr key={favorite.id}>
				<div>
					<a className="ui card" href={favorite.menu_url} target="_blank">
  						<div style={{ backgroundColor: 'aquamarine' }} className="content">
						    <div className="header">{favorite.name}</div>
						    <div className="meta">{favorite.cuisines}</div>						
  						</div>
					</a>
					<Button style={{ marginTop: '-20px', marginBottom: '10px' }} className="ui button" onClick={props.deleteFavorite.bind(null, favorite.id)} basic color='red'>
            			Remove <strong>{favorite.name}</strong> from Favorites
          			</Button>
				</div>
			</tr>
		)
	});

	return (
		<div>
			{menuList}
		</div>
	)
}

export default FavoritesList;
