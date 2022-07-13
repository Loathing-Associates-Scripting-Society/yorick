import Section from "../components/Section";
import BackupCamera from "./resources/BackupCamera";
import Banishers, { BanishedMonsters } from "./resources/Banishers";
import Cartography from "./resources/Cartography";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import DaylightShavingsHelmet from "./resources/DaylightShavingsHelmet";
import EmotionChip from "./resources/EmotionChip";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import JuneCleaver from "./resources/JuneCleaver";
import Melodramedary from "./resources/Melodramedary";
import PowerfulGlove from "./resources/PowerfulGlove";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <Banishers />
    <BanishedMonsters />
    <BackupCamera />
    <ColdMedicineCabinet />
    <EmotionChip />
    <Melodramedary />
    <CosmicBowlingBall />
    <Cartography />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <DaylightShavingsHelmet />
    <UndergroundFireworksShop />
    <CommerceGhost />
    <IndustrialFireExtinguisher />
    <JuneCleaver />
  </Section>
);

export default ResourceSection;
