import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'User';

@Injectable({
    providedIn: 'root'
  })
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(user:string,token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.setItem(USER_KEY,  user);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getUser(): string {
    return sessionStorage.getItem(USER_KEY);
  }

  public isTokenExpired(token: string): boolean {
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return true;

    const expiryTime = decoded.exp * 1000;
    return expiryTime < Date.now();
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }
}