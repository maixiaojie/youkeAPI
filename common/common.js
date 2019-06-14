var common = {
    uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;        
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;
        
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
        
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    isExistIn(arr1, arr2) {
        var tids = arr2.map( item => item.tid);
        var arr = JSON.parse(JSON.stringify(arr1));
        for(var i = 0; i < arr.length; i++) {
            if(tids.includes(arr[i].id)) {
                arr[i].completed = 1;
            }else {
                arr[i].completed = 0;
            }
        }
        return arr;
    }
}

module.exports = common;