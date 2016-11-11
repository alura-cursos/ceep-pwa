const Tags = (function(){
    function extraiTags(text){
		return text.split(/[\s\n]/).reduce(function(tags, itemBusca){
            if(itemBusca.match(/^#/)){
            	tags.push(itemBusca.trim())
			}
            return tags
        }, [])
	}

    return Object.seal({
        extraiTags: extraiTags 
    })
})()