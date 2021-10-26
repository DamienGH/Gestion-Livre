import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GoogleVolumeListResponse } from '../models/google-volume-list-response';

/**
 * Service de gestion de l'API google book
 */
@Injectable()
export class GoogleBookApiService {

    constructor(private http: HttpClient) { }

    /**
     * Récupération d'un livre (et UN SEUL) sur l'API google book via son ISBN
     * @param isbn l'identifiant unique du livre à récupérer
     * @returns Observable<GoogleVolumeListResponse>
     */
    searchByISBN(isbn: String) {
        return this.http.get<GoogleVolumeListResponse>("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&maxResults=1")
            .pipe(
                retry(1),
                catchError(this.handleError)
            );

    }

    /**
     * Gestion des erreurs d'appel à l'API 
     */
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Récupération de l'erreur côté client
            errorMessage = error.error.message;
        } else {
            // Récupération de l'erreur côté serveur
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }


}