//import { Router } from "express";
const express = require("express");

import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";

const routes = express();

// middleware
routes.use(express.json());
routes.use(express.urlencoded());

//rotas
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
