// Este es un ejemplo de como usar Singleton para usar un solo router en toda la aplicacion de
import express from "express";

export class AppRouter {
  // La variable es privada por lo cual solo se puede llamar dentro de la clase
  // La variable es estatica por lo cual puede ser llamada sin instanciarla
  private static instance: express.Router;

  // De esta forma, la aplicacion llamará al metodo getInstance desde cualquier
  // parte de la aplicacion y si no hay una instancia previa, genera la instancia,
  // y sino, solo devuelve la instancia actual. De esta forma, solo hay una instancia del router para toda la aplicacion.
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}