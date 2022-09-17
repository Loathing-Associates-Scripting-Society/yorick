import { $item, get, have } from "libram";
import Line from "../../../components/Line";

const ZeppelinShip = () => {
  return (
    <>
      {!have($item`Red Zeppelin ticket`) && (
        <Line href="/shop.php?whichshop=blackmarket">
          Purchase a red zeppelin ticket in the black market.
        </Line>
      )}
      {have($item`glark cable`) && (
        <Line color={"red"}>Use glark cable in combat.</Line>
      )}
      <Line>Search for Ron in the Zeppelin</Line>
      <Line>{get("_glarkCableUses")}/5 glark cables used. (free kills)</Line>
    </>
  );
};

export default ZeppelinShip;
