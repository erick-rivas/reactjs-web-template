import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ToyActions from 'actions/_toys'

import Add from 'components/_toy/_Add'


const toys = new ToyActions();

const stateToProps = state => ({
  pets: state.pets.dataSet,
  didSave: state.toys.didSave,
});

const dispToProps = disp => ({
  saveToy: (name, petId) =>
    disp(toys.saveToy(name, petId)),
  ackSave: () =>
    disp(toys.ackSave())
});

export default withRouter(connect(
  stateToProps,
  dispToProps
)(Add));
