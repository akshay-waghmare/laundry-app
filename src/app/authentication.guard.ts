import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate, CanActivateChild {

    constructor(
        private readonly router: Router,
        private tokenStorage:TokenStorage,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.tokenStorage.isLoggedIn()) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }

    canActivateChild(childroute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.canActivate(childroute, state);
    }

}