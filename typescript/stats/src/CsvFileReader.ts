import fs from 'fs';

// T (TypeOfData) es un 'generico'. Se usa para generalizar la clase para que sea reutilizable
// Al hacerlo generico, la clase hija define que tipo de dato se le va a pasar.
export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) { }
  
  read(): void {
    this.data = fs.readFileSync(this.filename, { encoding: 'utf8' })
      .split('\n')
      .map(
        (row: string): string[] => {
          return row.split(',');
        }
      )
  }
}