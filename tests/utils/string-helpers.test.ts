import { hasDuplicateCharacter } from "../../src/utils/string-helpers";

describe("hasDuplicateCharacter function", () => {
    it("should determine if a character is duplicated in the given string", () => {
        expect(hasDuplicateCharacter("TESSSSST", "S")).toBe(true);
    });

    it("should determine if a character is NOT duplicated in the given string", () => {
        expect(hasDuplicateCharacter("TEST", "S")).toBe(false);
    });
});
