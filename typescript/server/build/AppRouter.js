"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
// Este es un ejemplo de como usar Singleton para usar un solo router en toda la aplicacion de
var express_1 = __importDefault(require("express"));
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    // De esta forma, la aplicacion llamará al metodo getInstance desde cualquier
    // parte de la aplicacion y si no hay una instancia previa, genera la instancia,
    // y sino, solo devuelve la instancia actual. De esta forma, solo hay una instancia del router para toda la aplicacion.
    AppRouter.getInstance = function () {
        if (!AppRouter.instance) {
            AppRouter.instance = express_1.default.Router();
        }
        return AppRouter.instance;
    };
    return AppRouter;
}());
exports.AppRouter = AppRouter;
