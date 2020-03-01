const usernameStorage = localStorage.getItem('username');
const passwordStorage = localStorage.getItem('password');

export const isAuthenticated = (username: string, password: string) => {

    if(username === usernameStorage && password === passwordStorage) {
        return true;
    } else {
        return false;
    }
}
