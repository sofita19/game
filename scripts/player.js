import { Game } from "./game.js";

export class Player
{
    #lives;

    scores;
    
    level;

    mouseX;
    mouseY;

    /** @type {Game} */
    game;
    
    constructor(game)
    {
        this.game = game;
    }

    setPlayer()
    {
        this.#lives = 3;
        this.scores = 0;
        this.level = 1;
        
        document.querySelector('.scores').textContent = this.scores;
        document.querySelector('.lives').textContent = this.#lives;
        document.querySelector('.level').textContent = this.level; 

	    this.game.canvas.addEventListener("click", (event) => {
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;

            this.clickOnTarget();
        });
    }

    addScores(s)
    {
        this.scores += s;
        document.querySelector('.scores').textContent = this.scores;
        document.querySelector('.level').textContent = this.level;
    }

    deleteLife()
    {
        if(this.#lives>1)
        {
            this.#lives--;
            document.querySelector('.lives').textContent = this.#lives;
        }
        else //game over
        {
            this.#lives = 0;
            document.querySelector('.lives').textContent = this.#lives;
            this.gameOver(1);
        }
    }

    nextLevel()
    {
        this.level++;
        document.querySelector('.level').textContent = this.level;
    }
    
    gameOver(reason)
    {
        window.cancelAnimationFrame(this.game.targetGame.drawFrame);
        document.removeEventListener("click", this.clickOnTarget);
        
        this.game.context.fillStyle = 'black';
        this.game.context.globalAlpha = 0.9;
        this.game.context.fillRect(0, this.game.canvas.height/2 - 50, this.game.canvas.width, 80);

        this.game.context.globalAlpha = 1;
        this.game.context.fillStyle = 'white';
        this.game.context.font = '30px monospace';
        this.game.context.textAlign = 'center';

        if(reason === 1)
        {
            this.game.context.fillText('GAME OVER!', this.game.canvas.width/2, this.game.canvas.height/2);
        }
        else
        {
            this.game.context.fillText('CONGRATULATIONS! YOU COMPLETED ALL LEVELS!', this.game.canvas.width/2, this.game.canvas.height/2);
        }
    }

    clickOnTarget()
    {
        let ImgData = this.game.context.getImageData(this.mouseX, this.mouseY , 2, 2);
        let pixels = ImgData.data;

        if (pixels[0] > 240 && pixels[1] > 230 && pixels[2] < 30 && pixels[3] === 255) // if yellow
            this.addScores(5);

        if (pixels[0] > 230 && pixels[1] < 30 && pixels[2] < 30 && pixels[3] === 255) // if red
            this.addScores(3);

        if (pixels[0] < 60 && pixels[1] < 180 && pixels[2] > 190 && pixels[3] === 255) // if blue
            this.addScores(2);
        
        if (pixels[0] === 0 && pixels[1] === 1 && pixels[2] === 0 && pixels[3] === 255) // if black
            this.addScores(1);

        if (pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0 && pixels[3] === 0) // if not on target
            this.deleteLife();
    }

    
}