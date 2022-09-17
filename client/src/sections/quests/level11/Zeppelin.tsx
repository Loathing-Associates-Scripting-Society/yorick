import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { AdviceTooltipIcon } from "../../../components/Tooltips";
import { atStep, Step, useQuestStep } from "../../../hooks/useQuest";
import ZeppelinMob from "./ZeppelinMob";
import ZeppelinShip from "./ZeppelinShip";

const getTooltip = (step: number) => {
  let tooltip;

  switch (step) {
    case 1:
      tooltip =
        "-combat, 567% item, sleaze dmg, sleaze spell dmg. Could adventure in the Copperhead Club first for Flamin' Whatshisnames";
      break;
    case 2:
      tooltip = "+234% item, banish Red Herring, banish Red Snapper";
      break;
  }

  return tooltip;
};

const Zeppelin = () => {
  const step = useQuestStep("questL11Ron");
  const tooltip = getTooltip(step);

  return (
    <QuestTile
      header="Zeppelin Quest"
      minLevel={11}
      imageUrl="/images/itemimages/scharm.gif"
      href="/place.php?whichplace=zeppelin"
      tooltip={
        tooltip && <AdviceTooltipIcon text={tooltip}></AdviceTooltipIcon>
      }
      hide={step === Step.FINISHED}
    >
      {atStep(step, [
        [1, ZeppelinMob],
        [2, ZeppelinShip],
        [4, () => <Line>Defeat Ron in the zeppelin.</Line>],
      ])}
    </QuestTile>
  );
};

export default Zeppelin;
