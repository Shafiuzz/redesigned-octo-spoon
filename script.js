document.addEventListener('DOMContentLoaded', function() {
    const puzzle = document.getElementById('puzzle');
    const shuffleButton = document.getElementById('shuffle-button');

    const tiles = Array.from({ length: 8 }, (_, i) => i + 1); // Numbered tiles
    tiles.push(null); // Empty space

    function createPuzzle() {
        puzzle.innerHTML = '';
        tiles.forEach(tile => {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.textContent = tile;
            piece.addEventListener('click', () => moveTile(tile));
            puzzle.appendChild(piece);
        });
    }

    function moveTile(tile) {
        const emptyIndex = tiles.indexOf(null);
        const tileIndex = tiles.indexOf(tile);

        if (isAdjacent(emptyIndex, tileIndex)) {
            tiles[emptyIndex] = tile;
            tiles[tileIndex] = null;
            createPuzzle();
        }

        if (isSolved()) {
            alert('You solved the puzzle!');
        }
    }

    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;

        return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    function isSolved() {
        return tiles.every((tile, index) => tile === null || tile === index + 1);
    }

    shuffleButton.addEventListener('click', shufflePuzzle);

    function shufflePuzzle() {
        for (let i = 0; i < 1000; i++) {
            const emptyIndex = tiles.indexOf(null);
            const adjacentIndexes = getAdjacentIndexes(emptyIndex);
            const randomIndex = adjacentIndexes[Math.floor(Math.random() * adjacentIndexes.length)];

            tiles[emptyIndex] = tiles[randomIndex];
            tiles[randomIndex] = null;
        }
        createPuzzle();
    }

    function getAdjacentIndexes(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const adjacentIndexes = [];

        if (row > 0) adjacentIndexes.push(index - 3);
        if (row < 2) adjacentIndexes.push(index + 3);
        if (col > 0) adjacentIndexes.push(index - 1);
        if (col < 2) adjacentIndexes.push(index + 1);

        return adjacentIndexes;
    }

    createPuzzle();
});
