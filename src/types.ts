export interface ApplicationState {
    isAuthenticated: boolean;
}

export interface MovieState {
    title: string;
}

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    isBookmarked: boolean;
    errorMessage?: string;
}

export interface MovieExtended extends Movie{
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Ratings[];
    Metascore: string
    imdbRating: string
    imdbVotes: string
    Type: string
    DVD:  string
    BoxOffice: string
    Production: string
    Website: string
    Response: string;
}

interface Ratings {
    Source: string;
    Value: string;
}