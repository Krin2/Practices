import 'reflect-metadata';

// const plane = {
//   color: 'red'
// };

// // Este metadata esta asociado a plane, pero esta "oculto"
// Reflect.defineMetadata('note', 'metadata asociado a plane', plane);
// console.log(plane);

// // para traer el metadata, se usa el getMetadata, se le pasa la key y el objeto al cual esta asociada la key
// const note = Reflect.getMetadata('note', plane);
// console.log(note);

// // Este metadata esta asociado a color en plane, pero esta "oculto"
// Reflect.defineMetadata('note', 'metadata asociado al color', plane, 'color');
// const colorNote = Reflect.getMetadata('note', plane, 'color');
// console.log(colorNote);

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('VRRRRR secretly')
  fly(): void {
    console.log('vrrr..')
  }
}
function markFunction(secretInfo: string){
  return function(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  }
}

// Este metadata se usará para traer toos los metadatas definidos en la clase.
function printMetadata(target: typeof Plane) {
  // Este for busca todos las funciones definidas en prototype y trae el metadato
  // secret de cada una de estas (en este caso solo esta fly)
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}