export function eventDebounceWrapper<
  T extends (event: React.ChangeEvent<HTMLInputElement>) => void,
>(function_: T, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, timeoutMs);
  };
}
