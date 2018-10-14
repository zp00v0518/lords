document.addEventListener("DOMContentLoaded", loginJs);

function loginJs(event){
	var tabsWrap = document.getElementById("tabsWrap");
	var check_btn = document.getElementsByClassName("check_btn");

	tabsWrap.addEventListener("click", selectForm);
	for (var i=0; i<check_btn.length; i++){
		check_btn[i].addEventListener("click", checkForm);
	}
}

function selectForm(event){
	var target = event.target;
	var className = "show";
	var j = target.classList.contains(className);
	if (j){
		return;
	} else if (!j){
		var childArray = target.parentNode.children;
		var formId = target.dataset.id;
		var formWrap = document.getElementById("formWrap");
		var childForm = formWrap.children;
		var targetForm;
		for (var i=0; i<childForm.length; i++){
			if (childForm[i].id == formId){
				targetForm = childForm[i];
				break;
			}
		}
		toggleClass(target, childArray, className);
		toggleClass(targetForm, childForm, className);
	}

}

function checkForm(event){
	var target = event.target;
	var targetFormId = target.dataset.id;
	var form = document.forms[targetFormId];
	var data = {
		form: targetFormId,
		data: {
			platform:navigator.platform
		}
	}
	for (var i=0; i<form.length-1; i++){
		var nameInput = form[i].name;
		data.data[nameInput] = form[i].value;
	}
	if (targetFormId == "registrationForm"){
		if (data.data.pass != data.data.pass_two){
			alert("Пароли не совпадают");
			return;
		}
	}

	if (data.data.email == "" || data.data.pass == ""){
		alert("Поля заполнены не полностью");
		return;
	}

	sendAjaxRequest("login", data, function(res){
		var result;
		try {
			result = JSON.parse(res)
		} catch (error){
			console.log(res);
			return;
		}
		console.log(result)
		if (result.status == "registerErr" || result.status == "loginErr"){
			alert (result.answer);
			return;
		}else if (result.status == "registerOk" || result.status == "loginOk"){
			location = result.nextStep;
			return;
		}
	})
}