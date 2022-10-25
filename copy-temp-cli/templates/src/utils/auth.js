// 支付类型
export function setPAY_TYPE(PAY_TYPE) {
  window.localStorage.setItem("PAY_TYPE", PAY_TYPE);
}
export function getPAY_TYPE() {
  return JSON.parse(window.localStorage.getItem("PAY_TYPE"));
}
//凭证类型
export function setBizClass(BizClass) {
  window.localStorage.setItem("BizClass", BizClass);
}
export function getBizClass() {
  return JSON.parse(window.localStorage.getItem("BizClass"));
}
