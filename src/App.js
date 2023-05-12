import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducers from './reduxHelper/reducers';
import CardDetailPage from "./pages/CardDetailPage";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk, logger))}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type/:id" element={<CardDetailPage />} />
        <Route path="/:type" element={<CardPage />} />
        <Route path="/Error:404" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
