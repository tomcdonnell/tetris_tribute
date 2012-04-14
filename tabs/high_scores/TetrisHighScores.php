<?php
/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "TetrisHighScores.php"
*
* Project: HighScores database wrapper class.
*
* Purpose: Insert and retrieve data into/from the `highscores` database.
*
* Author: Tom McDonnell 2009-07-04.
*
\**************************************************************************************************/

// Includes. ///////////////////////////////////////////////////////////////////////////////////////

require_once dirname(__FILE__) . (
   '/../../library/tom/php/database_wrappers/high_scores/database_definitions.php'
);
require_once dirname(__FILE__) . (
   '/../../library/tom/php/database_wrappers/high_scores/HighScores.php'
);

// Class definition. ///////////////////////////////////////////////////////////////////////////////

/*
 *
 */
class TetrisHighScores
{
   // Public functions. /////////////////////////////////////////////////////////////////////////

   /*
    *
    */
   public function __construct()
   {
      throw new Exception('This class is not intended to be instantiated.');
   }

   // Getters. --------------------------------------------------------------------------------//

   /*
    *
    */
   public static function getHighScores(DatabaseConnection $dbc, $params)
   {
      Utils_validator::checkArray
      (
         $params, array
         (
            'gameNameShort' => 'string'           ,
            'gameModeName'  => 'string'           ,
            'idPlayer'      => 'nullOrPositiveInt',
            'nRowsPerPage'  => 'positiveInt'      ,
            'pageNo'        => 'positiveInt'
         )
      );

      $highScoresInfo = HighScores::getHighScores($dbc, $params);
      list($colHeadings, $colClasses) = self::_getColHeadingsAndColClasses($params['gameModeName']);

      return array
      (
         'heading'      => 'High Scores'                                    ,
         'subheading'   => $params['gameModeName']                          ,
         'colHeadings'  => $colHeadings                                     ,
         'colClasses'   => $colClasses                                      ,
         'nRowsTotal'   => $params['nRowsPerPage']                          ,
         'offset'       => $params['nRowsPerPage'] * ($params['pageNo'] - 1),
         'firstRowRank' => 1                                                ,
         'rows'         => self::_processRows($highScoresInfo['rows'])      ,
         'footer'       => ''                                               ,
         'sortOverride' => null
      );
   }

   // Private functions. ////////////////////////////////////////////////////////////////////////

   /*
    *
    */
   private static function _getColHeadingsAndColClasses($gameModeName)
   {
      $colHeadings = array('Player Name', 'Date'  , 'Score' );
      $colClasses  = array('alignL'     , 'alignL', 'alignR');

      switch ($gameModeName)
      {
       case 'arcade':
         break;
       case 'advanced':
         break;
       case 'jumble':
         $colHeadings = array('Player Name', 'Date', 'Jumble Height', 'Complete', 'Blocks Fallen');
         $colClasses  = array('alignL'     , 'alignL', 'alignR'     , 'alignL'  , 'alignR'       );
         break;
       case 'tetrisStreak':
         break;
       default:
         throw new Exception("Unknown game mode '$gameModeName'.");
      }

      return array($colHeadings, $colClasses);
   }

   /*
    *
    */
   private static function _processRows($rows)
   {
      $processedRows = array();

      foreach ($rows as $row)
      {
         $details = ($row['details'] === null)? array(): json_decode($row['details'], true);
         $score   = $row['score'];
         unset($row['details'     ]);
         unset($row['score'       ]);
         unset($row['gameModeName']);
         $processedRow = $row;

         foreach ($details as $key => $value)
         {
            switch ($key)
            {
             case 'complete':
               $value = ($value == '1')? 'Y': 'N';
               break;
             default:
               $value = (string)$value;
            }

            $processedRow[$key] = $value;
         }

         // Set score as last position in processed row.
         $processedRow['score'] = $score;

         $processedRows[] = $processedRow;
      }

      return array_map('array_values', $processedRows);
   }
}

/*******************************************END*OF*FILE********************************************/
?>
