import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

describe("App tests", () => {
  it("renders App without crashing", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("fetched").textContent).toBe("true");
    });
  });
});
