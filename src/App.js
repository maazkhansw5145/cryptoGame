import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Crash from "./pages/Crash";
import Dice from "./pages/Dice";

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
          <Header />
            <Routes>
              <Route exact element={<Dice />} path="/" />
              <Route exact element={<Crash />} path="/crash" />
            </Routes>
          </Router>
        </PersistGate>
        <ToastContainer toastStyle={{ backgroundColor: "rgb(255, 213, 0)" }} />
      </Provider>
    </div>
  );
}

export default App;
