const TOKEN_KEY = 'AuthToken';

export class TokenStorageUtil {

    static getSessionStorage() {
        return window.sessionStorage;
    }

    static getToken() {
        return this.getSessionStorage().getItem(TOKEN_KEY);
    }

    static clear() {
       return this.getSessionStorage().clear();
    }

    static saveToken(token: string) {
        this.getSessionStorage().removeItem(TOKEN_KEY);
        this.getSessionStorage().setItem(TOKEN_KEY, token);
    }

}