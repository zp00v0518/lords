class WS {
	init(wsAddr, store){
    this.connectionToWs(wsAddr)
    this.store = store || null
		this.incoming = {
			chatMessage:  (eventData) => this.chatMessage(eventData)
		};
		this.outgoing = {

		}
	}
	connectionToWs (wsAddr) {
		this.wsInstance = new WebSocket(wsAddr);
		this.wsInstance.onopen = () => {
      console.log(`WebSocket open in ${wsAddr}`)
      this.store.dispatch('getData')
    }
		this.wsInstance.onmessage = (event) => {
			const data = JSON.parse(event.data)
			this.incoming[data.type](data)
		}
  }
  chatMessage(eventData) {
   console.log(eventData) 
	}
	sendMessage(message) {
		console.log(message)
		this.wsInstance.send(JSON.stringify(message))
	}
  
}
export default WS;