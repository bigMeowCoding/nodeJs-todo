import fs from "fs";
import db from "../utils/db";
jest.mock("fs");
describe("db", () => {
  it("can read", async () => {
    (fs as any).setMock("/api", null, "[]");
    const data = await db.read("/api");
    expect(data).toEqual([]);
  });
});
