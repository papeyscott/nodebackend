(function (){

	"use stricts";

var addStudent = document.getElementById("add-students"),
	view 	   = document.getElementById("view-students"),
	input 	   = document.getElementsByTagName("input"),
	List       = document.getElementById("list"),
	li         = document.createElement("p");
	names      = input[0],
	roles      = input[1].value,
	name       = document.createTextNode("names"),
	role	   = document.createTextNode("roles"),
	
	
	 xhr 	   = new XMLHttpRequest();
	    
	 addStudent.addEventListener('submit', function(e){
	 e.preventDefault();

	 var data = "";

	 	elements = this.elements;
	    		//console.log(elements);


	    	
	    	Array.prototype.forEach.call(elements, function(v, i, a){
	    		//console.log(v);

	    		data += encodeURIComponent(v.name);
	    		data += "=";
	    		data += encodeURIComponent(v.value);
	    		data += "&";
	    	})

	    	// avoid trailing ampersand
	    	data = data.substring(0, data.length-1);

	    	xhr.open("POST", "http://192.168.33.15:3000/api/v1/students")
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
	    				var user = JSON.parse(http.responseText);
	    				//var view = document.getElementById("view-students");
	    				//console.log(user);


	    				if(user.hasOwnProperty("_id")){ //checks if user has a token property
	    					addStudent.classList.toggle("hide");
	    					view.classList.toggle("hide");
	    				}
	    				console.log(user);
	    				//console.log(http.responseText);
	    			}
	    		}
	    	}

	    	var view = document.getElementById("view-students"),
	    		xhr      = new XMLHttpRequest();

	    		view.addEventListener('click', function(){
	    			view.classList.toggle("hide");
	    			addStudent.classList.toggle("hide");
	    		}, false);

	    		xhr.open("GET", "http://192.168.33.15:3000/api/v1/students")
	    		xhr.onreadystatechange = function(){
	    			handleView(xhr);
	    		};

	    		xhr.setRequestHeader("Content-Type", "Application/json");
	    		xhr.send(null);

	    		function handleView(http){
	    			if(http.readyState == 4){
	    				if(http.status == 200 || http.status == 304){
	    						var user = JSON.parse(http.responseText);
	    						user.forEach(function(user){
	    							var li = document.createElement("li");
	    							var name = document.createElement('h3');
	    							name.innerText = user.name;
	    							var role = document.createElement('h5');
	    							role.innerText = user.role;
	    							li.appendChild(name);
	    							li.appendChild(role);
	    							list.appendChild(li);
	    						})
	    						console.log(user);

	    						/*
	    						list = document.getElementById("list");
	    						paragraph = document.createElement("p");
	    						breakLine = document.createElement("br");
	    						display = document.createTextNode(http.responseText);
	    						paragraph.appendChild(display);
	    						paragraph.appendChild(breakLine);
	    						list.appendChild(paragraph);
	    						//console.log(http.responseText);

	    					//console.log(http.responseText); */
	    				}
	    			}
	    		}

})();