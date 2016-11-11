const Busca = (function($, Tags, EventEmitter){
	"use strict"

	let buscaTags = [];
	let buscaTxt = "";

	const Busca = Object.create(new EventEmitter({wildcard: true}), {
		"tags": {
			get: () => buscaTags
		}
		,"text": {
			get: () => buscaTxt
		}
	})

	$("#busca").on("input", function(){
		buscaTags = Tags.extraiTags($(this).val())
		buscaTxt = $(this).val().split(" ").filter(function(palavra){
			return buscaTags.indexOf(palavra) < 0
		}).join(" ")
		Busca.emit("busca")
	})

	return Busca
})(jQuery, Tags, EventEmitter2)
