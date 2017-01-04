/*
 * @author: Shiela
 * @description: location: js/billing/view.js
 */

jQuery(document).ready(function($) {
	
	//-- populate list  --//
	
		
	$('tbody', '#woinv-table').remove();
	document.getElementById('toggle-div').style.display='block';
	var target = document.getElementById('wrapper');
	var spinner = new Spinner(opts).spin(target);  
	
	$.ajax({
		type : 'POST',
		url : '../billing/populate_wo',
		success : function(html) {
			spinner.stop();
			document.getElementById('toggle-div').style.display='none';
			$('#woinv-table').append(html);
			$('#woinv-table').dataTable();	
		}
	});
	
	$('#nav-tab a[href="#woinv"]').click(function (e) {	
		
		
			$('tbody', '#woinv-table').remove();
			document.getElementById('toggle-div').style.display='block';
			var target = document.getElementById('wrapper');
			var spinner = new Spinner(opts).spin(target);  
			
			$.ajax({
				type : 'POST',
				url : '../billing/populate_wo',
				success : function(html) {
					spinner.stop();
					document.getElementById('toggle-div').style.display='none';
					$('#woinv-table').append(html);
					$('#woinv-table').dataTable();	
				}
			});
		
	});
		
	$('#nav-tab a[href="#winv"]').click(function (e) {
		
		$('tbody', '#winv-table').remove();
		document.getElementById('toggle-div').style.display='block';
		var target = document.getElementById('wrapper');
		var spinner = new Spinner(opts).spin(target); 
			
			$.ajax({
				type : 'POST',
				url : '../billing/populate_wi',
				success : function(html) {
					spinner.stop();
					document.getElementById('toggle-div').style.display='none';
					$('#winv-table').append(html);
					$('#winv-table').dataTable();
				}
		});
		
	});
	
	// -- hover -- //
	
	
	$(document).on('change', '.status', function(){
		var id = $(this).parent().parent().find('.id').val();
		var status = $(this).val();
		
		$.ajax({
			type: 'POST',
			data: {'id': id, 'status': status},
			url: 'billing/update_status',
			success: function() {
				alert('Status Updated');
			},
			error: function() {
				alert('Status Update Error');
			}
		});
		
	});
	
	$('#search-btn').click(function() {
		$('#search-table').remove();
		$('#search-table_wrapper').remove(); //needed to remove datatable-created div
		
		document.getElementById('toggle-div').style.display='block';
		var target = document.getElementById('wrapper');
		var spinner = new Spinner(opts).spin(target); 
		var jono = $('#search').val();
			
			$.ajax({
				type : 'POST',
				url : '../billing/populate_search',
				data: {'jono':jono},
				success : function(html) {
					spinner.stop();
					document.getElementById('toggle-div').style.display='none';
					
					table = '<table class="table table-striped table-bordered table-hover" id="search-table">' +
										'<thead>' +
											'<tr style>' +
												'<th>JO Number</th>' +
												'<th>Project Name</th>' +
												
												'<th>Total</th>' +
												'<th>Discount Rate %</th>' +
												'<th>Discount Amount</th>' +
												'<th>Net Total</th>' +
												
												'<th>Currency</th>' +
												'<th>Client</th>' +
												'<th>Date Submitted</th>' +
												'<th>Invoice Number</th>' +
												'<th>Invoice Date</th>' +
												'<th>Invoice Remarks</th>' +
												'<th>Status</th>' +
											'</tr>' +
										'</thead>' +
										'<tbody>'+ html + '</tbody>' +
									'</table>' ;		
					$('#search-div2').append(table);
					$('#search-table').dataTable();
					$('#search-table').removeAttr('hidden');
				}
		});
	});
	
	
});
