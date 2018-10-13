document.addEventListener('DOMContentLoaded', (event) => {
	const input = document.getElementById('dev');
	input.addEventListener('keyup', handlerDevInput)
})

function handlerDevInput(event) {
	const key = event.key;
	if (key !== 'Enter') return;
	const value = event.target.value
	sendAjaxRequest("/dev", value).then((res) => {
		console.log(JSON.parse(res))
	})
}

