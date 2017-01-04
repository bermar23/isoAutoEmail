/*
 * @author: Shiela
 * @description: for view/billing/entries.php
 */

jQuery(document).ready(function($) {

	$("#submit").attr("disabled", "disabled");
	
	//--- get discount ---//Done with Model and Controller
	$.post('discount/get_discount', function(data){
		if ( data != 'None') {
			$('#discount').val(data);
			$('#discount_display').html(data);
		}
		else {											
			$('#discount').val('0.00');
			$('#discount_display').html('0');
		}
	});
		
	//--- date picker ---//

	
	$('#received').click(function() {
		var html = '';
		var date;
		
		if ($("#received option").length == 0) {
			$.ajax({
			type: 'POST',
			dataType : 'json',
			url: 'project/get_date_received',
			success: function(stages){
				for (var i = 0; i < stages.length; i++) {
					date = stages[i].ActualStart;
					html = html + "<option value='" + date + "'>" + date + " [ " + stages[i].StageName + " ] " + "</option>";
				}
				
				$('#received').append(html);
			}
			
			});
		} 
		
	});
	
	$('#delivered').click(function() {
		var html = '';
		var date;
		
		if ($("#delivered option").length == 0) {
			$.ajax({
				type: 'POST',
				dataType : 'json',
				url: 'entries/get_date_delivered',
				success: function(stages){
					for (var i = 0; i < stages.length; i++) {
						date = stages[i].ActualEnd;
					
						html = html + "<option value='" + date + "'>" + date + " [ " + stages[i].StageName + " ] " + "</option>";
					}
				
					$('#delivered').append(html);
				}
				
			});
		}
	});
	
	
	$('#received').change(function() {
		$('#hreceived').val($('#received option:selected').val());
		//alert('yawming');
	});
	
	$('#delivered').change(function() {
		$('#hdelivered').val($('#delivered option:selected').val());
	});
		//contract date
	var contract_date = $('#contract_date').datepicker({
		format: 'yyyy-mm-dd'
	}).on('changeDate', function(ev) {
		contract_date.hide();
	}).data('datepicker'); 
	
	// --- add row to table --- //
	$('#add').click(function(event) {

		var valid = document.getElementById('form-entry').checkValidity();
		
		if (valid) {
			event.preventDefault();
			add_row_entry();
			
			if (override != '') {
				total = override;
			}
									
			if (check_length('#item-table tr') > 1){
				$('#submit').removeAttr('disabled');
			}
			reset_fields();
		}
		
		
	});

	// --- remove row to table --- //
	$(document).on("click", '.remove_tr', function() {
		var row = $(this).parent().parent();		
		var gtotal = $('#gtotal').val();
		var discount = $('#discount').val();
		var total = $(this).parent().prev().prev().prev().prev().prev().text();
		var override = $(this).parent().prev().prev().prev().prev().text();
		
		gtotal = parseFloat(gtotal.replace(',', ''));
		discount = parseFloat(discount.replace(',', ''));
		total = parseFloat(total.replace(',', ''));
		
		if (override != '-') {
				total = Number(override);
		}
		
		gtotal = Number(gtotal) - Number(total);		
		
		//Compute Dicounted Price
		var discount =  Number(discount) / 100;
		var discounted_amount =  gtotal * discount;		
		var ftotal = gtotal - discounted_amount;
		
		$('#gtotal').val(format_currency(gtotal));
		$('#discounted_amount').val(format_currency(discounted_amount));
		$('#ftotal').val(format_currency(ftotal));
		
		row.remove();
		
		if (check_length('#item-table tr') == 1) {
			$('#submit').attr('disabled', true);
		}

	});

	// --- override --- //
	$('#override').click(function() {
		if ($(this).is(':checked')) {
			//$('#pass-modal').modal('show');
			$('#override_amount').prop('disabled', false);
		} else {
			$('#override_amount').prop('disabled', true);
		}

	});

	/*
	//--- check if password is valid ---//
	$('#btn-submit-pass').click(function (){
		var pass = $('#tpass').val();
		
		$.ajax({
			type : 'POST',
			data : {'tpass': pass}, 
			url : 'validate_password',
			success : function(i) {
				if (i) {
					$('#override_amount').prop('disabled', false);
				} else {
					$('#override').removeAttr('checked');
					alert('Please enter correct password!');
					$('#pass-modal').modal('show');
					$('#tpass').val('');
					
				}
			}
		});
	});
	*/


	// --- prevent users from entering non numeric values in the input fields --- //

	$('#quantity, #price').keyup(function() {
		var val = $(this).val();
		if (isNaN(val)) {
			val = val.replace(/[^0-9\.]/g, '');
			if (val.split('.').length > 2)
				val = val.replace(/\.+$/, '');
		}
		$(this).val(val);
		
		//autocalculate
		if (($('#price').val() != "") && ($('#quantity').val() != "")) {
			calculate_total();
		}
	});

	// --- populate #unit select box on click  --- //
	$('#unit').click(function() {
		var html = "";
		if ($("#unit option").length == 0) {
			$.ajax({
				type : 'POST',
				dataType : 'json',
				url : 'entries/get_iotypes',
				success : function(iotypes) {
					$.ajax({
						type : 'POST',
						dataType : 'json',
						url : 'entries/get_iotypes',
						success : function(iotypes) {
							for (var i = 0; i < iotypes.length; i++) {
								html = html + "<option value='" + iotypes[i].ID + "'>" + iotypes[i].IOCode + "</option>";
							}
	
							$('#unit').append(html);
						}
					});
				}
			});
		}
	});

	//--- format override amount ---//
	$('#override_amount').keyup(function() {
		var val = $(this).val();
		if (isNaN(val)) {
			val = val.replace(/[^0-9\.]/g, '');
			if (val.split('.').length > 2)
				val = val.replace(/\.+$/, '');
		}
		$(this).val(val);
	});

	//--- reset ---//
	$('#reset').click(function() {
		reset_fields();
	});

	$('#references').click(function() {
		var pid = $('#pid').val();
				
		$.ajax({
			type : 'POST',
			url : 'billing/get_project',
			data : {'pid' : pid},
			success : function(project) {

				var project = $.parseJSON(project);
				var po = project.PONumber;
				var contact_email = project.CC;
				if (po == null) 
					po = "N/A";
				if (contact_email == null)
					contact_email = "N/A";			
				
				$('#ponumber').val(po);
				$('#contact_email').val(po);
			}
		});
		
	});
	
	$('#stage').click(function() {
		var pid = $('#pid').val();
		var html, name = '';
		if ($('#stage option').length == 0){
			$.ajax({
				type : 'POST',
				url : 'entries/get_stages',
				data : {'pid' : pid},
				success : function(stages) {
					console.log(stages);
					var stages = $.parseJSON(stages);
					
					for (var i = 0; i < stages.length; i++) {
						name = stages[i].StageName;
						html = html + "<option value'" + name + "'>" + name + "</option>";
					}
					$('#stage').append(html);
				}	
			});
		}
	});	

	//--- submit ---//
	$(document).on('click', '#submit', function() {
		$('#submit-modal').modal('show');
	});
		
	
	$('#modal-submit-btn').click(function() {
		var date_received = $("#received").val();
		var date_delivered = $("#delivered").val();
		var currency = $('#currency').val();
		var remarks = $('#remarks').val();
		var contract_date = $('#contract_date').val();		
		var others  = $('#others').val();
		var $table = $("#table-well");
      	$rows = $table.find("tbody tr");
      	var rows = [];
  		
  		$('#submit-modal').modal('hide');
  		document.getElementById('toggle-div').style.display='block';
		var target = document.getElementById('wrapper');
		var spinner = new Spinner(opts).spin(target);  		
		
		$rows.each(function(row, v) {
			$(this).find("td").each(function(cell, v) {
				if ( typeof rows[cell] === 'undefined')
					{rows[cell] = [];}
				rows[row][cell] = $(this).text();
			});
		});
	
		//ajax
		$.ajax({
				type : 'POST',
				dataType : 'json',
				url : 'entries/submit_entries',
				data: {	'received': date_received,
						'delivered': date_delivered,
						'remarks': remarks,
						'contract_date': contract_date,
						'others': others,
						'currency': currency,
						'rows': rows
					 },
				success : function(i) {					
					if ( i == true ){
						$('#success-modal').modal('show').on('hidden.bs.modal', function (e){
							window.location = 'billing/create';
							document.getElementById('toggle-div').style.display='none';
							spinner.stop();
						});
					} else {
						$('#error-modal').modal('show').on('hidden.bs.modal', function (e){
							document.getElementById('toggle-div').style.display='none';
							spinner.stop();
							return false;
						});
						
					}					
			}
		});
		
	});
	
	
	/*
	 *  FUNCTIONS 
	 */


	// --- function: format total to 2 decimal rows --- //
	function format_currency(num) {
		num = isNaN(num) || num === '' || num === null ? 0.00 : num;
		return parseFloat(num).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	}
	
	// --- function: calculate  --- //
	function calculate_total() {
		var total_field = $('#total');
		var quantity = $('#quantity').val();
		var price = $('#price').val();
		var total;
		
		total = quantity * price;
		total_field.val(total.toFixed(3));
	}
	
	// --- function: check for empty values  --- //
	
	function is_empty(val){
		if (val == null || val == ''){
			return true;
		} else {
			return false;
		}
	}
	
	// --- function: add row to table --- //
	function add_row_entry() {
		var quantity = $('#quantity').val();
		var unit = $('#unit option:selected').text();
		var price = $('#price').val();
		var currency = $('#currency').val();
		var total = $('#total').val();
		var description = $('#description').val();
		var chk_ovr =  $('#override');
		var stage = $('#stage').val();
		//var hgtotal = $('#hgtotal').val();
		
		var discount = $('#discount').val();
		var gtotal = $('#gtotal').val();		
		
		var html;
		
		quantity = parseFloat(quantity.replace(',', ''));		
		price = parseFloat(price.replace(',', ''));
		total = parseFloat(total.replace(',', ''));
		gtotal = parseFloat(gtotal.replace(',', ''));		
		
		if ((chk_ovr).is(':checked')) {
			var ovr_total = $('#override_amount').val();
			var ovr_total = parseFloat(ovr_total.replace(',', ''));
			
			gtotal = Number(gtotal) + Number(ovr_total);
		} else {
			ovr_total = "-";
			gtotal = Number(gtotal) + Number(total);
		}		 
	
				
		html = "<tr>" +
					"<td>"+ format_currency(quantity) +"</a></td>"+
					"<td>"+ unit +"</td>"+
					"<td>"+ format_currency(price) +"</td>"+
					"<td>"+ format_currency(total) +"</td>"+
					"<td>"+ ovr_total +"</td>"+
					"<td>"+ currency +"</td>"+
					"<td>"+ stage +"</td>"+
					"<td>"+ description +"</td>"+
					"<td><button type='button' class='remove_tr btn btn-danger btn-xs'><i class='fa fa-times fa-fw'></i></button></td>"+	
				"</tr>";
		
		
		//Compute Dicounted Price
		var discount =  Number(discount) / 100;
		var discounted_amount =  gtotal * discount;		
		var ftotal = gtotal - discounted_amount;		
		
		$('#gtotal').val(format_currency(gtotal));
		$('#discounted_amount').val(format_currency(discounted_amount));		
		$('#ftotal').val(format_currency(ftotal));
		
		$('#item-table').append(html);
	}
	
	// --- function: reset fields --- //
	function reset_fields() {
		$('#quantity').val('');
		$('#unit').val('');
		$('#price').val('');
		$('#total').val('');
		$('#description').val('');
		$('#override_amount').val('');
		$('#override_amount').attr('disabled', true);
		$('#override').removeAttr('checked');
	}
	
	//--- function: check #item-table row count ---//
	function check_length(selector) {
		var count = $(selector).length;
		return count;
	}
	
});