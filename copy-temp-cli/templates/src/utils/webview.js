/**
 * 判断是移动还是pc设备
 * @returns {String}
 */
export const isMobile = () => {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        return 'mobile';
    }
    return 'desktop';
}

/**
 * 判断是苹果还是安卓设备
 * @returns {String}
 */
export const isAppleMobileDevice = () => {
    let reg = /iphone|ipod|ipad|Macintosh/i;
    return reg.test(navigator.userAgent.toLowerCase());
}

/**
 * 判断是否为微信/QQ的内置浏览器
 * @returns {Boolean}
 */
export const broswer = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    }
    return false;
}

/**
 * 滚动到页面顶部
 */
export const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, height - height / 8);
    }
}

/**
 * 滚动到页面底部
 */
export const scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.clientHeight);
}

/**
 * 获取可视窗口高度
 */
export const getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

/**
 * 获取可视窗口宽度
 */
export const getPageViewWidth = () => {
    return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
