class Board{
    constructor() {
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }

    /**
     * Generate a 2D array of spaces
     * @returns {Array} - return an array of space objects
     */
    createSpaces(){
        const spaces = [];
        for(let x = 0;x < this.columns;x++){
            const columns = []

            for(let y = 0; y < this.rows;y++){
                const space = new Space(x,y);
                columns.push(space);
            }
            spaces.push(columns);
        }
        return spaces;
    }

    /**
     * Draws associated SVG spaces for all game spaces.
     */
    drawHTMLBoard(){
        for(const cols of this.spaces){
            for(const space of cols){
                space.drawSVGSpace();
            }
        }
    }
}