;(function($) {

    jQuery.minimalModal = function(parameters) {

        var MM = {

            ids: {
                overlay: 'minimal-modal-overlay',
                content: 'minimal-modal-content',
                htmlContent: 'minimal-modal-html-content',
                close: 'minimal-modal-close'
            },
            css: {
                content: {
                    width: '50%',
                    margin: 0,
                    padding: '10px 20px',
                    border: '2px solid #aaa',
                    background: '#fff',
                    position: 'fixed',
                    display: 'none',
                    'z-index': 10002
                },
                overlay: {
                    'z-index': 1,
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    'background-color': 'rgba(0,0,0, 0.75)'
                }
            },
            originalScrollX: 0,
            originalScrollY: 0,
            init: function() {

                $.each(['overlay', 'content'], function(index, key){

                    $('body').append('<div id="'+ MM.ids[key] +'" style="'+ MM.inlineCss(MM.css[key]) +'"></div>');

                });
                $(parameters.selector).on('click', function(e){

                    MM.open(e);
                    return false;

                });

            },
            open: function(e) {

                MM.originalScrollX = $(window).scrollLeft();
                MM.originalScrollY = $(window).scrollTop();

                var fadeInSpeed = MM.fadeSpeed('fadeIn');
                $('#'+ MM.ids.overlay).fadeIn(fadeInSpeed);
                MM.centerContent();

                var content = '';

                if($.type(parameters['content']) == 'function') {

                    content = parameters['content'](e);

                } else {

                    content = $(parameters['content']).html();

                }

                $('#'+ MM.ids.content).html(content).fadeIn(fadeInSpeed);
                $('#'+ MM.ids.overlay +', .'+ MM.ids.close).on('click', function(){

                    $(window).scrollTop(MM.originalScrollY);
                    $(window).scrollLeft(MM.originalScrollX);

                    var fadeOutSpeed = MM.fadeSpeed('fadeOut');
                    $('#'+ MM.ids.content +', #'+ MM.ids.overlay).fadeOut(fadeOutSpeed);
                    return false;

                });

                $(window).resize(MM.centerContent())

                if($.type(parameters['callback']) == 'function') {

                    parameters['callback'](e);

                }

            },
            centerContent: function(){

                var windowWidth = $(window).width();
                var windowHeight = $(window).height();
                var outerWidth = $('#'+ MM.ids.content).outerWidth(false);
                var outerHeight = $('#'+ MM.ids.content).outerHeight(false);
                var top = Math.max(0, ((windowHeight - outerHeight) / 2) + $(window).scrollTop()) +'px';
                var left = Math.max(0, ((windowWidth - outerWidth) / 2) + $(window).scrollLeft()) +'px';

                $('#'+ MM.ids.content).css({
                    top: top,
                    left: left
                })

            },
            fadeSpeed: function(mode) {

                return (parameters[mode] != undefined) ? parameters[mode] : 'slow';

            },
            inlineCss: function(cssValues) {

                var content = '';

                $.each(cssValues, function(key, value){

                    content += key +':'+ value +';';

                });

                return content;

            }

        };

        if(parameters['width'] != undefined) {

            MM.css.content['width'] = parameters['width'];

        }
        if(parameters['maxHeight'] != undefined) {

            MM.css.content['overflow'] = 'auto';
            MM.css.content['max-height'] = parameters['maxHeight'];

        }

        MM.init();

    }

})(jQuery);