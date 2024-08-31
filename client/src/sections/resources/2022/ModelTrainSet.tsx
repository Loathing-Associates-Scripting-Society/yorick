import { Text } from "@chakra-ui/react";
import { availableAmount, myLevel, myPrimestat } from "kolmafia";
import { $item, $stat, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const stationDescriptions: Record<
  string,
  { name: string; description: string }
> = {
  unknown: {
    name: "Unknown",
    description: "We don't recognize that train station!",
  },
  empty: {
    name: "Empty station",
    description: "Train set isn't fully configured!",
  },
  meat_mine: {
    name: "Meat Mine",
    description: "Bonus meat",
  },
  tower_fizzy: {
    name: "Fizzy Tower",
    description: "MP regen",
  },
  viewing_platform: {
    name: "Viewing Platform",
    description: "Gain extra stats",
  },
  tower_frozen: {
    name: "Frozen Tower",
    description: "Hot res, Cold dmg",
  },
  spooky_graveyard: {
    name: "Spooky Graveyard",
    description: "Stench res, Spooky dmg",
  },
  logging_mill: {
    name: "Logging Mill",
    description: "Bridge parts or stats",
  },
  candy_factory: {
    name: "Candy Factory",
    description: "Pick up random candy",
  },
  coal_hopper: {
    name: "Coal Hopper",
    description: "Double power of next station",
  },
  tower_sewage: {
    name: "Sewage Tower",
    description: "Cold res, Stench dmg",
  },
  oil_refinery: {
    name: "Oil Refinery",
    description: "Spooky res, Sleaze dmg",
  },
  oil_bridge: {
    name: "Oil Bridge",
    description: "Sleaze res, Hot dmg",
  },
  water_bridge: {
    name: "Bridge Over Troubled Water",
    description: "Increase ML",
  },
  groin_silo: {
    name: "Groin Silo",
    description: "Gain moxie",
  },
  grain_silo: {
    name: "Grain Silo",
    description: "Get base booze",
  },
  brain_silo: {
    name: "Brain Silo",
    description: "Gain mysticality",
  },
  brawn_silo: {
    name: "Brawn Silo",
    description: "Gain muscle",
  },
  prawn_silo: {
    name: "Prawn Silo",
    description: "Acquire more food",
  },
  trackside_diner: {
    name: "Trackside Diner",
    description: "Serves the last food you found",
  },
  ore_hopper: {
    name: "Ore Hopper",
    description: "Get some ore",
  },
};

const ModelTrainSet = () => {
  const modelTrainSet = $item`model train set`;

  const trainSetReconfigurableIn = () => {
    const trainPosition = get("trainsetPosition");
    const whenTrainsetWasConfigured = get("lastTrainsetConfiguration");
    if (
      whenTrainsetWasConfigured === trainPosition ||
      trainPosition - whenTrainsetWasConfigured >= 40
    ) {
      return 0;
    } else {
      return 40 - (trainPosition - whenTrainsetWasConfigured);
    }
  };

  const stationConfigured = (station: string) => {
    return get("trainsetConfiguration").includes(station);
  };

  const oreConfiguredWhenNotNeeded = () => {
    const oreConfigured = stationConfigured("ore_hopper");
    const oreNeeded = get("trapperOre");
    const haveAllOreNeeded =
      get("questL08Trapper") === "finished" ||
      (oreNeeded !== "" && availableAmount($item`${oreNeeded}`) >= 3) ||
      (availableAmount($item`asbestos ore`) >= 3 &&
        availableAmount($item`chrome ore`) >= 3 &&
        availableAmount($item`linoleum ore`) >= 3);
    return get("kingLiberated") === false && oreConfigured && haveAllOreNeeded;
  };

  const loggingMillConfiguredWhenNotNeeded = () => {
    const loggingMillConfigured = stationConfigured("logging_mill");
    const fastenersNeeded =
      get("chasmBridgeProgress") < 30 ? 30 - get("chasmBridgeProgress") : 0;
    const lumberNeeded =
      get("chasmBridgeProgress") < 30 ? 30 - get("chasmBridgeProgress") : 0;
    const haveAllPartsNeeded =
      get("chasmBridgeProgress") >= 30 ||
      (fastenersNeeded === 0 && lumberNeeded === 0);
    return (
      get("kingLiberated") === false &&
      loggingMillConfigured &&
      haveAllPartsNeeded
    );
  };

  const statsConfiguredWhenNotNeeded = () => {
    const statsConfigured =
      stationConfigured("viewing_platform") ||
      (stationConfigured("brawn_silo") && myPrimestat() === $stat`Muscle`) ||
      (stationConfigured("brain_silo") &&
        myPrimestat() === $stat`Mysticality`) ||
      (stationConfigured("groin_silo") && myPrimestat() === $stat`Moxie`);
    const haveAllStatsNeeded = myLevel() >= 13;
    return (
      get("kingLiberated") === false && statsConfigured && haveAllStatsNeeded
    );
  };

  const shouldNag =
    trainSetReconfigurableIn() === 0 &&
    (oreConfiguredWhenNotNeeded() ||
      loggingMillConfiguredWhenNotNeeded() ||
      statsConfiguredWhenNotNeeded() ||
      stationConfigured("empty"));

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: shouldNag && (
        <Tile
          header="Model Train Set"
          imageUrl="/images/itemimages/trainset.gif"
        >
          <Line>Your train set needs reconfiguring!</Line>
        </Tile>
      ),
    }),
    [shouldNag],
  );

  if (!haveUnrestricted(modelTrainSet)) return null;

  const trainPosition = get("trainsetPosition");
  const stations = get("trainsetConfiguration").split(",");

  if (stations.length < 8) {
    return (
      <Tile
        header="Model Train Set"
        imageUrl="/images/itemimages/trainset.gif"
        href="campground.php?action=workshed"
      >
        <Line>
          We can't tell how your trainset is configured. Click this tile to fix.
        </Line>
      </Tile>
    );
  }

  const reconfigurableIn = trainSetReconfigurableIn();
  const nextStation = stationDescriptions[stations[trainPosition % 8]];

  return (
    <Tile
      header="Model Train Set"
      imageUrl="/images/itemimages/trainset.gif"
      href="campground.php?action=workshed"
    >
      {oreConfiguredWhenNotNeeded() && (
        <Line>
          <Text color="red.500">Have ore configured when it's not needed!</Text>
        </Line>
      )}
      {loggingMillConfiguredWhenNotNeeded() && (
        <Line>
          <Text color="red.500">
            Have lumber mill configured when it's not needed!
          </Text>
        </Line>
      )}
      {statsConfiguredWhenNotNeeded() && (
        <Line>
          <Text color="red.500">
            Have stats configured when they're not needed!
          </Text>
        </Line>
      )}
      {stationConfigured("empty") && (
        <Line>
          <Text color="red.500">Have an empty station configured!</Text>
        </Line>
      )}
      {reconfigurableIn === 0 ? (
        <Line>
          <Text color="blue.500">Train set reconfigurable!</Text>
        </Line>
      ) : (
        <Line>
          Train set reconfigurable in{" "}
          <Text as="b">{plural(reconfigurableIn, "combat")}</Text>.
        </Line>
      )}
      <Line>
        Next station: <Text as="b">{nextStation.name}</Text> -{" "}
        {nextStation.description}
      </Line>
      <AdviceTooltip
        text={
          <div>
            <Text as="b" textAlign="center" pb={1}>
              Train station cycle
            </Text>
            {Array.from({ length: 8 }, (_, i) => {
              const station =
                stationDescriptions[stations[(trainPosition + i) % 8]];
              return (
                <div key={i}>
                  <Text as="b">{station.name}</Text>: {station.description}
                </div>
              );
            })}
          </div>
        }
        label="Full train cycle"
      />
    </Tile>
  );
};

export default ModelTrainSet;