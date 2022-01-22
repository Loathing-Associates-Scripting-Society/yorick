import Section from "../components/Section";
import BackupCamera from "./resources/BackupCamera";
import BirdADayCalendar from "./resources/BirdADayCalendar";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import PowerfulGlove from "./resources/PowerfulGlove";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <CosmicBowlingBall />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
    <CommerceGhost />
    <IndustrialFireExtinguisher />
    <BirdADayCalendar />
  </Section>
);

export default ResourceSection;
