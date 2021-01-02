import React, { createElement, useState } from "react";
import startsWith from "lodash/startsWith";
import Navigator from "./Navigator";
import Panel from "./Panel";
import Layout from "./Layout";
import List from "./List";
import Footer from "./Footer";
import RootContext from "../contexts/root";
import { getPreference } from "../utils";
import apps from "../apps";
import Application from "./Application";

function filterItemsByPath(items, suffix) {
  return items.filter(({ path }) => {
    if (!startsWith(path, suffix)) {
      return false;
    }

    if (path.replace(suffix, "").split("/").length > 2) {
      return false;
    }

    if (path === suffix) return false;

    return true;
  });
}

export default function Root({ paths, defaultPreferences }) {
  const [cursor, updateCursor] = useState(0);
  const [mode, updateMode] = useState(Layout.modes.DEFAULT);
  const [selected, updateSelected] = useState();
  const [path, updatePath] = useState("/users/verious");
  const [app, updateApp] = useState();
  const [preferences, updatePreferences] = useState(defaultPreferences);

  const items = filterItemsByPath(paths, path);

  function onBack() {
    const parts = path.split("/");
    const newPath = parts.splice(0, parts.length - 1).join("/");
    if (paths.length > 0) {
      updateApp(null);
      updateSelected(null);
      updateCursor(0);
      updatePath(newPath);
    }
  }

  function onForward(cursor) {
    if (items.length > 0) {
      console.log(items[cursor]);
      if (items[cursor].app) {
        updateApp(items[cursor].app);
        updateSelected(items[cursor].name);
      } else {
        updateApp(null);
        updateCursor(0);
        updatePath(`${path}/${items[cursor].name}`);
      }
    }
  }

  function onChangeCursor(cursor) {
    updateCursor(cursor);
  }

  function fullScreenLeft() {
    updateMode(Layout.modes.FULLSCREEN_LEFT);
  }

  function fullScreenRight() {
    updateMode(Layout.modes.FULLSCREEN_RIGHT);
  }

  function onChangePreference(name, newValue) {
    const newPreferences = preferences.map((preference) => {
      if (preference.name === name) {
        return {
          ...preference,
          value: newValue
        };
      }
      return preference;
    });
    updatePreferences(newPreferences);
  }

  const state = {
    preferences
  };

  const actions = {
    onChangePreference
  };

  const selectors = {
    preference: (name) => getPreference(preferences, name)
  };

  return (
    <RootContext.Provider
      value={{
        state,
        actions,
        selectors
      }}
    >
      <div
        className={`
            h-full
          `}
      >
        <Layout
          mode={mode}
          left={
            <Navigator
              cursor={cursor}
              max={items.length - 1}
              onChangeCursor={onChangeCursor}
              onBack={onBack}
              onForward={onForward}
            >
              <div className="h-full">
                <Panel onBack={() => onBack()}>
                  <List
                    cursor={cursor}
                    selected={selected}
                    preferences={preferences}
                    items={items}
                    onForward={onForward}
                  />
                </Panel>
              </div>
            </Navigator>
          }
          right={
            app && (
              <Application
                mode={
                  mode === Layout.modes.FULLSCREEN_RIGHT
                    ? Application.modes.FULLSCREEN
                    : Application.modes.DEFAULT
                }
                toggleFullScreen={() => {
                  if (mode === Layout.modes.FULLSCREEN_RIGHT) {
                    updateMode(Layout.modes.DEFAULT);
                  } else {
                    fullScreenRight();
                  }
                }}
              >
                {createElement(apps[app])}
              </Application>
            )
          }
          footer={<Footer />}
        />
      </div>
    </RootContext.Provider>
  );
}
