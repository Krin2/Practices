// In order to allow the use of metadata, "experimentalDecorators": true, and "emitDecoratorMetadata": true, in tsconfig should be enabled
import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// Esta interfaz se usa para especificar el tipo de argumentos que se va a recibir.
// En este caso se especifica que el value solo puede ser del tipo RequestHandler (Request or Response)
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string){
  return function(path: string) {
      return function(target: any, key: string, desc: RouteHandlerDescriptor) { // se cambio el PropertyDescriptor  por RouteHandlerDescriptor
        Reflect.defineMetadata(MetadataKeys.path, path, target, key);
        Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);


// Al hacer lo mismo para otros metodos como "post", se ve que se repite codigo, por eso se busca una forma de reutilizarlo
// export function get(path: string) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'get', target, key);
//   }
// }

// export function post(path: string) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   }
// }