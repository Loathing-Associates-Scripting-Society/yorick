import { myMeat, hiddenTempleUnlocked } from "kolmafia";
import { $item, have } from "libram";
import React from "react";
import { Text } from "@chakra-ui/react";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

const Level11SpookyTemple: React.FC = () => {
  return (
    <QuestTile
      header="Spooky Temple Map Quest"
      imageUrl="/images/itemimages/map.gif"
      href="/woods.php"
      hide={hiddenTempleUnlocked()}
    >
      {!have($item`tree-holed coin`) && !have($item`Spooky Temple map`) && (
        <Line>
          Explore the stream -{">"} Squeeze into the cave to obtain the
          tree-holed coin.
        </Line>
      )}
      {have($item`tree-holed coin`) && (
        <Line>
          Brave the dark thicket -{">"} Follow the coin -{">"} Insert coin to
          continue to obtain the Spooky Temple map.
        </Line>
      )}
      {!have($item`Spooky-Gro fertilizer`) && (
        <Line>
          Brave the dark thicket -{">"} Investigate the dense foliage to obtain
          Spooky-Gro fertilizer.
        </Line>
      )}
      {!have($item`spooky sapling`) && (
        <Line>
          Follow the old road -{">"} Talk to the hunter -{">"} Buy a tree for
          100 Meat to obtain the spooky sapling.{" "}
          <Text as="span" color="red.500" fontWeight="bold">
            {myMeat() < 100 ? "You need 100 meat!" : ""}
          </Text>
        </Line>
      )}
      {have($item`Spooky Temple map`) &&
        have($item`Spooky-Gro fertilizer`) &&
        have($item`spooky sapling`) && <Line>Use your Spooky Temple map!</Line>}
      {(!have($item`Spooky Temple map`) ||
        !have($item`Spooky-Gro fertilizer`) ||
        !have($item`spooky sapling`)) && (
        <Line>Maximize -combat to speed things up.</Line>
      )}
    </QuestTile>
  );
};

export default Level11SpookyTemple;
