import * as React from "react";
import Link, { LinkProps } from "next/link";

interface CustomNextLinkProps extends LinkProps {
  children?: React.ReactNode;
  disabled: boolean;
}

function CustomNextLink(
  { children, disabled, ...props }: CustomNextLinkProps): JSX.Element {
  return disabled ? (<>{children}</>) : (
    <Link {...props}>
      {children}
    </Link>
  );
}

export type { CustomNextLinkProps };
export default CustomNextLink;
