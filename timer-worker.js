// Web Worker untuk timer game
// Worker ini berjalan di thread terpisah dan tidak terpengaruh tab tidak aktif

let timerId = null;
let speed = 200; // default speed in ms

self.onmessage = function(e) {
    const { action, data } = e.data;
    
    switch(action) {
        case 'start':
            if (data && data.speed) {
                speed = data.speed;
            }
            if (timerId) {
                clearInterval(timerId);
            }
            timerId = setInterval(() => {
                self.postMessage({ type: 'tick' });
            }, speed);
            break;
            
        case 'stop':
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
            break;
            
        case 'updateSpeed':
            if (data && data.speed) {
                speed = data.speed;
                if (timerId) {
                    clearInterval(timerId);
                    timerId = setInterval(() => {
                        self.postMessage({ type: 'tick' });
                    }, speed);
                }
            }
            break;
    }
};
