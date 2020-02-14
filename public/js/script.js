$(document).ready(function(){

	$(document).scroll(function(){
		var scroll = $(window).scrollTop();
		if(scroll > 5){
			$("div.history-student-page div.text-top").addClass("box-shadow");
		}else{
			$("div.history-student-page div.text-top").removeClass("box-shadow");
		}
	})

})