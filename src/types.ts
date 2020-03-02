export interface ApplicationState {
    // movies?: MovieState;
    isAuthenticated: boolean;
}

export interface MovieState {
    title: string;
}

export interface Movie {
    name: string;
}