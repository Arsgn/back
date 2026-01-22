import { buildServer } from "./app";

const server = buildServer();
const start = async () => {
<<<<<<< HEAD
  const PORT = process.env.PORT || 5000;
=======
  const PORT = process.env.PORT || 5002;
>>>>>>> ea7d142529899e48cad193d969796b43984e8ec4
  try {
    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`${new Date()}`);
        console.log("server running at: http://localhost:" + PORT);
<<<<<<< HEAD
      },
=======
      }
>>>>>>> ea7d142529899e48cad193d969796b43984e8ec4
    );
  } catch (error) {
    console.error(error);
  }
};
start();
