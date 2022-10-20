const express = require("express");
const connection = require("../db");
const router = express.Router();
const escapeSpecialChars = require("../utils");
const fs = require("fs");

router.get("/plants", (request, response) => {
  connection.query("SELECT * FROM plants", (error, result) => {
    if (error) {
      response.status(404).send({ message: "No plants found" });
    }
    response.json(result);
  });
});

router.get("/plants/:id", (request, response) => {
  const sql = `SELECT * FROM plants WHERE id = ${request.params.id}`;
  connection.query(sql, (error, result) => {
    if (error || !result.length) {
      response
        .status(404)
        .send({ message: `Plant with id ${request.params.id} not found` });
    }

    response.json(result[0]);
  });
});

router.patch("/plants/:id", (request, response) => {
  const safeDescription = escapeSpecialChars(request.body.description);
  const safeName = escapeSpecialChars(request.body.name);
  const sql = `UPDATE plants SET name = '${safeName}', description = '${safeDescription}', image = '${request.body.image}', last_watered = '${request.body.last_watered}', last_fertilized = '${request.body.last_fertilized}', days_between_watering = ${request.body.days_between_watering}, days_between_fertilizing = ${request.body.days_between_fertilizing} WHERE id = ${request.params.id}`;

  connection.query(sql, (error, result) => {
    if (error) {
      response.status(500).send({ message: "Update was not successful" });
    }
    response.json(result);
  });
});

router.post("/plants/create", (request, response) => {
  const name = request.body.name;
  const description = request.body.description;
  const image = request.body.image;
  const days_between_watering = request.body.days_between_watering;
  const days_between_fertilizing = request.body.days_between_fertilizing;
  const sql = `INSERT INTO plants (name, description, image, last_watered, last_fertilized, days_between_watering, days_between_fertilizing) VALUES ('${name}','${description}','${image}',now(),now(),'${days_between_watering}','${days_between_fertilizing}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      response.status(500).send({ message: "Plant could not be created" });
    }
    response.json(result);
  });
});

router.post("/plants/save-image", (request, response) => {
  const imageBase64 = request.body.image.replace("data:image/png;base64,", "");
  let buffer = Buffer.from(imageBase64, "base64");
  let id = (Math.random() + 1).toString(36).substring(2);
  fs.writeFileSync(`public/${id}.png`, buffer, "base64");
  response.json({
    file: `http://localhost:3000/public/${id}.png`,
  });
});

router.delete("/plants/:id", (request, response) => {
  const sql = `DELETE FROM plants WHERE id = ${request.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      response.status(500).send({ message: "Plant could not be deleted" });
    }
    response.json(result);
  });
});

module.exports = router;
