// Saves the parts of the state that 
// should persist restarts to storage
// in 3 seconds delay not to slow down
// UI performance on weak devices

var RNFS = require('react-native-fs');

saveStateTimer = {}

// Overrides the reducer to conditionally
// save the parts of the state that are 
// returned by the extruct segment function
// and are changed
export const hookReducer = (reducer, reducerKey, extractSegment) => {
    let plainReducer = reducer
    let lastStateJson = false
    return (state, action) => {
        let plainOutState = plainReducer(state, action)
        let stateJson = JSON.stringify(extractSegment(plainOutState))
        if (stateJson !== lastStateJson && lastStateJson) {
            saveState(stateJson, reducerKey)
        }
        lastStateJson = stateJson
        return plainOutState
    }
}

// Saves a state as Json object to a file
// named as the key, used only internally 
// but can also be used externally
export const saveState = (stateJson, reducerKey) => {
    clearTimeout(saveStateTimer[reducerKey])
    saveStateTimer[reducerKey] = setTimeout(saveStateInternal, 3000, stateJson, reducerKey)
}

// Does the actual saving of the state
// Json string, called if the object has changed
// and after 3 seconds delay 
saveStateInternal = (stateJson, reducerKey) => {
    try {
        let path = RNFS.DocumentDirectoryPath + '/listricity/states'
        RNFS.mkdir(path).then((success) => {
            RNFS.writeFile(path + '/' + reducerKey, stateJson, 'utf8')
                .then((success) => {
                    // console.warn(reducerKey + ' state written');
                })
                .catch((err) => {
                    console.warn('state error: ' + err.message);
                });
        }).catch((err) => {
            console.warn('state error 1: ' + err.message);
        });
    }
    catch (e) {
        console.warn('save state error: ' + e.message)
    }
}