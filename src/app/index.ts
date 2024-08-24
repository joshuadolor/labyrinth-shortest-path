import { promptForPositiveInteger } from "../utils/prompter";

export default async () => {
    console.log("Welcome to the Labyrinth Escape!");

    const rowCount = await promptForPositiveInteger(
        "How many rows does your labyrinth have? "
    );
    const colCount = await promptForPositiveInteger(
        "How many columns does your labyrinth have? "
    );

    console.log(`rowCount: ${rowCount}`);
    console.log(`colCount: ${colCount}`);
};
