jQuery(document).ready( function() {
	jQuery('body').on('click', '.fcrp_gamelist_load_more', null, function(e) {
		e.preventDefault();
		var ser = jQuery('form.fcrp_gm_filters').serialize();
		
		jQuery('.fcrp-loading').show();
		jQuery.get(
			jQuery(this).attr('href'),
			ser,
			false,
			'html'
		).done(function(data) {
			var items = jQuery(data).find('.fcrp_gamelist_item');
			jQuery('.fcrp_gamelist_item_container').append(items);

			var href = jQuery(data).find('.fcrp_gamelist_load_more');
			if (href.length>0) {
				jQuery('.fcrp_gamelist_load_more').attr('href', jQuery(href).attr('href')).show();
			} else {
				jQuery('.fcrp_gamelist_load_more').hide();
			}

		}).always( function() {
			jQuery('.fcrp-loading').hide();
		});
		
		return false;
	});
	
	jQuery('body').on('change', '.fcrp_gmselect', null, function(e) {
		var ser = jQuery('form.fcrp_gm_filters').serialize();
		
				jQuery('.fcrp-loading').show();
		jQuery.get(
			window.location.url,
			ser,
			false,
			'html'
		).done(function(data) {
			var items = jQuery(data).find('.fcrp_gamelist_item');
			jQuery('.fcrp_gamelist_item_container').html(items);

			var href = jQuery(data).find('.fcrp_gamelist_load_more');
			if (href.length>0) {
				jQuery('.fcrp_gamelist_load_more').attr('href', jQuery(href).attr('href')).show();
			} else {
				jQuery('.fcrp_gamelist_load_more').hide();
			}

		}).always( function() {
			jQuery('.fcrp-loading').hide();
		});
		
		return false;
		
		//alert(ser);
	});
	
	
	/*Tool Tip*/
	
	var targets = jQuery( '[rel~=tooltip]' ),
		target	= false,
		tooltip = false,
		title	= false;

		targets.bind( 'mouseenter', function()
		{
			target	= jQuery( this );
			tip		= target.attr( 'title' );
			tooltip	= jQuery( '<div id="tooltip"></div>' );

			if( !tip || tip == '' )
				return false;

			target.removeAttr( 'title' );
			tooltip.css( 'opacity', 0 )
				   .html( tip )
				   .appendTo( 'body' );

			var init_tooltip = function()
			{
				if( jQuery( window ).width() < tooltip.outerWidth() * 1.5 )
					tooltip.css( 'max-width', jQuery( window ).width() / 2 );
				else
					tooltip.css( 'max-width', 340 );

				var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
					pos_top	 = target.offset().top - tooltip.outerHeight() - 20;

				if( pos_left < 0 )
				{
					pos_left = target.offset().left + target.outerWidth() / 2 - 20;
					tooltip.addClass( 'left' );
				}
				else
					tooltip.removeClass( 'left' );

				if( pos_left + tooltip.outerWidth() > jQuery( window ).width() )
				{
					pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
					tooltip.addClass( 'right' );
				}
				else
					tooltip.removeClass( 'right' );

				if( pos_top < 0 )
				{
					var pos_top	 = target.offset().top + target.outerHeight();
					tooltip.addClass( 'top' );
				}
				else
					tooltip.removeClass( 'top' );

				tooltip.css( { left: pos_left, top: pos_top } )
					   .animate( { top: '+=10', opacity: 1 }, 50 );
			};

			init_tooltip();
			jQuery( window ).resize( init_tooltip );

			var remove_tooltip = function()
			{
				tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
				{
					jQuery( this ).remove();
				});

				target.attr( 'title', tip );
			};

			target.bind( 'mouseleave', remove_tooltip );
			tooltip.bind( 'click', remove_tooltip );
		});
});