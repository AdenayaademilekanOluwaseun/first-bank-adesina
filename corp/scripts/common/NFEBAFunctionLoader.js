feba.loader = {

    functions: [],

    fnload: function(fn, priority) {

        LIB.__ADD__(this.functions, fn);
    },

    executeAll: function() {
        //executeall the functions in the functions array
        var funlen = this.functions.length;
        for (var i = 0; i < funlen; i++) {
            this.functions[i]();
        }
    }

};