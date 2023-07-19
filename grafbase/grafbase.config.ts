import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const post = g.model("Post", {
  title: g.string(),
  comments: g
    .relation(() => comment)
    .optional()
    .list()
    .optional(),
  slug: g.string().unique(),
  content: g.string(),
  publishedAt: g.datetime(),
  likes: g.int().default(0),
  // tags: g.string().optional().list().length({ max: 5 }),
  author: g.relation(() => user).optional(),
});

const comment = g.model("Comment", {
  message: g.string(),
  post: g.relation(post),
  author: g.relation(() => user).optional(),
});

const user = g.model("User", {
  first_name: g.string(),
  last_name: g.string(),
  email: g.email().optional().unique(),
  posts: g.relation(post).optional().list().optional(),
  comments: g.relation(comment).optional().list().optional(),

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
});

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});
