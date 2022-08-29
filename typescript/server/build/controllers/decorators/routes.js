"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.put = exports.post = exports.get = void 0;
// In order to allow the use of metadata, "experimentalDecorators": true, and "emitDecoratorMetadata": true, in tsconfig should be enabled
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.put = routeBinder(Methods_1.Methods.put);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
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
