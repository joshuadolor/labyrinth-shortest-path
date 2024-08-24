import Labyrinth, { CellType } from "../entities/Labyrinth";
import { promptForPositiveInteger, prompt } from "../utils/prompter";

export default async () => {
    console.log("Welcome to the Labyrinth Escape!");

    const rowCount = await promptForPositiveInteger(
        "How many rows does your labyrinth have? "
    );
    const colCount = await promptForPositiveInteger(
        "How many columns does your labyrinth have? "
    );

    const labyrinth = new Labyrinth({ rows: rowCount, columns: colCount });
    const { rows, columns } = labyrinth.getGridDimension();

    console.log(
        "\nPlease enter the labyrinth values row by row, with each cell separated by commas.\nValues can be: "
    );

    for (const [key, value] of Object.entries(CellType)) {
        console.log(`\t${value} - ${key}`);
    }

    for (let i = 0; i < rows; i++) {
        const row = await prompt(`Row ${i + 1}: `);
        const values = row.split(",").map((value) => value.trim());

        if (values.length !== columns) {
            console.log(
                `Row ${i + 1} should have ${columns} values. Please try again.`
            );
            i--;
            continue;
        }

        values.forEach((value, col) => {
            labyrinth.setCellValue({ row: i, col }, value);
        });
    }

    labyrinth.display();
};
