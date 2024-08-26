import Labyrinth, { Position } from "../entities/Labyrinth";
import Player, { Movement } from "../entities/Player";

const Movements = Object.values(Movement);
class LabyrinthSolver {
    private labyrinth: Labyrinth;
    private players: Player[];

    constructor(labyrinth: Labyrinth) {
        this.labyrinth = labyrinth;
        this.players = [];
    }

    public getShortestPath(): number {
        if (!this.labyrinth.isSolvable()) return -1;

        const startPosition = this.labyrinth.getStart();
        if (startPosition) {
            const player = new Player(startPosition);
            this.players.push(player);
            this.explorePath(player);
            const players = this.players.filter((player) => player.hasExited());
            return players.length === 0
                ? -1
                : Math.min.apply(
                      null,
                      players.map((player) => player.getMoves())
                  );
        }

        return -1;
    }

    private explorePath(player: Player): void {
        const validMoves = this.getValidMoves(player);

        if (validMoves.length === 0) return;

        const [firstMove, ...remainingMoves] = validMoves;

        player.savePosition(firstMove);
        const exitPosition = this.labyrinth.getExit();
        if (exitPosition && player.isAtPosition(exitPosition)) {
            player.setExited(true);
            return;
        }

        remainingMoves.forEach((move) => {
            const newPlayer = new Player(move, player.getPositionHistory());
            this.players.push(newPlayer);
            if (exitPosition && newPlayer.isAtPosition(exitPosition)) {
                newPlayer.setExited(true);
                return;
            }
            this.explorePath(newPlayer);
        });

        this.explorePath(player);
    }

    private getValidMoves(player: Player): Position[] {
        return Movements.reduce((moves: Position[], move) => {
            const unsavedPosition = player[move]();
            const isMovementValid =
                this.isMoveValid(unsavedPosition) &&
                player.canMove(unsavedPosition);

            if (isMovementValid) {
                moves.push(unsavedPosition);
            }

            return moves;
        }, []);
    }

    private isMoveValid(pos: Position) {
        return this.labyrinth.isInside(pos) && !this.labyrinth.isWall(pos);
    }
}

export default LabyrinthSolver;
