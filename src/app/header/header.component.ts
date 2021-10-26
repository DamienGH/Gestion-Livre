import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

/**
 * Composant gérant la bande du haut de l'appli
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private authService: AuthService, private angularFireAuth: AngularFireAuth) { }


  /**
   * Initialisation du composant, vérification si le user est authentifié
   */
  ngOnInit() {
    this.angularFireAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  /**
   * Action sur la déconnexion
   */
  onSignOut() {
    this.authService.signOutUser();
  }

  /**
   * @returns L'email de l'utilisateur authentifié
   */
  getUserAuthEmail() {
    return this.authService.userAuthEmail;
  }

}