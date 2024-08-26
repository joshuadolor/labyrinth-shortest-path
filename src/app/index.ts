import Labyrinth, { CellType } from "../entities/Labyrinth";
import LabyrinthSolver from "../services/LabyrinthSolver";
import { promptForPositiveInteger, prompt } from "../utils/prompter";
import { hasDuplicateCharacter } from "../utils/string-helpers";

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

    console.log("Example: S,0,0,0,E (A labyrinth having 5 columns)\n");

    for (let row = 0; row < rows; row++) {
        const rowValue = await prompt(`Row ${row + 1}: `);

        if (
            hasDuplicateCharacter(rowValue, CellType.Start) ||
            hasDuplicateCharacter(rowValue, CellType.Exit)
        ) {
            console.log(
                `Your labyrinth should have only one start and one exit. Please try again.`
            );
            row--;
            continue;
        }

        const values = rowValue.split(",").map((value) => value.trim());

        if (values.length !== columns) {
            console.log(
                `Row ${
                    row + 1
                } should have ${columns} values. Please try again.`
            );
            row--;
            continue;
        }

        for (let col = 0; col < values.length; col++) {
            const value = values[col];
            if (!labyrinth.setCellValue({ row, col }, value)) {
                console.log(`Enter Row ${row + 1} values again.`);
                row--;
                break;
            }
        }
    }

    const solver = new LabyrinthSolver(labyrinth);
    console.log("==============================");
    console.log("Your Labyrinth: \n");
    labyrinth.display();
    console.log("==============================");
    console.log(`Shortest Path: ${solver.getShortestPath()}`);
};
