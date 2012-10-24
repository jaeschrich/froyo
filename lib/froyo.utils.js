exports.extend = function (dest, props) {
    var keys = Object.keys(props)
    keys.forEach(function (prop) {
        dest[prop] = props[prop];
    });
    return dest;
}