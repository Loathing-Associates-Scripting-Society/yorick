import React from "react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item, $skill, $familiar } from "../../util/makeValue";
import { plural } from "../../util/text";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";
import { useQuestStarted } from "../../hooks/useQuest";
import { useGetCampground, useHaveEquipped } from "../../hooks/useCall";

// Free fights remaining to implement:
//   - Snojo; need to determine access and figure out good way to present
//   - Check if you have a freebie in chateau?
//   - Remaining hipster fights, possibly? This one is weird...
//   - Protopack probably shouldn't be here, but maybe, if it's active?
//   - God Lobster
//   - Kramco (format suggestion "1/n Kramco fight (x%)" where n = # encountered and % is % likelihood of next turn kramco)
//   - BRICKO fight
//   - LOV Tunnel fights

const freeFights: [string, () => React.ReactNode][] = [
  [
    "NEP",
    () => {
      const nepToday = useGet("_neverendingPartyToday", false);
      const nepAlways = useGet("neverendingPartyAlways", false);
      const nepFreeTurns = useGet("_neverendingPartyFreeTurns");
      return (
        (nepToday || nepAlways) &&
        nepFreeTurns < 10 && (
          <Line href="/place.php?whichplace=town_wrong">
            {plural(10 - nepFreeTurns, "free NEP fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Piranha Plant",
    () => {
      const mushroomFights = useGet("_mushroomGardenFights", 0);
      const haveSpores = useHave($item`packet of mushroom spores`);
      const mushroomGarden = useCall.myGardenType() === "mushroom";
      const inPlumber =
        (useCall.myClass()?.toString() ?? "Seal Clubber") === "Plumber";
      return (
        (haveSpores || mushroomGarden) &&
        mushroomFights < (inPlumber ? 5 : 1) && (
          <Line href="/place.php?whichplace=town_wrong">
            {plural(
              (inPlumber ? 5 : 1) - mushroomFights,
              "free mushroom fight"
            )}
            .
          </Line>
        )
      );
    },
  ],
  [
    "Witchess",
    () => {
      const campground = useGetCampground() ?? {};

      const witchessFights = useGet("_witchessFights");

      return (
        !!campground["Witchess Set"] &&
        witchessFights < 5 && (
          <Line href="/campground.php?action=witchess">
            {plural(5 - witchessFights, "Witchess fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "CMG",
    () => {
      const voidFreeFights = useGet("_voidFreeFights");
      const haveCmg = useHave($item`cursed magnifying glass`);
      const haveCmgEquipped = useHaveEquipped($item`cursed magnifying glass`);
      return (
        haveCmg &&
        voidFreeFights < 5 && (
          <Line
            href={
              haveCmgEquipped
                ? undefined
                : "/inventory.php?ftext=cursed magnifying glass"
            }
          >
            {plural(5 - voidFreeFights, "free void fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Forest Tentacle",
    () => {
      const larvaQuest = useQuestStarted("questL02Larva");
      const groveQuest = useQuestStarted("questG02Whitecastle");
      const tentacleFought = !useGet("_eldritchTentacleFought", false);
      return (
        (larvaQuest || groveQuest) &&
        tentacleFought && (
          <Line href="/place.php?whichplace=forestvillage&action=fv_scientest">
            Free eldritch tentacle in the forest.
          </Line>
        )
      );
    },
  ],
  [
    "Evoke Horror",
    () => {
      const haveEvoke = useHave($skill`Evoke Eldritch Horror`);
      const evoked = !useGet("_eldritchHorrorEvoked", false);
      return (
        haveEvoke &&
        evoked && <Line>Free eldritch horror via Evoke Eldritch Horror.</Line>
      );
    },
  ],
  [
    "Deep Machine Tunnel",
    () => {
      const haveMachineElf = useHave($familiar`Machine Elf`);
      const machineElfFreeFights = useGet("_machineTunnelsAdv", 0);
      return (
        haveMachineElf &&
        machineElfFreeFights < 5 && (
          <Line href="/place.php?whichplace=dmt">
            {plural(5 - machineElfFreeFights, "free Deep Machine Tunnel fight")}
            .
          </Line>
        )
      );
    },
  ],
  [
    "Lynyrd Snares",
    () => {
      const haveLynyrdSnares = useHave($item`lynyrd snare`);
      const snaresUsed = useGet("_lynyrdSnareUses", 0);
      return (
        haveLynyrdSnares &&
        snaresUsed < 3 && (
          <Line href="/inventory.php?ftext=lynyrd snare">
            {plural(3 - snaresUsed, "free lynyrd fight")}.
          </Line>
        )
      );
    },
  ],
];

const FreeFights: React.FC = () => {
  const renderedFights = freeFights.map(([name, fight]) => {
    const rendered = fight();
    return rendered ? (
      <React.Fragment key={name}>{rendered}</React.Fragment>
    ) : (
      false
    );
  });

  return renderedFights.some((fight) => fight) ? (
    <Tile header="Free Fights" imageUrl="/images/itemimages/shatter.gif">
      {renderedFights}
    </Tile>
  ) : (
    <></>
  );
};

export default FreeFights;
