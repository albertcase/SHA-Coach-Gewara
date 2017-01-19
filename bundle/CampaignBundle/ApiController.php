<?php
namespace CampaignBundle;

use Core\Controller;


class ApiController extends Controller {

    public function __construct() {

    	global $user;

        parent::__construct();

        if(!$user->uid) {
	        $this->statusPrint('100', 'access deny!');
        } 
    }

    public function formAction() {

    	global $user;

    	$request = $this->request;
    	$fields = array(
			'name' => array('notnull', '120'),
			'cellphone' => array('cellphone', '121'),
			'address' => array('notnull', '122'),
		);
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		$data->name = $request->request->get('name');
		$data->cellphone = $request->request->get('cellphone');
		$data->address = $request->request->get('address');

		if($DatabaseAPI->insertInfo($data)) {
			$data = array('status' => 1);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

    public function checkAction() {
    	global $user;

    	$request = $this->request;
    	$fields = array(
			'mobile' => array('cellphone', '120'),
		);
		//$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		//$data->mobile = $request->request->get('mobile');
		$data->mobile = '1512038676';

		$rs = $DatabaseAPI->findLotteryByUid($user->uid);
		if ($rs) {
			$this->statusPrint('2', '已经抽过');
		}

		//概率
		$rand = mt_rand(1, PERMAX);
		if ($rand <= PER) {
			$status = 1;
		} else {
			$status = 0;
		}

		$codeBox = $DatabaseAPI->getGewaraCode(2);
		if (!$codeBox) {
			//奖品发完 
			$status = 0;
		}

		echo $status;
		echo $rs[0]->id."|".$rs[0]->number;
		exit;
		
		if($DatabaseAPI->insertInfo($data)) {
			$data = array('status' => 1);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

}
