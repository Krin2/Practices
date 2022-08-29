"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'email@email.com' && password === 'password') {
        // Marcar a la persona como logueada
        req.session = { loggedIn: true };
        // Redireccionar hacia otra ruta (root en este caso)
        res.redirect('/');
    }
    else {
        res.send('Invalid credentials');
    }
});
