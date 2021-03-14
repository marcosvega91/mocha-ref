import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import Child from "../Child";
import mswServer from "../../test/setupServer";

const mockedResult = {
  msgCode: 0,
  msgDesc: "CHILD3: Request processed successfully",
  data: {
    data: {
      createdBy: "CHILD3: CJ Child",
      createdDate: "02/18/2021",
    },
  },
};


describe("Child3 tests", () => {
  it("renders an overriden handler", async () => {
    mswServer.use(
      rest.post("http://localhost:8080/api/getChildList", (req, res, ctx) => {
        return res.once(
          ctx.set("access-control-allow-origin", "*"),
          ctx.json(mockedResult)
        );
      })
    );

    render(<Child />);

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockedResult)
      );
    });
  });

  it("renders with a reset handler after being overridden", async () => {
    render(<Child />);

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
      expect(screen.getByTestId("result").textContent).not.toEqual(
        JSON.stringify(mockedResult)
      );
    });
  });
});
