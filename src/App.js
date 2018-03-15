import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import DropApp from './client';

const App = () => (
  <Router>
    <main>
      <section>
        <Route path="/:gameID/:playerID" component={DropApp} />
      </section>
    </main>
  </Router>
);

export default App;
