import Section from "../components/Section";
import Level1 from "./quests/Level1";
import Level2 from "./quests/Level2";
import Level3 from "./quests/Level3";
import Level4 from "./quests/Level4";

const QuestSection = () => (
  <Section name="Quests">
    <Level1 />
    <Level2 />
    <Level3 />
    <Level4 />
  </Section>
);

export default QuestSection;
