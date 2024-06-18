import {initGraphQLTada} from "gql.tada"
import type {introspection} from "./graphql-env.d.ts"

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    Date: string
    DateTime: string
    ObjectId: string
    JSONObject: Record<string, unknown>
    Decimal: string
    CurrencyCode: string
    ImageContentType: string
    ImageUrl: string
  }
}>()

export {readFragment} from "gql.tada"
export type {FragmentOf, ResultOf, VariablesOf} from "gql.tada"

