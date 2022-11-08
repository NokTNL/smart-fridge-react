import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { rootReducer, RootState } from "../../redux/store";

const createmockReduxStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const customRender = (
  Component: React.ReactElement,
  options?: { preloadedState?: RootState }
) => {
  const store = createmockReduxStore(options?.preloadedState);
  render(<ReduxProvider store={store}>{Component}</ReduxProvider>);
  // expose the mocked Redux store
  return { store };
};
