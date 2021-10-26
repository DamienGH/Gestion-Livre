import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

/**
 * Service de protection des composants sensibles => redirection vers l'authentification
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

  /**
   * Si l'utilisateur n'est pas authentifié ce service le redirige vers la page d'authentification
   * @param authService Le service d'authentification permettant de savoir si l'utilisateur est authentifié
   * @param router 
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.angularFireAuth.onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}