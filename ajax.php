<?php
/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "ajax.php"
*
* Project: Tetris.
*
* Purpose: Server-side ajax message processing.
*
* Author: Tom McDonnell 2009-07-04.
*
\**************************************************************************************************/

// Includes. ///////////////////////////////////////////////////////////////////////////////////////

require_once dirname(__FILE__) . '/lib_tom/php/database_wrappers/high_scores/HighScores.php';
require_once dirname(__FILE__) .
(
   '/lib_tom/php/database_wrappers/high_scores/database_definitions.php'
);

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
    case 'submit_score': $reply = HighScores::insert($dbc, 'tetris', $payload); break;
    default: throw new Exception('Unknown message header "' . $header . '" received.');
   }

   echo json_encode(array('submit_score_result', $reply));
}
catch (Exception $e)
{
   echo $e->getMessage();
}

/*******************************************END*OF*FILE********************************************/
?>
