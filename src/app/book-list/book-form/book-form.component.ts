import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/library';
import { GoogleBookApiService } from '../../services/google-book-api.service';

/**
 * Composant gérant le formulaire de création d'un livre, le scan du code barre pour retrouver l'ISBN et l'autocomplétion du formulaire grâce à cet ISBN
 */
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isbnPattern: RegExp = /[0-9]{13}/;

  /** 
   * Variables du scanner
   * @todo : peut-être les sortir de là
  */
  scanResult: any = '';
  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.EAN_13];
  timeBetweenScans: number = 2000;
  videoConstraints = {
    width: {min: 1920, ideal: 1920},
    height: {min: 1080, ideal: 1080},
    aspectRatio: { ideal: 1.7777777778 }
  };

  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
    private router: Router, private googleBookApiService: GoogleBookApiService) {

  }

    onCodeResult(result: string) {
    this.scanResult = result;
    this.bookForm.get('isbn')!.setValue(result);
  }
  /**
   * Initialisation du composant : initilisation du formulaire
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialisation du formulaire de création d'un livre.
   * Ajout d'une souscription sur le champs ISBN qui réagira en cas d'ISBN correct pour remplir les autres champs du formulaire
   */
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: '',
      author: ['', Validators.required],
      isbn: ['',Validators.pattern(this.isbnPattern)],
      synopsis: ''
    });

    this.bookForm.get('isbn')!.valueChanges.subscribe(typedIsbn => {
      if (String(typedIsbn).match(this.isbnPattern)) {
        this.autofillBookForm(typedIsbn);
      }
    })
  }

  /**
   * Sauvegarde du livre renseigné dans le formulaire
   * Puis navigation vers la liste des livres
   */
  onSaveBook() {
    //Assertion d'assignation car des valeurs par défaut et des Validators.required sont présentes dans le formulaire
    const title = this.bookForm.get('title')!.value;
    const subtitle = this.bookForm.get('subtitle')!.value;
    const author = this.bookForm.get('author')!.value;
    const synopsis = this.bookForm.get('synopsis')!.value;
    const newBook = new Book(title, author, this.booksService.books.entries.length);
    newBook.synopsis = synopsis;
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  /**
   * Autremplissage du formulaire avec les infos du livre récupéré via l'API google book
   * @param isbn le numéro ISBN du livre à récupérer
   */
  autofillBookForm(isbn: string) {
    this.googleBookApiService.searchByISBN(isbn)
      .subscribe(googleVolumeListResponse => {
        //On ne prend que le premier item de la réponse (items[0]) car searchByISBN(isbn) ne cherche qu'un seul livre
        this.bookForm.get('author')!.setValue(googleVolumeListResponse.items[0].volumeInfo.authors);
        this.bookForm.get('title')!.setValue(googleVolumeListResponse.items[0].volumeInfo.title);
        let parsedSynopsis = googleVolumeListResponse.items[0].volumeInfo.description;
        if (parsedSynopsis) {
          this.bookForm.get('synopsis')?.setValue(parsedSynopsis);
        }
      });
  }

}

