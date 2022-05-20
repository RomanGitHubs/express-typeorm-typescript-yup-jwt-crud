import express from "express"
import config from "./config";
import { connect } from "./db/data-source";
import app from "./app";

(async () => {
    await connect()
    console.log("Data Source has been initialized!")

    app.listen(config.port, () => {
      console.log(`Server started on ${config.port} port`);
    });
})();
