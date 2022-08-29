import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if(req.session && req.session.loggedIn) {
    next();
    return; // el middleware no devuelve nada por eso next esta arriba y no se puso return next()
  }

  // Si no se autorizo la seción, se devuelve un error 403 (forbiden)
  res.status(403);
  res.send('Not permitted');
}

@controller('')
class RootController {
  // // Este es un ejemplo de como usar el PropertyDescriptor para especificar
  // // el tipo de propiedades que es permitido. En este caso serian Request y Response.
  // // Para ello se agrega una interfaz RouteHandlerDescriptor en routes.
  // @get('/')
  // add(a:number, b:number): number {
  //   return a + b;
  // }

  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in </div>
          <a href="/auth/logout">Logout </a>
        </div>
      `)
    } else {
      res.send(`
      <div>
        <div>You are not logged in </div>
        <a href="/auth/login">Login </a>
      </div>
    `)
    }
  }

  // Routas protegidas
  @get('/protected') // indica que se usa el metodo GET en la ruta /protected
  @use(requireAuth) // al entrar en la ruta /protected, usa el middleware requireAuth para validar el usuario
  getProtected(req: Request, res: Response): void {
    res.send('welcome to protected route, logged in user');
  }
}