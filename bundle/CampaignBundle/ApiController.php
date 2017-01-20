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
		$request->validation($fields);
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$data = new \stdClass();
		$data->uid = $user->uid;
		$data->mobile = $request->request->get('mobile');
		//$data->mobile = '1512038676';

		$rs = $DatabaseAPI->findLotteryByUid($user->uid);
		if ($rs) {
			$this->statusPrint('2', '已经抽过');
		}

		//概率
		$rand = mt_rand(1, PERMAX);
		if ($rand <= PER) {
			$status = 1;
		} else {
			$status = 2;
		}

		$codeBox = $DatabaseAPI->getGewaraCode(2);
		if (!$codeBox) {
			//奖品发完 
			$status = 2;
		}

		if ($status == 1) {
			$DatabaseAPI->changeStatus($codeBox[0]['id']);
			$DatabaseAPI->changeStatus($codeBox[1]['id']);
			$data->status = $status;
			$data->cid1 = $codeBox[0]['id'];
			$data->code1 = $codeBox[0]['number'];
			$data->cid2 = $codeBox[1]['id'];
			$data->code2 = $codeBox[1]['number'];
		} else {
			$data->status = $status;
			$data->cid1 = '';
			$data->code1 = '';
			$data->cid2 = '';
			$data->code2 = '';
		}
		
		if($DatabaseAPI->insertLottery($data)) {
			$data = array('status' => 1);
			$this->dataPrint($data);
		} else {
			$this->statusPrint('0', 'failed');
		}
    }

}
