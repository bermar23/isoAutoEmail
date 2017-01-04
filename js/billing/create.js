/*
 * @author: Shiela
 * @description: for view/billing/create.php
 */

jQuery(document).ready(function($) {
	
	 		 
	$('#alert-no-result').hide();
	
	$('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
	$('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');
	
	
	 // --- populate #SearchJO input field for list of jonumbers --- //
	$('#SearchJO').typeahead({
		 name : 'jonumbers',		 
		 remote : {
			 url: '../project/get_jonumbers/?term=%QUERY',			 
			 cache: false,
			 filter: function(data) {
				return data;
			 },
		 }
	 }).on('typeahead:selected', function (object, datum) {
	 	 //1. Get Project ID
		 pid =  datum.ID;
		 jo_number = datum.value;
		 var project_name, project_closed, billed;
		
		 
		//2. Check if project is closed or open
		$.ajax({
			type : 'POST',
			url : '../project/get_project',
			data : {'pid' : pid},
			success : function(project) {

				var project = $.parseJSON(project);
				project_name = project.ProjectName;
				project_closed = project.IsCompleted;
				billed = project.Billed;				
				
				//check if project is already billed or not: 1-partial, 2-full
				if ( billed != 2 ) {
					if ( billed == 1 ) {
						alert('NOTICE: This project has a partial billing.');
					}
				
					//CLOSE -  go to entries directly
					if (project_closed == 1) {
						$.ajax({
							type : 'POST',
							url : '../project/push_project',
							data : {'pid' : pid, 'jono': jo_number },
							success : function(response) {
								window.location = '../entries';
							}
						});
	
					} else {
					//OPEN - select from closed stages
						$.ajax({ 
							type : 'POST',
							url : '../stages/get_closed_stages',
							data : {'pid' : pid},
							success : function(data) {
	
								if (data) {
									$('#SearchPName').val("");
									var number_of_rows = $.parseJSON(data).length;
									
									//create table
									remove_table_panel();
									create_table(pid, number_of_rows, data, project_name, jo_number); 
									$('#ction-buttons').removeAttr('hidden');
								} else {
									$('#SearchPName').val("");
									remove_table_panel();
									$('#alert-no-result').show();
								}
							},
							error : function() {
								$('#alert-no-result').show();
							}
						});
				  } 
					
				} else {
					alert('ERROR: This project is fully billed already. Double billing not allowed!');
					location.reload();
				}
												
			}
		});
	 });
	 
	 
	 // --- populate #SearchPName input field for list of projects --- //
	 $('#SearchPName').typeahead({
		 name : 'projectnames',
		 remote : {
			 url: '../project/get_projectnames?term=%QUERY',
			 cache: false,
			 filter: function(data) {
				return data;
			 },
		 }
	 }).on('typeahead:selected', function (object, datum) {
		
		 var pid =  datum.ID;
		 var project_name, jo_number, billed;
		
		$.ajax({
			type : 'POST',
			url : '../project/get_project',
			data : {'pid' : pid},
			success : function(project) {

				var project = $.parseJSON(project);
				project_name = project.ProjectName;
				project_closed = project.IsCompleted;
				jo_number = project.JONumber;
				billed = project.Billed;	
				
				if (billed != 2) {
					if (billed == 1) {
						alert('NOTICE: This project has a partial billing.');
					}
				//CLOSE -  go to entries directly
					if (project_closed == 1) {
						$.ajax({
							type : 'POST',
							url : '../project/push_project',
							data : {'pid' : pid},
							success : function(response) {
								window.location = '../entries';
							}
						});
	
					} else {
					//OPEN - select from closed stages
						$.ajax({ 
							type : 'POST',
							url : '../stages/get_closed_stages',
							data : {'pid' : pid},
							success : function(data) {
							
								if (data) {
									$('#SearchPName').val("");
									var number_of_rows = $.parseJSON(data).length;
									
									//create table
									remove_table_panel();
									create_table(pid, number_of_rows, data, project_name, jo_number); 
									$('#ction-buttons').removeAttr('hidden');
								} else {
									$('#SearchPName').val("");
									remove_table_panel();
									$('#alert-no-result').show();
								}
							},
							error : function() {
								$('#alert-no-result').show();
							}
						});
				   }
				} else {
					alert('ERROR: This project is fully billed already. Double billing not allowed!');
					location.reload();
				}
			}
		});
	 });
		 
	
	// --- clear input fields --- //
	$('#clear').click(function(event) {
		remove_table_panel();  
		$('#SearchPName').val("");
		$('#SearchJO').val("");
	});
	
	// --- clear input fields (dynamic) --- //
	$(document).on('click', '#cancel', function(event) {
		remove_table_panel();  
		$('#SearchPName').val("");
		$('#SearchJO').val("");
	});
	
	
	// --- submit selected stages --- //
	$(document).on('click', '#submit', function( event ) {
	  event.preventDefault();
	  var data = $('#table-form').serialize();
	  var pid = $('#pid').val();
	  var jono = $('#jono').val();
	  var count = $('#table-form :checkbox:checked').length;	 	 
	  if (count > 0) {
	  	 $.ajax({
			type: 'POST',
			url: '../project/push_stages',
			data: {'sid': data, 'pid': pid, 'jono': jono},
			success: function(response) {				
				//console.log(response);
				window.location = '../entries';
			}
	 	});	  	
	  }else{
	  		$('#submit-modal').modal('show');
	  }		
	});
	
	/*
	 *  FUNCTIONS 
	 */
	
	// --- clear #table-panel --- //
	function remove_table_panel() {
		if ($('#table-panel').length > 0 ){
    		$('#table-panel').remove();
    	}
    	
    	$('#alert-no-result').hide();
	}

	
	// --- dynamically create a table for closed stages --- //
	function create_table(pid, rows, json, pname, jo_number){
		
		var stage_rows = $.parseJSON(json);
		
		var html =     	"<div id='table-panel'>" +
						"<div class='panel panel-success' >" +
						"<div class='panel-heading'><strong>"+ jo_number +":</strong>  "+ pname +"</div>" +
						"<div class='panel-body'>" +
							"<div class='table-responsive'>" +
								"<form class='form-horizontal' id='table-form'>" +
								"<input type='hidden' value='"+ pid +"' id='pid' />" +
								"<input type='hidden' value='"+ jo_number +"' id='jono' />" +
                                "<table class='table table-hover'>" +
                                    "<thead>" +
                                        "<tr>" +
                                        	
                                         	"<th>Stage ID</th>" +
                                            "<th>Stage Name</th>" +
                                            "<th>Actual Start</th>" +
                                            "<th>Actual End</th>" +
                                            "<th>Status</th>" +
                                            "<th>Ready For Billing</th>" +
                                              "<th>Select</th>" +
                                            "<th>Comment</th>" +
                                        "</tr>" +
                                    "</thead>";
       
							         for (var i = 0; i<rows ; i++) {
							         	var id = stage_rows[i].ID;
							         	var stagename = stage_rows[i].StageName;
							         	var actualstart = stage_rows[i].ActualStart;
							         	var actualend = stage_rows[i].ActualEnd;
							         	var comment =  stage_rows[i].Comment;
							         	var status = stage_rows[i].ProjectID;
							         	var forbilling = stage_rows[i].ForBilling;
							         	
							         	if (actualstart == null || actualstart == '0000-00-00 00:00:00') { actualstart = "-"; }
										
										if (actualend == null || actualend == '0000-00-00 00:00:00') { actualend = "-"; }

							         	if (comment == null) { comment = "not available"; }
							         		
							         	if (status) {status = 'closed';} else{status = 'open';}
							         								         	
							         	if (forbilling) {forbilling = 'yes';} else{forbilling = 'no';}					         	
							         
										html = html + 
												"<tr style='color:#606060 ;'>" +
													"<td>" + id + " </td>" +
													"<td>" + stagename + " </td>" +
													"<td>" + actualstart + " </td>" +
													"<td>" + actualend + " </td>" +
													"<td>" + status + " </td>" +
													"<td>" + forbilling + " </td>" +
													"<td><div class='form-group'><input type='checkbox' name='sid[]' value='" + id +"' ></div></td>" +
													"<td>" + comment + " </td>"+
												"</tr>";
										}        
                                   
        html =  html +  	"</table><hr/>" +
        					"<div class='buttons-div' id='action-buttons'>" +
								"<button type='button' class='btn btn-primary' id='cancel'> <i class='fa fa-times fa fw'></i>  Cancel </button>" +
								"<button type='submit' class='btn btn-success' id='submit' style='margin-left: 4px;'> <i class='fa fa-check fa fw'></i> Submit </button>" +
							"</div>" +
							"</form>" +
						"</div>" +  	
                    "</div>" +  
                    "</div>" +                                    
                    "</div>" +  
                    "</div>";
                    
        $("#table-div").append(html);
	}

});
