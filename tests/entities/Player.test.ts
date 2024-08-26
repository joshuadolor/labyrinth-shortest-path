import Player, { Movement } from "../../src/entities/Player";
import { Position } from "../../src/entities/Labyrinth";

describe("Player", () => {
    it("should initialize with the correct position", () => {
        const initialPosition: Position = { row: 0, col: 0 };
        const player = new Player(initialPosition);

        expect(player.getPosition()).toEqual(initialPosition);
        expect(player.getMoves()).toBe(0);
    });

    it("should move correctly", () => {
        const initialPosition: Position = { row: 1, col: 1 };
        const player = new Player(initialPosition);

        const newPosition = player[Movement.MoveUp]();
        expect(newPosition).toEqual({ row: 0, col: 1 });
    });

    it("should save position correctly after a move", () => {
        const initialPosition: Position = { row: 2, col: 2 };
        const player = new Player(initialPosition);

        player.savePosition({ row: 3, col: 2 });

        expect(player.getPosition()).toEqual({ row: 3, col: 2 });
        expect(player.getMoves()).toBe(1);
    });

    it("should correctly track position history", () => {
        const initialPosition: Position = { row: 3, col: 3 };
        const player = new Player(initialPosition);

        player.savePosition({ row: 4, col: 3 });
        player.savePosition({ row: 5, col: 3 });

        expect(player.getPositionHistory()).toEqual([
            { row: 3, col: 3 },
            { row: 4, col: 3 },
        ]);
        expect(player.getMoves()).toBe(2);
    });

    it("should not allow moving to a past position", () => {
        const initialPosition: Position = { row: 1, col: 1 };
        const player = new Player(initialPosition);

        player.savePosition({ row: 2, col: 1 });
        player.savePosition({ row: 3, col: 1 });

        const backToStart = { row: 1, col: 1 };

        expect(player.canMove(backToStart)).toBe(false);
    });

    it("should recognize when it has exited", () => {
        const initialPosition: Position = { row: 0, col: 0 };
        const player = new Player(initialPosition);

        player.setExited(true);

        expect(player.hasExited()).toBe(true);
    });
});
