"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { splitAndJoinPath } from "@/lib/getInitials";
import Link from "next/link";

const ClientBreadcrumb = () => {
  const path = usePathname();
  const breadcrumbs = path.split("/").filter((item) => item !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList className="breadcrumb-list">
        {/* First breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>

        {/* Check if breadcrumbs need collapsing */}
        {breadcrumbs.length > 2 ? (
          <>
            {/* First breadcrumb */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${breadcrumbs[0]}`} className="breadcrumb-link">
                  {splitAndJoinPath(breadcrumbs[0])}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Ellipsis */}
            <BreadcrumbItem>
              <BreadcrumbPage className="breadcrumb-ellipsis">
                ...
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Last breadcrumb */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${breadcrumbs[breadcrumbs.length - 1]}`}
                  className="breadcrumb-link"
                >
                  {splitAndJoinPath(breadcrumbs[breadcrumbs.length - 1])}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          /* Render all breadcrumbs if no collapsing is needed */
          breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index < breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={`/${item}`} className="breadcrumb-link">
                      {splitAndJoinPath(item)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="breadcrumb-page">
                    {splitAndJoinPath(item)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ClientBreadcrumb;
