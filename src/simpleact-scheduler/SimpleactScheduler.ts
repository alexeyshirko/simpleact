import { rerenderComponent } from "../simpleact/SimpleactComponent";
import { DebugAction, debugGroup, debugGroupEnd, debugLog, getElementName } from "../simpleact/SimpleactDebug";
import { type ComponentInstance } from "../simpleact/SimpleactElementTypes";

const scheduledComponentInstances = new Set<ComponentInstance>();
let isFlushScheduled = false;

export function scheduleUpdate(componentInstance: ComponentInstance) {
  componentInstance.isUpdateScheduled = true;
  scheduledComponentInstances.add(componentInstance);

  if (!isFlushScheduled) {
    isFlushScheduled = true;
    queueMicrotask(flushScheduledUpdates);
  }
}

function flushScheduledUpdates() {
  isFlushScheduled = false;

  const instancesToUpdate = [...scheduledComponentInstances].sort((a, b) => a.id - b.id);
  scheduledComponentInstances.clear();

  debugGroup(DebugAction.Flush, `${instancesToUpdate.length} scheduled`);

  for (const componentInstance of instancesToUpdate) {
    const componentName = getElementName(componentInstance.element);

    const isStillMounted = componentInstance.isMounted;
    if (!isStillMounted) {
      debugLog(DebugAction.Skip, `${componentName} — unmounted`);
      continue;
    }

    const isStillScheduled = componentInstance.isUpdateScheduled;
    if (!isStillScheduled) {
      debugLog(DebugAction.Skip, `${componentName} — already rendered by parent`);
      continue;
    }

    rerenderComponent(componentInstance);
  }

  debugGroupEnd();
}
