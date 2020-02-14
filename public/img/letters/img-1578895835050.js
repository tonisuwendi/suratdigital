$(document).ready(function(){

	$('.testim').slick({
		autoplay: true,
		autoplaySpeed: 5000
	});

	$("div.testimoni div.testim button.slick-prev").html('&#9664');
	$("div.testimoni div.testim button.slick-next").html('&#9654');

	$("div.banner div.kiri div.text").css("transform","translate(0,0)");
	$("div.banner div.kiri div.text").css("opacity","1");
	$("div.banner div.kanan div.gambar").css("opacity","1");

	$(document).scroll(function(){

		var scroll = $(window).scrollTop();

		if(scroll > 200){
			$("nav").css("top", "0");
		}else{
			$("nav").css("top", "-70px");
		}

		if(scroll > 190){
			$("div.tentang div.kiri div.gambar").css("transform","translate(0,-50%)");
			$("div.tentang div.kiri div.gambar").css("opacity","1");
			$("div.tentang div.kanan div.text").css("transform","translate(0,0)");
			$("div.tentang div.kanan div.text").css("opacity","1");
		}else{
			$("div.tentang div.kiri div.gambar").css("transform","translate(-500px,-50%)");
			$("div.tentang div.kiri div.gambar").css("opacity","0");
			$("div.tentang div.kanan div.text").css("transform","translate(200px,0)");
			$("div.tentang div.kanan div.text").css("opacity","0");
		}

		if(scroll > 630){
			$("div.pelayanan h2.title").css("transform","translate(0,0)");
			$("div.pelayanan h2.title").css("opacity","1");
		}else{
			$("div.pelayanan h2.title").css("transform","translate(0,100px)");
			$("div.pelayanan h2.title").css("opacity","0");
		}

		if(scroll > 700){
			$("div.pelayanan div.main div.kotak").css("opacity","1");
		}else{
			$("div.pelayanan div.main div.kotak").css("opacity","0");
		}

	})

	$("div.faq div.kiri div.text div.item-satu").click(function(){
		$("div.faq div.kiri div.text div.item div.item-down").slideUp('fast');
		$("div.faq div.kiri div.text div.item-satu div.item-down").slideDown('fast');
	})

	$("div.faq div.kiri div.text div.item-dua").click(function(){
		$("div.faq div.kiri div.text div.item div.item-down").slideUp('fast');
		$("div.faq div.kiri div.text div.item-dua div.item-down").slideDown('fast');
	})

	$("div.faq div.kiri div.text div.item-tiga").click(function(){
		$("div.faq div.kiri div.text div.item div.item-down").slideUp('fast');
		$("div.faq div.kiri div.text div.item-tiga div.item-down").slideDown('fast');
	})

	$("div.faq div.kiri div.text div.item-empat").click(function(){
		$("div.faq div.kiri div.text div.item div.item-down").slideUp('fast');
		$("div.faq div.kiri div.text div.item-empat div.item-down").slideDown('fast');
	})

	$("div.faq div.kiri div.text div.item-lima").click(function(){
		$("div.faq div.kiri div.text div.item div.item-down").slideUp('fast');
		$("div.faq div.kiri div.text div.item-lima div.item-down").slideDown('fast');
	})

	$("div.banner div.navbar div.menu-dd span.menu-btn").click(function(){
		$("div.banner div.navbar div.menu-dd div.menu-down").slideDown('fast');
		$("div.banner div.navbar div.menu-dd span.menu-btn-close").show();
		$(this).hide();
	})

	$("div.banner div.navbar div.menu-dd span.menu-btn-close").click(function(){
		$("div.banner div.navbar div.menu-dd div.menu-down").slideUp('fast');
		$("div.banner div.navbar div.menu-dd span.menu-btn").show();
		$(this).hide();
	})

	$("nav div.menu-dd span.menu-btn").click(function(){
		$("nav div.menu-dd div.menu-down").slideDown('fast');
		$("nav div.menu-dd span.menu-btn-close").show();
		$(this).hide();
	})

	$("nav div.menu-dd span.menu-btn-close").click(function(){
		$("nav div.menu-dd div.menu-down").slideUp('fast');
		$("nav div.menu-dd span.menu-btn").show();
		$(this).hide();
	})


})