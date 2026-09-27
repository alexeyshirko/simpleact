import { type SimpleactElement, SimpleactElementType } from "./SimpleactElementTypes";

const IS_DEBUG_ENABLED = true;

export enum DebugAction {
  Flush = "flush",
  Mount = "mount",
  Prop = "prop",
  Render = "render",
  Replace = "replace",
  Skip = "skip",
  Unmount = "unmount",
  Update = "update",
}

const DEBUG_ACTION_COLORS: Record<DebugAction, string> = {
  [DebugAction.Flush]: "#455a64",
  [DebugAction.Mount]: "#2e7d32",
  [DebugAction.Prop]: "#00838f",
  [DebugAction.Render]: "#ef6c00",
  [DebugAction.Replace]: "#6a1b9a",
  [DebugAction.Skip]: "#9e9e9e",
  [DebugAction.Unmount]: "#c62828",
  [DebugAction.Update]: "#1565c0",
};

export function debugLog(action: DebugAction, message: string) {
  if (!IS_DEBUG_ENABLED) return;

  console.log(...formatDebugMessage(action, message));
}

export function debugGroup(action: DebugAction, message: string) {
  if (!IS_DEBUG_ENABLED) return;

  console.group(...formatDebugMessage(action, message));
}

export function debugGroupEnd() {
  if (!IS_DEBUG_ENABLED) return;

  console.groupEnd();
}

export function getElementName(element: SimpleactElement): string {
  switch (element.type) {
    case SimpleactElementType.Component:
      return `<${element.component.name || "Anonymous"} />`;
    case SimpleactElementType.Tag:
      return `<${element.tag}>`;
    case SimpleactElementType.Text:
      return JSON.stringify(element.value);
    case SimpleactElementType.Fragment:
      return "<>";
    case SimpleactElementType.Empty:
      return "∅";
  }
}

export function formatDebugValue(value: unknown) {
  return typeof value === "function" ? "ƒ" : JSON.stringify(value);
}

function formatDebugMessage(action: DebugAction, message: string) {
  const actionStyle = `color: ${DEBUG_ACTION_COLORS[action]}; font-weight: bold`;
  const messageStyle = "color: inherit; font-weight: normal";

  return [`%c${action.padEnd(7)}%c ${message}`, actionStyle, messageStyle];
}
