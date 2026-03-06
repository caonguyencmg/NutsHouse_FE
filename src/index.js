import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { GlobalStyles } from "./styles/GlobalStyles";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./reducers/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles></GlobalStyles>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

reportWebVitals();
