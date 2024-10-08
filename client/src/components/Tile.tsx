import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  IconButton,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { decode } from "html-entities";
import { Familiar, Item, Skill } from "kolmafia";
import React, { ReactNode, useState } from "react";

import { capitalizeWords } from "../util/text";
import DynamicLinks from "./DynamicLinks";
import MainLink from "./MainLink";
import TileImage from "./TileImage";

export interface TileProps extends StackProps {
  header?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  linkedContent?: Item | Familiar | Skill;
  linkHide?: boolean;
  extraLinks?: ReactNode;
  tooltip?: ReactNode;
  nonCollapsible?: boolean;
  children?: ReactNode;
}

const Tile: React.FC<TileProps> = ({
  header,
  imageUrl,
  imageAlt,
  icon,
  href,
  disabled,
  children,
  linkedContent,
  linkHide,
  extraLinks,
  tooltip,
  nonCollapsible,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const heading =
    header ??
    (linkedContent?.name
      ? capitalizeWords(decode(linkedContent.name))
      : undefined);

  return (
    <HStack
      alignItems="start"
      px={2}
      textColor={disabled || collapsed ? "gray.500" : undefined}
      {...props}
    >
      {icon ?? (
        <TileImage
          imageUrl={
            imageUrl ??
            (linkedContent?.image
              ? `/images/itemimages/${linkedContent?.image}`
              : undefined)
          }
          imageAlt={
            imageAlt ?? (typeof header === "string" ? header : undefined)
          }
          mt={collapsed ? 0 : 1}
          width="30px"
          boxSize={disabled || collapsed ? "20px" : "30px"}
        />
      )}
      <VStack align="stretch" spacing={0.5}>
        <HStack spacing={1} align="center">
          <Heading as="h3" size="sm">
            {href ? <MainLink href={href}>{heading}</MainLink> : heading}
          </Heading>
          {!collapsed && tooltip}
          {!collapsed && linkedContent && !linkHide && (
            <DynamicLinks linkedContent={linkedContent} />
          )}
          {!collapsed && extraLinks}
          {nonCollapsible || (
            <IconButton
              icon={collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
              aria-label="Collapse"
              h={4}
              minW={4}
              fontSize="20px"
              variant="ghost"
              onClick={() => setCollapsed((collapsed) => !collapsed)}
            />
          )}
        </HStack>
        {!collapsed && children}
      </VStack>
    </HStack>
  );
};

export default Tile;
