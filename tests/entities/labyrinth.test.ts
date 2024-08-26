import Labyrinth, {
    CellType,
    Dimension,
    Position,
} from "../../src/entities/Labyrinth";

describe("Labyrinth", () => {
    let labyrinth: Labyrinth;
    const dimension: Dimension = { rows: 5, columns: 5 };

    beforeEach(() => {
        labyrinth = new Labyrinth(dimension);
    });

    test("should the correct grid dimensions", () => {
        const grid = labyrinth.getGrid();
        expect(grid.length).toBe(dimension.rows);
        expect(grid[0].length).toBe(dimension.columns);
    });

    test("should set a cell value and update the grid", () => {
        const pos: Position = { row: 0, col: 0 };
        const result = labyrinth.setCellValue(pos, CellType.Start);
        const grid = labyrinth.getGrid();

        expect(result).toBe(true);
        expect(grid[pos.row][pos.col]).toBe(CellType.Start);
        expect(labyrinth.getStart()).toEqual(pos);
    });

    test("should not set an invalid cell value", () => {
        const pos: Position = { row: 1, col: 1 };
        const result = labyrinth.setCellValue(pos, "X");

        expect(result).toBe(false);
    });

    test("should not allow start or exit away from the edge", () => {
        const centerPos: Position = { row: 2, col: 2 };
        const startResult = labyrinth.setCellValue(centerPos, CellType.Start);
        const exitResult = labyrinth.setCellValue(centerPos, CellType.Exit);

        expect(startResult).toBe(false);
        expect(exitResult).toBe(false);
    });

    test("should allow setting only one Start and one Exit", () => {
        const startPos1: Position = { row: 0, col: 0 };
        const startPos2: Position = { row: 0, col: 1 };
        const exitPos1: Position = { row: 4, col: 4 };
        const exitPos2: Position = { row: 4, col: 3 };

        const startResult1 = labyrinth.setCellValue(startPos1, CellType.Start);
        const startResult2 = labyrinth.setCellValue(startPos2, CellType.Start);

        const exitResult1 = labyrinth.setCellValue(exitPos1, CellType.Exit);
        const exitResult2 = labyrinth.setCellValue(exitPos2, CellType.Exit);

        expect(startResult1).toBe(true);
        expect(startResult2).toBe(false);

        expect(exitResult1).toBe(true);
        expect(exitResult2).toBe(false);
    });

    test("should correctly identify an unsolvable labyrinth", () => {
        expect(labyrinth.isSolvable()).toBe(false);
    });
});
