document.addEventListener('DOMContentLoaded', () => {
    // Puzzle Logic
    const board = document.getElementById('puzzle-board');
    const devBtn = document.getElementById('solve-button-dev');
    
    // We use a 4x4 grid (16 tiles. 15 puzzle + 1 empty)
    const gridSize = 4;
    const tileCount = gridSize * gridSize;
    
    // Set actual image source for the puzzle here. Best if it's square.
    const puzzleImgUrl = 'img/puzzle_img.png'; 
    let tiles = [];
    
    // Initialize Puzzle State
    let puzzleState = [...Array(tileCount).keys()]; 
    // Example: [0, 1, 2, ... 15]. 15 is the empty slot.

    function initPuzzle() {
        board.innerHTML = '';
        
        // Shuffle the array simply (ensure it stays solvable, or just basic random for fun since it's an anniversary gift)
        // A simple random shuffle might be unsolvable, so we do random valid slider moves!
        shuffleSolvable();
        
        renderBoard();
    }

    function shuffleSolvable() {
        // Start perfect
        puzzleState = [...Array(tileCount).keys()];
        let emptyIdx = tileCount - 1;

        // Perform 100 random valid moves
        for(let i=0; i<100; i++) {
            const validMoves = getValidMoves(emptyIdx);
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            
            // Swap
            let temp = puzzleState[emptyIdx];
            puzzleState[emptyIdx] = puzzleState[randomMove];
            puzzleState[randomMove] = temp;
            
            emptyIdx = randomMove;
        }
    }

    function getValidMoves(emptyIdx) {
        let moves = [];
        let row = Math.floor(emptyIdx / gridSize);
        let col = emptyIdx % gridSize;

        if (row > 0) moves.push(emptyIdx - gridSize); // up
        if (row < gridSize - 1) moves.push(emptyIdx + gridSize); // down
        if (col > 0) moves.push(emptyIdx - 1); // left
        if (col < gridSize - 1) moves.push(emptyIdx + 1); // right
        
        return moves;
    }

    function renderBoard() {
        board.innerHTML = '';
        const tileSize = 320 / gridSize; // Since board is 320px

        puzzleState.forEach((val, idx) => {
            const tile = document.createElement('div');
            tile.classList.add('puzzle-tile');
            
            if (val === tileCount - 1) {
                // Empty tile
                tile.classList.add('empty');
            } else {
                // Determine original X Y for background position
                const origRow = Math.floor(val / gridSize);
                const origCol = val % gridSize;
                
                // Using fallback background image, user will replace with actual image.
                tile.style.backgroundImage = `url('${puzzleImgUrl}')`;
                tile.style.backgroundPosition = `-${origCol * tileSize}px -${origRow * tileSize}px`;
            }

            // Click to move
            tile.addEventListener('click', () => {
                handleTileClick(idx);
            });
            
            board.appendChild(tile);
        });
    }

    function handleTileClick(index) {
        // find empty tile index
        const emptyIdx = puzzleState.indexOf(tileCount - 1);
        
        // check if valid move
        const validMoves = getValidMoves(emptyIdx);
        if (validMoves.includes(index)) {
            // Swap
            let temp = puzzleState[emptyIdx];
            puzzleState[emptyIdx] = puzzleState[index];
            puzzleState[index] = temp;
            
            renderBoard();
            checkWin();
        }
    }

    function checkWin() {
        let won = true;
        for (let i = 0; i < tileCount; i++) {
            if (puzzleState[i] !== i) {
                won = false;
                break;
            }
        }

        if (won) {
            handleWin();
        }
    }

    function handleWin() {
        // Fill the empty piece
        const emptyTileDiv = board.querySelector('.empty');
        if (emptyTileDiv) {
            emptyTileDiv.classList.remove('empty');
            const origRow = Math.floor((tileCount-1) / gridSize);
            const origCol = (tileCount-1) % gridSize;
            const tileSize = 320 / gridSize;
            emptyTileDiv.style.backgroundImage = `url('${puzzleImgUrl}')`;
            emptyTileDiv.style.backgroundPosition = `-${origCol * tileSize}px -${origRow * tileSize}px`;
        }

        // Celebrate!
        if (window.spawnConfetti) window.spawnConfetti();
        
        setTimeout(() => {
            document.getElementById('key-container').classList.remove('hidden');
            // scroll to it softly
            document.getElementById('key-container').scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 1500);
    }

    // Dev cheat button
    if (devBtn) {
        devBtn.addEventListener('click', () => {
            puzzleState = [...Array(tileCount).keys()];
            renderBoard();
            checkWin();
        });
    }

    // Key to Chest Mechanic
    const chestContainer = document.getElementById('chest-container');
    const keyContainer = document.getElementById('key-container');
    const clueReveal = document.getElementById('clue-reveal');
    let hasKey = false;
    let chestOpened = false;

    // We can simulate it by clicking the chest if key is revealed
    chestContainer.addEventListener('click', () => {
        if (!keyContainer.classList.contains('hidden') && !chestOpened) {
            openChest();
        } else if (keyContainer.classList.contains('hidden') && !chestOpened) {
            chestContainer.querySelector('.chest-text').innerText = "Trancado! Precisas da chave primeiro 😉";
            chestContainer.classList.add('shake');
            setTimeout(() => chestContainer.classList.remove('shake'), 500);
        }
    });

    function openChest() {
        chestOpened = true;
        chestContainer.classList.remove('locked');
        chestContainer.classList.add('unlocked');
        
        chestContainer.querySelector('.chest-text').innerText = "Baú Aberto! ✨";
        keyContainer.style.opacity = '0.5'; // key used
        
        if (window.spawnConfetti) window.spawnConfetti();
        
        setTimeout(() => {
            clueReveal.classList.remove('hidden');
            clueReveal.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 1000);
    }

    // Boot
    initPuzzle();
});
