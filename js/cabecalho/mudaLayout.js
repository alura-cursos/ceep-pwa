(function($){
	"use strict"

	$("#mudaLayout").on("click", function(){
		let mural = $(".mural")

		mural.toggleClass("muralLinha")

		if(mural.hasClass("muralLinha")){
			$(this).text("Blocos")
		} else {
			$(this).text("Linhas")
		}
	})
})(jQuery)
