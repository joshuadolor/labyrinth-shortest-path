export enum CellType {
    OpenPath = "0",
    Wall = "1",
    Start = "S",
    Exit = "E",
}

export type Position = {
    row: number;
    col: number;
};

export type Dimension = {
    rows: number;
    columns: number;
};

class Labyrinth {
    private grid: CellType[][];
    private gridDimension: Dimension;

    constructor(dimension: Dimension) {
        this.gridDimension = dimension;
        this.grid = new Array(dimension.rows)
            .fill(null)
            .map(() => new Array(dimension.columns).fill(""));
    }

    setCellValue(pos: Position, value: string): void {
        if (!this.isInside(pos)) {
            throw new Error("error");
        }

        if (!this.isValidCellType(value)) {
            throw new Error("error");
        }

        this.grid[pos.row][pos.col] = value;
    }

    isValidCellType(value: string): value is CellType {
        return Object.values(CellType).includes(value as CellType);
    }

    isWall(p: Position): boolean {
        return this.grid[p.row][p.col] === CellType.Wall;
    }

    isInside(pos: Position): boolean {
        return (
            pos.row >= 0 &&
            pos.row < this.gridDimension.rows &&
            pos.col >= 0 &&
            pos.col < this.gridDimension.columns
        );
    }

    isSolvable(): boolean {
        return this.grid.some((row) => {
            const rowString = row.join(",");
            return (
                rowString.includes(CellType.Start) ||
                rowString.includes(CellType.Exit)
            );
        });
    }

    getGridDimension(): Dimension {
        return this.gridDimension;
    }

    display(): void {
        this.grid.forEach((row) => {
            console.log(row.join("\t"));
        });
    }
}

export default Labyrinth;
