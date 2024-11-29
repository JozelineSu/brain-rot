import { jwtDecode } from 'jwt-decode';

class AuthService {
    getProfile() {
        return jwtDecode(this.getToken());
    }
    loggedIn() {
        const token = this.getToken();
        //if there is a token and it's not expired, return `true`
        return token && !this.isTokenExpired(token) ? true: false;
    }

    isTokenExpired(token) {
        //decode the token to get its expiration time that was set by ther server
        const decoded = jwtDecode(token);
        // if the expiration time is less that the current time (in secods), the token is expired and we return 'true'
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        // if token hasnt passed its exp time, return 'false'
        return false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService();