/*
__Seed builder__v1.0
  (Read_only) Modify via SeedManifest.yaml
*/

import Action from 'actions/helpers/action';

class _Matches extends Action
{
  constructor()
  {
    super(
      `MATCHES`,
      `matches`,
      state => state.matches
    )
  }

  getMatchList = (params = {}, callback) =>
  {
    return this.getList(params, callback);
  }

  getMatchDetails = (matchId, callback) =>
  {
    return this.getDetails(matchId, callback);
  }

  saveMatch = (match, callback) =>
  {
    return this.saveData(match, callback);
  }

  setMatch = (matchId, match, callback) =>
  {
    return this.setData(matchId, match, callback);
  }

  deleteMatch = (matchId, callback) =>
  {
    return this.deleteData(matchId, callback);
  }
}

export default _Matches;