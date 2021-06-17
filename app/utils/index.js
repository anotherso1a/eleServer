const toPosix = function (path) {
  return path.replace(/\\/g, '/')
}


module.exports = {
  toPosix
}