import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { windowResize } from '@syncfusion/ej2/richtexteditor';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private authService : AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isSiteActive() != true || this.authService.isLoggedIn() != true ) {
      let error = "";
      if (this.authService.isLoggedIn() != true) {
        error += "Please authencticate yourself! \n"
      } if (this.authService.isSiteActive() != true) {
        error += "Please select a Site !"
      }
      window.alert(error);
      this.router.navigate(['auth']);
    }
    return true;
  }

}
