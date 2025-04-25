// common error handling code:
// sends console errors to window.location.origin:5555 via
// HTTP POST; should improve mobile dev experience

window.onerror = function(errMessage, filepath, line, column, errObj) {
    console.log('posting error', errMessage, filepath, line, column, JSON.stringify(errObj));
    //fetch('http://localhost:5555', {
    fetch('http:' + window.location.hostname + ':5555', {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            message: errMessage,
            filepath: filepath,
            line: line,
            column: column,
        }),
    });
}

