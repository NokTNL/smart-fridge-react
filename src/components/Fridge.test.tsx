import { customRender } from "../test/mocks/customRender";
import { Fridge } from "./Fridge";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { appSlice, getAppInitialState } from "../redux/appSlice";

describe("Fridge interface - Unit Tests", () => {
  test(`'Open fridge door' button opens the fridge`, async () => {
    const user = userEvent.setup();
    const { store } = customRender(<Fridge />);

    expect(store.getState().app.isDoorOpen).toBe(false);

    await user.click(screen.getByRole("button", { name: /Open fridge door/i }));
    expect(store.getState().app.isDoorOpen).toBe(true);
  });
  test(`'Close fridge door' button closes the fridge`, async () => {
    const user = userEvent.setup();
    const { store } = customRender(<Fridge />);

    await user.click(screen.getByRole("button", { name: /Open fridge door/i }));
    expect(store.getState().app.isDoorOpen).toBe(true);
    await user.click(
      screen.getByRole("button", { name: /Close fridge door/i })
    );
    expect(store.getState().app.isDoorOpen).toBe(false);
  });
  test(`Fridge shows door status`, async () => {
    const { store } = customRender(<Fridge />, {
      preloadedState: {
        app: {
          ...getAppInitialState(),
          isDoorOpen: false,
        },
      },
    });
    expect(screen.getByText(/Door closed/i)).toBeInTheDocument();

    store.dispatch(appSlice.actions.setDoorState(true));
    expect(screen.getByText(/Door opened/i)).toBeInTheDocument();
  });

  // Render test
});
