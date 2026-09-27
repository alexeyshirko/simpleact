import { rerenderComponent } from "../simpleact/SimpleactComponent";
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

  for (const componentInstance of instancesToUpdate) {
    const isStillMounted = componentInstance.isMounted;
    const isStillScheduled = componentInstance.isUpdateScheduled;
    if (!isStillMounted || !isStillScheduled) continue;

    rerenderComponent(componentInstance);
  }
}
