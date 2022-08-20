import express from "express";
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get("/", (req, res) => {
  const usuarios = [];
  const {size} = req.query;
  const limite = size || 5;
  for (let i = 0; i < limite; i++) {
    usuarios.push({
      Nombre: faker.name.fullName(),
    });
  };
  res.json(usuarios);
});

export default router;
