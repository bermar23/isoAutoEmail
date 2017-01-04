<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Email extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('email_view');
	}
	
	public function process()
	{
		$from = $this->input->post('from');
		$to = $this->input->post('to');
		$subject = $this->input->post('subject');
		$date = $this->input->post('date');
		$time = $this->input->post('time');
		$body = $this->input->post('body');
		$attach1 = $this->input->post('attach1');
		$attach2 = $this->input->post('attach2');
		$attach3 = $this->input->post('attach3');
		$attach4 = $this->input->post('attach4');
		$attach5 = $this->input->post('attach5');
		$attach6 = $this->input->post('attach6');
		$attach7 = $this->input->post('attach7');
		$attach8 = $this->input->post('attach8');
		$attach9 = $this->input->post('attach9');
		$attach10 = $this->input->post('attach10');
		
		$body = preg_replace("/\n/", "<br />", $body);
		
		//$body = $this->input->post('body');
		
		$this->load->model('email_model');
		$status = $this->email_model->process_email( $from, $to, $subject, $date, $time, $body, $attach1, $attach2, $attach3, $attach4, $attach5, $attach6, $attach7, $attach8, $attach9, $attach10 );
		
		if( $status ){
			redirect('email');
		}else{
			echo '<h1>not sent</h1>';
		}
		
		//echo 'process';
		//$this->load->view('email_view');
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */