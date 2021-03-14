const { cleanup } = require("@testing-library/react");
const server = require("./setupServer");

before(() => {
  server.listen();
  server.printHandlers(); // optional, but helpful!
  console.log(`msw server started!`);
})



afterEach(() => {
  server.resetHandlers();
  cleanup();
})

after(() => {
  server.close();
})

