const ws  = new WebSocket("ws://localhost:3002");
ws.addEventListener("message", handlerMessage);


function handlerMessage(event){ 
	let message = event.data;
	if (message == "change"){
		location.reload();
	}
}