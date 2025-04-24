"use client";

import { usePathname } from "next/navigation";

const ContentRenderer = ({
  children,
  singleGame,
}: {
  children: React.ReactNode;
  singleGame: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isSingleGamePage =
    pathname.includes("/steam-game-promotion/portfolio/") &&
    pathname.split("/").length > 2;
  return (
    <>
      {singleGame}
      {children}
    </>
  );
  // return <>{isSingleGamePage ? singleGame : children}</>;
};

export default ContentRenderer;
