/**
 * Modèle de livre
 */
export class Book {
  synopsis: string | undefined;
  subtitle: string | undefined;

  constructor(public title: string, public author: string, public id: number) {
  }
}