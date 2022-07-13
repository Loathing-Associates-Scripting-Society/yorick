/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */
export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * Because we're keying our banish map by monster, Type that's just banisher/turnBanished
 */
export type Banish = {
  banisher: string;
  turnBanished: number;
};

/**
 * Return a map of banished monsters keyed by foe name with what banished them & what turn they were banished on.
 *
 * @param banishPref (string) The "banishedMonsters" preference from KOLMafia
 */
export function returnBanishes(banishPref: string): Map<string, Banish> {
  // Use our brand new sparkly chunk function from libram to chunk the pref.
  const banishes = chunk(banishPref.split(":"), 3);

  // Establish the new result.
  const result = new Map<string, Banish>();

  // Loop through our chunked banishes and assign them to our map.
  for (const [foe, banisher, turn] of banishes) {
    if (foe === undefined || banisher === undefined) break;

    // Remember, we have to convert turnBanished to number!
    result.set(foe, { banisher: banisher, turnBanished: Number(turn) });
  }

  return result;
}
