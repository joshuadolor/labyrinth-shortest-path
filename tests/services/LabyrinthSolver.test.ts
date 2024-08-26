import Player, { Movement } from "../../src/entities/Player";
import Labyrinth, { Position, CellType } from "../../src/entities/Labyrinth";
import LabyrithSolver from "../../src/services/LabyrinthSolver";

describe("LabyrinthSolver's ", () => {
    let solver: LabyrithSolver;
    let labyrinth: Labyrinth;

    it("getShortestPath should return -1, if Labyrinth given is unsolvable (no start or no exit)", () => {
        labyrinth = new Labyrinth({ columns: 3, rows: 3 });
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                labyrinth.setCellValue({ row: i, col: j }, CellType.OpenPath);
            }
        }
        solver = new LabyrithSolver(labyrinth);
        expect(solver.getShortestPath()).toBe(-1);
    });
    it("getShortestPath should return -1, if no player can exit the given Labyrinth", () => {
        labyrinth = new Labyrinth({ rows: 5, columns: 5 });
        const unsolvableLabyrinth = [
            [
                CellType.Start,
                CellType.OpenPath,
                CellType.Wall,
                CellType.Wall,
                CellType.Exit,
            ],
            [
                CellType.Wall,
                CellType.OpenPath,
                CellType.Wall,
                CellType.Wall,
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
        for (let i = 0; i < unsolvableLabyrinth.length; i++) {
            for (let j = 0; j < unsolvableLabyrinth[i].length; j++) {
                labyrinth.setCellValue(
                    { row: i, col: j },
                    unsolvableLabyrinth[i][j]
                );
            }
        }

        solver = new LabyrithSolver(labyrinth);
        expect(solver.getShortestPath()).toBe(-1);
    });
    it("getShortestPath should return 8, if labyrinth is solvable in 8 moves", () => {
        labyrinth = new Labyrinth({ rows: 5, columns: 5 });
        const unsolvableLabyrinth = [
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
        for (let i = 0; i < unsolvableLabyrinth.length; i++) {
            for (let j = 0; j < unsolvableLabyrinth[i].length; j++) {
                labyrinth.setCellValue(
                    { row: i, col: j },
                    unsolvableLabyrinth[i][j]
                );
            }
        }

        solver = new LabyrithSolver(labyrinth);
        expect(solver.getShortestPath()).toBe(8);
    });

    it("getShortestPath should return a correct number of moves, if labyrinth's start and exit is beside each other", () => {
        labyrinth = new Labyrinth({ rows: 3, columns: 3 });
        const unsolvableLabyrinth = [
            [CellType.Start, CellType.OpenPath, CellType.Wall],
            [CellType.Exit, CellType.OpenPath, CellType.Wall],
            [CellType.Wall, CellType.OpenPath, CellType.OpenPath],
        ];
        for (let i = 0; i < unsolvableLabyrinth.length; i++) {
            for (let j = 0; j < unsolvableLabyrinth[i].length; j++) {
                labyrinth.setCellValue(
                    { row: i, col: j },
                    unsolvableLabyrinth[i][j]
                );
            }
        }

        solver = new LabyrithSolver(labyrinth);
        expect(solver.getShortestPath()).toBe(1);
    });

    // test private methods??
    // it("isMoveValid should return true if a move is valid", () => {});
});
