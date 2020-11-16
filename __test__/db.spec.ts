import fs from "fs";
import db from "../utils/db";
jest.mock("fs");
describe("db", () => {
  afterEach(()=> {
    (fs as any).clearMocks()
  })
  it("can read", async () => {
    (fs as any).setReadMock("/api", null, "[]");
    const data = await db.read("/api");
    expect(data).toEqual([]);
  });
  it("can write", async () => {
    let fileData = null;
    (fs as any).setWriteMock("/api", function (
      path: string,
      data: any,
      callback: Function
    ) {
      fileData = data;
      callback(null);
    });
    const obj = [
      {
        title: "lilei",
        done: false,
      },
    ];
    await db.write(obj, "/api");
    expect(fileData).toBe(JSON.stringify(obj)+'\n');
  });
});
