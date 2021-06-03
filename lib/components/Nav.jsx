import React from "react";

/**
 * TODO: Add the proposal count
 * @param {*} props
 * @returns
 */
export const Nav = (props) => (
  <nav className="flex-col items-start hidden sm:block pt-8 sm:pt-0 pl-2 sm:pr-12 lg:pr-16 text-center">
    {props.children}
  </nav>
);
