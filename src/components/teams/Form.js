/*
__Seed builder__v1.0
*/

import * as React from 'react';
import cx from 'classnames';

import { getDateInput } from 'seed/util/FormatUtil';
import Loading from 'components/helpers/Loading';

import Component from 'components/teams/Form.link';

import styles from 'resources/css/teams/Form.module.css';

class TeamForm extends Component
{
  render()
  {
    const { team = {} } = this.state;
    const { teams = [] } = this.props;
    const { filters } = this.state;
    const teamId = this.getTeamId();
    if (team.id == null && teamId != null) return <Loading />;
    
    return (
    <div className={styles.module}>
      <div className={styles.header}>
        Team
      </div>

      <div className={styles.form}>
        <form  onSubmit={this.onSubmit}>

          {/* Suggested divs */}
          <label className={cx(styles.lbl, styles.nameLbl)}>Name</label><br/>
          <input type="text" name="name" className={cx(styles.txt, styles.nameTxt)} value={team.name} onChange={this.onNameChange}></input>
          <br/>
          <label className={cx(styles.lbl, styles.logoLbl)}>Logo</label><br/>
          <input name="logo" type="hidden" value={team.logo ? team.logo.id : null}/>
          <form encType="multipart/form-data">
            <input name="file" type="file" className={cx(styles.fil, styles.logoFil)} accept="image/*" onChange={this.onLogoChange}></input>
          </form>
          {team.logo ?
            <img src={team.logo.url} className={cx(styles.img, styles.logoImg)} /> : null }
          <label className={cx(styles.lbl, styles.descriptionLbl)}>Description</label><br/>
          <textarea name="description" type="text" rows="3" className={cx(styles.txa, styles.descriptionTxa)} value={team.description} onChange={this.onDescriptionChange}></textarea>
          <br/>
          <label className={cx(styles.lbl, styles.marketValueLbl)}>Market value</label><br/>
          <input type="number" name="marketValue" className={cx(styles.txt, styles.marketValueTxt)} value={team.market_value} onChange={this.onMarketValueChange} required></input>
          <br/>
          {filters.rival_id == null ?
              <div>
              <label className={cx(styles.lbl, styles.rivalLbl)}>Rival</label>
              <select name="rival" className={cx(styles.ops, styles.rivalOps)} value={team.rival_id} onChange={this.onRivalChange}>
              { teams.map(e => <option value={e.id}>{e.id}</option>) }
              </select>
              <br/>
              </div> : null}

          {this.renderError()}

          <button type="submit" className={styles.submit}>Send</button>

        </form>
      </div>
    </div>
    );
  }
}

export default TeamForm;
