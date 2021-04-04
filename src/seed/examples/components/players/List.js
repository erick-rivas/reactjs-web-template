import React, { useState } from "react";
import { usePagination } from "seed/gql";
import Loading from "seed/helpers/Loading";
import View from "seed/examples/views/players/List";

function PlayerList() {
  const pageSize = 15;
  const [pageNum, setPageNum] = useState(1);
  const reqPlayers = usePagination(`
  {
    playerPagination {
      totalPages
      players {
        name
        isActive
        createdAt
        photo { }
        team { }
        position { }
      }
    }
  }`, pageNum, pageSize);

  if (reqPlayers.loading) return <Loading />;
  if (reqPlayers.error) return "Error";
  const { players = [], totalPages = 0 } = reqPlayers.data.playerPagination;

  const onClickPage = (pageNum) =>
    setPageNum(pageNum);

  return <View
    players={players}
    pageNum={pageNum}
    totalPages={totalPages}
    onClickPage={onClickPage}
  />;
}

PlayerList.propTypes = {};

export default PlayerList;