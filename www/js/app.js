(function() {
	"use strict";

	var getElement = document.getElementById.bind(document),

	    regForm	   = getElement("register"),
	   
	    xhr 	   = new XMLHttpRequest();
	    regForm.addEventListener('submit', function(e){
	    	e.preventDefault();

	    	var data = "",
	    	//console.log(this.elements);
	    		elements = this.elements;
	    		//console.log(elements);
	    	
	    	Array.prototype.forEach.call(elements, function(v, i, a){
	    		
	    		data += encodeURIComponent(v.name);
	    		data += "=";
	    		data += encodeURIComponent(v.value);
	    		data += "&";
	    		//console.log(data);
	    	})

	    	// avoid trailing ampersand
	    	data = data.substring(0, data.length-1);
	    	//console.log(data);

	    	xhr.open("POST", "http://192.168.33.15:3000/api/v1/user")
	    	xhr.onreadystatechange = function(){
	    		handleResponse(xhr);

	    	};

	    	xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded")
	    	//xhr.error = function(e){
	    		//console.log("username already exists");
	    	//}
	    	xhr.send(data);

	    	//console.log(data);

	    },false);

	    	function handleResponse(http){
	    		if(http.readyState == 4){
	    			if(http.status == 200 || http.status == 304){

	    				var user = JSON.parse(http.responseText); //objectify a string
	    				var loginForm = getElement("Login");

	    				if(user.hasOwnProperty("_token")){ //checks if user has a token property
	    					regForm.classList.toggle("hide");
	    					loginForm.classList.toggle("hide");
	    				}
	    				//console.log(user);
	    				//console.log(http.responseText);
	    			}
	    		}
	    	}

	    	var login = getElement("Login");

	    	 xhr 	   = new XMLHttpRequest();
	    	login.addEventListener('submit', function(e){
	    	e.preventDefault();

	    	
	    	var data = {},
	    	//console.log(this.elements);
	    	elements = this.elements;
	    	//console.log(elements);

	    	Array.prototype.forEach.call(elements, function(v, i, a){
	    		//console.log(v);

	    		data[encodeURIComponent(v.name)] = encodeURIComponent(v.value);

	    		//console.log(data);
	    	})


	    	// avoid trailing ampersand
	    	
	    	xhr.open("POST", "http://192.168.33.15:3000/api/v1/auth")
	    	xhr.onreadystatechange = function(){
	    		handleLogin(xhr);

	    	};

	    	xhr.setRequestHeader("Content-Type", "Application/json")
	    	//xhr.error = function(e){
	    		//console.log("username already exists");
	    	//}
	    	xhr.send(JSON.stringify(data));

	    	//console.log(data);
	    },false);

	    	function handleLogin(http){
	    		if(http.readyState == 4){
	    			if(http.status == 200 || http.status == 304){
	    				var user = JSON.parse(http.responseText);
	    				var loginForm = getElement("Login");

	    				if(user.hasOwnProperty("_token")){ //checks if user has a token property
	    					//regForm.classList.toggle("hide");
	    					//loginForm.classList.toggle("hide");
	    					localStorage.setItem("token", user._token);
	    					window.location = "dashboard.html" 
	    				}
	    					    				//console.log(http.responseText);
	    			}
	    		}
	    	}	    	
}());