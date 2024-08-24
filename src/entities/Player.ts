import { Position } from "./Labyrinth";

class Player {
    private position: Position;

    constructor(pos: Position) {
        this.position = pos;
    }

    moveUp() {
        return this;
    }

    moveDown() {
        return this;
    }

    moveRight() {
        return this;
    }

    moveLeft() {
        return this;
    }
}

export default Player;
