export type StateSetter<T> = (next: T | ((previous: T) => T)) => void;

export interface StateHook<T = unknown> {
  value: T;
  setValue: StateSetter<T>;
}

export type Hook = StateHook<any>;
