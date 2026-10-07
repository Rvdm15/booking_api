import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Sentry starten met de DSN uit .env
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Sentry: moet als eerste middleware staan
app.use(Sentry.Handlers.requestHandler());

// Zorgt dat Express Json uit request kan lezen (req.body)
app.use(express.json());

// Logger: Logt elk request met de duur
app.use(logMiddleware);

// Routes
app.use("/users", usersRouter);

app.use("/login", loginRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Sentry: stuurt fouten door naar sentry.io (vóór onze eigen errorHandler)
app.use(Sentry.Handlers.errorHandler());

// Vangt alle fouten op (moet ná alle routes staan)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
