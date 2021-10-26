import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '(version Alpha) Gestion de collection de livre';

  /**
   * Le composant de l'application configure la connexion firebase
   */
  constructor() {

  }
}
