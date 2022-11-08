import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrentDatePicker } from "./CurrentDatePicker";
import { customRender } from "../test/mocks/customRender";

describe("CurrentDatePicker - Unit Tests", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });
  test(`renders the date picker and confirm button`, () => {
    customRender(<CurrentDatePicker />);
    expect(
      screen.getByRole("textbox", { name: /Select current date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Confirm current date/i })
    ).toBeInTheDocument();
  });
  test(`date picker renders current date by default initially`, () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2000-01-01"));

    customRender(<CurrentDatePicker />);
    expect(
      screen.getByRole("textbox", { name: /Select current date/i })
    ).toHaveValue("01/01/2000");
  });
  test(`Date picker value changes on selection`, async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2000-01-01"));

    const user = userEvent.setup({ delay: null }); // `delay: null` needed when fake timer is activated & using user-event: https://github.com/testing-library/user-event/issues/833
    customRender(<CurrentDatePicker />);

    await user.click(
      screen.getByRole("textbox", { name: /Select current date/i })
    );
    await user.click(
      screen.getByRole("option", { name: "Choose Monday, January 31st, 2000" })
    ); // Chooses 2000-01-31
    expect(
      screen.getByRole("textbox", { name: /Select current date/i })
    ).toHaveValue("31/01/2000");
  });
  test(`confirm date button dispatch setting current date request`, async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2000-01-01"));

    const user = userEvent.setup({ delay: null }); // `delay: null` needed when fake timer is activated & using user-event: https://github.com/testing-library/user-event/issues/833
    const { store } = customRender(<CurrentDatePicker />);

    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );

    expect(store.getState().app.currentDate).toEqual(
      new Date("2000-01-01").getTime()
    );
  });
  test(`confirm date button does not set current date if date format is wrong`, async () => {
    const user = userEvent.setup();
    const { store } = customRender(<CurrentDatePicker />);

    // Assertion 1: empty value
    await user.clear(
      screen.getByRole("textbox", { name: /Select current date/i })
    );
    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );
    expect(store.getState().app.currentDate).toEqual(null);

    // Assertion 2: value that is not a valid date
    await user.type(
      screen.getByRole("textbox", { name: /Select current date/i }),
      "abcdefg"
    );
    await user.click(
      screen.getByRole("button", { name: /Confirm current date/i })
    );
    expect(store.getState().app.currentDate).toEqual(null);
  });
});
