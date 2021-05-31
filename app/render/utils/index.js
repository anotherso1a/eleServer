const $ = (selector) => {
  let res = document.querySelectorAll(selector)
  if(res.length === 1) return res[0]
  return res
}

module.exports = {
  $
}