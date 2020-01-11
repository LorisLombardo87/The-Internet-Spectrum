define(['angular','mconfig/app'], function(angular,app) { 
    app.filter('moneyk', function () {
        return function(input) {
            var value = null;
            if (typeof input === 'string') {
                try {
                    value = input.replace(/\./g, "");
                    value = parseFloat(value);
                } catch (e) {
                    console.log('[moneyk] canno convert string to float');
                    return input;
                }
            }
            if (value > 1000) {
                return (parseFloat(value / 1000).toFixed(2)) + 'k';
            } 
            return value;
        }
    })
})