import Labyrinth, { CellType } from "../entities/Labyrinth";
import LabyrinthSolver from "../services/LabyrinthSolver";
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

    console.log("Example: S,0,0,0,E (A labyrinth having 5 columns)\n");

    for (let row = 0; row < rows; row++) {
        const rowValue = await prompt(`Row ${row + 1}: `);
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
    labyrinth.display();
    console.log(`
==========================================
Shortest Path: ${solver.getShortestPath()}
    `);
};
