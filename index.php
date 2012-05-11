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

// Settings. ///////////////////////////////////////////////////////////////////////////////////////

ini_set('display_errors'        , '1');
ini_set('display_startup_errors', '1');

error_reporting(E_ALL);

// Globally executed code. /////////////////////////////////////////////////////////////////////////

try
{
   $filesCss = array
   (
      'style.css'
   );

   $filesJs = array
   (
      'Block.js'                                        ,
      'Position.js'                                     ,
      'ResultTable.js'                                  ,
      'TetrisGame.js'                                   ,
      'TetrisGameGui.js'                                ,
      'TetrisTributePage.js'                            ,
      'lib_tom/js/contrib/jquery/1.5/jquery_minified.js',
      'lib_tom/js/contrib/utils/DomBuilder.js'          ,
      'lib_tom/js/contrib/utils/firebugx.js'            ,
      'lib_tom/js/contrib/utils/json.js'                ,
      'lib_tom/js/gui_layouts/Tabs.js'                  ,
      'lib_tom/js/utils/AjaxPort.js'                    ,
      'lib_tom/js/utils/utils.js'                       ,
      'lib_tom/js/utils/utilsArray.js'                  ,
      'lib_tom/js/utils/utilsDOM.js'                    ,
      'lib_tom/js/utils/utilsObject.js'                 ,
      'lib_tom/js/utils/utilsString.js'                 ,
      'lib_tom/js/utils/utilsTable.js'                  ,
      'lib_tom/js/utils/utilsValidator.js'              ,
      'tabs/about/TabAbout.js'                          ,
      'tabs/game_modes/TabGameModes.js'                 ,
      'tabs/high_scores/TabHighScores.js'               ,
      'tabs/instructions/TabInstructions.js'            ,
      'tabs/statistics/TabStatistics.js'                ,
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
 foreach ($filesJs  as $file) {echo "  <script src='$file?$unixTime'></script>\n"         ;}
 foreach ($filesCss as $file) {echo "  <link rel='stylesheet' href='$file?$unixTime' />\n";}
?>
  <title>Tom's Tetris Tribute</title>
 </head>
 <body></body>
</html>
<?php
/*******************************************END*OF*FILE********************************************/
?>
