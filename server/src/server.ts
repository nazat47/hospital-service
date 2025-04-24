import app from "./app";

const port = process.env.PORT || 3001;

async function startServer() {
  try {
    app.listen(port as number, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
