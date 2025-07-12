import { MinutesToHHMMPipe } from "./minutes-to-hhmmpipe.pipe";

describe("MinutesToHHMMPipe", () => {
  it("create an instance", () => {
    const pipe = new MinutesToHHMMPipe();
    expect(pipe).toBeTruthy();
  });
});
