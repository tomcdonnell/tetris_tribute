<?php
/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "index.php"
*
* Project: Tetris.
*
* Purpose: Start page for the project.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

ini_set('display_errors'        , '1');
ini_set('display_startup_errors', '1');

error_reporting(E_ALL);

try
{
   $filesCss = array
   (
      'style.css'
   );

   $filesJs = array
   (
      '../../lib/tom/js/contrib/jquery/1.7/jquery_minified.js',
      '../../lib/tom/js/contrib/utils/DomBuilder.js'          ,
      '../../lib/tom/js/contrib/utils/json.js'                ,
      '../../lib/tom/js/gui_layouts/Tabs.js'                  ,
      '../../lib/tom/js/utils/AjaxPort.js'                    ,
      '../../lib/tom/js/utils/utils.js'                       ,
      '../../lib/tom/js/utils/utilsArray.js'                  ,
      '../../lib/tom/js/utils/utilsDOM.js'                    ,
      '../../lib/tom/js/utils/utilsObject.js'                 ,
      '../../lib/tom/js/utils/utilsString.js'                 ,
      '../../lib/tom/js/utils/utilsTable.js'                  ,
      '../../lib/tom/js/utils/utilsValidator.js'              ,
      'Block.js'                                              ,
      'Position.js'                                           ,
      'ResultTable.js'                                        ,
      'TetrisGame.js'                                         ,
      'TetrisGameGui.js'                                      ,
      'TetrisTributePage.js'                                  ,
      'tabs/about/TabAbout.js'                                ,
      'tabs/game_modes/TabGameModes.js'                       ,
      'tabs/high_scores/TabHighScores.js'                     ,
      'tabs/instructions/TabInstructions.js'                  ,
      'tabs/statistics/TabStatistics.js'                      ,
      'index.js' // Load this file last.
   );
}
catch (Exception $e)
{
   echo $e;
}

// HTML. ///////////////////////////////////////////////////////////////////////////////////////////
?>
<!DOCTYPE html>
<html>
 <head>
<?php
 $unixTime = time();
 foreach ($filesJs  as $file) {echo "  <script src='$file?$unixTime'></script>\n"        ;}
 foreach ($filesCss as $file) {echo "  <link rel='stylesheet' href='$file?$unixTime'/>\n";}
?>
  <title>Tom's Tetris Tribute</title>
 </head>
 <body></body>
</html>
<?php
/*******************************************END*OF*FILE********************************************/
?>
