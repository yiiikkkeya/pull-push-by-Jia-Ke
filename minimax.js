function minimax(state, turn){
	if (checkWin(state)[0])
		return [checkWin(state)[0],state];

	if (checkDraw(state))
		return [0,state];

	if(turn)
		var res = -Infinity;
	else
		var res = Infinity;

	let answerState=[];
	for (let i=0; i<state.length; i++){
		if (state[i] === -1){
			var temp = [...state];
			temp.splice(i,1,turn);
			let retValue = minimax(temp, (turn+1)%2)[0];
			if (turn){
				if (retValue >= res){
					res = retValue;
					answerState = temp;
				}
			}
			else{
				if (retValue <= res){
					res = retValue
					answerState = temp;
				}
			}
		}
	}
	return [res, answerState];
}

function checkWin(state){
	for(let i=0; i<9; i+=3)
		if ((state[i] === state[i+1]) && (state[i+1] === state[i+2]) && (state[i] === 1))
			return [1,"r"+i]; //row-size

	for(let i=0; i<3; i++)
		if ((state[i] === state[i+3]) && (state[i+3] === state[i+6]) && (state[i] === 1))
			return [1,"c"+i]; //column-wise
	
	if ((state[0] === state[4]) && (state[4] === state[8]) && (state[4] === 1))
		return [1,"md"]; //main-diagonal

	if ((state[2] === state[4]) && (state[4] === state[6]) && (state[4] === 1))
		return [1,"sd"]; //secondary-diagonal

	for(let i=0; i<9; i+=3)
		if ((state[i] === state[i+1]) && (state[i+1] === state[i+2]) && (state[i] === 0))
			return [-1,""]; //row-size
		
	for(let i=0; i<3; i++)
		if ((state[i] === state[i+3]) && (state[i+3] === state[i+6]) && (state[i] === 0))
			return [-1,""]; //column-wise
		
	if ((state[0] === state[4]) && (state[4] === state[8]) && (state[4] === 0))
		return [-1,""]; //main-diagonal

	if ((state[2] === state[4]) && (state[4] === state[6]) && (state[4] === 0))
		return [-1,""]; //secondary-diagonal
	return [0,""];
}


function checkDraw(state){
	flag = true;
	for (let i=0; i<state.length; i++)
		if (state[i] === -1){
			flag = false;
			break;
		}
	return flag;
}