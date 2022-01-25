import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ReactFlowProvider } from "react-flow-renderer";

import { FilterContextProvider } from './components/FilterContext';
import Main from './components/Main';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const App = () => {
  
  return (
    <ReactFlowProvider>
      <FilterContextProvider>
        <Main />
      </FilterContextProvider>
    </ReactFlowProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
