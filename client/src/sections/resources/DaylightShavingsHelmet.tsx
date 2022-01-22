import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";
import useCall from "../../hooks/useCall";

/**
 * Uses the seeded formula to generate the buff cycle for a user's class.
 * @returns a string[] list of size 12, ordered by the class seeding.
 * @param id the ID of a user's class.
 * @param buffs a string[] list of 12 shaving helmet buffs.
 */
function buffCycle(id: number = 1, buffs: string[] = []): string[] {
  if (id <= 0) return [];
  const returnValue = [];
  const seed = id > 6 ? (id % 6) + 1 : id;
  for (let i = 1; i < 12; i++) {
    const index = (i * seed) % 11;
    returnValue.push(buffs[index]);
  }
  return returnValue;
}

/**
 * Generate the turns between two passed buffs in a given seeding.
 * @returns an integer value for the # of buffs between the two buffs in a given seeding.
 * @param buff1 string; the name of buff #1
 * @param buff2 string; the name of buff #2
 * @param buffCycle string[]; the ordered list of buffs for a given class
 */
function buffsBetween(
  buff1: string,
  buff2: string,
  buffCycle: string[]
): number {
  const indexBuff1 = buffCycle.indexOf(buff1);
  const indexBuff2 = buffCycle.indexOf(buff2);

  // Adding 1 to buffDistance bc it's distance from next buff.
  const buffDistance = indexBuff1 - indexBuff2 + 1;

  // Ensure it is not returning negative distance; when it's 0, your next buff is buff2
  return buffDistance < 0 ? 12 + buffDistance : buffDistance;
}

const DaylightShavingsHelmet = () => {
  // Set up base case information about the shavings helmet; do you have it,
  //   what are the buffs, what's the last buff, turns left, etc.
  const classID = useCall.myClass()?.identifierNumber ?? 0;
  const haveShavingHelmet = useHave($item`Daylight Shavings Helmet`);
  const shavingBuffs = [
    "Spectacle Moustache",
    "Toiletbrush Moustache",
    "Barbell Moustache",
    "Grizzly Beard",
    "Surrealist's Moustache",
    "Musician's Musician's Moustache",
    "Gull-Wing Moustache",
    "Space Warlord's Beard",
    "Pointy Wizard Beard",
    "Cowboy Stache",
    "Friendly Chops",
  ];
  const lastBuff = useGet("lastBeardBuff", 0) ?? 0;
  const lastBuffName = useCall.toEffect(lastBuff)?.toString() ?? "";
  // const lastBuffActive = useHave($effect[lastBuffName]); // This does not work, but needs to be incorporated.
  const haveShavingHelmetEquipped = useCall.haveEquipped(
    $item`Daylight Shavings Helmet`
  );
  // const turnsOfLastBuff = useNumericFunction.haveEffect(lastBuff); // This extremely does not work right now.

  if (!haveShavingHelmet) {
    return <></>; // Return no tile if the user doesn't have the helmet.
  }

  const yourBuffCycle = buffCycle(classID, shavingBuffs);
  const buffsTilMeat = buffsBetween(
    lastBuffName,
    "Friendly Chops",
    yourBuffCycle
  );
  const buffsTilItem = buffsBetween(
    lastBuffName,
    "Spectacle Moustache",
    yourBuffCycle
  );

  // TO-DO LIST ON THIS TILE:
  //   - Figure out ways to cut tile length.
  //   - Add a hoverover with the ordered buff list.
  //   - Add a hoverover with what the next effect does.
  //   - Figure out desired behavior with equipping/unequipping the helmet.
  //   - Add some handling for "is the lastBuff active"; currently would require writing parser for myEffects()

  return (
    <Tile
      header="Daylight Shavings Helmet"
      imageUrl="/images/itemimages/Dshelmet.gif"
      href="/inventory.php?ftext=daylight shavings helmet"
    >
      <Line>
        Your next buff is{" "}
        {yourBuffCycle[(yourBuffCycle.indexOf(lastBuffName) + 1) % 12]} (
        {yourBuffCycle.indexOf(lastBuffName) + 1}/12)
      </Line>
      {buffsTilMeat === 0 ? (
        <Line>
          <text style={{ color: "#CC0000" }}>
            <b>WARNING!</b>
          </text>{" "}
          Meat buff's up next! Only equip the helmet when you need it.
        </Line>
      ) : (
        <Line>
          You are {plural(buffsTilMeat, "buff")} away from +100% meat drop (
          {plural(buffsTilMeat * 11, "turn")}).
        </Line>
      )}
      {buffsTilItem === 0 ? (
        <Line>
          <text style={{ color: "#CC0000" }}>WARNING!</text> Item buff's up
          next! Only equip the helmet when you need it.
        </Line>
      ) : (
        <Line>
          You are {plural(buffsTilItem, "buff")} away from +50% item drop (
          {plural(buffsTilItem * 11, "turn")}).
        </Line>
      )}
    </Tile>
  );
};

export default DaylightShavingsHelmet;
