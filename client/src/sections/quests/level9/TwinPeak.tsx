import {
  numericModifier,
  availableAmount,
  itemDropModifier,
  initiativeModifier,
  familiarWeight,
  myFamiliar,
  familiarEquippedEquipment,
  myHash,
} from "kolmafia";
import { $item, get, have } from "libram";
import Chevrons from "../../../components/Chevrons";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { useQuestStep } from "../../../hooks/useQuest";
import { commaAnd, truthy } from "../../../util/text";

const TwinPeak = () => {
  const step = useQuestStep("questL09Topping");
  const res = numericModifier("stench resistance");
  const jars = availableAmount($item`jar of oil`);
  const init = initiativeModifier();
  const haveTrimmers = have($item`rusty hedge trimmers`);

  const progress = get("twinPeakProgress");
  const stenchDone = (progress & 1) > 0;
  const itemDone = (progress & 2) > 0;
  const jarDone = (progress & 4) > 0;
  const initDone = (progress & 8) > 0;

  const famWeight =
    familiarWeight(myFamiliar()) + numericModifier("familiar weight");
  const equipWeight = numericModifier(
    familiarEquippedEquipment(myFamiliar()),
    "familiar weight"
  );
  const famItemDrop = numericModifier(
    myFamiliar(),
    "item drop",
    famWeight - equipWeight,
    familiarEquippedEquipment(myFamiliar())
  );
  const nonFamItemDrop =
    itemDropModifier() - famItemDrop + numericModifier("food drop");

  const myArr: number[] = [stenchDone, itemDone, jarDone, initDone].map(
    (done) => (done ? 1 : 0)
  );
  return (
    <QuestTile
      header="Twin Peak"
      minLevel={9}
      hide={step !== 1}
      href="/place.php?whichplace=highlands"
      imageUrl="/images/adventureimages/mansion.gif"
    >
      <Line>
        <i>-combat, +item, olfact topiary animal</i>
      </Line>
      <Line>
        <Chevrons
          usesLeft={myArr.reduce((prev, cur) => prev + cur, 0)}
          totalUses={4}
        />
        {commaAnd(
          truthy([
            !stenchDone && `${res}/4 stench res`,
            !itemDone && `${nonFamItemDrop.toFixed(0)}/50 non-fam +item/food`,
            !jarDone && `${jars}/1 jar of oil`,
            !initDone && `${init}/40 +init`,
          ])
        )}
      </Line>
      {haveTrimmers && (
        <Line href={`/inv_use.php?pwd=${myHash()}&which=3&whichitem=5115`}>
          Use hedge trimmers
        </Line>
      )}
    </QuestTile>
  );
};

export default TwinPeak;
