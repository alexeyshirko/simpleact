import { scheduleUpdate } from "../simpleact-scheduler/SimpleactScheduler";
import { isNullable } from "../utils/isNullable";
import { currentComponentInstance } from "./SimpleactComponent";
import { type ComponentInstance } from "./SimpleactElementTypes";
import { type Hook, type StateHook, type StateSetter } from "./SimpleactHooksTypes";

export function useState<T>(initialValue: T | (() => T)): [T, StateSetter<T>] {
  const componentInstance = getCurrentComponentInstance();
  const stateHook = getHook(componentInstance, () => createStateHook(componentInstance, initialValue));

  return [stateHook.value, stateHook.setValue];
}

function createStateHook<T>(componentInstance: ComponentInstance, initialValue: T | (() => T)): StateHook<T> {
  const stateHook: StateHook<T> = {
    value: typeof initialValue === "function" ? (initialValue as () => T)() : initialValue,
    setValue: (nextValue) => {
      const isUnmounted = !componentInstance.isMounted;
      if (isUnmounted) return;

      const newValue = typeof nextValue === "function" ? (nextValue as (previous: T) => T)(stateHook.value) : nextValue;
      const isValueChanged = !Object.is(newValue, stateHook.value);

      if (isValueChanged) {
        stateHook.value = newValue;
        scheduleUpdate(componentInstance);
      }
    },
  };

  return stateHook;
}

function getHook<H extends Hook>(componentInstance: ComponentInstance, createHook: () => H): H {
  const hookIndex = componentInstance.hookIndex++;
  const existingHook = componentInstance.hooks[hookIndex];

  const isFirstCall = isNullable(existingHook);
  if (isFirstCall) {
    const newHook = createHook();
    componentInstance.hooks[hookIndex] = newHook;

    return newHook;
  }

  return existingHook as H;
}

function getCurrentComponentInstance(): ComponentInstance {
  if (isNullable(currentComponentInstance)) throw new Error("only inside component");
  return currentComponentInstance;
}
