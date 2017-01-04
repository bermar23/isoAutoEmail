<html>
<head>
<title>ISO EMAIL</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

		<!-- Core Scripts - Include with every page -->
		<script type="text/javascript" src="<?php echo base_url(); ?>js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/bootstrap/js/plugins/metisMenu/jquery.metisMenu.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/3rd_party_plugins/typeahead.min.js"></script>		
		<!-- SB Admin Scripts - Include with every page -->
		<script type="text/javascript" src="<?php echo base_url(); ?>js/bootstrap/js/sb-admin.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/3rd_party_plugins/datepicker/js/bootstrap-datepicker.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/3rd_party_plugins/timepicker/jquery.timepicker.min.js"></script>

		<title>Asiatype Incorporated - Project Tracking System</title>

		
		
		<!-- Core CSS - Include with every page -->
		<link href="<?php echo base_url(); ?>js/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="<?php echo base_url(); ?>js/3rd_party_plugins/timepicker/bootstrap-datepicker.css" rel="stylesheet">
		<link href="<?php echo base_url(); ?>js/3rd_party_plugins/timepicker/jquery.timepicker.css" rel="stylesheet">
		<link href="<?php echo base_url(); ?>js/bootstrap/font-awesome/css/font-awesome.css" rel="stylesheet">
		
		<!-- SB Admin CSS - Include with every page -->
		<!--<link href="<?php //echo base_url(); ?>js/bootstrap/css/sb-admin.css" rel="stylesheet">-->
		<!-- Override CSS - Include with every page -->
		
		<style type="text/css">
      /* Override some defaults */
      html, body {
        background-color: #eee;
      }
      body {
        padding-top: 40px; 
      }
      .container {
        width: 500px;
      }

      /* The white background content wrapper */
      .container > .content {
        background-color: #fff;
        padding: 20px;
        margin: 0 -20px; 
        -webkit-border-radius: 10px 10px 10px 10px;
           -moz-border-radius: 10px 10px 10px 10px;
                border-radius: 10px 10px 10px 10px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.15);
                box-shadow: 0 1px 2px rgba(0,0,0,.15);
      }

      .login-form {
        margin-left: 65px;
      }

      legend {
        margin-right: -50px;
        font-weight: bold;
          color: #404040;
      }

    </style>

</head>
	<body>
		<div class="container">
			<h2 class="form-signin-heading">EMAIL</h2>
			<div class="content">				
				<?php
					$attributes_login = array('class' => 'form-signin', 'id' => 'frm_login');							
					echo form_open('email/process', $attributes_login);					
				?>
					<div class="form-group">
						<label class="form-label" for="from">From:</label>
						<input type="email" class="form-control" name="from" id="from" required/>
					</div>
					
					<div class="form-group">
						<label class="form-label" for="to">To:</label>
						<input type="email" class="form-control" name="to" id="to" required/>
					</div>
					
					<div class="form-group">
						<label class="form-label" for="subject">Subject:</label>
						<input type="text" class="form-control" name="subject" id="subject" required/>
					</div>
					
					<div class="form-group">
						<label class="form-label" for="date">Date:</label>
						<input type="text" class="form-control" name="date" id="date" required/>
					</div>
					
					<div class="form-group">
						<label class="form-label" for="time">Time:</label>
						<input type="text" class="form-control" name="time" id="time" required/>
					</div>
					
					<div class="form-group">
						<label class="form-label" for="body">Body:</label>
						<textarea class="form-control" name="body" id="body" required></textarea>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach1" name="attach1"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach2" name="attach2"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach3" name="attach3"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach4" name="attach4"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach5" name="attach5"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach6" name="attach6"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach7" name="attach7"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach8" name="attach8"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach9" name="attach9"/>
					</div>
					
					<div class="form-group">
					  <input type="file" id="attach10" name="attach10"/>
					</div>
				
					<button class="btn btn-primary btn-block" type="submit">Send</button>            
				</form>
			</div>
		
		<script>
		  jQuery(function($){
			
			$('#date').datepicker({
			  'format': 'dd/mm/yyyy',
			  'autoclose': true
			}).on('changeDate', function (ev) {
			  $(this).datepicker('hide');
			});
			
			$('#time').timepicker({
			  'timeFormat': 'H:i:s'
			  });
			
		  });
		</script>
		
		</div>
	</body>
</html>

