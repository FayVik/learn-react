/** @format */

import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props) => {
	const { items, textProperty, valueProperty } = props;

	return (
		<div>
			<ul className='list-group'>
				{items.map((item) => (
					<li key={item[valueProperty]} className='list-group-item'>
						{item[textProperty]}
					</li>
				))}
			</ul>
		</div>
	);
};

ListGroup.propTypes = {
	items: PropTypes.array.isRequired,
};

export default ListGroup;
