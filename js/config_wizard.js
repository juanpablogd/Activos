$(function(){
	/*
	* ###### CIRCLE DESIGN ######
	* 
	* The following is what you need to do to make the pretty numbered
	* circle style steps!!
	*/
	// To keep step lines in psteps_circle_steps looking good!
	var configure_circle_lines = function(circle_container){
		$(window).resize(function(){
			setTimeout(function(){
				var step_lines = circle_container.find('.step-line'),
					num_circles = circle_container.find('.step-title').length,
					container_width = circle_container.width(),
					circle_widths = (circle_container.find('.step-title').outerWidth()) * num_circles,
					line_width = Math.floor((container_width - circle_widths) / (num_circles - 1));
				step_lines.width((line_width < 1) ? 0 : (line_width-1));
			}, 200);
		}).resize();
	}

	$('#psteps_circle_steps_simple').psteps({
		traverse_titles: 'visited',
		steps_width_percentage: false,
		content_headings: true,
		step_names: false,
		check_marks: false,
		content_headings_after: '.before-heading'
	});


	configure_circle_lines($('.psteps_circle_titles', '#psteps_circle_steps_simple'));
	/*
	* And that's it. :)
	*/


	configure_circle_lines($('.psteps_circle_titles', '#psteps_circle_steps'));

	// Navbar scrollspy.
	$('#navbar').scrollspy();
});