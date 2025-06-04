//Pick<T, K>
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
//Readonly<T>
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };
//Tuple to Object
type TupleToObject<T extends readonly any[]> = { [P in T[number]]: P };
//First<T>
type First<T extends any[]> = T extends [] ? never : T[0];
//Length of Tuple
type Length<T extends readonly any[]> = T["length"];
//Exclude<T, U>
type MyExclude<T, U> = T extends U ? never : T;
//MyAwaited<ExampleType>
type MyAwaited<T> = T extends PromiseLike<infer P> ? MyAwaited<P> : T;
//If<C, T, F>
type If<C extends boolean, T, F> = C extends true ? T : F;
//Concat
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
//Includes
type Includes<T extends readonly any[], U> = T extends [
  infer Head,
  ...infer Tail
]
  ? (<G>() => G extends U ? 1 : 2) extends <G>() => G extends Head ? 1 : 2
    ? true
    : Includes<Tail, U>
  : false;

//Push
type Push<T extends any[], U> = [...T, U];
//Unshift
type Unshift<T extends any[], U> = [U, ...T];
//Parameters
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : T;
//ReturnType<T>
type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : T;
//Omit<T, K>
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
//MyReadonly2<T, K>
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & { readonly [P in K]: T[P] };
//Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
//TupleToUnion<T>
type TupleToUnion<T extends readonly any[]> = T[number];
//Chainable Options
type Chainable<Opt = {}> = {
  option<K extends string, V>(
    key: K extends keyof Opt ? never : K,
    value: V
  ): Chainable<
    { [P in keyof Opt as P extends K ? never : P]: Opt[P] } & { [P in K]: V }
  >;
  get(): Opt;
};
//Pop<T>
type Pop<T extends any[]> = T extends [...infer P, infer K] ? P : T;
//Last<T>
type Last<T extends any[]> = T extends [...any, infer K] ? K : never;

//LookUp
type LookUp<U, T> = U extends { type: T } ? U : never;
//TrimLeft
type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer P}`
  ? TrimLeft<P>
  : S;
//Trim
type Trim<S extends string> = S extends `${" " | "\n" | "\t"}${infer P}`
  ? Trim<P>
  : S extends `${infer P}${" " | "\n" | "\t"}`
  ? Trim<P>
  : S;
//Capitalize<T>
type MyCapitalize<S extends string> = S extends `${infer P}${infer T}`
  ? `${Uppercase<P>}${T}`
  : S;
//Append Argument
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer Ar
) => infer Res
  ? (...args: [...Ar, A]) => Res
  : never;
//Replace
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer A}${From}${infer B}`
  ? `${A}${To}${B}`
  : S;
