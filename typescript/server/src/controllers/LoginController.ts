import { NextFunction, Request, Response } from "express";
import { get, post, controller, bodyValidator } from './decorators'

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  };

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
  
    if (email === 'email@email.com' && password === 'password') {
      // Marcar a la persona como logueada
      req.session = { loggedIn: true };
      // Redireccionar hacia otra ruta (root en este caso)
      res.redirect('/');
    } else {
      res.send('Invalid credentials')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}