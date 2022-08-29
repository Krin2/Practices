import { Sorter } from './Sorter'

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  };
  get length(): number { return this.data.length; };
  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase();
  };
  swap(leftIndex: number, rightIndex: number): void {
    // separa los caracteres del string
    const characters = this.data.split('');

    const leftHand = characters[leftIndex];
    characters[leftIndex] = characters[rightIndex];
    characters[rightIndex] = leftHand;

    // Une los caracteres para formar un nuevo string ordenado
    this.data = characters.join('');
  };
}