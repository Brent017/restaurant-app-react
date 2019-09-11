import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FavoritesList = (props) => {
	console.log(props, 'props in FavoritesList');

	const menuList = props.favorites.map((favorite) => {
		return (
			<tr key={favorite.id}>
				<td>
					<a className="ui card" href={favorite.menu_url} target="_blank">
  						<td style={{ backgroundColor: 'aquamarine' }} className="content">
						    <td className="header">{favorite.name}</td>
						    <td className="meta">{favorite.cuisines}</td>						
  						</td>
					</a>
					<Button style={{ marginTop: '-20px', marginBottom: '10px' }} className="ui button" onClick={props.deleteFavorite.bind(null, favorite.id)} basic color='red'>
            			Remove <strong>{favorite.name}</strong> from Favorites
          			</Button>
				</td>
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
