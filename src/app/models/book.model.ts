/**
 * Modèle de livre
 */
export class Book {
  synopsis: string | undefined;

  constructor(public title: string, public author: string, public id: number) {
  }
}