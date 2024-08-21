import React from "react";
import { Collapse, Heading, VStack } from "@chakra-ui/react";

interface Props {
  name: string;
}

const Section: React.FC<Props> = ({ name, children }) => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow(!show);

  const section = (
    <VStack spacing={1} align="stretch" mb={1}>
      <Heading as="h2" size="md" px={2} onClick={handleToggle} cursor="pointer">
        {name}
      </Heading>
      <Collapse in={show}>{children}</Collapse>
    </VStack>
  );

  return section;
};

export default Section;
