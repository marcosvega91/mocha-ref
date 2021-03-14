import { createServer } from "./setupServer"; // `createServer` code moved here as mentioned in previous comment

const server = createServer();

// throw the server instance in global
global.mswServer = server;

export function mochaGlobalSetup() {
  server.listen();
  server.printHandlers(); // optional, but helpful!
  console.log(`msw server started!`);
}

export function mochaGlobalTeardown() {
  server.close();
  console.log("server stopped!");
}
