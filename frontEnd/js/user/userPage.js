document.addEventListener('DOMContentLoaded', startUserOffice);
let userNameElem, listServerWrap
let UserData = {}

function startUserOffice () {
	userNameElem = document.getElementById('userName')
	choiseServer = document.getElementById('choiseServer')
	sendAjaxRequest('/userPage', {model: 'userPage'}).then((response) => {
		const data = JSON.parse(response);
		UserData = data.data;
		showUserData()
	})	
}

function showUserData(){
	userNameElem.innerText = UserData

}