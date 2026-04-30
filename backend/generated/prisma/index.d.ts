
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model ItemPhoto
 * 
 */
export type ItemPhoto = $Result.DefaultSelection<Prisma.$ItemPhotoPayload>
/**
 * Model ClaimRequest
 * 
 */
export type ClaimRequest = $Result.DefaultSelection<Prisma.$ClaimRequestPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  PUBLIC: 'PUBLIC',
  SECURITY: 'SECURITY',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ItemStatus: {
  REPORTED: 'REPORTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  CLAIMED: 'CLAIMED',
  EXPIRED: 'EXPIRED'
};

export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus]


export const ClaimStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus]


export const AuditAction: {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  CLAIM: 'CLAIM'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ItemStatus = $Enums.ItemStatus

export const ItemStatus: typeof $Enums.ItemStatus

export type ClaimStatus = $Enums.ClaimStatus

export const ClaimStatus: typeof $Enums.ClaimStatus

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs>;

  /**
   * `prisma.itemPhoto`: Exposes CRUD operations for the **ItemPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemPhotos
    * const itemPhotos = await prisma.itemPhoto.findMany()
    * ```
    */
  get itemPhoto(): Prisma.ItemPhotoDelegate<ExtArgs>;

  /**
   * `prisma.claimRequest`: Exposes CRUD operations for the **ClaimRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimRequests
    * const claimRequests = await prisma.claimRequest.findMany()
    * ```
    */
  get claimRequest(): Prisma.ClaimRequestDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Category: 'Category',
    Item: 'Item',
    ItemPhoto: 'ItemPhoto',
    ClaimRequest: 'ClaimRequest',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "category" | "item" | "itemPhoto" | "claimRequest" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      ItemPhoto: {
        payload: Prisma.$ItemPhotoPayload<ExtArgs>
        fields: Prisma.ItemPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          findFirst: {
            args: Prisma.ItemPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          findMany: {
            args: Prisma.ItemPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>[]
          }
          create: {
            args: Prisma.ItemPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          createMany: {
            args: Prisma.ItemPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>[]
          }
          delete: {
            args: Prisma.ItemPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          update: {
            args: Prisma.ItemPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          deleteMany: {
            args: Prisma.ItemPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPhotoPayload>
          }
          aggregate: {
            args: Prisma.ItemPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemPhoto>
          }
          groupBy: {
            args: Prisma.ItemPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<ItemPhotoCountAggregateOutputType> | number
          }
        }
      }
      ClaimRequest: {
        payload: Prisma.$ClaimRequestPayload<ExtArgs>
        fields: Prisma.ClaimRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          findFirst: {
            args: Prisma.ClaimRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          findMany: {
            args: Prisma.ClaimRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>[]
          }
          create: {
            args: Prisma.ClaimRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          createMany: {
            args: Prisma.ClaimRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>[]
          }
          delete: {
            args: Prisma.ClaimRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          update: {
            args: Prisma.ClaimRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          deleteMany: {
            args: Prisma.ClaimRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClaimRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimRequestPayload>
          }
          aggregate: {
            args: Prisma.ClaimRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimRequest>
          }
          groupBy: {
            args: Prisma.ClaimRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimRequestCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    itemsRecorded: number
    itemsApproved: number
    itemsVerified: number
    claims: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsRecorded?: boolean | UserCountOutputTypeCountItemsRecordedArgs
    itemsApproved?: boolean | UserCountOutputTypeCountItemsApprovedArgs
    itemsVerified?: boolean | UserCountOutputTypeCountItemsVerifiedArgs
    claims?: boolean | UserCountOutputTypeCountClaimsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsVerifiedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    items: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CategoryCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    claims: number
    photos: number
    audit_logs: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | ItemCountOutputTypeCountClaimsArgs
    photos?: boolean | ItemCountOutputTypeCountPhotosArgs
    audit_logs?: boolean | ItemCountOutputTypeCountAudit_logsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPhotoWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    user_id: string | null
    name: string | null
    phone: string | null
    personal_email: string | null
    uni_email: string | null
    role: $Enums.UserRole | null
    affiliation: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: string | null
    name: string | null
    phone: string | null
    personal_email: string | null
    uni_email: string | null
    role: $Enums.UserRole | null
    affiliation: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    name: number
    phone: number
    personal_email: number
    uni_email: number
    role: number
    affiliation: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    user_id?: true
    name?: true
    phone?: true
    personal_email?: true
    uni_email?: true
    role?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    name?: true
    phone?: true
    personal_email?: true
    uni_email?: true
    role?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    name?: true
    phone?: true
    personal_email?: true
    uni_email?: true
    role?: true
    affiliation?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: string
    name: string
    phone: string | null
    personal_email: string | null
    uni_email: string | null
    role: $Enums.UserRole
    affiliation: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    phone?: boolean
    personal_email?: boolean
    uni_email?: boolean
    role?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    itemsRecorded?: boolean | User$itemsRecordedArgs<ExtArgs>
    itemsApproved?: boolean | User$itemsApprovedArgs<ExtArgs>
    itemsVerified?: boolean | User$itemsVerifiedArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    phone?: boolean
    personal_email?: boolean
    uni_email?: boolean
    role?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    name?: boolean
    phone?: boolean
    personal_email?: boolean
    uni_email?: boolean
    role?: boolean
    affiliation?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsRecorded?: boolean | User$itemsRecordedArgs<ExtArgs>
    itemsApproved?: boolean | User$itemsApprovedArgs<ExtArgs>
    itemsVerified?: boolean | User$itemsVerifiedArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      itemsRecorded: Prisma.$ItemPayload<ExtArgs>[]
      itemsApproved: Prisma.$ItemPayload<ExtArgs>[]
      itemsVerified: Prisma.$ItemPayload<ExtArgs>[]
      claims: Prisma.$ClaimRequestPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      name: string
      phone: string | null
      personal_email: string | null
      uni_email: string | null
      role: $Enums.UserRole
      affiliation: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({ 
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemsRecorded<T extends User$itemsRecordedArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsRecordedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    itemsApproved<T extends User$itemsApprovedArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsApprovedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    itemsVerified<T extends User$itemsVerifiedArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsVerifiedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    claims<T extends User$claimsArgs<ExtArgs> = {}>(args?: Subset<T, User$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly personal_email: FieldRef<"User", 'String'>
    readonly uni_email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly affiliation: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly deleted_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.itemsRecorded
   */
  export type User$itemsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.itemsApproved
   */
  export type User$itemsApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.itemsVerified
   */
  export type User$itemsVerifiedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.claims
   */
  export type User$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    where?: ClaimRequestWhereInput
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    cursor?: ClaimRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    category_id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    category_id: string | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    category_id: number
    name: number
    description: number
    created_at: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    category_id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type CategoryMaxAggregateInputType = {
    category_id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type CategoryCountAggregateInputType = {
    category_id?: true
    name?: true
    description?: true
    created_at?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    category_id: string
    name: string
    description: string | null
    created_at: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    category_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    items?: boolean | Category$itemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    category_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    category_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Category$itemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      items: Prisma.$ItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      category_id: string
      name: string
      description: string | null
      created_at: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `category_id`
     * const categoryWithCategory_idOnly = await prisma.category.findMany({ select: { category_id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `category_id`
     * const categoryWithCategory_idOnly = await prisma.category.createManyAndReturn({ 
     *   select: { category_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Category$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Category$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly category_id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly created_at: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.items
   */
  export type Category$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemMinAggregateOutputType = {
    item_id: string | null
    name: string | null
    description: string | null
    color_hex: string | null
    color_bucket: string | null
    status: $Enums.ItemStatus | null
    category_id: string | null
    found_location: string | null
    found_at: Date | null
    expires_at: Date | null
    ownership_proof: string | null
    verification_notes: string | null
    verified_by: string | null
    verified_at: Date | null
    recorded_by: string | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    item_id: string | null
    name: string | null
    description: string | null
    color_hex: string | null
    color_bucket: string | null
    status: $Enums.ItemStatus | null
    category_id: string | null
    found_location: string | null
    found_at: Date | null
    expires_at: Date | null
    ownership_proof: string | null
    verification_notes: string | null
    verified_by: string | null
    verified_at: Date | null
    recorded_by: string | null
    approved_by: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ItemCountAggregateOutputType = {
    item_id: number
    name: number
    description: number
    color_hex: number
    color_bucket: number
    status: number
    category_id: number
    found_location: number
    found_at: number
    expires_at: number
    ownership_proof: number
    verification_notes: number
    verified_by: number
    verified_at: number
    recorded_by: number
    approved_by: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type ItemMinAggregateInputType = {
    item_id?: true
    name?: true
    description?: true
    color_hex?: true
    color_bucket?: true
    status?: true
    category_id?: true
    found_location?: true
    found_at?: true
    expires_at?: true
    ownership_proof?: true
    verification_notes?: true
    verified_by?: true
    verified_at?: true
    recorded_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ItemMaxAggregateInputType = {
    item_id?: true
    name?: true
    description?: true
    color_hex?: true
    color_bucket?: true
    status?: true
    category_id?: true
    found_location?: true
    found_at?: true
    expires_at?: true
    ownership_proof?: true
    verification_notes?: true
    verified_by?: true
    verified_at?: true
    recorded_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ItemCountAggregateInputType = {
    item_id?: true
    name?: true
    description?: true
    color_hex?: true
    color_bucket?: true
    status?: true
    category_id?: true
    found_location?: true
    found_at?: true
    expires_at?: true
    ownership_proof?: true
    verification_notes?: true
    verified_by?: true
    verified_at?: true
    recorded_by?: true
    approved_by?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    item_id: string
    name: string
    description: string | null
    color_hex: string | null
    color_bucket: string | null
    status: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date
    expires_at: Date | null
    ownership_proof: string | null
    verification_notes: string | null
    verified_by: string | null
    verified_at: Date | null
    recorded_by: string
    approved_by: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: ItemCountAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_id?: boolean
    name?: boolean
    description?: boolean
    color_hex?: boolean
    color_bucket?: boolean
    status?: boolean
    category_id?: boolean
    found_location?: boolean
    found_at?: boolean
    expires_at?: boolean
    ownership_proof?: boolean
    verification_notes?: boolean
    verified_by?: boolean
    verified_at?: boolean
    recorded_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    verified_user?: boolean | Item$verified_userArgs<ExtArgs>
    recorder?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Item$approverArgs<ExtArgs>
    claims?: boolean | Item$claimsArgs<ExtArgs>
    photos?: boolean | Item$photosArgs<ExtArgs>
    audit_logs?: boolean | Item$audit_logsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_id?: boolean
    name?: boolean
    description?: boolean
    color_hex?: boolean
    color_bucket?: boolean
    status?: boolean
    category_id?: boolean
    found_location?: boolean
    found_at?: boolean
    expires_at?: boolean
    ownership_proof?: boolean
    verification_notes?: boolean
    verified_by?: boolean
    verified_at?: boolean
    recorded_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    verified_user?: boolean | Item$verified_userArgs<ExtArgs>
    recorder?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Item$approverArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    item_id?: boolean
    name?: boolean
    description?: boolean
    color_hex?: boolean
    color_bucket?: boolean
    status?: boolean
    category_id?: boolean
    found_location?: boolean
    found_at?: boolean
    expires_at?: boolean
    ownership_proof?: boolean
    verification_notes?: boolean
    verified_by?: boolean
    verified_at?: boolean
    recorded_by?: boolean
    approved_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    verified_user?: boolean | Item$verified_userArgs<ExtArgs>
    recorder?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Item$approverArgs<ExtArgs>
    claims?: boolean | Item$claimsArgs<ExtArgs>
    photos?: boolean | Item$photosArgs<ExtArgs>
    audit_logs?: boolean | Item$audit_logsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    verified_user?: boolean | Item$verified_userArgs<ExtArgs>
    recorder?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Item$approverArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      verified_user: Prisma.$UserPayload<ExtArgs> | null
      recorder: Prisma.$UserPayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs> | null
      claims: Prisma.$ClaimRequestPayload<ExtArgs>[]
      photos: Prisma.$ItemPhotoPayload<ExtArgs>[]
      audit_logs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      item_id: string
      name: string
      description: string | null
      color_hex: string | null
      color_bucket: string | null
      status: $Enums.ItemStatus
      category_id: string
      found_location: string
      found_at: Date
      expires_at: Date | null
      ownership_proof: string | null
      verification_notes: string | null
      verified_by: string | null
      verified_at: Date | null
      recorded_by: string
      approved_by: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `item_id`
     * const itemWithItem_idOnly = await prisma.item.findMany({ select: { item_id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `item_id`
     * const itemWithItem_idOnly = await prisma.item.createManyAndReturn({ 
     *   select: { item_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    verified_user<T extends Item$verified_userArgs<ExtArgs> = {}>(args?: Subset<T, Item$verified_userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    recorder<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    approver<T extends Item$approverArgs<ExtArgs> = {}>(args?: Subset<T, Item$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    claims<T extends Item$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Item$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany"> | Null>
    photos<T extends Item$photosArgs<ExtArgs> = {}>(args?: Subset<T, Item$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findMany"> | Null>
    audit_logs<T extends Item$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, Item$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */ 
  interface ItemFieldRefs {
    readonly item_id: FieldRef<"Item", 'String'>
    readonly name: FieldRef<"Item", 'String'>
    readonly description: FieldRef<"Item", 'String'>
    readonly color_hex: FieldRef<"Item", 'String'>
    readonly color_bucket: FieldRef<"Item", 'String'>
    readonly status: FieldRef<"Item", 'ItemStatus'>
    readonly category_id: FieldRef<"Item", 'String'>
    readonly found_location: FieldRef<"Item", 'String'>
    readonly found_at: FieldRef<"Item", 'DateTime'>
    readonly expires_at: FieldRef<"Item", 'DateTime'>
    readonly ownership_proof: FieldRef<"Item", 'String'>
    readonly verification_notes: FieldRef<"Item", 'String'>
    readonly verified_by: FieldRef<"Item", 'String'>
    readonly verified_at: FieldRef<"Item", 'DateTime'>
    readonly recorded_by: FieldRef<"Item", 'String'>
    readonly approved_by: FieldRef<"Item", 'String'>
    readonly created_at: FieldRef<"Item", 'DateTime'>
    readonly updated_at: FieldRef<"Item", 'DateTime'>
    readonly deleted_at: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
  }

  /**
   * Item.verified_user
   */
  export type Item$verified_userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Item.approver
   */
  export type Item$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Item.claims
   */
  export type Item$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    where?: ClaimRequestWhereInput
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    cursor?: ClaimRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * Item.photos
   */
  export type Item$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    where?: ItemPhotoWhereInput
    orderBy?: ItemPhotoOrderByWithRelationInput | ItemPhotoOrderByWithRelationInput[]
    cursor?: ItemPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemPhotoScalarFieldEnum | ItemPhotoScalarFieldEnum[]
  }

  /**
   * Item.audit_logs
   */
  export type Item$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model ItemPhoto
   */

  export type AggregateItemPhoto = {
    _count: ItemPhotoCountAggregateOutputType | null
    _avg: ItemPhotoAvgAggregateOutputType | null
    _sum: ItemPhotoSumAggregateOutputType | null
    _min: ItemPhotoMinAggregateOutputType | null
    _max: ItemPhotoMaxAggregateOutputType | null
  }

  export type ItemPhotoAvgAggregateOutputType = {
    size: number | null
  }

  export type ItemPhotoSumAggregateOutputType = {
    size: number | null
  }

  export type ItemPhotoMinAggregateOutputType = {
    photo_id: string | null
    item_id: string | null
    storage_url: string | null
    file_key: string | null
    mime_type: string | null
    size: number | null
    uploaded_at: Date | null
  }

  export type ItemPhotoMaxAggregateOutputType = {
    photo_id: string | null
    item_id: string | null
    storage_url: string | null
    file_key: string | null
    mime_type: string | null
    size: number | null
    uploaded_at: Date | null
  }

  export type ItemPhotoCountAggregateOutputType = {
    photo_id: number
    item_id: number
    storage_url: number
    file_key: number
    mime_type: number
    size: number
    uploaded_at: number
    _all: number
  }


  export type ItemPhotoAvgAggregateInputType = {
    size?: true
  }

  export type ItemPhotoSumAggregateInputType = {
    size?: true
  }

  export type ItemPhotoMinAggregateInputType = {
    photo_id?: true
    item_id?: true
    storage_url?: true
    file_key?: true
    mime_type?: true
    size?: true
    uploaded_at?: true
  }

  export type ItemPhotoMaxAggregateInputType = {
    photo_id?: true
    item_id?: true
    storage_url?: true
    file_key?: true
    mime_type?: true
    size?: true
    uploaded_at?: true
  }

  export type ItemPhotoCountAggregateInputType = {
    photo_id?: true
    item_id?: true
    storage_url?: true
    file_key?: true
    mime_type?: true
    size?: true
    uploaded_at?: true
    _all?: true
  }

  export type ItemPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPhoto to aggregate.
     */
    where?: ItemPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPhotos to fetch.
     */
    orderBy?: ItemPhotoOrderByWithRelationInput | ItemPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemPhotos
    **/
    _count?: true | ItemPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemPhotoMaxAggregateInputType
  }

  export type GetItemPhotoAggregateType<T extends ItemPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateItemPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemPhoto[P]>
      : GetScalarType<T[P], AggregateItemPhoto[P]>
  }




  export type ItemPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPhotoWhereInput
    orderBy?: ItemPhotoOrderByWithAggregationInput | ItemPhotoOrderByWithAggregationInput[]
    by: ItemPhotoScalarFieldEnum[] | ItemPhotoScalarFieldEnum
    having?: ItemPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemPhotoCountAggregateInputType | true
    _avg?: ItemPhotoAvgAggregateInputType
    _sum?: ItemPhotoSumAggregateInputType
    _min?: ItemPhotoMinAggregateInputType
    _max?: ItemPhotoMaxAggregateInputType
  }

  export type ItemPhotoGroupByOutputType = {
    photo_id: string
    item_id: string
    storage_url: string
    file_key: string | null
    mime_type: string | null
    size: number | null
    uploaded_at: Date
    _count: ItemPhotoCountAggregateOutputType | null
    _avg: ItemPhotoAvgAggregateOutputType | null
    _sum: ItemPhotoSumAggregateOutputType | null
    _min: ItemPhotoMinAggregateOutputType | null
    _max: ItemPhotoMaxAggregateOutputType | null
  }

  type GetItemPhotoGroupByPayload<T extends ItemPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], ItemPhotoGroupByOutputType[P]>
        }
      >
    >


  export type ItemPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    item_id?: boolean
    storage_url?: boolean
    file_key?: boolean
    mime_type?: boolean
    size?: boolean
    uploaded_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPhoto"]>

  export type ItemPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    item_id?: boolean
    storage_url?: boolean
    file_key?: boolean
    mime_type?: boolean
    size?: boolean
    uploaded_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPhoto"]>

  export type ItemPhotoSelectScalar = {
    photo_id?: boolean
    item_id?: boolean
    storage_url?: boolean
    file_key?: boolean
    mime_type?: boolean
    size?: boolean
    uploaded_at?: boolean
  }

  export type ItemPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemPhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $ItemPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemPhoto"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      photo_id: string
      item_id: string
      storage_url: string
      file_key: string | null
      mime_type: string | null
      size: number | null
      uploaded_at: Date
    }, ExtArgs["result"]["itemPhoto"]>
    composites: {}
  }

  type ItemPhotoGetPayload<S extends boolean | null | undefined | ItemPhotoDefaultArgs> = $Result.GetResult<Prisma.$ItemPhotoPayload, S>

  type ItemPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ItemPhotoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ItemPhotoCountAggregateInputType | true
    }

  export interface ItemPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemPhoto'], meta: { name: 'ItemPhoto' } }
    /**
     * Find zero or one ItemPhoto that matches the filter.
     * @param {ItemPhotoFindUniqueArgs} args - Arguments to find a ItemPhoto
     * @example
     * // Get one ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemPhotoFindUniqueArgs>(args: SelectSubset<T, ItemPhotoFindUniqueArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ItemPhoto that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ItemPhotoFindUniqueOrThrowArgs} args - Arguments to find a ItemPhoto
     * @example
     * // Get one ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ItemPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoFindFirstArgs} args - Arguments to find a ItemPhoto
     * @example
     * // Get one ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemPhotoFindFirstArgs>(args?: SelectSubset<T, ItemPhotoFindFirstArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ItemPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoFindFirstOrThrowArgs} args - Arguments to find a ItemPhoto
     * @example
     * // Get one ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ItemPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemPhotos
     * const itemPhotos = await prisma.itemPhoto.findMany()
     * 
     * // Get first 10 ItemPhotos
     * const itemPhotos = await prisma.itemPhoto.findMany({ take: 10 })
     * 
     * // Only select the `photo_id`
     * const itemPhotoWithPhoto_idOnly = await prisma.itemPhoto.findMany({ select: { photo_id: true } })
     * 
     */
    findMany<T extends ItemPhotoFindManyArgs>(args?: SelectSubset<T, ItemPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ItemPhoto.
     * @param {ItemPhotoCreateArgs} args - Arguments to create a ItemPhoto.
     * @example
     * // Create one ItemPhoto
     * const ItemPhoto = await prisma.itemPhoto.create({
     *   data: {
     *     // ... data to create a ItemPhoto
     *   }
     * })
     * 
     */
    create<T extends ItemPhotoCreateArgs>(args: SelectSubset<T, ItemPhotoCreateArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ItemPhotos.
     * @param {ItemPhotoCreateManyArgs} args - Arguments to create many ItemPhotos.
     * @example
     * // Create many ItemPhotos
     * const itemPhoto = await prisma.itemPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemPhotoCreateManyArgs>(args?: SelectSubset<T, ItemPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemPhotos and returns the data saved in the database.
     * @param {ItemPhotoCreateManyAndReturnArgs} args - Arguments to create many ItemPhotos.
     * @example
     * // Create many ItemPhotos
     * const itemPhoto = await prisma.itemPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemPhotos and only return the `photo_id`
     * const itemPhotoWithPhoto_idOnly = await prisma.itemPhoto.createManyAndReturn({ 
     *   select: { photo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ItemPhoto.
     * @param {ItemPhotoDeleteArgs} args - Arguments to delete one ItemPhoto.
     * @example
     * // Delete one ItemPhoto
     * const ItemPhoto = await prisma.itemPhoto.delete({
     *   where: {
     *     // ... filter to delete one ItemPhoto
     *   }
     * })
     * 
     */
    delete<T extends ItemPhotoDeleteArgs>(args: SelectSubset<T, ItemPhotoDeleteArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ItemPhoto.
     * @param {ItemPhotoUpdateArgs} args - Arguments to update one ItemPhoto.
     * @example
     * // Update one ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemPhotoUpdateArgs>(args: SelectSubset<T, ItemPhotoUpdateArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ItemPhotos.
     * @param {ItemPhotoDeleteManyArgs} args - Arguments to filter ItemPhotos to delete.
     * @example
     * // Delete a few ItemPhotos
     * const { count } = await prisma.itemPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemPhotoDeleteManyArgs>(args?: SelectSubset<T, ItemPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemPhotos
     * const itemPhoto = await prisma.itemPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemPhotoUpdateManyArgs>(args: SelectSubset<T, ItemPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemPhoto.
     * @param {ItemPhotoUpsertArgs} args - Arguments to update or create a ItemPhoto.
     * @example
     * // Update or create a ItemPhoto
     * const itemPhoto = await prisma.itemPhoto.upsert({
     *   create: {
     *     // ... data to create a ItemPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemPhoto we want to update
     *   }
     * })
     */
    upsert<T extends ItemPhotoUpsertArgs>(args: SelectSubset<T, ItemPhotoUpsertArgs<ExtArgs>>): Prisma__ItemPhotoClient<$Result.GetResult<Prisma.$ItemPhotoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ItemPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoCountArgs} args - Arguments to filter ItemPhotos to count.
     * @example
     * // Count the number of ItemPhotos
     * const count = await prisma.itemPhoto.count({
     *   where: {
     *     // ... the filter for the ItemPhotos we want to count
     *   }
     * })
    **/
    count<T extends ItemPhotoCountArgs>(
      args?: Subset<T, ItemPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemPhotoAggregateArgs>(args: Subset<T, ItemPhotoAggregateArgs>): Prisma.PrismaPromise<GetItemPhotoAggregateType<T>>

    /**
     * Group by ItemPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemPhotoGroupByArgs['orderBy'] }
        : { orderBy?: ItemPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemPhoto model
   */
  readonly fields: ItemPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemPhoto model
   */ 
  interface ItemPhotoFieldRefs {
    readonly photo_id: FieldRef<"ItemPhoto", 'String'>
    readonly item_id: FieldRef<"ItemPhoto", 'String'>
    readonly storage_url: FieldRef<"ItemPhoto", 'String'>
    readonly file_key: FieldRef<"ItemPhoto", 'String'>
    readonly mime_type: FieldRef<"ItemPhoto", 'String'>
    readonly size: FieldRef<"ItemPhoto", 'Int'>
    readonly uploaded_at: FieldRef<"ItemPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemPhoto findUnique
   */
  export type ItemPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPhoto to fetch.
     */
    where: ItemPhotoWhereUniqueInput
  }

  /**
   * ItemPhoto findUniqueOrThrow
   */
  export type ItemPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPhoto to fetch.
     */
    where: ItemPhotoWhereUniqueInput
  }

  /**
   * ItemPhoto findFirst
   */
  export type ItemPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPhoto to fetch.
     */
    where?: ItemPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPhotos to fetch.
     */
    orderBy?: ItemPhotoOrderByWithRelationInput | ItemPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPhotos.
     */
    cursor?: ItemPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPhotos.
     */
    distinct?: ItemPhotoScalarFieldEnum | ItemPhotoScalarFieldEnum[]
  }

  /**
   * ItemPhoto findFirstOrThrow
   */
  export type ItemPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPhoto to fetch.
     */
    where?: ItemPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPhotos to fetch.
     */
    orderBy?: ItemPhotoOrderByWithRelationInput | ItemPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPhotos.
     */
    cursor?: ItemPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPhotos.
     */
    distinct?: ItemPhotoScalarFieldEnum | ItemPhotoScalarFieldEnum[]
  }

  /**
   * ItemPhoto findMany
   */
  export type ItemPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPhotos to fetch.
     */
    where?: ItemPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPhotos to fetch.
     */
    orderBy?: ItemPhotoOrderByWithRelationInput | ItemPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemPhotos.
     */
    cursor?: ItemPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPhotos.
     */
    skip?: number
    distinct?: ItemPhotoScalarFieldEnum | ItemPhotoScalarFieldEnum[]
  }

  /**
   * ItemPhoto create
   */
  export type ItemPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemPhoto.
     */
    data: XOR<ItemPhotoCreateInput, ItemPhotoUncheckedCreateInput>
  }

  /**
   * ItemPhoto createMany
   */
  export type ItemPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemPhotos.
     */
    data: ItemPhotoCreateManyInput | ItemPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemPhoto createManyAndReturn
   */
  export type ItemPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ItemPhotos.
     */
    data: ItemPhotoCreateManyInput | ItemPhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemPhoto update
   */
  export type ItemPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemPhoto.
     */
    data: XOR<ItemPhotoUpdateInput, ItemPhotoUncheckedUpdateInput>
    /**
     * Choose, which ItemPhoto to update.
     */
    where: ItemPhotoWhereUniqueInput
  }

  /**
   * ItemPhoto updateMany
   */
  export type ItemPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemPhotos.
     */
    data: XOR<ItemPhotoUpdateManyMutationInput, ItemPhotoUncheckedUpdateManyInput>
    /**
     * Filter which ItemPhotos to update
     */
    where?: ItemPhotoWhereInput
  }

  /**
   * ItemPhoto upsert
   */
  export type ItemPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemPhoto to update in case it exists.
     */
    where: ItemPhotoWhereUniqueInput
    /**
     * In case the ItemPhoto found by the `where` argument doesn't exist, create a new ItemPhoto with this data.
     */
    create: XOR<ItemPhotoCreateInput, ItemPhotoUncheckedCreateInput>
    /**
     * In case the ItemPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemPhotoUpdateInput, ItemPhotoUncheckedUpdateInput>
  }

  /**
   * ItemPhoto delete
   */
  export type ItemPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
    /**
     * Filter which ItemPhoto to delete.
     */
    where: ItemPhotoWhereUniqueInput
  }

  /**
   * ItemPhoto deleteMany
   */
  export type ItemPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPhotos to delete
     */
    where?: ItemPhotoWhereInput
  }

  /**
   * ItemPhoto without action
   */
  export type ItemPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPhoto
     */
    select?: ItemPhotoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPhotoInclude<ExtArgs> | null
  }


  /**
   * Model ClaimRequest
   */

  export type AggregateClaimRequest = {
    _count: ClaimRequestCountAggregateOutputType | null
    _min: ClaimRequestMinAggregateOutputType | null
    _max: ClaimRequestMaxAggregateOutputType | null
  }

  export type ClaimRequestMinAggregateOutputType = {
    claim_id: string | null
    item_id: string | null
    claimer_id: string | null
    status: $Enums.ClaimStatus | null
    ownership_desc: string | null
    verification_notes: string | null
    requested_at: Date | null
    resolved_at: Date | null
  }

  export type ClaimRequestMaxAggregateOutputType = {
    claim_id: string | null
    item_id: string | null
    claimer_id: string | null
    status: $Enums.ClaimStatus | null
    ownership_desc: string | null
    verification_notes: string | null
    requested_at: Date | null
    resolved_at: Date | null
  }

  export type ClaimRequestCountAggregateOutputType = {
    claim_id: number
    item_id: number
    claimer_id: number
    status: number
    ownership_desc: number
    verification_notes: number
    requested_at: number
    resolved_at: number
    _all: number
  }


  export type ClaimRequestMinAggregateInputType = {
    claim_id?: true
    item_id?: true
    claimer_id?: true
    status?: true
    ownership_desc?: true
    verification_notes?: true
    requested_at?: true
    resolved_at?: true
  }

  export type ClaimRequestMaxAggregateInputType = {
    claim_id?: true
    item_id?: true
    claimer_id?: true
    status?: true
    ownership_desc?: true
    verification_notes?: true
    requested_at?: true
    resolved_at?: true
  }

  export type ClaimRequestCountAggregateInputType = {
    claim_id?: true
    item_id?: true
    claimer_id?: true
    status?: true
    ownership_desc?: true
    verification_notes?: true
    requested_at?: true
    resolved_at?: true
    _all?: true
  }

  export type ClaimRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimRequest to aggregate.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimRequests
    **/
    _count?: true | ClaimRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimRequestMaxAggregateInputType
  }

  export type GetClaimRequestAggregateType<T extends ClaimRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimRequest[P]>
      : GetScalarType<T[P], AggregateClaimRequest[P]>
  }




  export type ClaimRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimRequestWhereInput
    orderBy?: ClaimRequestOrderByWithAggregationInput | ClaimRequestOrderByWithAggregationInput[]
    by: ClaimRequestScalarFieldEnum[] | ClaimRequestScalarFieldEnum
    having?: ClaimRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimRequestCountAggregateInputType | true
    _min?: ClaimRequestMinAggregateInputType
    _max?: ClaimRequestMaxAggregateInputType
  }

  export type ClaimRequestGroupByOutputType = {
    claim_id: string
    item_id: string
    claimer_id: string
    status: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes: string | null
    requested_at: Date
    resolved_at: Date | null
    _count: ClaimRequestCountAggregateOutputType | null
    _min: ClaimRequestMinAggregateOutputType | null
    _max: ClaimRequestMaxAggregateOutputType | null
  }

  type GetClaimRequestGroupByPayload<T extends ClaimRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimRequestGroupByOutputType[P]>
        }
      >
    >


  export type ClaimRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    claim_id?: boolean
    item_id?: boolean
    claimer_id?: boolean
    status?: boolean
    ownership_desc?: boolean
    verification_notes?: boolean
    requested_at?: boolean
    resolved_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
    claimer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    claim_id?: boolean
    item_id?: boolean
    claimer_id?: boolean
    status?: boolean
    ownership_desc?: boolean
    verification_notes?: boolean
    requested_at?: boolean
    resolved_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
    claimer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimRequest"]>

  export type ClaimRequestSelectScalar = {
    claim_id?: boolean
    item_id?: boolean
    claimer_id?: boolean
    status?: boolean
    ownership_desc?: boolean
    verification_notes?: boolean
    requested_at?: boolean
    resolved_at?: boolean
  }

  export type ClaimRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
    claimer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClaimRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
    claimer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClaimRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimRequest"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
      claimer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      claim_id: string
      item_id: string
      claimer_id: string
      status: $Enums.ClaimStatus
      ownership_desc: string
      verification_notes: string | null
      requested_at: Date
      resolved_at: Date | null
    }, ExtArgs["result"]["claimRequest"]>
    composites: {}
  }

  type ClaimRequestGetPayload<S extends boolean | null | undefined | ClaimRequestDefaultArgs> = $Result.GetResult<Prisma.$ClaimRequestPayload, S>

  type ClaimRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClaimRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClaimRequestCountAggregateInputType | true
    }

  export interface ClaimRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimRequest'], meta: { name: 'ClaimRequest' } }
    /**
     * Find zero or one ClaimRequest that matches the filter.
     * @param {ClaimRequestFindUniqueArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimRequestFindUniqueArgs>(args: SelectSubset<T, ClaimRequestFindUniqueArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ClaimRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClaimRequestFindUniqueOrThrowArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ClaimRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindFirstArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimRequestFindFirstArgs>(args?: SelectSubset<T, ClaimRequestFindFirstArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ClaimRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindFirstOrThrowArgs} args - Arguments to find a ClaimRequest
     * @example
     * // Get one ClaimRequest
     * const claimRequest = await prisma.claimRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ClaimRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimRequests
     * const claimRequests = await prisma.claimRequest.findMany()
     * 
     * // Get first 10 ClaimRequests
     * const claimRequests = await prisma.claimRequest.findMany({ take: 10 })
     * 
     * // Only select the `claim_id`
     * const claimRequestWithClaim_idOnly = await prisma.claimRequest.findMany({ select: { claim_id: true } })
     * 
     */
    findMany<T extends ClaimRequestFindManyArgs>(args?: SelectSubset<T, ClaimRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ClaimRequest.
     * @param {ClaimRequestCreateArgs} args - Arguments to create a ClaimRequest.
     * @example
     * // Create one ClaimRequest
     * const ClaimRequest = await prisma.claimRequest.create({
     *   data: {
     *     // ... data to create a ClaimRequest
     *   }
     * })
     * 
     */
    create<T extends ClaimRequestCreateArgs>(args: SelectSubset<T, ClaimRequestCreateArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ClaimRequests.
     * @param {ClaimRequestCreateManyArgs} args - Arguments to create many ClaimRequests.
     * @example
     * // Create many ClaimRequests
     * const claimRequest = await prisma.claimRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimRequestCreateManyArgs>(args?: SelectSubset<T, ClaimRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimRequests and returns the data saved in the database.
     * @param {ClaimRequestCreateManyAndReturnArgs} args - Arguments to create many ClaimRequests.
     * @example
     * // Create many ClaimRequests
     * const claimRequest = await prisma.claimRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimRequests and only return the `claim_id`
     * const claimRequestWithClaim_idOnly = await prisma.claimRequest.createManyAndReturn({ 
     *   select: { claim_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ClaimRequest.
     * @param {ClaimRequestDeleteArgs} args - Arguments to delete one ClaimRequest.
     * @example
     * // Delete one ClaimRequest
     * const ClaimRequest = await prisma.claimRequest.delete({
     *   where: {
     *     // ... filter to delete one ClaimRequest
     *   }
     * })
     * 
     */
    delete<T extends ClaimRequestDeleteArgs>(args: SelectSubset<T, ClaimRequestDeleteArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ClaimRequest.
     * @param {ClaimRequestUpdateArgs} args - Arguments to update one ClaimRequest.
     * @example
     * // Update one ClaimRequest
     * const claimRequest = await prisma.claimRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimRequestUpdateArgs>(args: SelectSubset<T, ClaimRequestUpdateArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ClaimRequests.
     * @param {ClaimRequestDeleteManyArgs} args - Arguments to filter ClaimRequests to delete.
     * @example
     * // Delete a few ClaimRequests
     * const { count } = await prisma.claimRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimRequestDeleteManyArgs>(args?: SelectSubset<T, ClaimRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimRequests
     * const claimRequest = await prisma.claimRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimRequestUpdateManyArgs>(args: SelectSubset<T, ClaimRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ClaimRequest.
     * @param {ClaimRequestUpsertArgs} args - Arguments to update or create a ClaimRequest.
     * @example
     * // Update or create a ClaimRequest
     * const claimRequest = await prisma.claimRequest.upsert({
     *   create: {
     *     // ... data to create a ClaimRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimRequest we want to update
     *   }
     * })
     */
    upsert<T extends ClaimRequestUpsertArgs>(args: SelectSubset<T, ClaimRequestUpsertArgs<ExtArgs>>): Prisma__ClaimRequestClient<$Result.GetResult<Prisma.$ClaimRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ClaimRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestCountArgs} args - Arguments to filter ClaimRequests to count.
     * @example
     * // Count the number of ClaimRequests
     * const count = await prisma.claimRequest.count({
     *   where: {
     *     // ... the filter for the ClaimRequests we want to count
     *   }
     * })
    **/
    count<T extends ClaimRequestCountArgs>(
      args?: Subset<T, ClaimRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimRequestAggregateArgs>(args: Subset<T, ClaimRequestAggregateArgs>): Prisma.PrismaPromise<GetClaimRequestAggregateType<T>>

    /**
     * Group by ClaimRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimRequestGroupByArgs['orderBy'] }
        : { orderBy?: ClaimRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimRequest model
   */
  readonly fields: ClaimRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    claimer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaimRequest model
   */ 
  interface ClaimRequestFieldRefs {
    readonly claim_id: FieldRef<"ClaimRequest", 'String'>
    readonly item_id: FieldRef<"ClaimRequest", 'String'>
    readonly claimer_id: FieldRef<"ClaimRequest", 'String'>
    readonly status: FieldRef<"ClaimRequest", 'ClaimStatus'>
    readonly ownership_desc: FieldRef<"ClaimRequest", 'String'>
    readonly verification_notes: FieldRef<"ClaimRequest", 'String'>
    readonly requested_at: FieldRef<"ClaimRequest", 'DateTime'>
    readonly resolved_at: FieldRef<"ClaimRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaimRequest findUnique
   */
  export type ClaimRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest findUniqueOrThrow
   */
  export type ClaimRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest findFirst
   */
  export type ClaimRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimRequests.
     */
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest findFirstOrThrow
   */
  export type ClaimRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequest to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimRequests.
     */
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest findMany
   */
  export type ClaimRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClaimRequests to fetch.
     */
    where?: ClaimRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimRequests to fetch.
     */
    orderBy?: ClaimRequestOrderByWithRelationInput | ClaimRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimRequests.
     */
    cursor?: ClaimRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimRequests.
     */
    skip?: number
    distinct?: ClaimRequestScalarFieldEnum | ClaimRequestScalarFieldEnum[]
  }

  /**
   * ClaimRequest create
   */
  export type ClaimRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimRequest.
     */
    data: XOR<ClaimRequestCreateInput, ClaimRequestUncheckedCreateInput>
  }

  /**
   * ClaimRequest createMany
   */
  export type ClaimRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimRequests.
     */
    data: ClaimRequestCreateManyInput | ClaimRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimRequest createManyAndReturn
   */
  export type ClaimRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ClaimRequests.
     */
    data: ClaimRequestCreateManyInput | ClaimRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimRequest update
   */
  export type ClaimRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimRequest.
     */
    data: XOR<ClaimRequestUpdateInput, ClaimRequestUncheckedUpdateInput>
    /**
     * Choose, which ClaimRequest to update.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest updateMany
   */
  export type ClaimRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimRequests.
     */
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyInput>
    /**
     * Filter which ClaimRequests to update
     */
    where?: ClaimRequestWhereInput
  }

  /**
   * ClaimRequest upsert
   */
  export type ClaimRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimRequest to update in case it exists.
     */
    where: ClaimRequestWhereUniqueInput
    /**
     * In case the ClaimRequest found by the `where` argument doesn't exist, create a new ClaimRequest with this data.
     */
    create: XOR<ClaimRequestCreateInput, ClaimRequestUncheckedCreateInput>
    /**
     * In case the ClaimRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimRequestUpdateInput, ClaimRequestUncheckedUpdateInput>
  }

  /**
   * ClaimRequest delete
   */
  export type ClaimRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
    /**
     * Filter which ClaimRequest to delete.
     */
    where: ClaimRequestWhereUniqueInput
  }

  /**
   * ClaimRequest deleteMany
   */
  export type ClaimRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimRequests to delete
     */
    where?: ClaimRequestWhereInput
  }

  /**
   * ClaimRequest without action
   */
  export type ClaimRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimRequest
     */
    select?: ClaimRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimRequestInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    log_id: string | null
    item_id: string | null
    changed_by: string | null
    action: $Enums.AuditAction | null
    old_status: $Enums.ItemStatus | null
    new_status: $Enums.ItemStatus | null
    notes: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    log_id: string | null
    item_id: string | null
    changed_by: string | null
    action: $Enums.AuditAction | null
    old_status: $Enums.ItemStatus | null
    new_status: $Enums.ItemStatus | null
    notes: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    log_id: number
    item_id: number
    changed_by: number
    action: number
    old_status: number
    new_status: number
    notes: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    log_id?: true
    item_id?: true
    changed_by?: true
    action?: true
    old_status?: true
    new_status?: true
    notes?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    log_id?: true
    item_id?: true
    changed_by?: true
    action?: true
    old_status?: true
    new_status?: true
    notes?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    log_id?: true
    item_id?: true
    changed_by?: true
    action?: true
    old_status?: true
    new_status?: true
    notes?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    log_id: string
    item_id: string
    changed_by: string
    action: $Enums.AuditAction
    old_status: $Enums.ItemStatus | null
    new_status: $Enums.ItemStatus | null
    notes: string | null
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    log_id?: boolean
    item_id?: boolean
    changed_by?: boolean
    action?: boolean
    old_status?: boolean
    new_status?: boolean
    notes?: boolean
    created_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    log_id?: boolean
    item_id?: boolean
    changed_by?: boolean
    action?: boolean
    old_status?: boolean
    new_status?: boolean
    notes?: boolean
    created_at?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    log_id?: boolean
    item_id?: boolean
    changed_by?: boolean
    action?: boolean
    old_status?: boolean
    new_status?: boolean
    notes?: boolean
    created_at?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      log_id: string
      item_id: string
      changed_by: string
      action: $Enums.AuditAction
      old_status: $Enums.ItemStatus | null
      new_status: $Enums.ItemStatus | null
      notes: string | null
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `log_id`
     * const auditLogWithLog_idOnly = await prisma.auditLog.findMany({ select: { log_id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `log_id`
     * const auditLogWithLog_idOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { log_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly log_id: FieldRef<"AuditLog", 'String'>
    readonly item_id: FieldRef<"AuditLog", 'String'>
    readonly changed_by: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'AuditAction'>
    readonly old_status: FieldRef<"AuditLog", 'ItemStatus'>
    readonly new_status: FieldRef<"AuditLog", 'ItemStatus'>
    readonly notes: FieldRef<"AuditLog", 'String'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    phone: 'phone',
    personal_email: 'personal_email',
    uni_email: 'uni_email',
    role: 'role',
    affiliation: 'affiliation',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    category_id: 'category_id',
    name: 'name',
    description: 'description',
    created_at: 'created_at'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    item_id: 'item_id',
    name: 'name',
    description: 'description',
    color_hex: 'color_hex',
    color_bucket: 'color_bucket',
    status: 'status',
    category_id: 'category_id',
    found_location: 'found_location',
    found_at: 'found_at',
    expires_at: 'expires_at',
    ownership_proof: 'ownership_proof',
    verification_notes: 'verification_notes',
    verified_by: 'verified_by',
    verified_at: 'verified_at',
    recorded_by: 'recorded_by',
    approved_by: 'approved_by',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const ItemPhotoScalarFieldEnum: {
    photo_id: 'photo_id',
    item_id: 'item_id',
    storage_url: 'storage_url',
    file_key: 'file_key',
    mime_type: 'mime_type',
    size: 'size',
    uploaded_at: 'uploaded_at'
  };

  export type ItemPhotoScalarFieldEnum = (typeof ItemPhotoScalarFieldEnum)[keyof typeof ItemPhotoScalarFieldEnum]


  export const ClaimRequestScalarFieldEnum: {
    claim_id: 'claim_id',
    item_id: 'item_id',
    claimer_id: 'claimer_id',
    status: 'status',
    ownership_desc: 'ownership_desc',
    verification_notes: 'verification_notes',
    requested_at: 'requested_at',
    resolved_at: 'resolved_at'
  };

  export type ClaimRequestScalarFieldEnum = (typeof ClaimRequestScalarFieldEnum)[keyof typeof ClaimRequestScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    log_id: 'log_id',
    item_id: 'item_id',
    changed_by: 'changed_by',
    action: 'action',
    old_status: 'old_status',
    new_status: 'new_status',
    notes: 'notes',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ItemStatus'
   */
  export type EnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemStatus'>
    


  /**
   * Reference to a field of type 'ItemStatus[]'
   */
  export type ListEnumItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ClaimStatus'
   */
  export type EnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus'>
    


  /**
   * Reference to a field of type 'ClaimStatus[]'
   */
  export type ListEnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus[]'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    personal_email?: StringNullableFilter<"User"> | string | null
    uni_email?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    affiliation?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    itemsRecorded?: ItemListRelationFilter
    itemsApproved?: ItemListRelationFilter
    itemsVerified?: ItemListRelationFilter
    claims?: ClaimRequestListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    personal_email?: SortOrderInput | SortOrder
    uni_email?: SortOrderInput | SortOrder
    role?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    itemsRecorded?: ItemOrderByRelationAggregateInput
    itemsApproved?: ItemOrderByRelationAggregateInput
    itemsVerified?: ItemOrderByRelationAggregateInput
    claims?: ClaimRequestOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    personal_email?: string
    uni_email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    affiliation?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    itemsRecorded?: ItemListRelationFilter
    itemsApproved?: ItemListRelationFilter
    itemsVerified?: ItemListRelationFilter
    claims?: ClaimRequestListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "user_id" | "personal_email" | "uni_email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    personal_email?: SortOrderInput | SortOrder
    uni_email?: SortOrderInput | SortOrder
    role?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    personal_email?: StringNullableWithAggregatesFilter<"User"> | string | null
    uni_email?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    affiliation?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    category_id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    created_at?: DateTimeFilter<"Category"> | Date | string
    items?: ItemListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    category_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    items?: ItemOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    category_id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    created_at?: DateTimeFilter<"Category"> | Date | string
    items?: ItemListRelationFilter
  }, "category_id">

  export type CategoryOrderByWithAggregationInput = {
    category_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    category_id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    item_id?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    color_hex?: StringNullableFilter<"Item"> | string | null
    color_bucket?: StringNullableFilter<"Item"> | string | null
    status?: EnumItemStatusFilter<"Item"> | $Enums.ItemStatus
    category_id?: StringFilter<"Item"> | string
    found_location?: StringFilter<"Item"> | string
    found_at?: DateTimeFilter<"Item"> | Date | string
    expires_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    ownership_proof?: StringNullableFilter<"Item"> | string | null
    verification_notes?: StringNullableFilter<"Item"> | string | null
    verified_by?: StringNullableFilter<"Item"> | string | null
    verified_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    recorded_by?: StringFilter<"Item"> | string
    approved_by?: StringNullableFilter<"Item"> | string | null
    created_at?: DateTimeFilter<"Item"> | Date | string
    updated_at?: DateTimeFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    verified_user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    recorder?: XOR<UserRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    claims?: ClaimRequestListRelationFilter
    photos?: ItemPhotoListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    item_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color_hex?: SortOrderInput | SortOrder
    color_bucket?: SortOrderInput | SortOrder
    status?: SortOrder
    category_id?: SortOrder
    found_location?: SortOrder
    found_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    ownership_proof?: SortOrderInput | SortOrder
    verification_notes?: SortOrderInput | SortOrder
    verified_by?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    recorded_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    category?: CategoryOrderByWithRelationInput
    verified_user?: UserOrderByWithRelationInput
    recorder?: UserOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
    claims?: ClaimRequestOrderByRelationAggregateInput
    photos?: ItemPhotoOrderByRelationAggregateInput
    audit_logs?: AuditLogOrderByRelationAggregateInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    item_id?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    color_hex?: StringNullableFilter<"Item"> | string | null
    color_bucket?: StringNullableFilter<"Item"> | string | null
    status?: EnumItemStatusFilter<"Item"> | $Enums.ItemStatus
    category_id?: StringFilter<"Item"> | string
    found_location?: StringFilter<"Item"> | string
    found_at?: DateTimeFilter<"Item"> | Date | string
    expires_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    ownership_proof?: StringNullableFilter<"Item"> | string | null
    verification_notes?: StringNullableFilter<"Item"> | string | null
    verified_by?: StringNullableFilter<"Item"> | string | null
    verified_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    recorded_by?: StringFilter<"Item"> | string
    approved_by?: StringNullableFilter<"Item"> | string | null
    created_at?: DateTimeFilter<"Item"> | Date | string
    updated_at?: DateTimeFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    verified_user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    recorder?: XOR<UserRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    claims?: ClaimRequestListRelationFilter
    photos?: ItemPhotoListRelationFilter
    audit_logs?: AuditLogListRelationFilter
  }, "item_id">

  export type ItemOrderByWithAggregationInput = {
    item_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color_hex?: SortOrderInput | SortOrder
    color_bucket?: SortOrderInput | SortOrder
    status?: SortOrder
    category_id?: SortOrder
    found_location?: SortOrder
    found_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    ownership_proof?: SortOrderInput | SortOrder
    verification_notes?: SortOrderInput | SortOrder
    verified_by?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    recorded_by?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: ItemCountOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    item_id?: StringWithAggregatesFilter<"Item"> | string
    name?: StringWithAggregatesFilter<"Item"> | string
    description?: StringNullableWithAggregatesFilter<"Item"> | string | null
    color_hex?: StringNullableWithAggregatesFilter<"Item"> | string | null
    color_bucket?: StringNullableWithAggregatesFilter<"Item"> | string | null
    status?: EnumItemStatusWithAggregatesFilter<"Item"> | $Enums.ItemStatus
    category_id?: StringWithAggregatesFilter<"Item"> | string
    found_location?: StringWithAggregatesFilter<"Item"> | string
    found_at?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    expires_at?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
    ownership_proof?: StringNullableWithAggregatesFilter<"Item"> | string | null
    verification_notes?: StringNullableWithAggregatesFilter<"Item"> | string | null
    verified_by?: StringNullableWithAggregatesFilter<"Item"> | string | null
    verified_at?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
    recorded_by?: StringWithAggregatesFilter<"Item"> | string
    approved_by?: StringNullableWithAggregatesFilter<"Item"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
  }

  export type ItemPhotoWhereInput = {
    AND?: ItemPhotoWhereInput | ItemPhotoWhereInput[]
    OR?: ItemPhotoWhereInput[]
    NOT?: ItemPhotoWhereInput | ItemPhotoWhereInput[]
    photo_id?: StringFilter<"ItemPhoto"> | string
    item_id?: StringFilter<"ItemPhoto"> | string
    storage_url?: StringFilter<"ItemPhoto"> | string
    file_key?: StringNullableFilter<"ItemPhoto"> | string | null
    mime_type?: StringNullableFilter<"ItemPhoto"> | string | null
    size?: IntNullableFilter<"ItemPhoto"> | number | null
    uploaded_at?: DateTimeFilter<"ItemPhoto"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type ItemPhotoOrderByWithRelationInput = {
    photo_id?: SortOrder
    item_id?: SortOrder
    storage_url?: SortOrder
    file_key?: SortOrderInput | SortOrder
    mime_type?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    item?: ItemOrderByWithRelationInput
  }

  export type ItemPhotoWhereUniqueInput = Prisma.AtLeast<{
    photo_id?: string
    AND?: ItemPhotoWhereInput | ItemPhotoWhereInput[]
    OR?: ItemPhotoWhereInput[]
    NOT?: ItemPhotoWhereInput | ItemPhotoWhereInput[]
    item_id?: StringFilter<"ItemPhoto"> | string
    storage_url?: StringFilter<"ItemPhoto"> | string
    file_key?: StringNullableFilter<"ItemPhoto"> | string | null
    mime_type?: StringNullableFilter<"ItemPhoto"> | string | null
    size?: IntNullableFilter<"ItemPhoto"> | number | null
    uploaded_at?: DateTimeFilter<"ItemPhoto"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "photo_id">

  export type ItemPhotoOrderByWithAggregationInput = {
    photo_id?: SortOrder
    item_id?: SortOrder
    storage_url?: SortOrder
    file_key?: SortOrderInput | SortOrder
    mime_type?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    _count?: ItemPhotoCountOrderByAggregateInput
    _avg?: ItemPhotoAvgOrderByAggregateInput
    _max?: ItemPhotoMaxOrderByAggregateInput
    _min?: ItemPhotoMinOrderByAggregateInput
    _sum?: ItemPhotoSumOrderByAggregateInput
  }

  export type ItemPhotoScalarWhereWithAggregatesInput = {
    AND?: ItemPhotoScalarWhereWithAggregatesInput | ItemPhotoScalarWhereWithAggregatesInput[]
    OR?: ItemPhotoScalarWhereWithAggregatesInput[]
    NOT?: ItemPhotoScalarWhereWithAggregatesInput | ItemPhotoScalarWhereWithAggregatesInput[]
    photo_id?: StringWithAggregatesFilter<"ItemPhoto"> | string
    item_id?: StringWithAggregatesFilter<"ItemPhoto"> | string
    storage_url?: StringWithAggregatesFilter<"ItemPhoto"> | string
    file_key?: StringNullableWithAggregatesFilter<"ItemPhoto"> | string | null
    mime_type?: StringNullableWithAggregatesFilter<"ItemPhoto"> | string | null
    size?: IntNullableWithAggregatesFilter<"ItemPhoto"> | number | null
    uploaded_at?: DateTimeWithAggregatesFilter<"ItemPhoto"> | Date | string
  }

  export type ClaimRequestWhereInput = {
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    claim_id?: StringFilter<"ClaimRequest"> | string
    item_id?: StringFilter<"ClaimRequest"> | string
    claimer_id?: StringFilter<"ClaimRequest"> | string
    status?: EnumClaimStatusFilter<"ClaimRequest"> | $Enums.ClaimStatus
    ownership_desc?: StringFilter<"ClaimRequest"> | string
    verification_notes?: StringNullableFilter<"ClaimRequest"> | string | null
    requested_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    item?: XOR<ItemRelationFilter, ItemWhereInput>
    claimer?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ClaimRequestOrderByWithRelationInput = {
    claim_id?: SortOrder
    item_id?: SortOrder
    claimer_id?: SortOrder
    status?: SortOrder
    ownership_desc?: SortOrder
    verification_notes?: SortOrderInput | SortOrder
    requested_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    item?: ItemOrderByWithRelationInput
    claimer?: UserOrderByWithRelationInput
  }

  export type ClaimRequestWhereUniqueInput = Prisma.AtLeast<{
    claim_id?: string
    AND?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    OR?: ClaimRequestWhereInput[]
    NOT?: ClaimRequestWhereInput | ClaimRequestWhereInput[]
    item_id?: StringFilter<"ClaimRequest"> | string
    claimer_id?: StringFilter<"ClaimRequest"> | string
    status?: EnumClaimStatusFilter<"ClaimRequest"> | $Enums.ClaimStatus
    ownership_desc?: StringFilter<"ClaimRequest"> | string
    verification_notes?: StringNullableFilter<"ClaimRequest"> | string | null
    requested_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
    item?: XOR<ItemRelationFilter, ItemWhereInput>
    claimer?: XOR<UserRelationFilter, UserWhereInput>
  }, "claim_id">

  export type ClaimRequestOrderByWithAggregationInput = {
    claim_id?: SortOrder
    item_id?: SortOrder
    claimer_id?: SortOrder
    status?: SortOrder
    ownership_desc?: SortOrder
    verification_notes?: SortOrderInput | SortOrder
    requested_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    _count?: ClaimRequestCountOrderByAggregateInput
    _max?: ClaimRequestMaxOrderByAggregateInput
    _min?: ClaimRequestMinOrderByAggregateInput
  }

  export type ClaimRequestScalarWhereWithAggregatesInput = {
    AND?: ClaimRequestScalarWhereWithAggregatesInput | ClaimRequestScalarWhereWithAggregatesInput[]
    OR?: ClaimRequestScalarWhereWithAggregatesInput[]
    NOT?: ClaimRequestScalarWhereWithAggregatesInput | ClaimRequestScalarWhereWithAggregatesInput[]
    claim_id?: StringWithAggregatesFilter<"ClaimRequest"> | string
    item_id?: StringWithAggregatesFilter<"ClaimRequest"> | string
    claimer_id?: StringWithAggregatesFilter<"ClaimRequest"> | string
    status?: EnumClaimStatusWithAggregatesFilter<"ClaimRequest"> | $Enums.ClaimStatus
    ownership_desc?: StringWithAggregatesFilter<"ClaimRequest"> | string
    verification_notes?: StringNullableWithAggregatesFilter<"ClaimRequest"> | string | null
    requested_at?: DateTimeWithAggregatesFilter<"ClaimRequest"> | Date | string
    resolved_at?: DateTimeNullableWithAggregatesFilter<"ClaimRequest"> | Date | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    log_id?: StringFilter<"AuditLog"> | string
    item_id?: StringFilter<"AuditLog"> | string
    changed_by?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    old_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    new_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    notes?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    log_id?: SortOrder
    item_id?: SortOrder
    changed_by?: SortOrder
    action?: SortOrder
    old_status?: SortOrderInput | SortOrder
    new_status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    item?: ItemOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    log_id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    item_id?: StringFilter<"AuditLog"> | string
    changed_by?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    old_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    new_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    notes?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "log_id">

  export type AuditLogOrderByWithAggregationInput = {
    log_id?: SortOrder
    item_id?: SortOrder
    changed_by?: SortOrder
    action?: SortOrder
    old_status?: SortOrderInput | SortOrder
    new_status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    log_id?: StringWithAggregatesFilter<"AuditLog"> | string
    item_id?: StringWithAggregatesFilter<"AuditLog"> | string
    changed_by?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction
    old_status?: EnumItemStatusNullableWithAggregatesFilter<"AuditLog"> | $Enums.ItemStatus | null
    new_status?: EnumItemStatusNullableWithAggregatesFilter<"AuditLog"> | $Enums.ItemStatus | null
    notes?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemUncheckedCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemUncheckedCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemUncheckedCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUncheckedUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUncheckedUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUncheckedUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryCreateInput = {
    category_id?: string
    name: string
    description?: string | null
    created_at?: Date | string
    items?: ItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    category_id?: string
    name: string
    description?: string | null
    created_at?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    category_id?: string
    name: string
    description?: string | null
    created_at?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemUpdateManyMutationInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemUncheckedUpdateManyInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemPhotoCreateInput = {
    photo_id?: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
    item: ItemCreateNestedOneWithoutPhotosInput
  }

  export type ItemPhotoUncheckedCreateInput = {
    photo_id?: string
    item_id: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
  }

  export type ItemPhotoUpdateInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type ItemPhotoUncheckedUpdateInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPhotoCreateManyInput = {
    photo_id?: string
    item_id: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
  }

  export type ItemPhotoUpdateManyMutationInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPhotoUncheckedUpdateManyInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimRequestCreateInput = {
    claim_id?: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
    item: ItemCreateNestedOneWithoutClaimsInput
    claimer: UserCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateInput = {
    claim_id?: string
    item_id: string
    claimer_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type ClaimRequestUpdateInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: ItemUpdateOneRequiredWithoutClaimsNestedInput
    claimer?: UserUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    claimer_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestCreateManyInput = {
    claim_id?: string
    item_id: string
    claimer_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type ClaimRequestUpdateManyMutationInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestUncheckedUpdateManyInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    claimer_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogCreateInput = {
    log_id?: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
    item: ItemCreateNestedOneWithoutAudit_logsInput
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    log_id?: string
    item_id: string
    changed_by: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutAudit_logsNestedInput
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    changed_by?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    log_id?: string
    item_id: string
    changed_by: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    changed_by?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type ClaimRequestListRelationFilter = {
    every?: ClaimRequestWhereInput
    some?: ClaimRequestWhereInput
    none?: ClaimRequestWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    personal_email?: SortOrder
    uni_email?: SortOrder
    role?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    personal_email?: SortOrder
    uni_email?: SortOrder
    role?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    personal_email?: SortOrder
    uni_email?: SortOrder
    role?: SortOrder
    affiliation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    category_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    category_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    category_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type EnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ItemPhotoListRelationFilter = {
    every?: ItemPhotoWhereInput
    some?: ItemPhotoWhereInput
    none?: ItemPhotoWhereInput
  }

  export type ItemPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemCountOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color_hex?: SortOrder
    color_bucket?: SortOrder
    status?: SortOrder
    category_id?: SortOrder
    found_location?: SortOrder
    found_at?: SortOrder
    expires_at?: SortOrder
    ownership_proof?: SortOrder
    verification_notes?: SortOrder
    verified_by?: SortOrder
    verified_at?: SortOrder
    recorded_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color_hex?: SortOrder
    color_bucket?: SortOrder
    status?: SortOrder
    category_id?: SortOrder
    found_location?: SortOrder
    found_at?: SortOrder
    expires_at?: SortOrder
    ownership_proof?: SortOrder
    verification_notes?: SortOrder
    verified_by?: SortOrder
    verified_at?: SortOrder
    recorded_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color_hex?: SortOrder
    color_bucket?: SortOrder
    status?: SortOrder
    category_id?: SortOrder
    found_location?: SortOrder
    found_at?: SortOrder
    expires_at?: SortOrder
    ownership_proof?: SortOrder
    verification_notes?: SortOrder
    verified_by?: SortOrder
    verified_at?: SortOrder
    recorded_by?: SortOrder
    approved_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type EnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemStatusFilter<$PrismaModel>
    _max?: NestedEnumItemStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ItemRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type ItemPhotoCountOrderByAggregateInput = {
    photo_id?: SortOrder
    item_id?: SortOrder
    storage_url?: SortOrder
    file_key?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    uploaded_at?: SortOrder
  }

  export type ItemPhotoAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ItemPhotoMaxOrderByAggregateInput = {
    photo_id?: SortOrder
    item_id?: SortOrder
    storage_url?: SortOrder
    file_key?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    uploaded_at?: SortOrder
  }

  export type ItemPhotoMinOrderByAggregateInput = {
    photo_id?: SortOrder
    item_id?: SortOrder
    storage_url?: SortOrder
    file_key?: SortOrder
    mime_type?: SortOrder
    size?: SortOrder
    uploaded_at?: SortOrder
  }

  export type ItemPhotoSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type ClaimRequestCountOrderByAggregateInput = {
    claim_id?: SortOrder
    item_id?: SortOrder
    claimer_id?: SortOrder
    status?: SortOrder
    ownership_desc?: SortOrder
    verification_notes?: SortOrder
    requested_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type ClaimRequestMaxOrderByAggregateInput = {
    claim_id?: SortOrder
    item_id?: SortOrder
    claimer_id?: SortOrder
    status?: SortOrder
    ownership_desc?: SortOrder
    verification_notes?: SortOrder
    requested_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type ClaimRequestMinOrderByAggregateInput = {
    claim_id?: SortOrder
    item_id?: SortOrder
    claimer_id?: SortOrder
    status?: SortOrder
    ownership_desc?: SortOrder
    verification_notes?: SortOrder
    requested_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type EnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type EnumItemStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumItemStatusNullableFilter<$PrismaModel> | $Enums.ItemStatus | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    log_id?: SortOrder
    item_id?: SortOrder
    changed_by?: SortOrder
    action?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    log_id?: SortOrder
    item_id?: SortOrder
    changed_by?: SortOrder
    action?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    log_id?: SortOrder
    item_id?: SortOrder
    changed_by?: SortOrder
    action?: SortOrder
    old_status?: SortOrder
    new_status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type EnumItemStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumItemStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumItemStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumItemStatusNullableFilter<$PrismaModel>
  }

  export type ItemCreateNestedManyWithoutRecorderInput = {
    create?: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput> | ItemCreateWithoutRecorderInput[] | ItemUncheckedCreateWithoutRecorderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRecorderInput | ItemCreateOrConnectWithoutRecorderInput[]
    createMany?: ItemCreateManyRecorderInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutApproverInput = {
    create?: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput> | ItemCreateWithoutApproverInput[] | ItemUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutApproverInput | ItemCreateOrConnectWithoutApproverInput[]
    createMany?: ItemCreateManyApproverInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutVerified_userInput = {
    create?: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput> | ItemCreateWithoutVerified_userInput[] | ItemUncheckedCreateWithoutVerified_userInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutVerified_userInput | ItemCreateOrConnectWithoutVerified_userInput[]
    createMany?: ItemCreateManyVerified_userInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ClaimRequestCreateNestedManyWithoutClaimerInput = {
    create?: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput> | ClaimRequestCreateWithoutClaimerInput[] | ClaimRequestUncheckedCreateWithoutClaimerInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutClaimerInput | ClaimRequestCreateOrConnectWithoutClaimerInput[]
    createMany?: ClaimRequestCreateManyClaimerInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutRecorderInput = {
    create?: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput> | ItemCreateWithoutRecorderInput[] | ItemUncheckedCreateWithoutRecorderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRecorderInput | ItemCreateOrConnectWithoutRecorderInput[]
    createMany?: ItemCreateManyRecorderInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput> | ItemCreateWithoutApproverInput[] | ItemUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutApproverInput | ItemCreateOrConnectWithoutApproverInput[]
    createMany?: ItemCreateManyApproverInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutVerified_userInput = {
    create?: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput> | ItemCreateWithoutVerified_userInput[] | ItemUncheckedCreateWithoutVerified_userInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutVerified_userInput | ItemCreateOrConnectWithoutVerified_userInput[]
    createMany?: ItemCreateManyVerified_userInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput = {
    create?: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput> | ClaimRequestCreateWithoutClaimerInput[] | ClaimRequestUncheckedCreateWithoutClaimerInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutClaimerInput | ClaimRequestCreateOrConnectWithoutClaimerInput[]
    createMany?: ClaimRequestCreateManyClaimerInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ItemUpdateManyWithoutRecorderNestedInput = {
    create?: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput> | ItemCreateWithoutRecorderInput[] | ItemUncheckedCreateWithoutRecorderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRecorderInput | ItemCreateOrConnectWithoutRecorderInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRecorderInput | ItemUpsertWithWhereUniqueWithoutRecorderInput[]
    createMany?: ItemCreateManyRecorderInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRecorderInput | ItemUpdateWithWhereUniqueWithoutRecorderInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRecorderInput | ItemUpdateManyWithWhereWithoutRecorderInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput> | ItemCreateWithoutApproverInput[] | ItemUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutApproverInput | ItemCreateOrConnectWithoutApproverInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutApproverInput | ItemUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ItemCreateManyApproverInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutApproverInput | ItemUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutApproverInput | ItemUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutVerified_userNestedInput = {
    create?: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput> | ItemCreateWithoutVerified_userInput[] | ItemUncheckedCreateWithoutVerified_userInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutVerified_userInput | ItemCreateOrConnectWithoutVerified_userInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutVerified_userInput | ItemUpsertWithWhereUniqueWithoutVerified_userInput[]
    createMany?: ItemCreateManyVerified_userInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutVerified_userInput | ItemUpdateWithWhereUniqueWithoutVerified_userInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutVerified_userInput | ItemUpdateManyWithWhereWithoutVerified_userInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ClaimRequestUpdateManyWithoutClaimerNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput> | ClaimRequestCreateWithoutClaimerInput[] | ClaimRequestUncheckedCreateWithoutClaimerInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutClaimerInput | ClaimRequestCreateOrConnectWithoutClaimerInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutClaimerInput | ClaimRequestUpsertWithWhereUniqueWithoutClaimerInput[]
    createMany?: ClaimRequestCreateManyClaimerInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutClaimerInput | ClaimRequestUpdateWithWhereUniqueWithoutClaimerInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutClaimerInput | ClaimRequestUpdateManyWithWhereWithoutClaimerInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutRecorderNestedInput = {
    create?: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput> | ItemCreateWithoutRecorderInput[] | ItemUncheckedCreateWithoutRecorderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRecorderInput | ItemCreateOrConnectWithoutRecorderInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRecorderInput | ItemUpsertWithWhereUniqueWithoutRecorderInput[]
    createMany?: ItemCreateManyRecorderInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRecorderInput | ItemUpdateWithWhereUniqueWithoutRecorderInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRecorderInput | ItemUpdateManyWithWhereWithoutRecorderInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput> | ItemCreateWithoutApproverInput[] | ItemUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutApproverInput | ItemCreateOrConnectWithoutApproverInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutApproverInput | ItemUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: ItemCreateManyApproverInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutApproverInput | ItemUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutApproverInput | ItemUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutVerified_userNestedInput = {
    create?: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput> | ItemCreateWithoutVerified_userInput[] | ItemUncheckedCreateWithoutVerified_userInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutVerified_userInput | ItemCreateOrConnectWithoutVerified_userInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutVerified_userInput | ItemUpsertWithWhereUniqueWithoutVerified_userInput[]
    createMany?: ItemCreateManyVerified_userInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutVerified_userInput | ItemUpdateWithWhereUniqueWithoutVerified_userInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutVerified_userInput | ItemUpdateManyWithWhereWithoutVerified_userInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput> | ClaimRequestCreateWithoutClaimerInput[] | ClaimRequestUncheckedCreateWithoutClaimerInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutClaimerInput | ClaimRequestCreateOrConnectWithoutClaimerInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutClaimerInput | ClaimRequestUpsertWithWhereUniqueWithoutClaimerInput[]
    createMany?: ClaimRequestCreateManyClaimerInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutClaimerInput | ClaimRequestUpdateWithWhereUniqueWithoutClaimerInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutClaimerInput | ClaimRequestUpdateManyWithWhereWithoutClaimerInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCategoryInput | ItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCategoryInput | ItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCategoryInput | ItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCategoryInput | ItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCategoryInput | ItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCategoryInput | ItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutItemsInput = {
    create?: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutItemsInput
    connect?: CategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutItemsVerifiedInput = {
    create?: XOR<UserCreateWithoutItemsVerifiedInput, UserUncheckedCreateWithoutItemsVerifiedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsVerifiedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutItemsRecordedInput = {
    create?: XOR<UserCreateWithoutItemsRecordedInput, UserUncheckedCreateWithoutItemsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsRecordedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutItemsApprovedInput = {
    create?: XOR<UserCreateWithoutItemsApprovedInput, UserUncheckedCreateWithoutItemsApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsApprovedInput
    connect?: UserWhereUniqueInput
  }

  export type ClaimRequestCreateNestedManyWithoutItemInput = {
    create?: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput> | ClaimRequestCreateWithoutItemInput[] | ClaimRequestUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutItemInput | ClaimRequestCreateOrConnectWithoutItemInput[]
    createMany?: ClaimRequestCreateManyItemInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type ItemPhotoCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput> | ItemPhotoCreateWithoutItemInput[] | ItemPhotoUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemPhotoCreateOrConnectWithoutItemInput | ItemPhotoCreateOrConnectWithoutItemInput[]
    createMany?: ItemPhotoCreateManyItemInputEnvelope
    connect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutItemInput = {
    create?: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput> | AuditLogCreateWithoutItemInput[] | AuditLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutItemInput | AuditLogCreateOrConnectWithoutItemInput[]
    createMany?: AuditLogCreateManyItemInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ClaimRequestUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput> | ClaimRequestCreateWithoutItemInput[] | ClaimRequestUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutItemInput | ClaimRequestCreateOrConnectWithoutItemInput[]
    createMany?: ClaimRequestCreateManyItemInputEnvelope
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
  }

  export type ItemPhotoUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput> | ItemPhotoCreateWithoutItemInput[] | ItemPhotoUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemPhotoCreateOrConnectWithoutItemInput | ItemPhotoCreateOrConnectWithoutItemInput[]
    createMany?: ItemPhotoCreateManyItemInputEnvelope
    connect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput> | AuditLogCreateWithoutItemInput[] | AuditLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutItemInput | AuditLogCreateOrConnectWithoutItemInput[]
    createMany?: AuditLogCreateManyItemInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EnumItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.ItemStatus
  }

  export type CategoryUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutItemsInput
    upsert?: CategoryUpsertWithoutItemsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutItemsInput, CategoryUpdateWithoutItemsInput>, CategoryUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateOneWithoutItemsVerifiedNestedInput = {
    create?: XOR<UserCreateWithoutItemsVerifiedInput, UserUncheckedCreateWithoutItemsVerifiedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsVerifiedInput
    upsert?: UserUpsertWithoutItemsVerifiedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsVerifiedInput, UserUpdateWithoutItemsVerifiedInput>, UserUncheckedUpdateWithoutItemsVerifiedInput>
  }

  export type UserUpdateOneRequiredWithoutItemsRecordedNestedInput = {
    create?: XOR<UserCreateWithoutItemsRecordedInput, UserUncheckedCreateWithoutItemsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsRecordedInput
    upsert?: UserUpsertWithoutItemsRecordedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsRecordedInput, UserUpdateWithoutItemsRecordedInput>, UserUncheckedUpdateWithoutItemsRecordedInput>
  }

  export type UserUpdateOneWithoutItemsApprovedNestedInput = {
    create?: XOR<UserCreateWithoutItemsApprovedInput, UserUncheckedCreateWithoutItemsApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsApprovedInput
    upsert?: UserUpsertWithoutItemsApprovedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsApprovedInput, UserUpdateWithoutItemsApprovedInput>, UserUncheckedUpdateWithoutItemsApprovedInput>
  }

  export type ClaimRequestUpdateManyWithoutItemNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput> | ClaimRequestCreateWithoutItemInput[] | ClaimRequestUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutItemInput | ClaimRequestCreateOrConnectWithoutItemInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutItemInput | ClaimRequestUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ClaimRequestCreateManyItemInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutItemInput | ClaimRequestUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutItemInput | ClaimRequestUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ItemPhotoUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput> | ItemPhotoCreateWithoutItemInput[] | ItemPhotoUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemPhotoCreateOrConnectWithoutItemInput | ItemPhotoCreateOrConnectWithoutItemInput[]
    upsert?: ItemPhotoUpsertWithWhereUniqueWithoutItemInput | ItemPhotoUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemPhotoCreateManyItemInputEnvelope
    set?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    disconnect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    delete?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    connect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    update?: ItemPhotoUpdateWithWhereUniqueWithoutItemInput | ItemPhotoUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemPhotoUpdateManyWithWhereWithoutItemInput | ItemPhotoUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemPhotoScalarWhereInput | ItemPhotoScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutItemNestedInput = {
    create?: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput> | AuditLogCreateWithoutItemInput[] | AuditLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutItemInput | AuditLogCreateOrConnectWithoutItemInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutItemInput | AuditLogUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: AuditLogCreateManyItemInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutItemInput | AuditLogUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutItemInput | AuditLogUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ClaimRequestUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput> | ClaimRequestCreateWithoutItemInput[] | ClaimRequestUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ClaimRequestCreateOrConnectWithoutItemInput | ClaimRequestCreateOrConnectWithoutItemInput[]
    upsert?: ClaimRequestUpsertWithWhereUniqueWithoutItemInput | ClaimRequestUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ClaimRequestCreateManyItemInputEnvelope
    set?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    disconnect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    delete?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    connect?: ClaimRequestWhereUniqueInput | ClaimRequestWhereUniqueInput[]
    update?: ClaimRequestUpdateWithWhereUniqueWithoutItemInput | ClaimRequestUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ClaimRequestUpdateManyWithWhereWithoutItemInput | ClaimRequestUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
  }

  export type ItemPhotoUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput> | ItemPhotoCreateWithoutItemInput[] | ItemPhotoUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemPhotoCreateOrConnectWithoutItemInput | ItemPhotoCreateOrConnectWithoutItemInput[]
    upsert?: ItemPhotoUpsertWithWhereUniqueWithoutItemInput | ItemPhotoUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemPhotoCreateManyItemInputEnvelope
    set?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    disconnect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    delete?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    connect?: ItemPhotoWhereUniqueInput | ItemPhotoWhereUniqueInput[]
    update?: ItemPhotoUpdateWithWhereUniqueWithoutItemInput | ItemPhotoUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemPhotoUpdateManyWithWhereWithoutItemInput | ItemPhotoUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemPhotoScalarWhereInput | ItemPhotoScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput> | AuditLogCreateWithoutItemInput[] | AuditLogUncheckedCreateWithoutItemInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutItemInput | AuditLogCreateOrConnectWithoutItemInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutItemInput | AuditLogUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: AuditLogCreateManyItemInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutItemInput | AuditLogUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutItemInput | AuditLogUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ItemCreateNestedOneWithoutPhotosInput = {
    create?: XOR<ItemCreateWithoutPhotosInput, ItemUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ItemCreateOrConnectWithoutPhotosInput
    connect?: ItemWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItemUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<ItemCreateWithoutPhotosInput, ItemUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ItemCreateOrConnectWithoutPhotosInput
    upsert?: ItemUpsertWithoutPhotosInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutPhotosInput, ItemUpdateWithoutPhotosInput>, ItemUncheckedUpdateWithoutPhotosInput>
  }

  export type ItemCreateNestedOneWithoutClaimsInput = {
    create?: XOR<ItemCreateWithoutClaimsInput, ItemUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutClaimsInput
    connect?: ItemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimsInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClaimStatus
  }

  export type ItemUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<ItemCreateWithoutClaimsInput, ItemUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutClaimsInput
    upsert?: ItemUpsertWithoutClaimsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutClaimsInput, ItemUpdateWithoutClaimsInput>, ItemUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    upsert?: UserUpsertWithoutClaimsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimsInput, UserUpdateWithoutClaimsInput>, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type ItemCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<ItemCreateWithoutAudit_logsInput, ItemUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutAudit_logsInput
    connect?: ItemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type NullableEnumItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.ItemStatus | null
  }

  export type ItemUpdateOneRequiredWithoutAudit_logsNestedInput = {
    create?: XOR<ItemCreateWithoutAudit_logsInput, ItemUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutAudit_logsInput
    upsert?: ItemUpsertWithoutAudit_logsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutAudit_logsInput, ItemUpdateWithoutAudit_logsInput>, ItemUncheckedUpdateWithoutAudit_logsInput>
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusFilter<$PrismaModel> | $Enums.ItemStatus
  }

  export type NestedEnumItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemStatusFilter<$PrismaModel>
    _max?: NestedEnumItemStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumItemStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumItemStatusNullableFilter<$PrismaModel> | $Enums.ItemStatus | null
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type NestedEnumItemStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemStatus | EnumItemStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ItemStatus[] | ListEnumItemStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumItemStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ItemStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumItemStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumItemStatusNullableFilter<$PrismaModel>
  }

  export type ItemCreateWithoutRecorderInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutRecorderInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutRecorderInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput>
  }

  export type ItemCreateManyRecorderInputEnvelope = {
    data: ItemCreateManyRecorderInput | ItemCreateManyRecorderInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutApproverInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutApproverInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutApproverInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput>
  }

  export type ItemCreateManyApproverInputEnvelope = {
    data: ItemCreateManyApproverInput | ItemCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutVerified_userInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutVerified_userInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutVerified_userInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput>
  }

  export type ItemCreateManyVerified_userInputEnvelope = {
    data: ItemCreateManyVerified_userInput | ItemCreateManyVerified_userInput[]
    skipDuplicates?: boolean
  }

  export type ClaimRequestCreateWithoutClaimerInput = {
    claim_id?: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
    item: ItemCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateWithoutClaimerInput = {
    claim_id?: string
    item_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type ClaimRequestCreateOrConnectWithoutClaimerInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput>
  }

  export type ClaimRequestCreateManyClaimerInputEnvelope = {
    data: ClaimRequestCreateManyClaimerInput | ClaimRequestCreateManyClaimerInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    log_id?: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
    item: ItemCreateNestedOneWithoutAudit_logsInput
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    log_id?: string
    item_id: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ItemUpsertWithWhereUniqueWithoutRecorderInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutRecorderInput, ItemUncheckedUpdateWithoutRecorderInput>
    create: XOR<ItemCreateWithoutRecorderInput, ItemUncheckedCreateWithoutRecorderInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutRecorderInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutRecorderInput, ItemUncheckedUpdateWithoutRecorderInput>
  }

  export type ItemUpdateManyWithWhereWithoutRecorderInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutRecorderInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    item_id?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    color_hex?: StringNullableFilter<"Item"> | string | null
    color_bucket?: StringNullableFilter<"Item"> | string | null
    status?: EnumItemStatusFilter<"Item"> | $Enums.ItemStatus
    category_id?: StringFilter<"Item"> | string
    found_location?: StringFilter<"Item"> | string
    found_at?: DateTimeFilter<"Item"> | Date | string
    expires_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    ownership_proof?: StringNullableFilter<"Item"> | string | null
    verification_notes?: StringNullableFilter<"Item"> | string | null
    verified_by?: StringNullableFilter<"Item"> | string | null
    verified_at?: DateTimeNullableFilter<"Item"> | Date | string | null
    recorded_by?: StringFilter<"Item"> | string
    approved_by?: StringNullableFilter<"Item"> | string | null
    created_at?: DateTimeFilter<"Item"> | Date | string
    updated_at?: DateTimeFilter<"Item"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Item"> | Date | string | null
  }

  export type ItemUpsertWithWhereUniqueWithoutApproverInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutApproverInput, ItemUncheckedUpdateWithoutApproverInput>
    create: XOR<ItemCreateWithoutApproverInput, ItemUncheckedCreateWithoutApproverInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutApproverInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutApproverInput, ItemUncheckedUpdateWithoutApproverInput>
  }

  export type ItemUpdateManyWithWhereWithoutApproverInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutApproverInput>
  }

  export type ItemUpsertWithWhereUniqueWithoutVerified_userInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutVerified_userInput, ItemUncheckedUpdateWithoutVerified_userInput>
    create: XOR<ItemCreateWithoutVerified_userInput, ItemUncheckedCreateWithoutVerified_userInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutVerified_userInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutVerified_userInput, ItemUncheckedUpdateWithoutVerified_userInput>
  }

  export type ItemUpdateManyWithWhereWithoutVerified_userInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutVerified_userInput>
  }

  export type ClaimRequestUpsertWithWhereUniqueWithoutClaimerInput = {
    where: ClaimRequestWhereUniqueInput
    update: XOR<ClaimRequestUpdateWithoutClaimerInput, ClaimRequestUncheckedUpdateWithoutClaimerInput>
    create: XOR<ClaimRequestCreateWithoutClaimerInput, ClaimRequestUncheckedCreateWithoutClaimerInput>
  }

  export type ClaimRequestUpdateWithWhereUniqueWithoutClaimerInput = {
    where: ClaimRequestWhereUniqueInput
    data: XOR<ClaimRequestUpdateWithoutClaimerInput, ClaimRequestUncheckedUpdateWithoutClaimerInput>
  }

  export type ClaimRequestUpdateManyWithWhereWithoutClaimerInput = {
    where: ClaimRequestScalarWhereInput
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyWithoutClaimerInput>
  }

  export type ClaimRequestScalarWhereInput = {
    AND?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    OR?: ClaimRequestScalarWhereInput[]
    NOT?: ClaimRequestScalarWhereInput | ClaimRequestScalarWhereInput[]
    claim_id?: StringFilter<"ClaimRequest"> | string
    item_id?: StringFilter<"ClaimRequest"> | string
    claimer_id?: StringFilter<"ClaimRequest"> | string
    status?: EnumClaimStatusFilter<"ClaimRequest"> | $Enums.ClaimStatus
    ownership_desc?: StringFilter<"ClaimRequest"> | string
    verification_notes?: StringNullableFilter<"ClaimRequest"> | string | null
    requested_at?: DateTimeFilter<"ClaimRequest"> | Date | string
    resolved_at?: DateTimeNullableFilter<"ClaimRequest"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    log_id?: StringFilter<"AuditLog"> | string
    item_id?: StringFilter<"AuditLog"> | string
    changed_by?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    old_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    new_status?: EnumItemStatusNullableFilter<"AuditLog"> | $Enums.ItemStatus | null
    notes?: StringNullableFilter<"AuditLog"> | string | null
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ItemCreateWithoutCategoryInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutCategoryInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput>
  }

  export type ItemCreateManyCategoryInputEnvelope = {
    data: ItemCreateManyCategoryInput | ItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutCategoryInput, ItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutCategoryInput, ItemUncheckedUpdateWithoutCategoryInput>
  }

  export type ItemUpdateManyWithWhereWithoutCategoryInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryCreateWithoutItemsInput = {
    category_id?: string
    name: string
    description?: string | null
    created_at?: Date | string
  }

  export type CategoryUncheckedCreateWithoutItemsInput = {
    category_id?: string
    name: string
    description?: string | null
    created_at?: Date | string
  }

  export type CategoryCreateOrConnectWithoutItemsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
  }

  export type UserCreateWithoutItemsVerifiedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemCreateNestedManyWithoutApproverInput
    claims?: ClaimRequestCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutItemsVerifiedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemUncheckedCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemUncheckedCreateNestedManyWithoutApproverInput
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutItemsVerifiedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsVerifiedInput, UserUncheckedCreateWithoutItemsVerifiedInput>
  }

  export type UserCreateWithoutItemsRecordedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsApproved?: ItemCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutItemsRecordedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsApproved?: ItemUncheckedCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemUncheckedCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutItemsRecordedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsRecordedInput, UserUncheckedCreateWithoutItemsRecordedInput>
  }

  export type UserCreateWithoutItemsApprovedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemCreateNestedManyWithoutRecorderInput
    itemsVerified?: ItemCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutItemsApprovedInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemUncheckedCreateNestedManyWithoutRecorderInput
    itemsVerified?: ItemUncheckedCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutItemsApprovedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsApprovedInput, UserUncheckedCreateWithoutItemsApprovedInput>
  }

  export type ClaimRequestCreateWithoutItemInput = {
    claim_id?: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
    claimer: UserCreateNestedOneWithoutClaimsInput
  }

  export type ClaimRequestUncheckedCreateWithoutItemInput = {
    claim_id?: string
    claimer_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type ClaimRequestCreateOrConnectWithoutItemInput = {
    where: ClaimRequestWhereUniqueInput
    create: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput>
  }

  export type ClaimRequestCreateManyItemInputEnvelope = {
    data: ClaimRequestCreateManyItemInput | ClaimRequestCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type ItemPhotoCreateWithoutItemInput = {
    photo_id?: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
  }

  export type ItemPhotoUncheckedCreateWithoutItemInput = {
    photo_id?: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
  }

  export type ItemPhotoCreateOrConnectWithoutItemInput = {
    where: ItemPhotoWhereUniqueInput
    create: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput>
  }

  export type ItemPhotoCreateManyItemInputEnvelope = {
    data: ItemPhotoCreateManyItemInput | ItemPhotoCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutItemInput = {
    log_id?: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutItemInput = {
    log_id?: string
    changed_by: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutItemInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput>
  }

  export type AuditLogCreateManyItemInputEnvelope = {
    data: AuditLogCreateManyItemInput | AuditLogCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutItemsInput = {
    update: XOR<CategoryUpdateWithoutItemsInput, CategoryUncheckedUpdateWithoutItemsInput>
    create: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutItemsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutItemsInput, CategoryUncheckedUpdateWithoutItemsInput>
  }

  export type CategoryUpdateWithoutItemsInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutItemsInput = {
    category_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutItemsVerifiedInput = {
    update: XOR<UserUpdateWithoutItemsVerifiedInput, UserUncheckedUpdateWithoutItemsVerifiedInput>
    create: XOR<UserCreateWithoutItemsVerifiedInput, UserUncheckedCreateWithoutItemsVerifiedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsVerifiedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsVerifiedInput, UserUncheckedUpdateWithoutItemsVerifiedInput>
  }

  export type UserUpdateWithoutItemsVerifiedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUpdateManyWithoutApproverNestedInput
    claims?: ClaimRequestUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsVerifiedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUncheckedUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUncheckedUpdateManyWithoutApproverNestedInput
    claims?: ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutItemsRecordedInput = {
    update: XOR<UserUpdateWithoutItemsRecordedInput, UserUncheckedUpdateWithoutItemsRecordedInput>
    create: XOR<UserCreateWithoutItemsRecordedInput, UserUncheckedCreateWithoutItemsRecordedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsRecordedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsRecordedInput, UserUncheckedUpdateWithoutItemsRecordedInput>
  }

  export type UserUpdateWithoutItemsRecordedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsApproved?: ItemUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsRecordedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsApproved?: ItemUncheckedUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUncheckedUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutItemsApprovedInput = {
    update: XOR<UserUpdateWithoutItemsApprovedInput, UserUncheckedUpdateWithoutItemsApprovedInput>
    create: XOR<UserCreateWithoutItemsApprovedInput, UserUncheckedCreateWithoutItemsApprovedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsApprovedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsApprovedInput, UserUncheckedUpdateWithoutItemsApprovedInput>
  }

  export type UserUpdateWithoutItemsApprovedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUpdateManyWithoutRecorderNestedInput
    itemsVerified?: ItemUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsApprovedInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUncheckedUpdateManyWithoutRecorderNestedInput
    itemsVerified?: ItemUncheckedUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClaimRequestUpsertWithWhereUniqueWithoutItemInput = {
    where: ClaimRequestWhereUniqueInput
    update: XOR<ClaimRequestUpdateWithoutItemInput, ClaimRequestUncheckedUpdateWithoutItemInput>
    create: XOR<ClaimRequestCreateWithoutItemInput, ClaimRequestUncheckedCreateWithoutItemInput>
  }

  export type ClaimRequestUpdateWithWhereUniqueWithoutItemInput = {
    where: ClaimRequestWhereUniqueInput
    data: XOR<ClaimRequestUpdateWithoutItemInput, ClaimRequestUncheckedUpdateWithoutItemInput>
  }

  export type ClaimRequestUpdateManyWithWhereWithoutItemInput = {
    where: ClaimRequestScalarWhereInput
    data: XOR<ClaimRequestUpdateManyMutationInput, ClaimRequestUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemPhotoUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemPhotoWhereUniqueInput
    update: XOR<ItemPhotoUpdateWithoutItemInput, ItemPhotoUncheckedUpdateWithoutItemInput>
    create: XOR<ItemPhotoCreateWithoutItemInput, ItemPhotoUncheckedCreateWithoutItemInput>
  }

  export type ItemPhotoUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemPhotoWhereUniqueInput
    data: XOR<ItemPhotoUpdateWithoutItemInput, ItemPhotoUncheckedUpdateWithoutItemInput>
  }

  export type ItemPhotoUpdateManyWithWhereWithoutItemInput = {
    where: ItemPhotoScalarWhereInput
    data: XOR<ItemPhotoUpdateManyMutationInput, ItemPhotoUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemPhotoScalarWhereInput = {
    AND?: ItemPhotoScalarWhereInput | ItemPhotoScalarWhereInput[]
    OR?: ItemPhotoScalarWhereInput[]
    NOT?: ItemPhotoScalarWhereInput | ItemPhotoScalarWhereInput[]
    photo_id?: StringFilter<"ItemPhoto"> | string
    item_id?: StringFilter<"ItemPhoto"> | string
    storage_url?: StringFilter<"ItemPhoto"> | string
    file_key?: StringNullableFilter<"ItemPhoto"> | string | null
    mime_type?: StringNullableFilter<"ItemPhoto"> | string | null
    size?: IntNullableFilter<"ItemPhoto"> | number | null
    uploaded_at?: DateTimeFilter<"ItemPhoto"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutItemInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutItemInput, AuditLogUncheckedUpdateWithoutItemInput>
    create: XOR<AuditLogCreateWithoutItemInput, AuditLogUncheckedCreateWithoutItemInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutItemInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutItemInput, AuditLogUncheckedUpdateWithoutItemInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutItemInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemCreateWithoutPhotosInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutPhotosInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutPhotosInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutPhotosInput, ItemUncheckedCreateWithoutPhotosInput>
  }

  export type ItemUpsertWithoutPhotosInput = {
    update: XOR<ItemUpdateWithoutPhotosInput, ItemUncheckedUpdateWithoutPhotosInput>
    create: XOR<ItemCreateWithoutPhotosInput, ItemUncheckedCreateWithoutPhotosInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutPhotosInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutPhotosInput, ItemUncheckedUpdateWithoutPhotosInput>
  }

  export type ItemUpdateWithoutPhotosInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutPhotosInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateWithoutClaimsInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutClaimsInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
    audit_logs?: AuditLogUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutClaimsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutClaimsInput, ItemUncheckedCreateWithoutClaimsInput>
  }

  export type UserCreateWithoutClaimsInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemCreateNestedManyWithoutVerified_userInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClaimsInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemUncheckedCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemUncheckedCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemUncheckedCreateNestedManyWithoutVerified_userInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClaimsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
  }

  export type ItemUpsertWithoutClaimsInput = {
    update: XOR<ItemUpdateWithoutClaimsInput, ItemUncheckedUpdateWithoutClaimsInput>
    create: XOR<ItemCreateWithoutClaimsInput, ItemUncheckedCreateWithoutClaimsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutClaimsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutClaimsInput, ItemUncheckedUpdateWithoutClaimsInput>
  }

  export type ItemUpdateWithoutClaimsInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutClaimsInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UserUpsertWithoutClaimsInput = {
    update: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateWithoutClaimsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUpdateManyWithoutVerified_userNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUncheckedUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUncheckedUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUncheckedUpdateManyWithoutVerified_userNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemCreateWithoutAudit_logsInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoryCreateNestedOneWithoutItemsInput
    verified_user?: UserCreateNestedOneWithoutItemsVerifiedInput
    recorder: UserCreateNestedOneWithoutItemsRecordedInput
    approver?: UserCreateNestedOneWithoutItemsApprovedInput
    claims?: ClaimRequestCreateNestedManyWithoutItemInput
    photos?: ItemPhotoCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutAudit_logsInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutItemInput
    photos?: ItemPhotoUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutAudit_logsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutAudit_logsInput, ItemUncheckedCreateWithoutAudit_logsInput>
  }

  export type UserCreateWithoutAuditLogsInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestCreateNestedManyWithoutClaimerInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    user_id?: string
    name: string
    phone?: string | null
    personal_email?: string | null
    uni_email?: string | null
    role?: $Enums.UserRole
    affiliation?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    itemsRecorded?: ItemUncheckedCreateNestedManyWithoutRecorderInput
    itemsApproved?: ItemUncheckedCreateNestedManyWithoutApproverInput
    itemsVerified?: ItemUncheckedCreateNestedManyWithoutVerified_userInput
    claims?: ClaimRequestUncheckedCreateNestedManyWithoutClaimerInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type ItemUpsertWithoutAudit_logsInput = {
    update: XOR<ItemUpdateWithoutAudit_logsInput, ItemUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<ItemCreateWithoutAudit_logsInput, ItemUncheckedCreateWithoutAudit_logsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutAudit_logsInput, ItemUncheckedUpdateWithoutAudit_logsInput>
  }

  export type ItemUpdateWithoutAudit_logsInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutAudit_logsInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUpdateManyWithoutClaimerNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    personal_email?: NullableStringFieldUpdateOperationsInput | string | null
    uni_email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itemsRecorded?: ItemUncheckedUpdateManyWithoutRecorderNestedInput
    itemsApproved?: ItemUncheckedUpdateManyWithoutApproverNestedInput
    itemsVerified?: ItemUncheckedUpdateManyWithoutVerified_userNestedInput
    claims?: ClaimRequestUncheckedUpdateManyWithoutClaimerNestedInput
  }

  export type ItemCreateManyRecorderInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemCreateManyApproverInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemCreateManyVerified_userInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    category_id: string
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ClaimRequestCreateManyClaimerInput = {
    claim_id?: string
    item_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type AuditLogCreateManyUserInput = {
    log_id?: string
    item_id: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type ItemUpdateWithoutRecorderInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutRecorderInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutRecorderInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemUpdateWithoutApproverInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutApproverInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutApproverInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemUpdateWithoutVerified_userInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutVerified_userInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutVerified_userInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    category_id?: StringFieldUpdateOperationsInput | string
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestUpdateWithoutClaimerInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: ItemUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutClaimerInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestUncheckedUpdateManyWithoutClaimerInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutUserInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutAudit_logsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    item_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateManyCategoryInput = {
    item_id?: string
    name: string
    description?: string | null
    color_hex?: string | null
    color_bucket?: string | null
    status?: $Enums.ItemStatus
    found_location: string
    found_at: Date | string
    expires_at?: Date | string | null
    ownership_proof?: string | null
    verification_notes?: string | null
    verified_by?: string | null
    verified_at?: Date | string | null
    recorded_by: string
    approved_by?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ItemUpdateWithoutCategoryInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_user?: UserUpdateOneWithoutItemsVerifiedNestedInput
    recorder?: UserUpdateOneRequiredWithoutItemsRecordedNestedInput
    approver?: UserUpdateOneWithoutItemsApprovedNestedInput
    claims?: ClaimRequestUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutCategoryInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claims?: ClaimRequestUncheckedUpdateManyWithoutItemNestedInput
    photos?: ItemPhotoUncheckedUpdateManyWithoutItemNestedInput
    audit_logs?: AuditLogUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutCategoryInput = {
    item_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color_hex?: NullableStringFieldUpdateOperationsInput | string | null
    color_bucket?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus
    found_location?: StringFieldUpdateOperationsInput | string
    found_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownership_proof?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recorded_by?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestCreateManyItemInput = {
    claim_id?: string
    claimer_id: string
    status?: $Enums.ClaimStatus
    ownership_desc: string
    verification_notes?: string | null
    requested_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type ItemPhotoCreateManyItemInput = {
    photo_id?: string
    storage_url: string
    file_key?: string | null
    mime_type?: string | null
    size?: number | null
    uploaded_at?: Date | string
  }

  export type AuditLogCreateManyItemInput = {
    log_id?: string
    changed_by: string
    action: $Enums.AuditAction
    old_status?: $Enums.ItemStatus | null
    new_status?: $Enums.ItemStatus | null
    notes?: string | null
    created_at?: Date | string
  }

  export type ClaimRequestUpdateWithoutItemInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claimer?: UserUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimRequestUncheckedUpdateWithoutItemInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    claimer_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimRequestUncheckedUpdateManyWithoutItemInput = {
    claim_id?: StringFieldUpdateOperationsInput | string
    claimer_id?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    ownership_desc?: StringFieldUpdateOperationsInput | string
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    requested_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemPhotoUpdateWithoutItemInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPhotoUncheckedUpdateWithoutItemInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPhotoUncheckedUpdateManyWithoutItemInput = {
    photo_id?: StringFieldUpdateOperationsInput | string
    storage_url?: StringFieldUpdateOperationsInput | string
    file_key?: NullableStringFieldUpdateOperationsInput | string | null
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutItemInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutItemInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    changed_by?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutItemInput = {
    log_id?: StringFieldUpdateOperationsInput | string
    changed_by?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    old_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    new_status?: NullableEnumItemStatusFieldUpdateOperationsInput | $Enums.ItemStatus | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemCountOutputTypeDefaultArgs instead
     */
    export type ItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemDefaultArgs instead
     */
    export type ItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemPhotoDefaultArgs instead
     */
    export type ItemPhotoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemPhotoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClaimRequestDefaultArgs instead
     */
    export type ClaimRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClaimRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}