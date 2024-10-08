import { myPath, Path } from "kolmafia";

export function isNormalCampgroundPath(path?: Path) {
  const actual_path = path ?? myPath();

  // The list of paths that don't give access to a regular campground (thus, no workshed, garden, etc.)
  if (
    [
      "Actually Ed the Undying",
      "Nuclear Autumn",
      "You, Robot",
      "WereProfessor",
    ].includes(actual_path.name)
  ) {
    return false;
  }

  return true;
}

export function canAccessGarden(path?: Path) {
  const actual_path = path ?? myPath();

  return (
    isNormalCampgroundPath(actual_path) &&
    actual_path.name !== "A Shrunken Adventurer am I"
  );
}
