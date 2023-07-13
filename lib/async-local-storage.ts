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

const functionWithThenable = async () => {
  return {
    then: (resolve: (value: string) => void) => {
      resolve(store.getStore() ?? "<undefined>");
    },
  };
};

const wrapFunctionWithThenable = async () => {
  return new Promise(async (resolve: (value: string) => void) => {
    resolve(
      `wrapper: ${store.getStore()}, functionWithThenable: ${await functionWithThenable()}`
    );
  });
};

const wrapFunctionWithThenableAndBind = async () => {
  return new Promise(async (resolve: (value: string) => void) => {
    resolve(
      `wrapper: ${store.getStore()}, functionWithThenable_bind: ${await AsyncLocalStorage.bind(
        functionWithThenable
      )()}`
    );
  });
};

export async function testFnWithThenable() {
  return await store.run("function with thenable works", functionWithThenable);
}

export async function testWrappedFnWithThenable() {
  return await store.run("sure does!", wrapFunctionWithThenable);
}

export async function testWrappedFnWithThenableAndBind() {
  return `with bind: ${await store.run(
    "sure does!",
    wrapFunctionWithThenableAndBind
  )}`;
}

const fn = async () => {
  return store.getStore() ?? "<undefined>";
};

const wrapWithThenable = async (fn: () => Promise<string>) => {
  return {
    then: async (resolve: (value: string) => void) => {
      resolve(await fn());
    },
  };
};

const testWrapWithThenable = async () => {
  return await store.run("wrapWithThenable works!", async () =>
    wrapWithThenable(fn)
  );
};

const testWrapWithThenableAndBind = async () => {
  return await store.run("wrapWithThenable and bind() works!", async () =>
    wrapWithThenable(AsyncLocalStorage.bind(fn))
  );
};

export async function tests() {
  return {
    store: await testStore(),
    promise: await testPromise(),
    thenable: await testThenable(),
    thenable_no_async: await testThenableNoAsync(),
    async_resource: await testAsyncResource(),
    fn_with_thenable: await testFnWithThenable(),
    wrapped_fn_with_thenable: await testWrappedFnWithThenable(),
    wrapped_fn_with_thenable_and_bind: await testWrappedFnWithThenableAndBind(),
    wrap_with_thenable: await testWrapWithThenable(),
    wrap_with_thenable_and_bind: await testWrapWithThenableAndBind(),
  };
}
