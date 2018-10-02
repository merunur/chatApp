$(function (){
	//connect to socket.io
	var socket = io.connect('http://127.0.0.1:5000');

	/*
	* Enter chat and load users
	*/
	$("a#enterChat").click(function(e){
		e.preventDefault();

		let username = $('#username').val();

		//localStorage.setItem("username", username);

		if(username!= ""){
			socket.emit('username', username);

			$("div#enterUsername").addClass('hidden');
			$("div#chatMain").removeClass('hidden');
			
			socket.on('users', function(data){
				data.forEach(element=>{
					if(! $("li#"+element.socketID).length && ($("div#userList li").text() != element.username)){
						$("div#userList ul").append('<li id="'+element.socketID+'">'+element.username+'</li>');
					}
				});
			});
		} else {
			alert('You must enter a username!');
		}

	}); 

	//enter chat on ENTER
	$("input#username").keypress(function(e){
		let username = $('#username').val();
		if(e.which === 13){
			if(username!= ""){
				$("a#enterChat").click();
		}	else {
			alert('You must enter a username!');
		}
		}
	});

	//handle log on
	socket.on('logon', function(data){
		$("div#userList ul").append('<li id="'+data.socketID+'">'+data.username+'</li>');
	});

	//handle log on
	socket.on('logoff', function(id){
		$("li#"+id).remove();
		//localStorage.removeItem("username");	
	});

});