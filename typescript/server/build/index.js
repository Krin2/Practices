"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
var app = (0, express_1.default)();
// body parser es un middleware que se usa para obtener el body en una consulta
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Indico a express que voy a usar cookieSession como middelware para almacenar el inicio de seción
app.use((0, cookie_session_1.default)({ keys: ['claveParaCodificar'] }));
// Le indico a express que voy a usar los metadata definidos acá.
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3000, function () {
    console.log('listening on port 3000');
});
