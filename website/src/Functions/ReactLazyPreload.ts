import React from "react";

interface LazyPreload<Props>
  extends React.LazyExoticComponent<React.ComponentType<Props>> {
  preload: () => {};
}

function ReactLazyPreload<Props>(
  importStatement: () => Promise<{ default: React.ComponentType<Props> }>
) {
  const Component: LazyPreload<Props> = Object.assign(
    React.lazy(importStatement),
    { preload: importStatement }
  );
  return Component;
}

export { ReactLazyPreload };
