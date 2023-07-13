import { AsyncLocalStorage, AsyncResource } from "async_hooks";

export const store = new AsyncLocalStorage<string>();

class MyResource extends AsyncResource {
  constructor() {
    // The type string is required by Node.js but unused in Cloudflare Workers.
    super("MyResource");
  }

  async test() {
    return await this.runInAsyncScope(async () => {
      return store.getStore();
    });
  }

  async test2() {
    this.runInAsyncScope(() => {
      return store.getStore();
    });
  }
}

export async function testStore() {
  return store.run("store works", async () => {
    return store.getStore() ?? "<undefined>";
  });
}

export async function testPromise() {
  return await store.run("Promise works", async () => {
    return new Promise((resolve) => {
      resolve(store.getStore() ?? "<undefined>");
    });
  });
}

export async function testThenable() {
  return await store.run("thenable works", async () => {
    return {
      then: (resolve) => {
        resolve(store.getStore() ?? "<undefined>");
      },
    };
  });
}

export async function testThenableNoAsync() {
  return await store.run(
    "thenable without async run() param works",
    // no 'async' declaration for this function:
    () => {
      return new Promise(async (resolve: (value: string) => void) => {
        resolve(
          await {
            then: (resolve: (value: string) => void) => {
              resolve(store.getStore() ?? "<undefined>");
            },
          }
        );
      });
    }
  );
}

export async function testAsyncResource() {
  return await store.run("thenable with AsyncResource works", async () => {
    return {
      then: async (resolve) => {
        const resource = new MyResource();
        resolve((await resource.test()) ?? "<undefined>");
      },
    };
  });
}
