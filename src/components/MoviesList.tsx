import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import MovieContainer from './MovieContainer';
import { Movie } from '../types';


interface MoviesListProps {
    moviesList: Movie[]
    onAddToBookmarks: (movie: Movie) => void;
    onShowDetails: (movie: Movie) => void;
    totalMovies: number
}

const MoviesList: React.FC<MoviesListProps> = memo(({ moviesList,totalMovies, onShowDetails,onAddToBookmarks }: MoviesListProps) => (
        <Box
            mt={2}
            display="flex"
            overflow="auto"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-evenly"
        >
            {
                moviesList.map((movie: Movie) => {
                    return (
                        <MovieContainer
                            key={movie.imdbID}
                            movie={movie}
                            totalMovies={totalMovies}
                            onAddToBookmarks={onAddToBookmarks.bind(null, movie)}
                            onShowDetails={onShowDetails.bind(null, movie)}
                        />
                    );
                })
            }
        </Box>
));

export default MoviesList;