import { Game } from "./game.js";

function main()
{
    const canvas = document.getElementById( 'cvs' );
	
	if (
		!canvas
		|| !( canvas instanceof HTMLCanvasElement )
	)
	{
		return;
	}

	const buttons = document.querySelectorAll( 'button' );
    	const game = new Game(canvas, buttons);
	game.createNewElements();
}

main();
