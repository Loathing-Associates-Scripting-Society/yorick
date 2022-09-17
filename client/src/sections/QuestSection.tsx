import Section from "../components/Section";
import Level1 from "./quests/Level1";
import Level10 from "./quests/Level10";
import Level2 from "./quests/Level2";
import Level3 from "./quests/Level3";
import Level4 from "./quests/Level4";
import Level5 from "./quests/Level5";
import Level6 from "./quests/Level6";
import Level7 from "./quests/Level7";
import Level8 from "./quests/Level8";
import Level11 from "./quests/level11/Level11";
import Level9 from "./quests/level9/Level9";

const QuestSection = () => (
  <Section name="Quests">
    <Level1 />
    <Level2 />
    <Level3 />
    <Level4 />
    <Level5 />
    <Level6 />
    <Level7 />
    <Level8 />
    <Level9 />
    <Level10 />
    <Level11 />
  </Section>
);

export default QuestSection;
