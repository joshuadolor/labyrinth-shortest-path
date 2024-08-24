import readline from "readline";

export const prompt = (question: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};

export const promptForInteger = async (question: string): Promise<number> => {
    const inputtedValue = await prompt(question);

    return new Promise(async (resolve) => {
        const num = parseInt(inputtedValue, 10);
        if (isNaN(num) || num <= 0) {
            console.log("Please enter a valid positive number.\n");
            resolve(promptForInteger(question));
        } else {
            resolve(num);
        }
    });
};
