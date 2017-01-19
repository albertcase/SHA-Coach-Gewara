<?php
namespace CampaignBundle;

use Core\Controller;

class PageController extends Controller {

	public function indexAction() {
		global $user;

		$DatabaseAPI = new \Lib\DatabaseAPI();
		$rs = $DatabaseAPI->findLotteryByUid($user->uid);
		if (!$rs) {
			$this->render('index', array('status' => 0, 'code1' => '', 'code2' => ''));
		} else {
			$this->render('index', array('status' => $rs->status, 'code1' => $rs->code1, 'code2' => $rs->code2));
		}
		
	}

	public function clearCookieAction() {
		setcookie('_user', json_encode($user), time(), '/');
		$this->statusPrint('success');
	}
}