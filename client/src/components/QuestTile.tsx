import useCall from "../hooks/useCall";
import Tile, { TileProps } from "./Tile";

interface QuestTileProps extends TileProps {
  minLevel: number;
}

const QuestTile: React.FC<QuestTileProps> = ({
  header,
  href,
  minLevel,
  children,
  ...props
}) => {
  const level = useCall.myLevel() ?? 0;
  return level < minLevel ? (
    <Tile disabled={true} header={`${header} (level ${minLevel})`} {...props} />
  ) : (
    <Tile header={header} href={href} {...props}>
      {children}
    </Tile>
  );
};

export default QuestTile;
