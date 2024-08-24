import { promptForInteger } from "../utils/prompter";

export default async () => {
    console.log("Welcome to the Labyrinth Escape!");

    const rowCount = await promptForInteger(
        "How many rows does your labyrinth have? "
    );
    const colCount = await promptForInteger(
        "How many columns does your labyrinth have? "
    );

    console.log(`rowCount: ${rowCount}`);
    console.log(`colCount: ${colCount}`);
};
