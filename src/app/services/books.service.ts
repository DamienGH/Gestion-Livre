import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

/**
 * Service de gestion des livres.  La liste des livres est liée à un @class Subject<T>
 */
@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  /**
   * Met à jour la liste des livres à partir de la BDD à la construction
   * @param angularFireDatabase 
   */
  constructor(private angularFireDatabase: AngularFireDatabase, private http: HttpClient) {
    this.getBooks();
  }

  /**
   * Émission d'un signal de mise à jour des livres
   */
  emitBooks() {
    this.booksSubject.next(this.books);
  }

  /**
   * Service de sauvegarde en BDD de la liste de livres
   */
  saveBooks() {
    this.angularFireDatabase.database.ref('/books').set(this.books);
  }

  /**
   * Service de récupération en base pour mettre à jour la liste des livres, émission d'un signal de mise à jour du Subject.
   */
  getBooks() {
    this.angularFireDatabase.database.ref('/books').on('value', (data: DataSnapshot) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    }
    );
  }

  /**
   * Service de récupération en BDD d'un livre suivant son ID
   * @param id l'id du livre à récupérer
   * @returns une Promise renvoyant la valeur récupérée en base ou une erreur firebase
   */
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.angularFireDatabase.database.ref('books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Service de création d'un nouveau livre. Sauvegarde en BDD. Émet un signal de mise à jour
   * @param newBook 
   */
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  /**
   * Service de suppression d'un livre. Sauvegarde en BDD. Émet un signal de mise à jour
   * @param book le livre à supprimer
   */
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
        return false;
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }


  /**
 * Enregistrement de la liste des livres dans la BDD
 */
  saveBooksToServer() {
    this.http
      .post('https://gestion-livre-23045-default-rtdb.europe-west1.firebasedatabase.app/livres.json', this.books)
      .subscribe(
        () => {
          return;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}