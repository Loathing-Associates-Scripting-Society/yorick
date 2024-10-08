import { ListIcon, ListItem, UnorderedList } from "@chakra-ui/react";
import { combatRateModifier, myHash } from "kolmafia";
import { $location, $skill, have, questStep } from "libram";

import Chevrons from "../../components/Chevrons";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";

const Level6: React.FC = () => {
  const step = questStep("questL06Friar");
  const hash = myHash();
  const ncRate =
    (100 - /* $location`The Dark Neck of the Woods`.combatPercent ??*/ 95) /
    100; // combatPercent proxy field doesn't seem to be working.
  const hasCartography = have($skill`Comprehensive Cartography`);
  const combatModifier = combatRateModifier() ?? 0;

  const friarQueues = {
    "Dark Neck:": ($location`The Dark Neck of the Woods`.noncombatQueue ?? "")
      .split(";")
      .filter(Boolean),
    "Dark Heart:": ($location`The Dark Heart of the Woods`.noncombatQueue ?? "")
      .split(";")
      .filter(Boolean),
    "Dark Elbow:": ($location`The Dark Elbow of the Woods`.noncombatQueue ?? "")
      .split(";")
      .filter(Boolean),
  };

  const listItems = Object.entries(friarQueues).map(([zoneName, zoneQueue]) => {
    return (
      <ListItem key={zoneName} pl="1">
        <ListIcon
          as={Chevrons}
          usesLeft={
            zoneName === "Dark Neck:" && hasCartography
              ? Math.max(zoneQueue.length - 1, 1)
              : zoneQueue.length
          }
          totalUses={4}
        />
        <b>{zoneName} </b>
        {hasCartography
          ? zoneName === "Dark Neck:"
            ? `${zoneQueue.length + 1}/4 NCs (~${Math.min(
                (3 - zoneQueue.length) / ncRate,
                (3 - zoneQueue.length) * 5,
              )} turns remaining)`
            : `${zoneQueue.length}/4 NCs (~${Math.min(
                (4 - zoneQueue.length) / ncRate,
                (4 - zoneQueue.length) * 5,
              )} turns remaining)`
          : `${zoneQueue.length}/4 NCs (~${Math.min(
              (4 - zoneQueue.length) / ncRate,
              (4 - zoneQueue.length) * 5,
            )} turns remaining)`}
      </ListItem>
    );
  });

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Deep Fat Friars"
      imageUrl="/images/itemimages/dodecagram.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, `/friars.php?action=friars&pwd=${hash}`], // I don't know why this requires a hash, but it does.
        [1, "/friars.php?"],
        [2, `/friars.php?action=ritual&pwd=${hash}`],
        [Step.FINISHED, undefined],
      ])}
      minLevel={6}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED && 1,
          <>
            {combatModifier > -25 && (
              <Line fontWeight="bold" color="red.500">
                Your -combat% is less than 25%, you want more!
              </Line>
            )}
            <UnorderedList>{listItems}</UnorderedList>
          </>,
        ],
        [2, <Line>Conduct the ritual to finish the quest.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level6;
