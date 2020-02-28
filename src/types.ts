export interface ApplicationState {
    movies?: MovieState;
    isAuthenticated: boolean;
}

export interface MovieState {
    title: string;
}