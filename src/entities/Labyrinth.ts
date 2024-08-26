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

type LabyrinthGrid = CellType | null;

class Labyrinth {
    private grid: LabyrinthGrid[][];
    private gridDimension: Dimension;
    private start: Position | undefined;
    private exit: Position | undefined;

    constructor(dimension: Dimension) {
        this.gridDimension = dimension;
        this.grid = new Array(dimension.rows)
            .fill(null)
            .map(() => new Array(dimension.columns).fill(null));
    }

    public setCellValue(pos: Position, value: string): boolean {
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

        if (this.start && value === CellType.Start) {
            console.log("There should only be one start");
            return false;
        }

        if (this.exit && value === CellType.Exit) {
            console.log("There should only be one exit");
            return false;
        }

        if (value === CellType.Exit) {
            this.exit = pos;
        }

        if (value === CellType.Start) {
            this.start = pos;
        }

        this.grid[pos.row][pos.col] = value;
        return true;
    }

    public isValidCellType(value: string): value is CellType {
        return Object.values(CellType).includes(value as CellType);
    }

    public isWall(p: Position): boolean {
        return this.grid[p.row][p.col] === CellType.Wall;
    }

    public isInside(pos: Position): boolean {
        return (
            pos.row >= 0 &&
            pos.row < this.gridDimension.rows &&
            pos.col >= 0 &&
            pos.col < this.gridDimension.columns
        );
    }

    public isAtEdge(pos: Position): boolean {
        const isEdgeRow =
            pos.row === 0 || pos.row === this.gridDimension.rows - 1;
        const isEdgeColumn =
            pos.col === 0 || pos.col === this.gridDimension.columns - 1;

        return isEdgeRow || isEdgeColumn;
    }

    public isSolvable(): boolean {
        return !!this.getStart() && !!this.getExit();
    }

    public getGridDimension(): Dimension {
        return this.gridDimension;
    }

    public getStart(): Position | undefined {
        return this.start;
    }

    public getExit(): Position | undefined {
        return this.exit;
    }

    public getGrid(): LabyrinthGrid[][] {
        return this.grid;
    }

    public display(): void {
        this.grid.forEach((row) => {
            console.log(row.join("\t"));
        });
    }
}

export default Labyrinth;
