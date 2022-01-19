import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { Text } from "@chakra-ui/react";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";
import useCall from "../../hooks/useCall";
import useEval from "../../hooks/useEval";

/**
 * Summarizes # of glove charges remaining, gives pixel status
 * @returns A tile describing the Powerful Glove
 */

const PowerfulGlove = () => {
  const batteryUsed = useGet("_powerfulGloveBatteryPowerUsed");
  const numReds = useCall.availableAmount($item`red pixel`) ?? 0;
  const numBlues = useCall.availableAmount($item`blue pixel`) ?? 0;
  const numGreens = useCall.availableAmount($item`green pixel`) ?? 0;
  const numWhites = useCall.availableAmount($item`white pixel`) ?? 0;
  const numDigitalKey = useCall.availableAmount($item`digital key`) ?? 0;

  // Remove tile if the user does not have a glove.
  if (!useHave($item`Powerful Glove`)) {
    return <></>;
  }

  // How many whites you'd have if you converted all RBG pixels
  const possibleWhites = Math.min(numReds, numBlues, numGreens) + numWhites;

  return (
    <Tile header="Powerful Glove" imageUrl="/images/itemimages/Pglove.gif">
      {batteryUsed < 100 && (
        <Line>{100 - batteryUsed}% charge remaining today.</Line>
      )}
      {batteryUsed < 95 && (
        <Line>
          <Text as="span" color="gray.500">
            {Math.floor((100 - batteryUsed) / 10)} shots of replace monster.
          </Text>
        </Line>
      )}

      {possibleWhites < 30 && (
        <Line>
          Pixels:{" "}
          <Text as="span" color="red.500">
            {numReds}R,{" "}
          </Text>
          <Text as="span" color="Blue.500">
            {numBlues}B,{" "}
          </Text>
          <Text as="span" color="Green.500">
            {numGreens}G
          </Text>
        </Line>
      )}
      {possibleWhites < 30 && (
        <Line>
          Overall, {plural(numWhites, "white")} ({possibleWhites} if you convert
          RBG.)
        </Line>
      )}
      {possibleWhites > 30 && numDigitalKey < 1 && (
        <Line href="/place.php?whichplace=forestvillage&action=fv_mystic">
          You have enough white pixels! Go make a key.
        </Line>
      )}
    </Tile>
  );
};

export default PowerfulGlove;
