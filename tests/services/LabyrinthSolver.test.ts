import Player, { Movement } from "../../src/entities/Player";
import Labyrinth, { Position, CellType } from "../../src/entities/Labyrinth";
import LabyrithSolver from "../../src/services/LabyrinthSolver";

describe("LabyrinthSolver", () => {
    let solver: LabyrithSolver;
    let labyrinth: Labyrinth;

    beforeEach(() => {
        labyrinth = new Labyrinth({ rows: 5, columns: 5 });
        const validLabyrinthValue = [
            [
                CellType.Start,
                CellType.OpenPath,
                CellType.Wall,
                CellType.OpenPath,
                CellType.Exit,
            ],
            [
                CellType.Wall,
                CellType.OpenPath,
                CellType.Wall,
                CellType.OpenPath,
                CellType.Wall,
            ],
            [
                CellType.Wall,
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.OpenPath,
            ],
            [
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.Wall,
                CellType.Wall,
                CellType.Wall,
            ],
            [
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.OpenPath,
                CellType.OpenPath,
            ],
        ];
        for (let i = 0; i < validLabyrinthValue.length; i++) {
            for (let j = 0; j < validLabyrinthValue[i].length; j++) {
                labyrinth.setCellValue(
                    { row: i, col: j },
                    validLabyrinthValue[i][j]
                );
            }
        }

        solver = new LabyrithSolver(labyrinth);
    });

    it(
        "ShortestPath should return -1 if Labyrinth given is unsolvable (no start or no exit)"
    );
    it("ShortestPath should return -1 if Labyrinth given ");
});
