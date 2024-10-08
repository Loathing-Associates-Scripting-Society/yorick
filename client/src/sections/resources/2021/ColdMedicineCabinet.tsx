import { getWorkshed, totalTurnsPlayed } from "kolmafia";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";

const ColdMedicineCabinet = () => {
  const _coldMedicineConsults = get("_coldMedicineConsults");
  const _nextColdMedicineConsult = get("_nextColdMedicineConsult");

  const turnsToConsult = _nextColdMedicineConsult - totalTurnsPlayed();

  const cabinet = $item`cold medicine cabinet`;
  const workshed = getWorkshed();

  if (workshed !== cabinet || _coldMedicineConsults === 5) return null;

  return (
    <Tile linkedContent={cabinet} href="/campground.php?action=workshed">
      <Line>{5 - _coldMedicineConsults} consults available.</Line>
      {_coldMedicineConsults < 5 && (
        <Line>
          Next consult{" "}
          {turnsToConsult <= 0 ? "available now" : `in ${turnsToConsult} turns`}
          .
        </Line>
      )}
    </Tile>
  );
};

export default ColdMedicineCabinet;
