import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-dashed flex flex-col md:flex-row space-y-3.5 flex-1 py-7 max-w-6xl mx-auto px-4 w-full items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-bold hover:text-blue-500 transition-colors"
      >
        ZV
      </Link>
      <div className="text-muted-foreground text-md">
        {" "}
        &copy; ZincVault {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
