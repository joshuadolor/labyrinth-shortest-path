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

    setCellValue(pos: Position, value: string): boolean {
        if (!this.isInside(pos)) {
            console.log("Position should be inside the labyrinth");
            return false;
        }

        if (!this.isValidCellType(value)) {
            console.log(
                `Cell Value: ${value} not valid. \nOnly ${Object.values(
                    CellType
                ).join(", ")} characters are valid.`
            );
            return false;
        }

        if (
            !this.isAtEdge(pos) &&
            (value === CellType.Exit || value === CellType.Start)
        ) {
            console.log("Start or Exit should be at the edge of the labyrinth");
            return false;
        }

        this.grid[pos.row][pos.col] = value;
        return true;
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

    isAtEdge(pos: Position): boolean {
        const isEdgeRow =
            pos.row === 0 || pos.row === this.gridDimension.rows - 1;
        const isEdgeColumn =
            pos.col === 0 || pos.col === this.gridDimension.columns - 1;

        return isEdgeRow || isEdgeColumn;
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

    getGrid(): CellType[][] {
        return this.grid;
    }

    display(): void {
        this.grid.forEach((row) => {
            console.log(row.join("\t"));
        });
    }
}

export default Labyrinth;
