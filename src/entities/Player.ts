import { Position } from "./Labyrinth";

export enum Movement {
    MoveUp = "moveUp",
    MoveRight = "moveRight",
    MoveDown = "moveDown",
    MoveLeft = "moveLeft",
}

class Player {
    private positionHistory: Position[] = [];
    private position: Position;
    private exited: boolean = false;

    constructor(initialPosition: Position, positionHistory?: Position[]) {
        this.position = { ...initialPosition };
        if (positionHistory) {
            this.positionHistory = [...positionHistory];
        }
    }

    public setExited(v: boolean): void {
        this.exited = v;
    }

    public hasExited(): boolean {
        return this.exited;
    }

    public savePosition({ row, col }: Position) {
        this.positionHistory.push({ ...this.position });
        this.position = { row, col };
    }

    public [Movement.MoveUp](): Position {
        return { row: this.position.row - 1, col: this.position.col };
    }

    public [Movement.MoveDown](): Position {
        return { row: this.position.row + 1, col: this.position.col };
    }

    public [Movement.MoveRight](): Position {
        return { row: this.position.row, col: this.position.col + 1 };
    }

    public [Movement.MoveLeft](): Position {
        return { row: this.position.row, col: this.position.col - 1 };
    }

    public getPositionHistory(): Position[] {
        return this.positionHistory;
    }

    public getMoves(): number {
        return this.positionHistory.length;
    }

    public getPosition(): Position {
        return this.position;
    }

    public setPosition(pos: Position) {
        this.position = pos;
    }

    // player should not be able to go backwards
    public canMove({ row, col }: Position): boolean {
        return !this.positionHistory.find((position) => {
            return row === position.row && col === position.col;
        });
    }

    public isAtPosition(pos: Position): boolean {
        return this.position.row === pos.row && this.position.col === pos.col;
    }
}

export default Player;
