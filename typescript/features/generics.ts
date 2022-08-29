// GERERICS.

// 1 - GENERICS EN CLASES

/*
La situacion es la siguiente:
- Se tienen 2 clases que se implementan de la misma forma y hacen lo mismo
pero los tipos de datos que manejan son distintos (en este caso number y strng)
- Se quiere reducir la cantidad de codigo generalizando esta clase para cualquier tipo de dato
*/

class ArrayOfNumbers {
  constructor(public collection: number[]) { };

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) { };

  get(index: number): string {
    return this.collection[index];
  }
}
/*
Implementacion de la clase generica
- Se le pasa un argumento T (por convencion se usa T pero puede llamarse de cualquier forma)
que indica el tipo de dato que va a usar.
*/
class ArrayOfAnything<T> {
  constructor(public collection: T[]) { };

  get(index: number): T {
    return this.collection[index];
  }
}

// Cuando se llame a la clase, se debe especificar que tipo de dato va a usar.
new ArrayOfAnything<string>(['a', 'b', 'c', 'd', 'e', 'f']);

// Cuando no se le pasa el tipo de dato, Typescript infiere el valor en base a los valores que maneja.
new ArrayOfAnything(['a', 'b', 'c', 'd', 'e', 'f']); // infiere el tipo string[]

// 2 - GENERICS EN FUNCIONES

function printString(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function printNumber(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// implementacion de generics en una funcion.
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
// Al llamar la funcion se especifica el tipo de dato que se esta pasando.
// al especificar el dato notar que en este caso se pasa un string y no un string[].
// Esto es porque sino quedaria un array bidimensional
printAnything<string>(['a', 'b', 'c', 'd', 'e', 'f']);

// Typescript infiere el tipo de dato si no se especifica
printAnything(['a', 'b', 'c', 'd', 'e', 'f']);

// - Es aconsejable colocar el tipo de datos para evitar errores

// 3 - GENERIC EN CONSTRAINTS
/* 
*/

class Car {
  print(): void { console.log('I am a car') };
}

class House {
  print(): void { console.log('I am a house') };
}

// Implementacion de generics en constraints
// - se usa una interfase para crear las condiciones minimas que tiene que satisfacer la funcion para poder ser llamada.
// - Si se le pasara un array de numbers, daria un error porque numbers no tiene el metodo print definido
// - Se usa extends sobre el tipo de dato para marcar que el tipo de dato T debe cumplir con la interfaz Printable
interface Printable {
  print(): void;
}
function printHouseOrCars<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  };
}

printHouseOrCars([1,2,3]); // la clase number no tiene definido el metodo print()
printHouseOrCars<House>([new House(), new House()]) // hose tiene definido print 
printHouseOrCars<Car>([new Car(), new Car()]) // Car tiene definido print
