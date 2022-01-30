/** @format */

import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props) => {
	const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
		props;

	return (
		<div>
			<ul className='list-group'>
				{items.map((item) => (
					<li
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}
						className={
							item === selectedItem
								? 'list-group-item active'
								: 'list-group-item'
						}>
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

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id',
};

export default ListGroup;
