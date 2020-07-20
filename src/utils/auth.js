import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TokenId = 'vue_admin_template_tokenId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getTokenId() {
  return Cookies.get(TokenId)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenId(tokenId) {
  return Cookies.set(TokenId, tokenId)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeTokenId() {
  return Cookies.remove(TokenId)
}
