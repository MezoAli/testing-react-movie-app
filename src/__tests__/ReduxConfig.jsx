import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export const renderWithRedux = (
  component,
  { initialState, store = configureStore({ reducer: {} }) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};
