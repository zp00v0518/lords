function sendAjaxRequest(search,  obj, callback = function (){}){
	return new Promise ((resolve, reject) => {
		let data = JSON.stringify(obj);
		let xhr = new XMLHttpRequest();
		xhr.open("POST", search, true);
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(data);
		console.log("Запрос ушел")
		xhr.onreadystatechange = function(){
			if (xhr.readyState !=4) return;
			if(xhr.status == 200) {
				resolve(xhr.responseText)
				return callback(xhr.responseText);
			}
		};
	})
};
//проверяет ответ сервера на предмет ошибки	
function handlerErrorResponse(response, callback){
	let result;
	try {
		result = JSON.parse(response)
	} catch (err){
		console.log(response);
		console.log(err); 
	}
	
	if (result.status == "ok"){
		return callback(result);
	}
	else  if (result.status == "err"){
		location.reload();
		return;
	} else {
		location.reload();
		return;
	}
}

function setStyle(elemNode, objStyle, callback){
	var callback = callback || function(){};
	for (var i in objStyle){
		elemNode.style[i] = objStyle[i];
	}
	return callback(elemNode);
}

function toggleClass(target, childArray, nameClass, callback){
    callback = callback || function(){};
	for (let i=0; i<childArray.length; i++){
		var t = childArray[i].classList.contains(nameClass);
		if (t){
			childArray[i].classList.toggle(nameClass, false);
			break;
		}
	}
	target.classList.toggle(nameClass, true);
	return callback();
}

function setObjectValue(startObject, string,  value) {
 	var arrString = string.split(".");
 	startCicleFunc(arrString);

	function startCicleFunc(arr){

	(function step(object, i){
		if (i == arr.length-1){
			setValue(object, arr[i], value, function(objNext){
				step (objNext, i+1); 
			});
		}else if (i == arr.length){
			return; 
		} else {

			setKey(object, arr[i], function(objNext){
				step (objNext, i+1); 
			});
		}

	})(startObject, 0);

		function setKey(obj, key, callback){
			if (key in obj){
				return callback(obj[key]);
			} else {
				obj[key] = {};
				return callback(obj[key]);
				}
		}
		function setValue(obj, key, value, callback){
			obj[key]= value ;
			return callback(obj);
		}
	}

}

function getObjectValue(startObject, string) {
 	var arrString = string.split(".");
 	var c;
 	startCicleFunc(arrString);

		function startCicleFunc(arr){

		(function step(object, i){
			if (i == arr.length-1){
				getValue(object, arr[i], function(resultValue){
					return c = resultValue; 
				});
			}else {
				getKey(object, arr[i], function(objNext,){
					step (objNext, i+1); 
				});
			}

		})(startObject, 0);
		function getKey(obj, key, callback){
			if (key in obj){
				return callback(obj[key]);

			} else {
				console.log("nen")
				return c;
				}
		}
		function getValue(obj, key, callback){
			return callback(obj[key]);
		}
	}
	return c;
}

