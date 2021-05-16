let listeners: { [eventName: string]: any[] } = {};
let windowEventListeners: {
  [eventName: string]: EventListener;
} = {};

export function clearGlobalState(): void {
  listeners = {};

  Object.entries(windowEventListeners).forEach(([eventName, listener]) =>
    window.removeEventListener(eventName, listener),
  );
  windowEventListeners = {};
}

/**
 * add window event listener only once on application and listen event
 */
export const addWindowEventListener = (
  eventName: string,
  eventListener: (event: any) => void,
): boolean => {
  if (!eventListener) {
    return false;
  }

  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }

  if (listeners[eventName].length === 0) {
    windowEventListeners[eventName] = (event: any) => {
      listeners[eventName].forEach((listener) => listener(event));
    };
    window.addEventListener(eventName, windowEventListeners[eventName]);
  }
  listeners[eventName].push(eventListener);
  return true;
};

/**
 * remove window event listener
 */
export const removeWindowEventListener = (
  eventName: string,
  eventListener: (event: any) => void,
): boolean => {
  if (!eventListener || !listeners[eventName]) {
    return false;
  }

  const index = listeners[eventName].indexOf(eventListener);
  if (index === -1) {
    return false;
  }

  listeners[eventName].splice(index, 1);
  if (listeners[eventName].length === 0) {
    window.removeEventListener(eventName, windowEventListeners[eventName]);
  }
  return true;
};
