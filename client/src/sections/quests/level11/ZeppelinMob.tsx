import { numericModifier } from "kolmafia";
import { $effect, $item, get, have } from "libram";
import Line from "../../../components/Line";

const Zeppelin = () => {
  const sleazeProtestorsCleared = Math.max(
    3,
    Math.sqrt(
      numericModifier("sleaze damage") + numericModifier("sleaze spell damage")
    )
  );

  return (
    <>
      {have($item`lynyrd musk`) && !have($effect`Musky`) && (
        <Line color={"red"} href="/inventory.php?ftext=lynyrd+musk">
          Use lynyrd musk
        </Line>
      )}
      {have($item`lynyrd snare`) && (
        <Line href="/inventory.php?ftext=lynyrd+snare">
          Possibly use lynyrd snare. (free combat)
        </Line>
      )}
      {get("zeppelinProtestors") === 80 ? (
        <Line>Adventure in the mob of protestors.</Line>
      ) : (
        <>
          <Line>{80 - get("zeppelinProtestors")} protestors left.</Line>
          <Line>
            Sleaze damage will clear {sleazeProtestorsCleared.toFixed(1)}{" "}
            protestors.
          </Line>
        </>
      )}
    </>
  );
};

export default Zeppelin;
