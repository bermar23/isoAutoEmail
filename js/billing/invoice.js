/*
 * @author: Shiela
 * @description: location: js/billing/view.js
 */

jQuery(document).ready(function($) {

	populate();
	
	$('#add').click(function () {
		$('#inv-modal').modal('show');
	});
	
	$('#process').click(function () {
		var count = $('.id:checked').length;
		
		if (count == 0) {
			$('#submit-modal').modal('show');
			return false;
		}
	});

	var invoice_date = $('#invoice_date').datepicker({
			format: 'yyyy-mm-dd'			
		}).on('changeDate', function(ev) {
			 invoice_date.hide();
		}).data('datepicker');
	
	
	$('#ref-submit-btn').click(function() {
		var invoice_number = $('#invoice_number').val();
		var invoice_date = $('#invoice_date').val();
		var invoice_remarks = $('#invoice_remarks').val();
		var ids = $('#well-form').serialize();
		
		if (invoice_number == '' ||  invoice_date == '') {
			alert('Fill in fields!');
			return false;
		} else {                                        
			
			$.ajax({
				type : 'POST',
				url	 : '../invoice/set_invoice',
				data : {'invoice_number': invoice_number,'invoice_date': invoice_date, 'invoice_remarks': invoice_remarks, 'id': ids },				
				success: function(response) {
					if (response) {
						$('#success-modal').modal('show').on('hidden.bs.modal', function (e){
						window.location = '../invoice';
						});
					} 
				},
				error: function(response) {
					$('#error-modal').modal('show');
					return false;
				}
			}); 
			
		} 
			
	});
	
	function populate() {
		$('tbody', '#inv-table').remove();
		document.getElementById('toggle-div').style.display='block';
		var target = document.getElementById('wrapper');
		var spinner = new Spinner(opts).spin(target);  
		
		$.ajax({
			type : 'POST',
			url : 'invoice/populate',
			success : function(html) {
				spinner.stop();
				document.getElementById('toggle-div').style.display='none';
				$('#inv-table').append(html);
				$('#inv-table').dataTable();	
				
			}
		});
	}
	
	

});