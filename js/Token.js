class Token{
    constructor(owner,index) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    /**
     * Gets associated htmlToken.
     * @returns {element} Html element assosicated with token object.
     */
    get htmlToken(){
        const token = document.getElementById(this.id);
        return token;
    }

    /**
     * Gets left offset of html element.
     * @return {number} Left offset of token object's htmlToken
     */
    get offsetLeft(){
        return this.htmlToken.offsetLeft;
    }

    /**
     * Draw new HTML token.
     */
    drawHTMLToken(){
        const token = document.createElement('div');
        token.setAttribute('id',this.id);
        token.setAttribute('class','token');
        token.style.backgroundColor = this.owner.color;
        const boardGame = document.getElementById('game-board-underlay');
        boardGame.appendChild(token);
    }

    /**
     * Moves html token one column to the left.
     */
    moveLeft(){
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    /**
     * Move html token one column to right.
     * @param {number}  columns - number of columns in the game board
     */
    moveRight(columns){
        if(this.columnLocation < columns - 1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /**
     * Drops html token into targeted board space
     * @param {Object} target - Targeted space for dropped token.
     * @param {function} reset - The reset function to call after the drop animation has complete.
     */
    drop(target,reset){
        this.dropped = true;
        
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        },750, 'easeOutBounce',reset);
    }
}