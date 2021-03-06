/** @format */

import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import { Paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import _ from 'lodash';

function Movies() {
	// All movies state
	const [state, setState] = useState({
		movies: getMovies(),
	});

	// All gener state
	const [genre, setGenre] = useState({
		genres: [],
	});

	// Updating the genre state on first instance
	useEffect(() => {
		const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()];
		setGenre({ genres });
	}, [setGenre]);

	// Set currentpage state
	const [currentPage, setcurrentPage] = useState(1);

	// Set pageSize state
	const [pageSize] = useState(4);

	// Set selectedGenere state
	const [selecteGenre, setSelecteGenre] = useState({});

	// Set sort state
	const [sort, setSort] = useState({
		sortColumn: {
			path: 'title',
			order: 'asc',
		},
	});

	//Handling the delete function
	const handleDelete = (movie) => {
		const movies = state.movies.filter((m) => m._id !== movie._id);
		setState({ movies });
	};

	//Handling the like function
	const handleLike = (movie) => {
		const movies = [...state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		setState({ movies });
	};

	// Handling the current page function
	const handlePageChange = (page) => {
		setcurrentPage(page);
	};

	// Destructuring the movies array from state and renaming it to a new variable name.
	const { movies: allMovies } = state;

	// Destructuring the selectedGenre.
	const { selectedGenre } = selecteGenre;

	//
	const getPageData = () => {
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(
			filtered,
			[sort.sortColumn.path],
			[sort.sortColumn.order]
		);

		const movies = Paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	const { totalCount, data } = getPageData();

	const handleGenreSelect = (genre) => {
		setSelecteGenre({ selectedGenre: genre });
		setcurrentPage(1);
	};

	// Event for handling sorting
	const handleSort = (sortColumn) => {
		setSort({ sortColumn });
	};

	return (
		<div>
			{totalCount === 0 ? (
				<p>There are no movies in the database.</p>
			) : (
				<div className='row m-0'>
					<div className='col-2'>
						<ListGroup
							items={genre.genres}
							selectedItem={selectedGenre}
							onItemSelect={handleGenreSelect}
						/>
					</div>
					<div className='col'>
						<p>Showing {totalCount} movies in the database.</p>
						<MoviesTable
							movies={data}
							sortColumn={sort.sortColumn}
							onLike={handleLike}
							onDelete={handleDelete}
							onSort={handleSort}
						/>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Movies;
