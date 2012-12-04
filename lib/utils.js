exports.extend = function (dest, props) {
    var keys = Object.keys(props)
    keys.forEach(function (prop) {
        dest[prop] = props[prop];
    });
    return dest;
}

/**
 * this is **very** customized! You probably don't want it
 */

exports.inside = function inside(arr, val){
	for (var loc in arr){
		if (arr[loc].handle.toString() === val){
			return true;
		}
	}
}
