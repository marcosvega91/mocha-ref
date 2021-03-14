import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Child from "../Child";


describe("Child tests", () => {
  it("renders Child without crashing", async () => {
    render(<Child />);

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
    });
  });
});
