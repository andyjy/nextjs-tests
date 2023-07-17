# Reproduction for AsyncLocalContext not passed across Thenables under Cloudflare Workers (thus also Vercel Edge functions)

Test cases in [lib/async-local-storage.ts](https://github.com/andyjy/nextjs-tests/blob/als-thenables-edge/lib/async-local-storage.ts)

Output under Node.js: 
https://nextjs-tests-git-als-thenables-edge-andyyoung.vercel.app/api

```json
{
  "status": "ok",
  "runtime": "node",
  "store": "store works",
  "promise": "Promise works",
  "thenable": "thenable works",
  "thenable_no_async": "thenable without async run() param works",
  "async_resource": "thenable with AsyncResource works",
  "fn_with_thenable": "function with thenable works",
  "wrapped_fn_with_thenable": "wrapper: sure does!, functionWithThenable: sure does!",
  "wrapped_fn_with_thenable_and_bind": "with bind: wrapper: sure does!, functionWithThenable_bind: sure does!",
  "wrap_with_thenable": "wrapWithThenable works!",
  "bind_and_wrap_with_thenable": "wrapWithThenable and bind() works!",
  "wrap_with_thenable_and_bind_context": "wrapWithThenableAndBindContext works!"
}
```

Loses context within Thenables under Cloudflare Workers, unless bind() workaround applied:
https://nextjs-tests-git-als-thenables-edge-andyyoung.vercel.app/api/edge

```json
{
  "status": "ok",
  "runtime": "edge",
  "store": "store works",
  "promise": "Promise works",
  "thenable": "<undefined>",
  "thenable_no_async": "<undefined>",
  "async_resource": "<undefined>",
  "fn_with_thenable": "<undefined>",
  "wrapped_fn_with_thenable": "wrapper: sure does!, functionWithThenable: <undefined>",
  "wrapped_fn_with_thenable_and_bind": "with bind: wrapper: sure does!, functionWithThenable_bind: <undefined>",
  "wrap_with_thenable": "<undefined>",
  "bind_and_wrap_with_thenable": "wrapWithThenable and bind() works!",
  "wrap_with_thenable_and_bind_context": "wrapWithThenableAndBindContext works!"
}
```

