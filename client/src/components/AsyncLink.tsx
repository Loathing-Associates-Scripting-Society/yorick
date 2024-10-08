import { Link, LinkProps, Spinner } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";

import RefreshContext from "../contexts/RefreshContext";

interface AsyncLinkProps extends Omit<LinkProps, "href" | "onClick"> {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
}

const AsyncLink: React.FC<AsyncLinkProps> = ({
  href,
  onClick,
  children,
  ...props
}) => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await (onClick
        ? onClick(event)
        : href && fetch(href).then((response) => response.text()));
      setIsLoading(false);
      triggerHardRefresh();
    },
    [href, onClick, triggerHardRefresh],
  );

  return isLoading ? (
    <>
      <Link
        {...props}
        textDecoration="none !important"
        pointerEvents="none"
        color="gray.500"
      >
        {children} <Spinner as="span" size="xs" />
      </Link>
    </>
  ) : (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default AsyncLink;
