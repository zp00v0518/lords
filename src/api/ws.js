class WS {
	init(wsAddr, store){
    this.connectionToWs(wsAddr)
    this.store = store || null
		this.incoming = {
			chatMessage:  (eventData) => this.chatMessage(eventData)
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
  
}
export default WS;