const express=require('express')
const app=express.Router()
const Joi=require("joi")

const genres = [
    {
      id: 1,
      name: "action",
    },
    {
      id: 2,
      name: "drama",
    },
    {
      id: 3,
      name: "romance",
    },
  ];


app.get("/", (req, res) => {
    res.send(genres);
  });
  
  app.get("/:id", (req, res) => {
    const genre = genres.find((e) => e.id == req.params.id);
    if (!genre) return res.status(400).send("given id was not found!");
    res.send(genre);
  });
  app.post("/new", (req, res) => {
    const { error, message } = validateName(req.body);
    if (error) return res.status(400).send(message);
    genres.push({ id: genres.length + 1, name: req.body.name });
    res.send("new genre has been added successfully!");
  });
  
  app.put("/:id", (req, res) => {
    const genre = genres.find(e=>e.id==req.params.id);
    if (!genre) return res.status(400).send("given id was not found!");
  
    const { error, message } = validateName(req.body);
    if (error) return res.status(400).send(message);
    genre.name = req.body.name;
    res.send("genre has been updated succesfully!");
  });
  
  app.delete("/:id", (req, res) => {
    const genre = genres.find(e=>e.id==req.params.id);
    if (!genre) return res.status(400).send("given id was not found!");
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(`id: ${req.params.id} is deleted successfully!`);
  });
  
  function validateName(name) {
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
    });
    const result = schema.validate(name);
    const temp = { error: result.error };
    if (result.error) temp.message = result.error.details[0].message;
    return temp;
  }

  module.exports=app;