//ReplaceAll<S, From, To>
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer A}${From}${infer B}`
  ? `${A}${To}${ReplaceAll<B, From, To>}`
  : S;

//IsAlphabet
type IsAlphabet<S extends string> = Uppercase<S> extends Lowercase<S>
  ? false
  : true;
//LongestCommonPrefix
type LongestCommonPrefix<
  T extends string[],
  P extends string = ""
> = T extends [`${P}${infer K}${any}`, ...any]
  ? T extends `${P}${K}${any}`[]
    ? LongestCommonPrefix<T, `${P}${K}`>
    : P
  : P;
//Compare Array Length
type CompareArrayLength<T extends any[], U extends any[]> = T extends [
  infer Head1,
  ...infer Tail1
]
  ? U extends [infer Head2, ...infer Tail2]
    ? CompareArrayLength<Tail1, Tail2>
    : 1
  : U extends [infer Head3, ...infer Tail3]
  ? -1
  : 0;
//Flatten

type Flatten<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [...Flatten<Head>, ...Flatten<Tail>]
  : [T];
//AnyOf
type False = 0 | "" | false | [] | { [P in any]: never } | null | undefined;
type AnyOf<T extends readonly any[]> = T extends [infer Head, ...infer Tail]
  ? Head extends False
    ? AnyOf<Tail>
    : true
  : T extends False
  ? false
  : true;
//Shift
type Shift<T extends any[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Tail
  : T;
//FlipArgs
type Reverse<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [...Reverse<Tail>, Head]
  : [];
type FlipArguments<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: infer Ar
) => infer Res
  ? (...args: Reverse<Ar>) => Res
  : never;

//IndexOf
type IndexOf<T extends any[], U, Arr extends any[] = []> = T extends [
  infer Head,
  ...infer Tail
]
  ? U extends Head
    ? Arr["length"]
    : IndexOf<Tail, U, [...Arr, Head]>
  : -1;

//Join
type Join<
  T extends string[],
  U extends string | number = ",",
  Str extends string = ""
> = T extends [infer Head extends string, ...infer Tail extends string[]]
  ? Tail["length"] extends 0
    ? `${Str}${Head}`
    : Join<Tail, U, `${Str}${Head}${U}`>
  : Str;

//LastIndexOf
type LastIndexOf<T extends any[], U> = T extends [...infer Head, infer Tail]
  ? U extends Tail
    ? Head["length"]
    : LastIndexOf<Head, U>
  : -1;

//All
type All<T extends any[], U> = T extends [infer Head, ...infer Tail]
  ? U extends Head
    ? All<Tail, U>
    : false
  : true;
//Filter
type Filter<T extends any[], P> = T extends [infer Head, ...infer Tail]
  ? Head extends P
    ? [Head, ...Filter<Tail, P>]
    : Filter<Tail, P>
  : [];

//DropChar
type DropChar<
  S extends string,
  C extends string
> = S extends `${infer Head}${C}${infer Tail}`
  ? DropChar<`${Head}${Tail}`, C>
  : S;

//ParseUrlParams
type ParseUrlParams<
  T extends string,
  Types extends string = never
> = T extends `${string}:${infer Params}`
  ? Params extends `${infer First}/${infer Rest}`
    ? ParseUrlParams<Rest, Types | First>
    : Types | Params
  : Types;
//Absolute
type Absolute<T extends number | string | bigint> =
  `${T}` extends `-${infer Num}` ? Num : `${T}`;
//Merge
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never;
};
//Diff
type Diff<O, O1> = {
  [P in keyof O | keyof O1 as P extends keyof O & keyof O1
    ? never
    : P]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never;
};
//PickByType
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };
//OmiitByType
type OmitByType<T, U> = { [P in keyof T as T[P] extends U ? never : P]: T[P] };
//Flip
type Flip<T> = {
  [P in keyof T as T[P] extends string | number | boolean
    ? `${T[P]}`
    : never]: P;
};
//AppendToObject
type AppendToObject<T, U extends string | number | symbol, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};
//PublicType
type PublicType<T extends object> = {
  [P in keyof T as P extends `_${infer K}` ? never : P]: T[P];
};
//CheckRepeatedChars
type CheckRepeatedChars<T extends string> =
  T extends `${infer Head}${infer Tail}`
    ? Tail extends `${string}${Head}${string}`
      ? true
      : CheckRepeatedChars<`${Tail}`>
    : false;

//FindAll
type FindAll<
  T extends string,
  P extends string,
  Arr extends any[] = [],
  Indexes extends any[] = []
> = P extends ""
  ? []
  : T extends `${string}${infer Rest}`
  ? FindAll<
      Rest,
      P,
      [...Arr, 0],
      T extends `${P}${string}` ? [...Indexes, Arr["length"]] : Indexes
    >
  : Indexes;
//IsOdd

type Odd = "1" | "3" | "5" | "7" | "9";
type IsOdd<T extends number> = `${T}` extends `${infer Head}.${string}`
  ? Head extends number
    ? IsOdd<Head>
    : false
  : `${T}` extends `${string}${Odd}`
  ? true
  : false;
//FirstUniqueCharIndex
type IsInString<
  T extends string,
  L extends string
> = T extends `${infer Head}${infer Tail}`
  ? L extends Head
    ? true
    : IsInString<Tail, L>
  : false;

type FirstUniqueCharIndex<
  T extends string,
  Arr extends any[] = [],
  Used = never
> = T extends `${infer Head}${infer Tail}`
  ? IsInString<Tail, Head> extends true
    ? FirstUniqueCharIndex<Tail, [...Arr, Head], Used | Head>
    : Head extends Used
    ? FirstUniqueCharIndex<Tail, [...Arr, Head], Used | Head>
    : Arr["length"]
  : -1;

//IsNever
type IsNever<T> = (<G>() => T) extends <G>() => never ? true : false;
//ReplaceKeys
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
};

//PercentageParser
type PlusMinus = "+" | "-";
type ParseMinus<A extends string> = A extends `${infer Head}${string}`
  ? Head extends PlusMinus
    ? Head
    : ""
  : "";
type ParsePecent<A extends string> = A extends `${string}%` ? "%" : "";
type ParseNumber<A extends string> =
  A extends `${ParseMinus<A>}${infer Middle}${ParsePecent<A>}` ? Middle : "";
type PercentageParser<A extends string> = [
  ParseMinus<A>,
  ParseNumber<A>,
  ParsePecent<A>
];

//GreaterThan
type ArrFromNum<
  T extends number,
  Arr extends any[] = []
> = Arr["length"] extends T ? Arr : ArrFromNum<T, [...Arr, 0]>;
type GreaterThan<T extends number, U extends number> = ArrFromNum<T> extends [
  ...ArrFromNum<U>,
  ...infer Rest
]
  ? Rest["length"] extends 0
    ? false
    : true
  : false;

//Zip
type Zip<
  T extends any[],
  U extends any[],
  Curr extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? U extends [infer Head, ...infer Tail]
    ? Zip<Rest, Tail, [...Curr, [First, Head]]>
    : Curr
  : Curr;
//Chunk

type Chunk<
  T extends any[],
  N extends number,
  Curr extends any[] = []
> = T extends [infer Head, ...infer Tail]
  ? Curr["length"] extends N
    ? [Curr, ...Chunk<Tail, N, [Head]>]
    : Chunk<Tail, N, [...Curr, Head]>
  : Curr extends []
  ? Curr
  : [Curr];

//InRange

type InRange<
  Index extends number,
  Start extends number,
  End extends number
> = GreaterThan<Index, Start> extends true
  ? GreaterThan<End, Index>
  : Start extends Index
  ? GreaterThan<End, Index>
  : false;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Curr extends any[] = []
> = T extends [infer Head, ...infer Tail]
  ? [
      InRange<Curr["length"], Start, End> extends true ? N : Head,
      ...Fill<Tail, N, Start, End, [...Curr, 0]>
    ]
  : T;
//Without
type Contains<Arr, Num> = Arr extends [infer Head, ...infer Tail]
  ? Head extends Num
    ? true
    : Contains<Tail, Num>
  : Arr extends Num
  ? true
  : false;

type Without<T, U> = T extends [infer Head, ...infer Tail]
  ? Contains<U, Head> extends true
    ? Without<Tail, U>
    : [Head, ...Without<Tail, U>]
  : T;
//Trunc
type Trunc<T extends string | number> = `${T}` extends `${infer Head}.${string}`
  ? Head extends ""
    ? "0"
    : Head extends "-"
    ? "-0"
    : `${Head}`
  : `${T}`;

//Unique
type Unique<T extends any[]> = T extends [...infer Head, infer Tail]
  ? Tail extends Head[number]
    ? Unique<Head>
    : [...Unique<Head>, Tail]
  : T;
//GetMiddleElement
type GetMiddleElement<T extends any[]> = T extends [
  infer Head,
  ...infer Middle,
  infer Tail
]
  ? Middle extends []
    ? [Head, Tail]
    : GetMiddleElement<Middle>
  : T;

//
type GreaterOrEqualThan<
  T extends number,
  U extends number
> = ArrFromNum<T> extends [...ArrFromNum<U>, ...infer Rest] ? true : false;

type InRangeIncluding<
  Index extends number,
  Start extends number,
  End extends number
> = GreaterOrEqualThan<Index, Start> extends true
  ? GreaterOrEqualThan<End, Index>
  : false;

type NumberRange<
  L extends number,
  H extends number,
  Arr extends any[] = [],
  Types = never
> = Arr["length"] extends H
  ? Types | Arr["length"]
  : NumberRange<
      L,
      H,
      [...Arr, 0],
      | Types
      | (InRangeIncluding<Arr["length"], L, H> extends true
          ? Arr["length"]
          : never)
    >;

//ConstructTuple
type ConstructTuple<
  L extends number,
  Tuple extends unknown[] = []
> = Tuple["length"] extends L ? Tuple : ConstructTuple<L, [...Tuple, unknown]>;

//MyUpeercase
interface Letters {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
}

type MyUppercase<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${Head extends keyof Letters ? Letters[Head] : Head}${MyUppercase<Tail>}`
  : T;
