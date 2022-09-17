import { $familiar, $item, get, have } from "libram";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { atStep, Step, useQuestStep } from "../../../hooks/useQuest";
import {
  combatRateModifier,
  haveEquipped,
  myFamiliar,
  npcPrice,
} from "../../../kolmafia/functions";

const BlackForest = () => {
  const step = useQuestStep("questL11Black");
  const forestProgress = get("blackForestProgress");
  return (
    <QuestTile
      header={
        have($item`forged identification documents`)
          ? "Vacation at the Shore"
          : "Find the Black Market"
      }
      imageUrl={
        have($item`forged identification documents`)
          ? "/images/itemimages/book2.gif"
          : "/images/itemimages/documents.gif"
      }
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/woods.php"],
        [
          2,
          have($item`forged identification documents`)
            ? "/adventure.php?snarfblat=355"
            : "/shop.php?whichshop=blackmarket",
        ],
        [3, "/adventure.php?snarfblat=355"],
      ])}
      minLevel={11}
      hide={step === Step.FINISHED}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <>
            {have($familiar`Reassembled Blackbird`) &&
              !have($item`reassembled blackbird`) &&
              myFamiliar() !== $familiar`Reassembled Blackbird` && (
                <Line fontWeight="bold" color="red.500">
                  Take your Reassembled Blackbird while exploring the Black
                  Forest.
                </Line>
              )}
            {have($item`reassembled blackbird`) &&
              myFamiliar() === $familiar`Reassembled Blackbird` && (
                <Line>Change familiars.</Line>
              )}
            {have($item`blackberry galoshes`) &&
              !haveEquipped($item`blackberry galoshes`) && (
                <Line fontWeight="bold" color="red.500">
                  Equip your blackberry galoshes while exploring the Black
                  Forest.
                </Line>
              )}
            {!have($item`blackberry galoshes`) && (
              <Line>
                Bring 3 blackberries to the cobbler for blackberry galoshes.
              </Line>
            )}
            {combatRateModifier() < 5 && (
              <Line>Ensure you have +5% combat while in the Black Forest.</Line>
            )}
            <Line>Black Forest exploration: ~{forestProgress * 20}%.</Line>
          </>,
        ],
        [
          2,
          have($item`forged identification documents`) ? (
            <Line>Take a trip at The Shore, Inc.</Line>
          ) : (
            <>
              <Line>
                Buy the forged identification documents for{" "}
                {npcPrice($item`forged identification documents`)} meat.
              </Line>
              <Line>
                Consider buying a can of black paint for desert exploration.
              </Line>
            </>
          ),
        ],
        [3, <Line>Take a trip at The Shore, Inc.</Line>],
      ])}
    </QuestTile>
  );
};

export default BlackForest;
