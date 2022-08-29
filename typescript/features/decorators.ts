@classDecorator
class Boat {
  @testPropertyDecorator
  color: string = 'red';

  get formattedColor() {
    return `This boat color is ${this.color}`;
  }

  // El decorator toma como primer parametro (target) que hace referencia a la clase en la cual esta parado.
  // El segundo parametro (key), hace referencia al metodo o variable que esta debajo de donde se coloco el decorator, en este caso la funcion "pilots"
  // Existe un tercer parametro oculto que hace referencia a los descriptors
  @logError('Oops, boat was sunk')
  pilots(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: string
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('stopped');
    }
  }
}

// El decorador solo se ejecuta una vez al crear la clase.
// Este decorador muestra lo que recibe nnomas
function testDecorator(target: any, key: string): void {
  console.log('Target: ', target);
  console.log('Key: ', key);
}

// El tipo PropertyDescriptor no depende de typescript.
// PropertyDescriptor tiene propiedades que pueden cambiar el comportamiento del objeto al que hace referencia.
// Por ejemplo, la propiedad writable= false hace que el campo al que hace referencia no pueda ser modificado.
// Para acceder a estas propiedades, se puede llamar directamente a Object.getOwnPropertyDescriptor(nombreDelObjeto, nombreDelCampo)
// para leerlas, o a Object.defineProperty(nombreDelObjeto, nombreDelCampo, { propiedad: nuevoValor }) para escribirlas
// Al hacer que el decorator este metido como el return de otra funcion, se logra un decorador que puede ser parametrizado y reutilizado
function logError(errorMessage: string) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value; // esta linea hace referencia a la funcion (pilots)

    // En este caso, el decorador se usa para captar el error y producir un mensaje adecuado para este metodo
    desc.value = function() {
      try {
        method();
      } catch(e) {
        console.log(errorMessage);
      }
    }
  }
}

// DECORADOR DE PROPIEDADES.
// Las propiedades no pueden ser decoradas ya qeu el decorador se llama una unica vez al crear la clase.
// Al crear la clase solo se ve el "prototype de la clase, o sea solo se ven los metodos y propiedades,
// por lo que nunca se van a mostrar los valores de una instancia de una clase ya que el decorator se
// ejecuta una unica vez antes de crear la instancia
// El caso de decoradores de propiedades, solo sirve para saber que hay una propiedad ahi y poder modificar sus propiedades,
// pero los valores no estan disponibles en este punto
function testPropertyDecorator(target: any, key: string): void {
  console.log('Key: ', key);
}

// DECORADOR DE PARAMETROS
// aca solo se agrega como parametro un indice, que hace referencia al indice del argumento de la funcion.
// cada parametro al que se le quiera agregar un decorator se le debe poner el @decorator adelante
function parameterDecorator(target: any, key: string, index: number): void {
  console.log(key, index);
}

// DECORADOR DE CLASE
// El decorador de clase recive como parametro el constructor de la clase
function classDecorator(constructor: Function) {
  console.log(constructor)
}

new Boat().pilots();