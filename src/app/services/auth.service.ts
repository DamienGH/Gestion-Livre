import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

/**
 * Service d'authentification, basé sur Firebase
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) { }
  userAuthEmail: string = '';

  /**
   * Service de création d'un nouvel utilisateur
   * @param email 
   * @param password 
   * @returns la Promise de création du User
   */
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
          () => {
            this.userAuthEmail = email;
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Service d'authentification d'un nouvel utilisateur
   * @param email 
   * @param password 
   * @returns 
   */
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
          () => {
            this.userAuthEmail = email;
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Service de déconnexion
   */
  signOutUser() {
    this.angularFireAuth.signOut();
    this.userAuthEmail = '';
  }

}
