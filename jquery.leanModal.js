(function($){

    $.leanModal = function() {

    };

    $.leanModal.close = function() {
        $("#lean_overlay").fadeOut(200);
        $('.modal_panel').css({ 'display' : 'none' });
    };

    $.fn.extend({

        leanModal: function(options) {
 
            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null,
                onClose : null,
                onOpen : null,
                onInit : null,
                allow_close : true
            };
            
            var overlay = $("<div id='lean_overlay'></div>");
            
            $("body").append(overlay);
                 
            options =  $.extend(defaults, options);
 
            return this.each(function() {
            
                var o = options;
                
                $(this).click(function(e) {
                    if (typeof o.onOpen == 'function') {
                        o.onOpen(e, o, $(this));
                    }
                    open_modal(e, o, this);
                });
             
            });
            
            function open_modal(e, o, _this) {
                $this = _this;
                var modal_id = $($this).attr("href");

                if (o.allow_close == true) {
                    $("#lean_overlay").click(function() {
                         close_modal(modal_id, o.onClose);
                    });
                    $(o.closeButton).click(function() {
                         close_modal(modal_id, o.onClose);
                    });
                } else {
                    $(o.closeButton).hide();
                }
                            
                var modal_height = $(modal_id).outerHeight();
                var modal_width = $(modal_id).outerWidth();

                $('#lean_overlay').css({ 'display' : 'block', opacity : 0 });
                $('#lean_overlay').fadeTo(200,o.overlay);

                $(modal_id).css({
                    'display' : 'block',
                    'position' : 'fixed',
                    'opacity' : 0,
                    'z-index': 11000,
                    'left' : 50 + '%',
                    'margin-left' : -(modal_width/2) + "px",
                    'top' : o.top + "px"
                
                });

                $(modal_id).fadeTo(200,1);

                e.preventDefault();
            }

            function close_modal(modal_id, obj){
                if (typeof obj == 'function') {
                    obj();
                }
                $("#lean_overlay").fadeOut(200);

                $(modal_id).css({ 'display' : 'none' });
            
            }
    
        }
    });
     
})(jQuery);