class Player{
    constructor(name,id,color,active = false){
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createToken(21);
    }
    /**
     * Creates token objects for player
     * @param {Integer} num - number of object to be created 
     * @returns {Array} - contain created objects
     */
    createToken(num){
        const tokens = [];
        for(let i = 1;i <= num;i++){
            const token = new Token(this,i);
            tokens.push(token);
        }
        return tokens;
    }

    /**
     * Gets all tokens that haven't been dropped.
     * @returns {array} - Array of unused tokens.
     */
    get unusedTokens(){
        const unusedTokens = this.tokens.filter(token => token.dropped === false);
        return unusedTokens;
    }

    /**
     * Gets the active token by returning the first token in the array of unused tokens.
     * @returns {object} First token object in the array of unused tokens.
     */
    get activeToken(){
        return this.unusedTokens.shift();
    }

    /**
     * Check if a player has any undropped tokens left
     * @return {Boolean}
     */
    checkTokens(){
        // return this.unusedTokens.length > 0;
        return this.unusedTokens.length === 0 ? false : true;
    }
}