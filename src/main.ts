import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { db } from "./db/index.js";
import { middlewareAuth } from "./api/middleware.js";
import { handlerReadiness } from "./api/readiness.js";
import { handlerNotesCreate, handlerNotesGet } from "./api/notes.js";
import { handlerUsersCreate, handlerUsersGet } from "./api/users.js";

const port = config.api.port || "8080";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://*", "http://*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
    exposedHeaders: ["Link"],
    credentials: false,
    maxAge: 300,
  }),
);

// Disabled static file serving for now
// app.use("/", express.static(path.join(__dirname, config.api.filepathRoot)));

const v1Router = express.Router();

if (db) {
  v1Router.post("/users", handlerUsersCreate);
  v1Router.get("/users", middlewareAuth(handlerUsersGet));
  v1Router.get("/notes", middlewareAuth(handlerNotesGet));
  v1Router.post("/notes", middlewareAuth(handlerNotesCreate));
}

v1Router.get("/healthz", handlerReadiness);

app.use("/v1", v1Router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
