import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import MovieContainer from '../components/MovieContainer';
import { Movie } from '../types';
import Header from '../components/Header'
import { Container } from '@material-ui/core';

interface BookmarksListProps {
    moviesList: Movie[]
    onAddToBookmarks: (movie: Movie) => void;
    onShowDetails: (movie: Movie) => void;
    totalMovies: number
}

const BookmarksList: React.FC<BookmarksListProps> = memo(({ moviesList,totalMovies, onShowDetails,onAddToBookmarks }: BookmarksListProps) => (
    <>
     <Header />
            <Container>
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
        </Container>
        </>
));

export default BookmarksList;