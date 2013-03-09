require.config({
    paths: {
        jquery: 'vendor/jquery/jquery',
        bootstrap: 'vendor/bootstrap.css/js/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['jquery', 'app'], function($,Typeahead) {
    $(function(){
        Typeahead.initialize({
            'inputFrom': 'input.from',
            'inputTo': 'input.to',
            'mapHolder': 'div.map_canvas'
        });

        $('button.check').on('click',function(){
            console.log(Typeahead.getFrom());
            console.log(Typeahead.getTo());
        });

    });
});