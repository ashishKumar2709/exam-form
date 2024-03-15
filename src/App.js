import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import AddShowData from "./components/AddShowData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <AddShowData />
    </Provider>
  );
}

export default App;
