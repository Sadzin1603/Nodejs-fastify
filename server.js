import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
server.getDefaultJsonParser();
const database = new DatabaseMemory();

//ROTA POST (criar)
server.post("/videos", (req, res) => {
  const { title, description, duration } = req.body;
  database.create({
    title,
    description,
    duration,
  });
  console.log(database.list());
  return res.status(201).send();
});
//ROTA GET (pegar)
server.get("/videos", (req, res) => {
const search = req.query.search
  const videos = database.list(search);
  return res.send(videos);
});
// ROTA PUT (editar)
server.put("/videos/:id", (req, res) => {
  const videoId = req.params.id;
  const { title, description, duration } = req.body;
  const video = database.update(videoId, {
    title,
    description,
    duration,
  });
  return res.status(204).send('')
});
//ROTA DELETE (deletar)
server.delete("/videos/:id", (req, res) => {
  database.delete(req.params.id)

    return res.status(204).send()
});

server.listen({
  port: 3333,
});
