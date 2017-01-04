<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
 * Description: User model class
 */
class Email_model extends CI_Model{
    function __construct(){
        parent::__construct();

		$this->load->library('email');
		$this->email->initialize(array(
		  'protocol' => 'smtp',
		  'mailpath' => '/usr/sbin/sendmail',
		  'smtp_host' => 'mail.asiatype.com',
		  'smtp_user' => 'itss_srs@asiatype.com',
		  'smtp_pass' => 'asiatype01',
		  'smtp_port' => 25,
		  'smtp_timeout' => 15,
		  'wordwrap' => TRUE,
		  'crlf' => "\r\n",
		  'newline' => "\r\n",
		  'mailtype' => 'html'
		));		
		date_default_timezone_set('Asia/Manila');
    }
    
    public function process_email( $from, $to, $subject, $date, $time, $body, $attach1, $attach2, $attach3, $attach4, $attach5, $attach6, $attach7, $attach8, $attach9, $attach10 ){
			//$date_time_string = $date . ' ' . $time;
			//$date_time = date( 'd-m-Y H:i:s', $date_time_string );
			
			//$my_date =  strtotime('21-05-2010 10:30:11');
			$my_date =  strtotime($date . ' ' . $time);
			//$my_date =  strtotime( $date_time );			
			
			$this->email->initialize(
										array(
											'my_date' => $my_date
										)
									 );
			
			
		
			//$this->email->from(	'itss_srs@asiatype.com', $from );
			$this->email->from(	$from );
			//$this->email->cc( 'pts.billing@asiatype.com' );
			//$this->email->cc( 'bermar.balibalos@asiatype.com' );
			$this->email->to( $to ); 
			
			$this->email->subject( $subject );
			$this->email->message( $body );
			
			if ( ! empty( $attach1 ) ) {
				$this->email->attach( './uploads/' . $attach1 );	
			};
			if ( ! empty( $attach2 ) ) {
				$this->email->attach( './uploads/' . $attach2 );	
			};
			if ( ! empty( $attach3 ) ) {
				$this->email->attach( './uploads/' . $attach3 );	
			};
			if ( ! empty( $attach4 ) ) {
				$this->email->attach( './uploads/' . $attach4 );	
			};
			if ( ! empty( $attach5 ) ) {
				$this->email->attach( './uploads/' . $attach5 );	
			};
			if ( ! empty( $attach6 ) ) {
				$this->email->attach( './uploads/' . $attach6 );	
			};
			if ( ! empty( $attach7 ) ) {
				$this->email->attach( './uploads/' . $attach7 );	
			};
			if ( ! empty( $attach8 ) ) {
				$this->email->attach( './uploads/' . $attach8 );	
			};
			if ( ! empty( $attach9 ) ) {
				$this->email->attach( './uploads/' . $attach9 );	
			};
			if ( ! empty( $attach10 ) ) {
				$this->email->attach( './uploads/' . $attach10 );	
			};
			
			
			if( $this->email->send() ){
				return TRUE;	
			}
			else{
				show_error($this->email->print_debugger());	
			}
			
    }
}
?>