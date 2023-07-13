import { AsyncLocalStorage } from "async_hooks";

export const store = new AsyncLocalStorage<string>();

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
