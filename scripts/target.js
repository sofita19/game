import { Game } from "./game.js";

const  pic = new Image();
pic.src = "img/target.png";

export class Target
{
    
    /** @type {Game} */
    game;

    #goal = 25;

    x; // Начальное положение x
    y; // Начальное полежение y

    dx; // На сколько сдвигать мишень по х
    dy; // На сколько сдвигать мишень по у

    dw;
    dh;

    drawFrame;

    constructor(game)
    {
        this.game = game;
    }

    drawLevels() 
    {
        this.game.context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        this.game.context.drawImage(pic, this.x,this.y, this.dw, this.dh);

        if(this.x + this.dx > this.game.canvas.width - pic.width || this.x + this.dx < 0) 
        {
            this.dx = -this.dx;
        }

        if(this.y + this.dy > this.game.canvas.height - pic.height || this.y + this.dy < 0) 
        {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy; 

        if(this.game.player.scores >= this.#goal)
        {
            this.#goal += 25;
            this.game.player.nextLevel();
            this.dw -= 10;
            this.dh -= 10;
        }

        if(this.game.player.level <= 5)
        {
            this.drawFrame = window.requestAnimationFrame( () => this.drawLevels());
        }
        else
        {
            this.game.player.gameOver(2);
        }
    }

    drawFirstLevel() 
    {
        this.game.context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    
        this.game.context.drawImage(pic, this.x,this.y, this.dw, this.dh);

        if(this.x + this.dx > this.game.canvas.width - pic.width || this.x + this.dx < 0) 
        {
            this.dx = -this.dx;
        }

        this.x += this.dx;

        if(this.game.player.scores < this.#goal)
        {
            this.drawFrame = window.requestAnimationFrame( () => this.drawFirstLevel() );
        }
        else
        {
            this.#goal += 25;
            this.game.player.nextLevel();
            this.drawLevels();
        }
    }
    
    setTarget()
    {
        this.x = 0;
        this.y = 0;
        this.dx = 2;
        this.dy = -2;
        this.dw = 150;
        this.dh = 150;
        
        pic.onload = function() {
            this.game.context.drawImage(pic, 0, 0, this.dw, this.dh);
        };

        this.drawFirstLevel();
    }
}