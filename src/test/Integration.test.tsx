import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { customRender } from "./mocks/customRender";

describe("Acceptance tests", () => {
  test("Happy path", async () => {
    const user = userEvent.setup();
    customRender(<App />);

    // Select current date screen
    await user.type(
      screen.getByRole("textbox", { name: /Select current date/i }),
      "2021-10-20"
    );
    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );

    // Add/Remove Items, day passes
    await user.click(screen.getByRole("button", { name: /Open fridge door/i }));
    await user.click(screen.getByRole("button", { name: /Add new item/i }));
    // Something like a modal can appear
    await user.type(
      screen.getByRole("textbox", { name: /Item name/i }),
      "Milk"
    );
    await user.type(
      screen.getByRole("textbox", { name: /Expiry Date/i }),
      "2021-10-21"
    );
    await user.type(
      screen.getByRole("radio", { name: /condition/i }),
      "sealed"
    );
    await user.click(screen.getByRole("button", { name: /$Add item^/i }));
    //   fridge.scanAddedItem({
    //     name: "Milk",
    //     expiry: "2021-10-21",
    //     condition: "sealed",
    //   });
    //   fridge.scanAddedItem({
    //     name: "Cheese",
    //     expiry: "2021-11-18",
    //     condition: "sealed",
    //   });
    //   fridge.scanAddedItem({
    //     name: "Beef",
    //     expiry: "2021-10-20",
    //     condition: "sealed",
    //   });
    //   fridge.scanAddedItem({
    //     name: "Lettuce",
    //     expiry: "2021-10-22",
    //     condition: "sealed",
    //   });
    //   fridge.signalFridgeDoorClosed();

    //   fridge.simulateDayOver();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.signalFridgeDoorClosed();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.signalFridgeDoorClosed();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.scanRemovedItem({ name: "Milk" });
    //   fridge.signalFridgeDoorClosed();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.scanAddedItem({
    //     name: "Milk",
    //     expiry: "2021-10-26",
    //     condition: "opened",
    //   });
    //   fridge.scanAddedItem({
    //     name: "Peppers",
    //     expiry: "2021-10-23",
    //     condition: "opened",
    //   });
    //   fridge.signalFridgeDoorClosed();

    //   fridge.simulateDayOver();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.scanRemovedItem({ name: "Beef" });
    //   fridge.scanRemovedItem({ name: "Lettuce" });
    //   fridge.signalFridgeDoorClosed();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.scanAddedItem({
    //     name: "Lettuce",
    //     expiry: "2021-10-22",
    //     condition: "opened",
    //   });
    //   fridge.signalFridgeDoorClosed();

    //   fridge.signalFridgeDoorOpened();
    //   fridge.signalFridgeDoorClosed();

    //   fridge.simulateDayOver();

    //   // Output:
    //   const displayText = fridge.showDisplay();
    //   expect(displayText).toEqual(
    //     /* 🤯 Original:
    //       [
    //         "EXPIRED: Milk",
    //         "Lettuce: 0 days remaining",
    //         "Peppers: 1 day remaining",
    //         "Cheese: 31 days remaining",
    //       ].join("\n") */
    //     [
    //       "EXPIRED: Peppers",
    //       "EXPIRED: Lettuce",
    //       "Cheese: 25 days remaining",
    //       "Milk: 2 days remaining",
    //     ].join("\n")
    //   );
  });

  test("Current Date Picker should appear initially", () => {
    customRender(<App />);
    expect(screen.getByTestId("current-date-picker")).toBeInTheDocument();
  });

  test("Fridge interface should not appear without setting a current date", () => {
    customRender(<App />);
    expect(screen.queryByTestId("fridge")).not.toBeInTheDocument();
  });
  test("Fridge interface should appear when a current date is set", async () => {
    const user = userEvent.setup();
    customRender(<App />);

    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );
    expect(screen.getByTestId("fridge")).toBeInTheDocument();
  });
  test("Current Date Picker should disappear when a current date is set", async () => {
    const user = userEvent.setup();
    customRender(<App />);

    expect(screen.getByTestId("current-date-picker")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );
    expect(screen.queryByTestId("current-date-picker")).not.toBeInTheDocument();
  });
});
