import { display } from "../src/index";

describe("display function", () => {
    it("should display 'Hello World!'", () => {
        expect(display()).toBe("Hello World!");
    });
});
