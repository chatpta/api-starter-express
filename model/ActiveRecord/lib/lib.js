/*************************************
 * Methods below are private methods *
 *************************************/

function _extractKeyPromptValueArrays( object ) {
    let keys = [];
    let values = [];
    let prompt = [];
    let number = 0;

    for ( let key of Object.keys( object ) ) {
        number += 1;
        keys.push( key );
        values.push( object[ key ] );
        prompt.push( `$${ number }` )
    }

    return [ keys, prompt, values ];
}

function _extractUpdateKeysValues( object ) {
    let keys = [];
    let values = [];
    let number = 1;

    for ( let key of Object.keys( object ) ) {
        number += 1;
        keys.push( key.toString() + "=$" + number );
        values.push( object[ key ] );
    }

    return [ keys, values ];
}

module.exports = {
    _extractKeyPromptValueArrays,
    _extractUpdateKeysValues
};
