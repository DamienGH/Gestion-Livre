import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

/**
 * Composant de rendu d'un livre
 */
@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
})
export class SingleBookComponent implements OnInit {

  book!: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService,
              private router: Router) {}

  /**
   * Initialisation du composant : appel du service des livres pour récupérer le livre correspondant à l'ID présent dans l'URL appelée
   */
  ngOnInit() {
    this.book = new Book('', '',0);
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (value: unknown) => {
        this.book = <Book> value;
      }
    );
  }

  /**
   * Action de navigation retour vers la liste des livres
   */
  onBack() {
    this.router.navigate(['/books']);
  }
}