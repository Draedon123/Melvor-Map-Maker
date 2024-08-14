import { expect, test } from "vitest";
import HashManager from "$lib/classes/HashManager";

const hashManager = new HashManager("a=1,b=3", false);

test("Gets the value of a", () => {
  expect(hashManager.get("a")).toBe("1");
});

test("Gets the value of a nonexistent key", () => {
  expect(hashManager.get("d")).toBe(null);
});

test("Sets a = 2", () => {
  expect(hashManager.set("a", "2")).toBe("a=2,b=3");
});

test("Gets all hashes", () => {
  expect(hashManager.getAllHashes()).toStrictEqual({
    a: "2",
    b: "3",
  });
});

test("Deletes b", () => {
  hashManager.delete("b");
  expect(hashManager.hash).toBe("a=2");
});
