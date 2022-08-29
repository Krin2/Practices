import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Response, Request, NextFunction, RequestHandler } from 'express';

// Esta funcion capta las key dentro de req.body y retorna un error si no las encuentra.
function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    // Retorna un error cuando no encuentra el body
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    // itera entre las key del body y retorna un error cuando no encuentra alguna key dentro del body
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    // Si se encontraron las key, sigue.
    next();
  }
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key) || [];

      const validator = bodyValidator(requiredBodyProps);
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  }
}