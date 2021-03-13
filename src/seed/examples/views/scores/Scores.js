import React from "react";
import cx from "classnames";
import { Router, Route } from "react-router-dom";
import ScoreDetails from "seed/examples/components/scores/Details";
import ScoreList from "seed/examples/components/scores/List";
import ScoreForm from "seed/examples/components/scores/Form";
import Modal from "seed/components/Modal";
import css from "resources/css/seed/examples/scores/Scores.module.css";

const Details = (props) =>
  <div class={css.details}>
    <div class={css.card}>
      <ScoreDetails {...props} />
    </div>
  </div>;

const Form = (props) =>
  <Modal {...props}>
    <ScoreForm {...props} />
  </Modal>;

const Scores = (props) =>
  <Router basename="/scores">
    <div class={css.module}>
      <div class={css.container}>
        <div class={css.list}>
          <ScoreList />
        </div>
        <Route
          path={`/:score_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`/:any/new`,`$/new`, `/:score_id(\\d+)/edit`] }
        component={Form} />
    </div>
  </Router>;

export default Scores;