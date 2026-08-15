const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});

router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo", { erros: [] });
});

router.post(
    "/adm-cliente-novo",

    body("nome")
        .notEmpty()
        .withMessage("O campo nome é obrigatório!"),

    body("cep")
        .notEmpty()
        .withMessage("O campo CEP é obrigatório!")
        .isLength({ min: 8, max: 8 })
        .withMessage("O CEP deve ter 8 caracteres!")
        .isNumeric()
        .withMessage("O CEP deve conter apenas números!"),

    body("nomeUsuario")
        .notEmpty()
        .withMessage("O campo nomeUsuario é obrigatório!")
        .isLength({ min: 3 })
        .withMessage("É necessario ter pelo menos 3 digitos!"),

    body("email")
        .notEmpty()
        .withMessage("O campo E-mail é obrigatório!")
        .isEmail()
        .withMessage("Digite um E-mail valido!"),

    body("senha")
        .notEmpty()
        .withMessage("O campo senha é obrigatório!")
        .isLength({ min: 8 })
        .withMessage("A senha precisa ter no minimo 8 digitos!"),

    body("tipo")
        .isIn(["1", "2"])
        .withMessage("Selecione um tipo de usuário válido!"),

    body("status")
        .isIn(["0", "1"])
        .withMessage("Selecione uma das opções!"),

    (req, res) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            return res.render("pages/adm-cliente-novo", {
                erros: erros.array()
            });
        }

        res.send("Cadastro realizado!");
    }
);

router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});

router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});

router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});

module.exports = router;