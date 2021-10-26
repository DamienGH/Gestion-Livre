import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Composant d'affichage de la liste des livres
 */
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit, OnDestroy {

  books!: Book[];
  booksSubscription!: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  /**
   * Initialisation du composant : souscription au service des livres, émission d'un signal de mise à jour
   */
  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  /**
   * Action de routage vers le composant de création de livre
   */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  /**
   * Action de suppression d'un livre
   * @param book le livre à supprimer
   */
  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  /**
   * Action de routage vers le composant de visualisation d'un livre
   * @param id le livre à visualiser
   */
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  
  /**
   * Suppression du composant : désinscription au service des livres
   */
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}