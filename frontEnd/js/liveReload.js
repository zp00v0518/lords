const livereload  = new WebSocket("ws://localhost:3002");
livereload.addEventListener("message", handlerMessage);


function handlerMessage(event){ 
	let message = JSON.parse(event.data);
	if (message.type === "change"){
		location.reload();
	}
}