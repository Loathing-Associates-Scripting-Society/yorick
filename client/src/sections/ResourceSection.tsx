import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import DaylightShavingsHelmet from "./resources/DaylightShavingsHelmet";
import FreeFights from "./resources/FreeFights";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";
import PowerfulGlove from "./resources/PowerfulGlove";
import BackupCamera from "./resources/BackupCamera";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <CosmicBowlingBall />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <DaylightShavingsHelmet />
    <UndergroundFireworksShop />
    <CommerceGhost />
    <IndustrialFireExtinguisher />
  </Section>
);

export default ResourceSection;
