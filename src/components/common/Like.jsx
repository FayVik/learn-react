/** @format */

import React from 'react';

const Like = ({ liked, onClick }) => {
	const getClassStyle = () => {
		let classes = 'fa fa-heart';
		classes += liked !== true ? '-o' : '';
		return classes;
	};

	return (
		<div>
			<i
				className={getClassStyle()}
				style={{ cursor: 'pointer' }}
				onClick={onClick}></i>
		</div>
	);
};

export default Like;
