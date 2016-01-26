;var k = {
    browserAdapter: function () {
        var userAgent = window.navigator.userAgent.toLowerCase();
        var uaMatch;

        if (userAgent.match(/msie ([\d.]+)/) == null) {
            return true
        } else {
            uaMatch = userAgent.match(/msie ([\d.]+)/);
            if (uaMatch[1] <= 8) {
                return false;
            }
        }
    }
};
