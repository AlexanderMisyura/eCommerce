import type {
  AddressesState,
  CredentialsState,
  UserAddressFieldsState,
  UserCredentialsFormState,
} from '@ts-interfaces';

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

export function stateCredentialsDebounceWrapper<
  T extends (field: keyof CredentialsState, value: string) => void,
>(function_: T, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, timeoutMs);
  };
}

export function stateAddressesDebounceWrapper<
  T extends (field: keyof AddressesState, value: string) => void,
>(function_: T, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, timeoutMs);
  };
}

export function stateAddressesFormDebounceWrapper<
  T extends (field: keyof UserAddressFieldsState, value: string) => void,
>(function_: T, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, timeoutMs);
  };
}

export function stateUserCredentialsFormDebounceWrapper<
  T extends (field: keyof UserCredentialsFormState, value: string) => void,
>(function_: T, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, timeoutMs);
  };
}
