/*
__Seed builder__v1.0
*/

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ScoreActions from 'actions/stats/scores';
import PlayerActions from 'actions/players';
import MatchActions from 'actions/stats/matches';
import FileActions from 'actions/helpers/files';

import ScoreForm from 'components/stats/scores/Form';

const scores = new ScoreActions();
const players = new PlayerActions();
const matches = new MatchActions();
const files = new FileActions();

const stateToProps = (state, props) => ({
  scores: state.scores.dataset,
  players: state.players.dataset,
  matches: state.matches.dataset,
});

const dispToProps = disp => ({
  getScoreDetails: (scoreId, callback) =>
    disp(scores.getScoreDetails(scoreId, callback)),
  getScoreList: (filters, callback) =>
    disp(scores.getScoreList(filters, callback)),
  getPlayerList: (filters, callback) =>
    disp(players.getPlayerList(filters, callback)),
  getMatchList: (filters, callback) =>
    disp(matches.getMatchList(filters, callback)),
  saveScore: (score, callback) =>
    disp(scores.saveScore(score, callback)),
  setScore: (scoreId, score, callback) =>
    disp(scores.setScore(scoreId, score, callback)),
  deleteScore: (scoreId, callback) =>
    disp(scores.deleteScore(scoreId, callback)),
  uploadFile: (formWrapper, callback) =>
    disp(files.uploadFile(formWrapper, callback)),
});

export default withRouter(connect(
  stateToProps,
  dispToProps
)(ScoreForm));
