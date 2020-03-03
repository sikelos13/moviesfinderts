const isAuthorized = localStorage.getItem('isAuthorized');
// const passwordStorage = localStorage.getItem('password');

export const isAuthenticated = () => {

    if(isAuthorized === 'true') {
        return true;
    } else {
        return false;
    }
}
