import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Child from "../Child";

describe("Child2 tests", () => {
  it("renders Child2 without crashing", async () => {
    const { debug } = render(<Child />);

    console.log(debug());

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
    });
  });
});
