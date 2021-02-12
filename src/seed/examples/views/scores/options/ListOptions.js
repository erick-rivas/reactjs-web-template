import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import css from "resources/css/seed/examples/scores/options/ListOptions.module.css";

const ScoreListOptions = (props) => 
  <div class={css.module}>
    <div class={css.options}>
      <Link to={`${props.url}/new`}
        class={cx(css.btn, css.create)}>Create</Link>
    </div>
  </div>;

export default ScoreListOptions;