import React, { Fragment } from "react";
import "./App.css";
import { Counter } from "./Counter";
import { EventList } from "./Event";
import { Header } from "./Header";
import logo from "./logo.svg";

const App: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Counter />
      <EventList events={[]} />
    </Fragment>
  );
};

export default App;
