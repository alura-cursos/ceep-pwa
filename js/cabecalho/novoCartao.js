(function($, Mural, Cartao, Tags, Busca){
	"use strict"

	$(".novoCartao").submit(function(event){
		event.preventDefault()
		let $campoConteudo = $(".novoCartao-conteudo")
		let conteudo = $campoConteudo.val().trim()
		if(conteudo){
			let novoCartao = new Cartao(conteudo)
			if(Mural.adiciona(novoCartao)){
				$campoConteudo.val("")
			} else {
				alert("Você não está logado")
			}
		}
	})

	$(".novoCartao-conteudo").on("focus", function(){
		let $campoConteudo = $(this)
		let tagsAntigas = Tags.extraiTags($campoConteudo.val())
		let tagsToRemoveRegex = $campoConteudo.val().split(/[\s\n]/).filter(function(palavra){
			return palavra && tagsAntigas.indexOf(palavra) >= 0
		}).join("|")
		let txt = $campoConteudo.val().replace(new RegExp(tagsToRemoveRegex,"g"), "").trim()
		let tags = Busca.tags.reduce(function(txt,tag){
			return txt + "\n" + tag
		},"")
		$campoConteudo.val(tags && (txt + "\n" + tags))
	})
})(jQuery, Mural, Cartao, Tags, Busca)
