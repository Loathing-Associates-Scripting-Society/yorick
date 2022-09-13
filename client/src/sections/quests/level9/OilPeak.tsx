import { equippedAmount, itemDropModifier, myPathId } from "kolmafia";

import { $item, get, have, Paths } from "libram";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { useQuestStep } from "../../../hooks/useQuest";
import {
  availableAmount,
  monsterLevelAdjustment,
} from "../../../kolmafia/functions";
import { commaList, truthy } from "../../../util/text";

const OilPeak = () => {
  const step = useQuestStep("questL09Topping");

  const ml = monsterLevelAdjustment();
  const pressure = get("oilPeakProgress");
  const needJar =
    availableAmount($item`jar of oil`) === 0 &&
    availableAmount($item`bubblin' crude`) < 12 &&
    get("twinPeakProgress", 0) < 4 &&
    myPathId() !== Paths.BeesHateYou.id;

  const title = ml < 100 ? "Wear dress pants." : "";

  let pressureReduction = 6.34;
  if (ml >= 100) {
    pressureReduction = 63.4;
  } else if (ml >= 50) {
    pressureReduction = 31.7;
  } else if (ml >= 20) {
    pressureReduction = 19.02;
  }
  if (equippedAmount($item`dress pants`) > 0) pressureReduction += 6.34;

  const dropRates = [100];
  ml >= 50 && dropRates.push(30);
  (ml >= 100 || (ml < 50 && ml >= 20)) && dropRates.push(10);
  const itemDropRate = (100 + itemDropModifier()) / 100;
  const crudePA = dropRates.reduce(
    (prev, cur) => prev + Math.min(1, (cur / 100) * itemDropRate),
    0
  );

  return (
    <QuestTile
      header="Oil Peak"
      imageUrl="/images/adventureimages/oilslick.gif"
      minLevel={9}
      hide={step !== 1}
      href="/place.php?whichplace=highlands"
      title={title}
    >
      <Line>
        <i>
          {commaList(
            truthy([
              "100ML",
              needJar && "+item",
              needJar &&
                have($item`Duskwalker syringe`) &&
                "use Duskwalker syringe in combat",
            ]),
            " "
          )}
        </i>
      </Line>
      <Line>
        {ml} ML of 20/50/100. {Math.ceil(pressure / pressureReduction)} turns
        left.
      </Line>
      {needJar && (
        <Line>
          +item for {} more bubbling' crude. ~{crudePA} crude/adv.
        </Line>
      )}
    </QuestTile>
  );
};

export default OilPeak;
