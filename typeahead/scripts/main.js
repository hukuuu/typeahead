require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: '../components/bootstrap/js/bootstrap',
        google: 'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        google: {
            deps: [],
            exports: 'google'
        }
    }
});

require(['jquery', 'typeahead'], function($,Typeahead) {
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