let KeyBoardNavigation = function(keyMap){
    let specialKeysSort = (()=>{
        let specialKeys = ["Shift", "Control", "Alt", "Meta"]
        return (a, b) => {
            return (specialKeys.indexOf(b)+1) - (specialKeys.indexOf(a)+1)
        }
    })()

    keyMap = Object.keys(keyMap).reduce((newKeyMap, keyName)=>{
        let mappedFunction = keyMap[keyName]
        let keys = keyName.split("+")
        if(keys.length > 1){
            keyName = keys
                        .sort(specialKeysSort)
                        .join("+")
        }
        newKeyMap[keyName] = mappedFunction
        return newKeyMap
    },{})

    return function(){
        let index = []
        let currentIndexPosition = -1

        let iterator = Object.create({}, {
            "next": {
                value: function(){
                    currentIndexPosition++
                    return index[Math.abs(currentIndexPosition)%index.length]
                }
            }
            ,"previous": {
                value: function(){
                    currentIndexPosition = (currentIndexPosition + (index.length - 1)) % index.length
                    return index[Math.abs(currentIndexPosition)%index.length]
                }
            }
            ,"current": {
                value: function(){
                    return index[currentIndexPosition]
                }
            }
        })

        return Object.create({}, {
            "push": {
                value: function(element){
                    index.push(element)
                }
            }
            ,"init": {
                value: function(){
                    if(currentIndexPosition === -1){
                        currentIndexPosition = 0
                    }
                    return iterator.current()
                }
            }
            ,"goTo": {
                value: function(searchFunction){
                    currentIndexPosition = index.indexOf(index.find(searchFunction))
                }
            }
            ,"navigate": {
                value: function(keyboardEvent){
                    if(keyboardEvent.defaultPrevented){
                        return null
                    }

                    let {shiftKey: Shift, ctrlKey: Control, altKey: Alt, metaKey: Meta } = keyboardEvent
                    let specialKeys = {Shift, Control, Alt, Meta}

                    let specialKeysPressed = Object.keys(specialKeys)
                                            .filter(keyIdentifier => {
                                                return specialKeys[keyIdentifier]
                                            })
                                            .sort(specialKeysSort)
                                            .join("+")

                    let key = keyboardEvent.key
                    let navigate = keyMap[specialKeysPressed ? [specialKeysPressed,key].join("+") : key]
                    return !!navigate && navigate(iterator)
                }
            }
        })
    }
}