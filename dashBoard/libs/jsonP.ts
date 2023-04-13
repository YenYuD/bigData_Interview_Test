//@ts-ignore
export default (url, callback) => {
    let callbackName = "_callback_" + Math.round(99999 * Math.random());
    //@ts-ignore
    window[callbackName] = (data) => {
        //@ts-ignore
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };
    let script = document.createElement("script");
    script.src =
        url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
    script.type = "javascript";
    document.body.appendChild(script);
    return script.src;
};
