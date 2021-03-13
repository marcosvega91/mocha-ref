import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { rest } from "msw";
import Child from "../Child";
import { server } from "../../test/setupServer";

const mockedResult = {
  msgCode: 0,
  msgDesc: "MODIFIED: Request processed successfully",
  data: {
    data: {
      createdBy: "MODIFIED: CJ Child",
      createdDate: "02/18/2021",
    },
  },
};

afterEach(async () => {
  cleanup();
  server.resetHandlers();
});

describe("Child2 tests", () => {
  it("renders Child2 without crashing and fetches", async () => {
    render(<Child />);

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  it("supports an overridden handler", async () => {
    console.log("setting up overriden and handlers");
    server.use(
      rest.post("http://localhost:8080/api/getChildList", (req, res, ctx) => {
        return res.once(
          ctx.set("access-control-allow-origin", "*"),
          ctx.json(mockedResult)
        );
      })
    );

    server.printHandlers();
    console.log("rendering overriden");

    render(<Child />);

    await waitFor(() => {
      console.log("waiting overriden");
      expect(screen.getByTestId("fetched").textContent).toBe("true");
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockedResult)
      );
    });
  });

  it("renders with a reset handler after being overridden", async () => {
    console.log("setting up reset");

    server.printHandlers();

    render(<Child />);

    console.log("rendering reset");
    await waitFor(() => {
      console.log("waiting reset");
      expect(screen.getByTestId("fetched").textContent).toBe("true");
      expect(screen.getByTestId("result").textContent).not.toEqual(
        JSON.stringify(mockedResult)
      );
    });
  });
});
