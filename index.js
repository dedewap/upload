$(document).ready(function(){
	var prevIndex = 0;
	var dataName = ['Антон', 'Андрей', 'Валентин', 'Николай', 'Евгений', 'Владимир','Александр','Киррил','Олег','Артем'];
	var dataMessage =[
		'Руками яйца теребя я думал только про тебя',
		'Вилкой в глаз или в жопу раз?',
		'Я живу как карта ляжет, ты живёшь как мама скажет .',
		'Возьмите средство для ухода и уходите наконец.',
		'Я не вижу абсолютно никаких запахов',
		'У меня есть два заместителя, четыре из которых уже месяц лежат в кабинете министров, и которых назначить невозможно. Не знаю, почему',
		'холодная вода превратилась в горячую, ее нужно подогреть',
		'У нас есть что было, и нужно смотреть какой мы можем',
		'Он окрасил себя в те цвета, в которые он окрасил себя',
		'А сегодня в завтрашний день не все могут смотреть. Вернее смотреть могут не только лишь все, мало кто может это делать',
		'Мой отец мне, как папа.'
	];

	var getRandom = function(min, max){
		return Math.floor(Math.random() * (max - min)) + min; 
	}

	var gererateMessage = function(){
		var date = new Date();
		var thisTime = date.getHours() +":"+ (date.getMinutes() <= 9 ? '0'+date.getMinutes() : date.getMinutes());
		var showMessage = {
			name : 'name',
			message: 'message'
		};
		var indexM = getRandom(0, dataMessage.length) != prevIndex ? getRandom(0, dataMessage.length) : (dataMessage.length - getRandom(0, dataMessage.length));
		prevIndex = indexM;
		showMessage.name = dataName[getRandom(0, dataName.length)];
		showMessage.message =  dataMessage[indexM];
		$('#chat .chat-content .chat-messages').append("<div class='message'><h4>"+showMessage.name+"</h4><p>" +showMessage.message+ "</p><span class='message__date'>"+thisTime+"</span></div>");
		scroolBottomMessageContent();
		console.log(prevIndex, indexM);
	}

	$('#chat .chat-head').on('click', function(){
		$(this).siblings('.chat-content').toggle().parent().toggleClass('open');
		setTimeout(function printMessage(){
			if ($('#chat').hasClass('open')){
				gererateMessage();
				setTimeout(printMessage, getRandom(8000, 10000));
			}
		}, getRandom(5000, 10000));
	});

	var scroolBottomMessageContent = function(){
		var thisChatBottom = $("#chat .chat-messages").height() + 100;
		$('#chat .chat-content').animate({scrollTop: thisChatBottom}, 300);
	};

	$('#chat button').on('click', function(e){
		e.preventDefault();
		var date = new Date();
		var thisTime = date.getHours() +":"+ (date.getMinutes() < 9 ? '0'+date.getMinutes() : date.getMinutes());
		var thisMessage = $(this).closest('form').children('input').val();
		$('#chat .chat-content .chat-messages').append("<div class='message input'><h4>Вы</h4><p>" +thisMessage+ "</p><span class='message__date'>"+thisTime+"</span></div>");
		$('#chat input').val('').focus();
		scroolBottomMessageContent();
	});

});