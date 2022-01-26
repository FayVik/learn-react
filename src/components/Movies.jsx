/** @format */

import React, { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { Paginate } from '../utils/Paginate';

function Movies() {
	const [state, setState] = useState({
		movies: getMovies(),
		pageSize: 4,
	});
	const [currentPage, setcurrentPage] = useState(1);

	const handleDelete = (movie) => {
		const movies = state.movies.filter((m) => m._id !== movie._id);
		setState({ movies });
	};

	const handleLink = (movie) => {
		const movies = [...state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		setState({ movies });
	};

	const handlePageChange = (page) => {
		setcurrentPage(page);
	};

	const { length: count } = state.movies;
	const { pageSize, movies: allMovies } = state;

	const movies = Paginate(allMovies, currentPage, pageSize);

	return (
		<div>
			{count === 0 ? (
				<p>There are no movies in the database.</p>
			) : (
				<div>
					<p>Showing {count} movies in the database.</p>
					<table className='table'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Genre</th>
								<th>Stock</th>
								<th>Rate</th>
								<th>Like</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{movies &&
								movies.map((movie) => (
									<tr key={movie._id}>
										<td>{movie.title}</td>
										<td>{movie.genre.name}</td>
										<td>{movie.numberInStock}</td>
										<td>{movie.dailyRentalRate}</td>
										<td>
											<Like
												liked={movie.liked}
												onClick={() => handleLink(movie)}
											/>
										</td>
										<td>
											<button
												onClick={() => handleDelete(movie)}
												className='btn btn-danger'>
												Delete
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
					<Pagination
						itemsCount={count}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default Movies;
