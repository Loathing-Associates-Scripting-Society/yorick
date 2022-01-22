import { useCanEquip, useMyHash, useToInt } from "../hooks/useCall";
import { $item, Placeholder } from "../util/makeValue";
import MainLink from "./MainLink";

interface Props {
  linkedContent:
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Skill">;
}

const DynamicLink: React.FC<Props> = ({ linkedContent }) => {
  const myHash = useMyHash() ?? 0;
  const isItem = linkedContent.objectType === "Item";
  const isFamiliar = linkedContent.objectType === "Familiar";
  const isSkill = linkedContent.objectType === "Skill";
  const linkID = useToInt(linkedContent) ?? 1;
  const isEquippable =
    +isItem * +(useCanEquip($item`${linkID + ""}`) ?? 0) === 1;

  if (isItem) {
    return (
      <MainLink
        href={
          isEquippable
            ? `/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}`
            : `/inv_use.php?pwd=${myHash}&which=3&whichitem=${linkID}`
        }
      >
        {isEquippable ? "[equip]" : "[use]"}
      </MainLink>
    );
  } else if (isFamiliar) {
    return (
      <MainLink
        href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash}`}
      >
        [take with you]
      </MainLink>
    );
  } else if (isSkill) {
    return (
      <MainLink
        href={`/runskillz.php?action=Skillz&whichskill=${linkID}&targetplayer=0&pwd=${myHash}&quantity=1`}
      >
        [cast on self]
      </MainLink>
    );
  }
  return <></>;
};

export default DynamicLink;
