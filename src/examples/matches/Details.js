import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/matches/Details.module.css";

const MATCH  = `
{
  match {
    date
    type
    local { }
    visitor { }
    scores { }
  }
}
`;

function MatchDetails(props)
{
  const { match_id }  = props.match.params;

  const qMatch = useDetail(MATCH, match_id);

  if (qMatch.loading) return <Loading />;
  if (qMatch.error) return "Error";

  const { match = {} } = qMatch.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Date</label><br/>
      <label className={styles.txt}>{match.date.toString()}</label>
      <br/>
      <label className={styles.lbl}>Type</label><br/>
      <label className={styles.txt}>{match.type.toString()}</label>
      <br/>
    </div>
  );
}

export default MatchDetails;
