const livereload  = new WebSocket(`ws://${location.hostname}:4001`);
livereload.addEventListener("message", handlerMessage);


function handlerMessage(event){ 
	let message = JSON.parse(event.data);
	if (message.type === "change"){
		location.reload();
	}
}