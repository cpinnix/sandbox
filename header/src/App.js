import React, { useState } from "react";
import startsWith from "lodash/startsWith";
import Icon from "./Icon";
import EnterAnimation from "./EnterAnimation";

function topLevelLinksFilter(links) {
  return links.filter(
    ({ path, featured }) => path.split("/").length === 2 && !featured
  );
}

function filterLinksByPath(path, links) {
  return links.filter(
    (link) =>
      startsWith(link.path, path) && link.path !== path && !link.featured
  );
}

function filterFeaturedLinks(links) {
  return links.filter((link) => link.featured);
}

const classNames = {
  bar: `
    z-20
    w-screen
    fixed
    top-0
    py-8
  `,
  barContainer: `
    container
    mx-auto
    px-4
  `,
  panel: `
    z-10
    h-screen
    w-screen
    fixed
    top-0
    overflow-auto
  `,
  panelContainer: `
    container
    mx-auto
    pt-48
    px-4
    grid
    grid-cols-3
    gap-4
  `,
  featuredLink: `
    text-4xl
    font-bold
  `,
  sections: `
    col-span-2
    grid
    grid-cols-2
    gap-4
  `,
  sectionLink: `
    
  `,
  section: `
    mb-3
  `,
  openButton: `
    p-3
    -m-3
  `
};

export default function Header({
  logo,
  links,
  theme = {
    panel: { backgroundColor: "white" },
    featuredLink: { color: "gray" },
    sectionLink: { color: "gray" }
  }
}) {
  const [visible, updateVisible] = useState(false);
  const topLevelLinks = topLevelLinksFilter(links);
  const featuredLinks = filterFeaturedLinks(links);

  return (
    <div>
      <div className={classNames.bar}>
        <div className={classNames.barContainer}>
          <button
            className={classNames.openButton}
            onClick={() => updateVisible(!visible)}
          >
            <Icon open={visible} />
          </button>
        </div>
      </div>
      <div
        className={classNames.panel}
        style={{
          backgroundColor: theme.panel.backgroundColor,
          transition: `transform ${visible ? "600ms" : "550ms"} ${
            visible
              ? "cubic-bezier(0.0, 0.0, 0.2, 1)"
              : "cubic-bezier(0.4, 0.0, 1, 1)"
          }`,
          transform: `translateY(${visible ? "0vh" : "-100vh"})`
        }}
      >
        {visible && (
          <div className={classNames.panelContainer}>
            <ul>
              {featuredLinks.map(({ path, label }, index) => (
                <EnterAnimation index={index} key={`${path} ${label}`}>
                  <li>
                    <a className={classNames.featuredLink} href={path}>
                      {label}
                    </a>
                  </li>
                </EnterAnimation>
              ))}
            </ul>
            <div className={classNames.sections}>
              {topLevelLinks.map(({ path, label }) => (
                <div key={`${path} ${label}`} className={classNames.section}>
                  <a
                    className={classNames.sectionLink}
                    style={{ color: theme.sectionLink.color }}
                    href={path}
                  >
                    {label}
                  </a>
                  <ul>
                    {filterLinksByPath(path, links).map(
                      ({ path, label }, index) => (
                        <EnterAnimation index={index} key={`${path} ${label}`}>
                          <li>
                            <a key={`${path} ${label}`} href={path}>
                              {label}
                            </a>
                          </li>
                        </EnterAnimation>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
