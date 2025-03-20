import express from 'express';
import { envs } from './config/envs.js';
import app from "./app.js"

const port = envs.PORT;
app.listen(port, () => console.log(`Servidor encendido en el puerto! ${port}`));
