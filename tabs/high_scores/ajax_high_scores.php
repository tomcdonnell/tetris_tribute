<?php
/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "ajax_high_scores.php"
*
* Project: Tetris.
*
* Purpose: Server-side ajax message processing for the High Scores tab.
*
* Author: Tom McDonnell 2009-09-27.
*
\**************************************************************************************************/

// Includes. ///////////////////////////////////////////////////////////////////////////////////////

require_once dirname(__FILE__) . '/../../lib_tom/php/utils/UtilsValidator.php';
require_once dirname(__FILE__) . '/TetrisHighScores.php';

// Globally executed code. /////////////////////////////////////////////////////////////////////////

try
{
   $msg = json_decode(file_get_contents('php://input'), true);

   if (!is_array($msg) || count($msg) != 2)
   {
      throw new Exception('This page has been used incorrectly.');
   }

   $header  = $msg[0];
   $payload = $msg[1];

   $dbc = DatabaseManager::get('highscores_write');

   switch ($header)
   {
    case 'request_high_scores':
      UtilsValidator::checkArray($payload, array('gameMode' => 'string'));
      $reply = TetrisHighScores::getHighScores
      (
         $dbc, array
         (
            'gameNameShort' => 'tetris'            ,
            'gameModeName'  => $payload['gameMode'],
            'idPlayer'      => null                ,
            'nRowsPerPage'  => 20                  ,
            'pageNo'        => 1
         )
      );
      break;
    default:
      throw new Exception('Unknown message header "' . $header . '" received.');
   }

   echo json_encode(array('supply_high_scores', $reply));
}
catch (Exception $e)
{
   echo $e;
}

/*******************************************END*OF*FILE********************************************/
?>
