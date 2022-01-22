import { Target } from "./target.js";
import { Player } from "./player.js";

export class Game
{
    /**
	 * Элемент холста
	 * @type {HTMLCanvasElement}
	 */
	canvas;

    /**
	 * Контекст
	 * @type {CanvasRenderingContext2D}
	 */
	context;

	/** @type {Target} */
	targetGame;

	/** @type {Player} */
	player;

    constructor( canvas, buttons )
	{
		this.canvas = canvas;
		
		const context = canvas.getContext( '2d' );
		
		if ( !context )
		{
			throw new Error( 'Can\'t get 2D context' );
		}

		this.context = context;

		this.handleButtonClick = this.handleButtonClick.bind( this );
		for ( const button of buttons )
		{
			button.addEventListener('click', this.handleButtonClick );
		}
	}

	/* Обработчик нажатия на кнопки
	* 
	* @private
	* @param {Event} event
	*/
	handleButtonClick( event )
   {
	   const t = event.target;

	   if ( !( t instanceof HTMLButtonElement ) )
	   {
			return;
	   }
	   
	   this.player = new Player(this);
	   this.targetGame = new Target(this);
		
	   const action = t.dataset.action|| '';
	   switch(action){
		   case "start":
				document.querySelector('.startPage').style.display = "none";

				this.canvas.style.visibility = "visible";
				document.querySelector('.info').style.visibility = "visible";

				this.canvas.style.backgroundImage = "url('img/backgr.png')";
				document.querySelector('.restartButton').style.visibility = "visible";

				this.player.setPlayer();
				this.targetGame.setTarget();
				break;

			case "restart":
				this.player.setPlayer();
				this.targetGame.setTarget();
				break;

			default:
				throw new Error (`Unknown button "${action}"`);
	   }	   
   }
}