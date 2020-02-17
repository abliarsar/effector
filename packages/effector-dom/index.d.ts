import {Store, Event, Step} from 'effector'

export type Signal = Step
export type StoreOrData<T> = Store<T> | T
export type DOMProperty = string | number | null | boolean
export type PropertyMap = {[field: string]: DOMProperty | AttributeStore}
export type StylePropertyMap = Partial<
  {
    [K in keyof CSSStyleDeclaration]: DOMProperty | AttributeStore
  }
>
export type DOMTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
export type TransformMap = {
  translate:
    | Store<{
        x?: number
        y?: number
      }>
    | {
        x?: StoreOrData<number>
        y?: StoreOrData<number>
      }
  scale:
    | Store<{
        x?: number
        y?: number
      }>
    | {
        x?: StoreOrData<number>
        y?: StoreOrData<number>
      }
  rotate: StoreOrData<
    | {
        angle?: number
        x?: number
        y?: number
      }
    | number
  >
  skewX: StoreOrData<number>
  skewY: StoreOrData<number>
}

export type DOMElement = HTMLElement | SVGElement
export type AttributeStore =
  | Store<string>
  | Store<number>
  | Store<boolean>
  | Store<null>
  | Store<string | number>
  | Store<string | boolean>
  | Store<string | null>
  | Store<number | boolean>
  | Store<number | null>
  | Store<boolean | null>
  | Store<string | number | boolean>
  | Store<string | number | null>
  | Store<string | boolean | null>
  | Store<number | boolean | null>
  | Store<string | number | boolean | null>

type Tuple<T = unknown> = [T] | T[]
type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
type GetCombinedValue<T> = {
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}

export function using(node: DOMElement, cb: () => any): void

export function spec<T extends DOMProperty>(spec: {
  attr?: PropertyMap
  data?: PropertyMap
  transform?: Partial<TransformMap>
  text?: T | Store<T>
  visible?: Store<boolean>
  style?: StylePropertyMap
  styleVar?: PropertyMap
  focus?: {
    focus?: Event<any>
    blur?: Event<any>
  }
  handler?: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}): void
export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {
    passive?: boolean
    capture?: boolean
    stop?: boolean
    prevent?: boolean
  },
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void

export function h<T extends DOMProperty>(
  tag: DOMTag,
  spec: {
    attr?: PropertyMap
    data?: PropertyMap
    transform?: Partial<TransformMap>
    text?: T | Store<T>
    visible?: Store<boolean>
    style?: StylePropertyMap
    styleVar?: PropertyMap
    focus?: {
      focus?: Event<any>
      blur?: Event<any>
    }
    handler?: Partial<
      {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
    >
  },
): void
export function h(tag: DOMTag, cb: () => void): void
export function variant<Case extends string>(
  key: Store<Case>,
  cases: Partial<{[K in Case]: () => void}>,
): void
export function list<T>(
  source: Store<T[]>,
  cb: (opts: {store: Store<T>; index: number; signal: Signal}) => void,
): void
export function list<
  T,
  K extends keyof T,
  Query extends [keyof T] | ReadonlyArray<keyof T> | (keyof T)[]
>(
  opts: {
    key: T[K] extends string | number ? K : never
    source: Store<T[]>
    visible?: (state: T) => boolean
    fields: Query
    fn?: (opts: {
      store: Store<T>
      fields: {
        [K in keyof Query]: Query[K] extends keyof T
          ? Store<T[Query[K]]>
          : never
      }
      key: T[K]
      signal: Signal
    }) => void
  },
  cb?: (opts: {
    store: Store<T>
    fields: {
      [K in keyof Query]: Query[K] extends keyof T ? Store<T[Query[K]]> : never
    }
    key: T[K]
    signal: Signal
  }) => void,
): void
export function list<T, K extends keyof T>(
  {
    key,
    source,
    reverse,
  }: {
    key: T[K] extends string | number | symbol ? K : never
    source: Store<T[]>
    visible?: (state: T) => boolean
    reverse?: boolean
    fn?: (opts: {store: Store<T>; key: T[K]; signal: Signal}) => void
  },
  cb?: (opts: {store: Store<T>; key: T[K]; signal: Signal}) => void,
): void

export function node(fn: (node: DOMElement) => void): void
export function signalOwn<T>(value: T): T
export function explicitUnmount(unmountOn: Event<any>): void

export function remap<T extends {[field: string]: any}, S extends keyof T>(
  store: Store<T>,
  key: S,
): Store<T[S]>
export function remap<
  T extends {[field: string]: any},
  S extends [keyof T] | {[field: number]: keyof T} | {[field: string]: keyof T}
>(
  store: Store<T>,
  shape: S,
): {[K in keyof S]: S[K] extends keyof T ? Store<T[S[K]]> : never}
