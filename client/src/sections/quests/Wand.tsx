import { $item, $items, $location, have } from "libram";

import { remoteCliExecute } from "../../api/util";
import AsyncLink from "../../components/AsyncLink";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { parentPlaceLink } from "../../util/links";

const INGREDIENTS = $items`ruby W, metallic A, lowercase N, heavy D`;

const Wand: React.FC = () => {
  const haveWand = have($item`Wand of Nagamar`);
  const haveIngredients = INGREDIENTS.every((item) => have(item));
  return (
    !haveWand && (
      <QuestTile
        header="Wand of Nagamar"
        imageUrl="/images/itemimages/wand.gif"
      >
        {haveIngredients ? (
          <Line>
            <AsyncLink
              onClick={async () => {
                await remoteCliExecute("create Wand of Nagamar");
              }}
            >
              You have the ingredients. Make a Wand of Nagamar.
            </AsyncLink>
          </Line>
        ) : (
          <Line
            href={parentPlaceLink(
              $location`The Castle in the Clouds in the Sky (Basement)`,
            )}
          >
            Need the ingredients for a Wand of Nagamar. Clover the Castle
            Basement.
          </Line>
        )}
      </QuestTile>
    )
  );
};

export default Wand;
