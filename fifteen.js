//extra feature-timer


var elTime;
var puzzlearea;
var text;
var tiles;
var shufflebutton;
var validMoves=[];
var emptySpaceX = '300px';
var emptySpaceY = '300px';
window.onload = function()
{

	elTime= document.createElement("Time");
	puzzlearea = document.getElementById("puzzlearea");
	text = document.createTextNode("Timer: 00:00");
	document.getElementById("overall").insertBefore(elTime,puzzlearea);
	elTime.id = "elTime";
	elTime.appendChild(text);


	tiles = puzzlearea.getElementsByTagName("div");
	shufflebutton = document.getElementById("shufflebutton");

	initializeGrid();
	shufflebutton.onclick = shufflePieces;


	calcValidMoves();
}

function initializeGrid()
{
  var x= 0;
  var y= 0;
  var count = 0;
	for (var i=0; i<tiles.length; i++)
	{
		tiles[i].className = "puzzlepiece";
		//tiles[i].style.left = (i % 4 * 100) + "px";
		//tiles[i].style.top = (parseInt(i / 4) * 100) + "px";

    tiles[i].style.left= x + "px";
    tiles[i].style.top= y + "px";
    x += 100;
    count += 1;

    if (count %4==0){
      y+=100;
      x=0;
}

  	tiles[i].style.backgroundPosition = "-" + tiles[i].style.left + " " + "-" + tiles[i].style.top;
		tiles[i].onclick = function()
		{
			if (isValidMove(this.style.left, this.style.top))
			{
				switchPieces(parseInt(this.innerHTML-1));
                calcValidMoves();
			}

		}


  /*  pieces[0].style.background ="background.jpg";
    var x= 0;
    var y= 0;
    var count = 0;

    for (var i=0; i < pieces.length; i++){
      pieces[i].className = ('puzzlepiece');

      pieces[i].style.left= x + "px";
      pieces[i].style.top= y + "px";
      x += 100;
      count += 1;

      if (count %4==0){
        y+=100;
        x=0;
      }
    }
*/




		tiles[i].onmouseover = function()
		{

			if (isValidMove(this.style.left, this.style.top))
			{
				this.classList.add("movablepiece");
			}

		}

		tiles[i].onmouseout = function()
		{
			this.classList.remove("movablepiece");
		}
	}
}


function shufflePieces()
{
    var timerFunc = setInterval(timer, 1000);
	var rndNum;


	for (var i = 0; i < 250; i++)
	{

		rndNum = Math.floor(Math.random() * validMoves.length);


		for (var x = 0; x < tiles.length; x++)
		{
			if ((validMoves[rndNum][0] === parseInt(tiles[x].style.left))
				&& (validMoves[rndNum][1] === parseInt(tiles[x].style.top)))
			{

				switchPieces(parseInt(tiles[x].innerHTML-1));
				calcValidMoves();
				break;
			}
		}
	}
}


function switchPieces(puzzlePiece)
{

	var temp = tiles[puzzlePiece].style.left;
	tiles[puzzlePiece].style.left = emptySpaceX;
	emptySpaceX = temp;


	temp = tiles[puzzlePiece].style.top;
	tiles[puzzlePiece].style.top = emptySpaceY;
	emptySpaceY = temp;
}


function calcValidMoves()
{
	tempX = parseInt(emptySpaceX);
	tempY = parseInt(emptySpaceY);


	validMoves = [];


	if (tempY != 0)
	{
		validMoves.push([tempX, tempY - 100]);
	}


	if (tempX != 300)
	{
		validMoves.push([tempX + 100, tempY]);
	}


	if (tempY != 300)
	{
		validMoves.push([tempX, tempY + 100]);
	}


	if (tempX != 0)
	{
		validMoves.push([tempX - 100, tempY]);
	}
}


function isValidMove(pieceX, pieceY)
{
	pieceX = parseInt(pieceX);
	pieceY = parseInt(pieceY);

	for (var i = 0; i < validMoves.length; i++){
 		if ((validMoves[i][0] === pieceX) && (validMoves[i][1] === pieceY))
		{
			return true;
		}
	}
	return false;
}
var minute = 0;
var second = 0;
function timer(){
    var minuteSecond;
    if(minute<10){
        minuteSecond= "0"+minute+":";
        }
    else{minuteSecond = minute+":";
        }
    if(second<10){minuteSecond += "0"+second;
                 }
    else{minuteSecond += second;
        }
    if(second<60){
        second++;
    }
    else{
        second = 0;
        minute++;
        }
    document.getElementById("elTime").innerHTML = "Timer: "+minuteSecond;
}
