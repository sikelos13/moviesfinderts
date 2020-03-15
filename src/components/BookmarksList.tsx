import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import MovieContainer from './MovieContainer';
import { Movie } from '../types';


interface BookmarksListProps {
    moviesList: Movie[]
    onShowDetails: (movie: Movie) => void;
    totalMovies: number
}

const BookmarksList: React.FC<BookmarksListProps> = memo(({ moviesList,totalMovies, onShowDetails }: BookmarksListProps) => (
        <Box
            mt={2}
            display="flex"
            overflow="auto"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-evenly"
        >
            
        
            
        </Box>
));

export default BookmarksList;