import { myLevel } from "kolmafia";
import { $item, get, have } from "libram";
import Line from "../../components/Line";
import Tile from "../../components/Tile";

const umbrellaMode = get("umbrellaState");

const UnbreakableUmbrella = () => {
  return (
    <Tile
      header="Unbreakable Umbrella"
      imageUrl="/images/itemimages/unbrella2.gif"
      linkedContent={$item`unbreakable umbrella`}
      linkHide={!have($item`unbreakable umbrella`)}
    >
      <Line>Current Mode: {umbrellaMode}</Line>
      {myLevel() < 13 && umbrellaMode !== "broken" && (
        <Line>Splaying it will increase ML by 25%</Line>
      )}
      {umbrellaMode !== "bucket style" && (
        <Line>Inverting it will increase item% by 25</Line>
      )}
      {umbrellaMode !== "cocoon" && (
        <Line>Closing yourself inside will increase -combat% by 10</Line>
      )}
    </Tile>
  );
};

export default UnbreakableUmbrella;
