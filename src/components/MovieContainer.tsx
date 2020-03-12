import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Movie } from '../types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Box } from '@material-ui/core';
interface MovieContainerProps {
  movie: Movie;
  totalMovies: number;
  onHandleBookmark: () => void;
  onShowDetails: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 320,
    minHeight: 400,
    marginBottom: '8px'
  },
  media: {
    objectFit: "fill"
  }

}));

const MovieContainer: React.FC<MovieContainerProps> = ({ onShowDetails, onHandleBookmark, movie, }: MovieContainerProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          alt={movie.Title}
          height="345"
          image={movie.Poster}
          title={movie.Title}
        />
        <Box m="5px 0 0 10px" id="favorite-icon">
              {movie.isBookmarked
                  ? <FavoriteIcon />
                  : <FavoriteBorderIcon />
              }
          </Box>
        <CardContent className="card-type-height">
          <Typography gutterBottom variant="h5" component="h2">
              {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {movie.Year}
          </Typography>
          {movie.errorMessage &&
            <Typography variant="body2" color="error" component="p">
              {movie.errorMessage}
          </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions>

        <Button size="small" onClick={onHandleBookmark} color="primary">
          {movie.isBookmarked
            ? "Remove from Bookmarks"
            : "Add to Bookmarks"
          }
        </Button>
        <Button size="small" color="primary" onClick={onShowDetails}>
          Learn More
          </Button>
      </CardActions>
    </Card>
  )
};

export default MovieContainer;