const { expect } = require("chai");
const flash = require("index");

describe("connect-flash", function () {
  describe("module", function () {
    it("should export middleware", function () {
      expect(flash).to.be.a("function");
    });
  });
});
