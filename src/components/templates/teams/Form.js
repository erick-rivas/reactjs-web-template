/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as Util from 'seed/util';
import redux from 'seed/redux';
import cx from 'classnames';
import { Formik, Field } from 'formik';

import MultiField from 'seed/components/helpers/MultiField'
import FileField from 'seed/components/helpers/FileField'
import Loading from 'seed/components/helpers/Loading';

import styles from 'resources/css/templates/teams/Form.module.css';

class TeamForm extends React.Component
{
  render()
  {
    const teamId = this.getTeamId();
    const team = Util.get(this.props.teams, teamId);
    const teams = Util.filter(this.props.teams, {})

    if (team.id == null && teamId != null) return <Loading />;
    
    return (
      <div className={styles.module}>

        <div className={styles.header}>Team</div>

        <div className={styles.form}>
          <Formik
            initialValues={team}
            onSubmit={this.onSubmit}>
          {({
            values, errors, setFieldValue, handleSubmit
          }) => (

          <form onSubmit={handleSubmit}>
            {/* name */}
            <label className={cx(styles.lbl, styles.nameLbl)}>Name</label><br/>
            <Field type="text" name="name" className={cx(styles.txt, styles.nameTxt)} />
            <br/>
            {/* logo */}
            <label className={cx(styles.lbl, styles.logoLbl)}>Logo</label><br/>
            <FileField name="logo" className={cx(styles.fil, styles.logoFil)} accept="image/*" setFieldValue={setFieldValue}/>
            { values.logo ?
              <img src={values.logo.url} className={cx(styles.img, styles.logoImg)} /> : null }
            {/* description */}
            <label className={cx(styles.lbl, styles.descriptionLbl)}>Description</label><br/>
            <Field component="textarea" name="description" type="text" rows="3" className={cx(styles.txa, styles.descriptionTxa)} />
            <br/>
            {/* market_value */}
            <label className={cx(styles.lbl, styles.marketValueLbl)}>Market value</label><br/>
            <Field type="number" name="market_value" className={cx(styles.txt, styles.marketValueTxt)} />
            <br/>
            {/* rival */}
            <div>
            <label className={cx(styles.lbl, styles.rivalLbl)}>Rival</label>
            <Field component="select" name="rival_id" className={cx(styles.ops, styles.rivalOps)} >
              <option value="">Select an option</option>
              { teams.map((e, idx) => <option value={e.id}>{e.id}</option>) }
            </Field>
            <br/>
            </div>
            {this.renderError()}
            <button type="submit" className={styles.submit}>Send</button>
          </form>
          )}
          </Formik>
        </div>
      </div>
    );
  }

  renderError()
  {
    const { error } = this.state;
    return (error ? <div className={styles.error}>{error}</div> : null);
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount()
  {
    const teamId = this.getTeamId();
    if (teamId != null) 
      this.loadData();
    this.loadFkData();
  }

  /* Events */

  onSubmit(values, { setSubmitting })
  {
    const onSave = res =>
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    const teamId = this.getTeamId();
    if (teamId == null) this.props.saveTeam(values, onSave)
    else this.props.setTeam(teamId, values, onSave);
  }

  onSave(res)
  {
    //Suggested method
    this.props.onClose();
  }

  onError(error)
  {
    //Suggested method
    this.setState({
      error: 'An error has occurred, try again'
    });
  }

  /* Actions */

  loadData()
  {
    const teamId = this.getTeamId();
    this.props.getTeamDetails(teamId);
  }

  loadFkData() 
  {
    this.props.getTeamList({});
  }

  /* Args */

  getTeamId() 
  {
    return this.props.teamId ?
      this.props.teamId :
      this.props.match.params.team_id;
  }
}

export default redux(TeamForm);
