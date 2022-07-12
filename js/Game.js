class Game{
    constructor(){
        this.board = new Board();
        this.ready = false;
        this.players = this.createPlayers();
    }

    /**
     * Create two player objects
     * @returns {Array} - An array of two player objects
     */
    createPlayers(){
        const firstPlayer = new Player('Player 1',1,'#e15258',true);
        const secondPlayer = new Player('Player 2',2,'#e59a13');
        const players = [firstPlayer,secondPlayer];
        return players;
    }

    /**
     * Returns active player.
     * @returns {object} player - The active player.
     */
    get activePlayer(){
        const player = this.players.find(player => player.active === true);
        return player;
    }

    /**
     * Initialize game
     */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
     * Branches code, depending on what key player presses
     * @param {Object} e- Keydown event object 
     */
    handleKeydown(e){
        if(this.ready){
            if(e.key === 'ArrowLeft'){
                this.activePlayer.activeToken.moveLeft();
            }else if(e.key === 'ArrowRight'){
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }else if(e.key === 'ArrowDown'){
                this.playToken();
            }
        }
    }

    /**
     * Find Space object to drop Token into, drops Token
     */
    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for(const space of targetColumn){
            if(space.token === null){
                targetSpace = space;
            }
        }

        if(targetSpace !== null){
            const game = this;
            game.ready = false;
            activeToken.drop(targetSpace,() => {
                game.updateGameState(activeToken,targetSpace);
            });
        }
    }

    /** 
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */
    
    checkForWin(target){
        const owner = target.token.owner;
        let win = false;
    
        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        return win;
    }

    /**
     * Switches active player.
     */
    switchPlayers(){
        // this.players.forEach(player => {
        //     if(player.active){
        //         player.active = false;
        //     }else {
        //         player.active = true;
        //     }
        // })

        for(const player of this.players){
            player.active = player.active === true ? false : true;
        }
    }

    /**
     * Displays game over message.
     * @param {string} message - Game over message.
     */
    gameOver(message){
        const endMessage = document.querySelector('#game-over');
        endMessage.style.display = 'block';
        endMessage.textContent = message;
    }

    /**
     * Updates game state after token is dropped.
     * @param {object} token - The token that's being dropped.
     * @param {object} target - Targeted space for dropped token.
     */
    updateGameState(token,target){
        target.mark(token);

        if(!this.checkForWin(target)){

            this.switchPlayers();

            if(this.activePlayer.checkTokens()){
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            }else {
                this.gameOver('No more tokens');
            }
        }else{
            this.gameOver(`${target.owner.name} wins!`);
        }
    }
}