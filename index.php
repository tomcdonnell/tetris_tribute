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
      'Block.js'                                            ,
      'Position.js'                                         ,
      'ResultTable.js'                                      ,
      'TetrisGame.js'                                       ,
      'TetrisGameGui.js'                                    ,
      'TetrisTributePage.js'                                ,
      'library/tom/js/contrib/jquery/1.5/jquery_minified.js',
      'library/tom/js/contrib/utils/DomBuilder.js'          ,
      'library/tom/js/contrib/utils/firebugx.js'            ,
      'library/tom/js/contrib/utils/json.js'                ,
      'library/tom/js/gui_layouts/Tabs.js'                  ,
      'library/tom/js/utils/AjaxPort.js'                    ,
      'library/tom/js/utils/utils.js'                       ,
      'library/tom/js/utils/utilsArray.js'                  ,
      'library/tom/js/utils/utilsDOM.js'                    ,
      'library/tom/js/utils/utilsObject.js'                 ,
      'library/tom/js/utils/utilsString.js'                 ,
      'library/tom/js/utils/utilsTable.js'                  ,
      'library/tom/js/utils/utilsValidator.js'              ,
      'tabs/about/TabAbout.js'                              ,
      'tabs/game_modes/TabGameModes.js'                     ,
      'tabs/high_scores/TabHighScores.js'                   ,
      'tabs/instructions/TabInstructions.js'                ,
      'tabs/statistics/TabStatistics.js'                    ,
      'index.js' // Load this file last.
   );
}
catch (Exception $e)
{
   echo $e;
}

// HTML. ///////////////////////////////////////////////////////////////////////////////////////////
?>
<!DOCTYPE html PUBLIC
 "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
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
