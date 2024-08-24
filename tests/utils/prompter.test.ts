import * as readline from "readline";
import { prompt, promptForPositiveInteger } from "../../src/utils/prompter";

jest.mock("readline");

describe("prompt function", () => {
    let mockQuestion: jest.Mock;

    beforeEach(() => {
        mockQuestion = jest.fn();
        (readline.createInterface as jest.Mock).mockReturnValue({
            question: mockQuestion,
            close: jest.fn(),
        });
    });

    it("should return the inputted value by the user", async () => {
        mockQuestion.mockImplementationOnce((_, callback) => callback("6"));
        const question = "Input a value: ";
        const result = await prompt(question);
        expect(result).toBe("6");
        expect(typeof result).toBe("string");
        expect(mockQuestion).toHaveBeenCalledWith(
            question,
            expect.any(Function)
        );
    });
});

describe("promptForInteger function", () => {
    let mockQuestion: jest.Mock;
    const question = "Input a positive integer: ";
    beforeEach(() => {
        mockQuestion = jest.fn();
        (readline.createInterface as jest.Mock).mockReturnValue({
            question: mockQuestion,
            close: jest.fn(),
        });
    });

    it("should return a type of integer", async () => {
        mockQuestion.mockImplementationOnce((_, callback) => callback("6"));
        const result = await promptForPositiveInteger(question);
        expect(result).toBe(6);
    });

    it("should prompt again if the inpuuted value is not an integer", async () => {
        mockQuestion
            .mockImplementationOnce((_, callback) => callback("not a number"))
            .mockImplementationOnce((_, callback) => callback("-5"))
            .mockImplementationOnce((_, callback) => callback("10"));

        const result = await promptForPositiveInteger(question);

        expect(result).toBe(10);
        expect(mockQuestion).toHaveBeenCalledTimes(3);
        expect(mockQuestion).toHaveBeenCalledWith(
            question,
            expect.any(Function)
        );
    });
});
