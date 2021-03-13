import { server } from "./setupServer"; // `createServer` code moved here as mentioned in previous comment

export function mochaGlobalSetup() {
  server.listen();
  server.printHandlers(); // optional, but helpful!
  console.log(`msw server started!`);
}

export function mochaGlobalTeardown() {
  server.close();
  console.log("server stopped!");
}
