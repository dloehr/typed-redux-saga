import {
  call as rawCall,
  Effect,
  select as rawSelect,
  Tail,
} from "redux-saga/effects";

// tslint:disable: readonly-array

export type SagaIterator<RT = any> = Generator<Effect<any>, RT, any>;

export type CallResult<RT> = RT extends SagaIterator<infer A>
  ? A
  : RT extends Promise<infer B>
  ? B
  : RT;

export function* select<Fn extends (state: any, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): SagaIterator<ReturnType<Fn>> {
  return yield rawSelect(selector, ...args);
}

export function* call<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaIterator<CallResult<ReturnType<Fn>>> {
  return yield rawCall(fn, ...args);
}