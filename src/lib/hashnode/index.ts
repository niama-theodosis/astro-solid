import {PUBLIC_HASHNODE_GQL_ENDPOINT, PUBLIC_HASHNODE_PUBLICATION_HOST, getSecret} from "astro:env/server"
import {ClientError, GraphQLClient, type RequestMiddleware} from "graphql-request"
import {PageInfoFragment, PostCardFragment} from "./fragments"
import {graphql} from "./graphql"

// MIDDLEWARE ******************************************************************************************************************************
const requestMiddleware: RequestMiddleware = (request) => {
  if (request.operationName !== "Post" && request.operationName !== "Posts") return request
  return {...request, body: (request.body as string).replace(`"variables":{`, `"variables":{"now":${Date.now()},`)}
}

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(PUBLIC_HASHNODE_GQL_ENDPOINT, {requestMiddleware})

// NEWSLETTER ******************************************************************************************************************************
const SubscribeToNewsletterMutation = graphql(`
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`)

export const subscribeToNewsletter = async (email: string) => {
  try {
    await hashnode.request(SubscribeToNewsletterMutation, {input: {email, publicationId: getSecret("HASHNODE_PUBLICATION_ID")}})
    return "SUCCESS"
  } catch (error_) {
    if (error_ instanceof ClientError && error_.response?.errors?.[0]?.extensions.code === "BAD_USER_INPUT") return "CONFLICT"
    return "INTERNAL_SERVER_ERROR"
  }
}

// POSTS ***********************************************************************************************************************************
const PostsQuery = graphql(
  `
    query Posts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              ...PostCard
            }
          }
          pageInfo {
            ...PageInfo
          }
        }
      }
    }
  `,
  [PageInfoFragment, PostCardFragment]
)
export async function fetchPosts(first: number, after?: string) {
  const {publication} = await hashnode.request(PostsQuery, {host: PUBLIC_HASHNODE_PUBLICATION_HOST, first, after})
  return (publication?.posts.edges ?? []).map(({node}) => node)
}

const PostsByTagQuery = graphql(
  `
    query PostsByTag($host: String!, $first: Int!, $tag: String!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after, filter: {tagSlugs: [$tag]}) {
          edges {
            node {
              ...PostCard
            }
          }
          pageInfo {
            ...PageInfo
          }
        }
      }
    }
  `,
  [PageInfoFragment, PostCardFragment]
)

export const fetchPostsByTag = async (tag: string, first: number, after?: string) => {
  const {publication} = await hashnode.request(PostsByTagQuery, {host: PUBLIC_HASHNODE_PUBLICATION_HOST, after, first, tag})
  return (publication?.posts.edges ?? []).map(({node}) => node)
}

// POST ************************************************************************************************************************************
const PostQuery = graphql(`
  query Post($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        slug
        title
      }
    }
  }
`)

export async function fetchPost(slug: string) {
  const {publication} = await hashnode.request(PostQuery, {host: PUBLIC_HASHNODE_PUBLICATION_HOST, slug})
  return publication?.post ?? undefined
}
