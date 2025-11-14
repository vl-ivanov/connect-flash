const { expect } = require("chai");
const flash = require("flash");

function MockRequest() {
  this.session = {};
}

function MockRequestWithoutSession() {}

function MockResponse() {}

describe("flash", function () {
  describe("middleware", function () {
    let middleware;

    before(function () {
      middleware = flash();
    });

    describe("when handling a request", function () {
      let req, res;

      beforeEach(function (done) {
        req = new MockRequest();
        res = new MockResponse();
        middleware(req, res, done);
      });

      it("should add a flash function", function () {
        expect(req.flash).to.be.a("function");
      });

      it("should set flash message", function () {
        const count = req.flash("error", "Something went wrong");
        expect(count).to.equal(1);
        expect(Object.keys(req.session.flash)).to.have.lengthOf(1);
        expect(req.session.flash["error"]).to.have.lengthOf(1);
      });

      it("should get and clear previously set flash message", function () {
        req.flash("error", "Something went wrong");
        const msgs = req.flash("error");
        expect(msgs).to.have.lengthOf(1);
        expect(msgs[0]).to.equal("Something went wrong");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(0);
      });

      it("should set multiple flash messages", function () {
        req.flash("info", "Welcome");
        const count = req.flash("info", "Check out this great new feature");
        expect(count).to.equal(2);
        expect(Object.keys(req.session.flash)).to.have.lengthOf(1);
        expect(req.session.flash["info"]).to.have.lengthOf(2);
      });

      it("should set flash messages in one call", function () {
        const count = req.flash("warning", [
          "username required",
          "password required",
        ]);
        expect(count).to.equal(2);
        const msgs = req.flash("warning");
        expect(msgs).to.have.lengthOf(2);
        expect(msgs[0]).to.equal("username required");
        expect(msgs[1]).to.equal("password required");
      });

      it("should get and clear multiple previously set flash messages", function () {
        req.flash("info", "Welcome");
        req.flash("info", "Check out this great new feature");
        const msgs = req.flash("info");
        expect(msgs).to.have.lengthOf(2);
        expect(msgs[0]).to.equal("Welcome");
        expect(msgs[1]).to.equal("Check out this great new feature");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(0);
      });

      it("should set flash messages of multiple types", function () {
        req.flash("info", "Welcome back");
        req.flash("notice", "Last login was yesterday");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(2);
        expect(req.session.flash["info"]).to.have.lengthOf(1);
        expect(req.session.flash["notice"]).to.have.lengthOf(1);
      });

      it("should independently get and clear messages of multiple types", function () {
        req.flash("info", "Welcome back");
        req.flash("notice", "Last login was yesterday");
        let msgs = req.flash("info");
        expect(msgs).to.have.lengthOf(1);
        expect(msgs[0]).to.equal("Welcome back");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(1);
        msgs = req.flash("notice");
        expect(msgs).to.have.lengthOf(1);
        expect(msgs[0]).to.equal("Last login was yesterday");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(0);
      });

      it("should return all messages", function () {
        req.flash("error", "Database is down");
        req.flash("error", "Message queue is down");
        req.flash("notice", "Things are looking bleak");
        const msgs = req.flash();
        expect(Object.keys(msgs)).to.have.lengthOf(2);
        expect(msgs["error"]).to.have.lengthOf(2);
        expect(msgs["notice"]).to.have.lengthOf(1);
        expect(Object.keys(req.session.flash)).to.have.lengthOf(0);
      });

      it("should format messages", function () {
        req.flash("info", "Hello %s", "Jared");
        let msg = req.flash("info")[0];
        expect(msg).to.equal("Hello Jared");

        req.flash("info", "Hello %s %s", "Jared", "Hanson");
        msg = req.flash("info")[0];
        expect(msg).to.equal("Hello Jared Hanson");
      });

      it("should return empty array for flash type with no messages", function () {
        const msgs = req.flash("what");
        expect(msgs).to.have.lengthOf(0);
      });
    });

    describe("when handling a request with an existing flash function", function () {
      let req, res;

      beforeEach(function (done) {
        req = new MockRequest();
        req.flash = function (type, msg) {
          this.session.flash = "I Exist";
        };
        res = new MockResponse();
        middleware(req, res, done);
      });

      it("should not overwrite flash function", function () {
        req.flash("question", "Do you?");
        expect(req.session.flash).to.equal("I Exist");
      });
    });

    describe("when handling a request without a session", function () {
      let req, res;

      beforeEach(function (done) {
        req = new MockRequestWithoutSession();
        res = new MockResponse();
        middleware(req, res, done);
      });

      it("should add a flash function", function () {
        expect(req.flash).to.be.a("function");
      });

      it("should throw when attempting to set a flash message", function () {
        expect(function () {
          req.flash("error", "Something went wrong");
        }).to.throw();
      });
    });
  });

  describe("middleware with an unsafe option", function () {
    let middleware;

    before(function () {
      middleware = flash({ unsafe: true });
    });

    describe("when handling a request with an existing flash function", function () {
      let req, res;

      beforeEach(function (done) {
        req = new MockRequest();
        req.flash = function (type, msg) {
          this.session.flash = "I Exist";
        };
        res = new MockResponse();
        middleware(req, res, done);
      });

      it("should overwrite flash function", function () {
        req.flash("info", "It works!");
        expect(Object.keys(req.session.flash)).to.have.lengthOf(1);
        expect(req.session.flash["info"]).to.have.lengthOf(1);
      });
    });
  });
});
