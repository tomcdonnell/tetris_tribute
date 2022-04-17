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
      '../../../flatpackapps.com/_lib/tom/js/contrib/jquery-3.4.1.min.js',
//      '../webtrim/lib/jquery/jquery-1.11.0.min.js'   ,
      '../../../flatpackapps.com/_lib/tom/js/contrib/DomBuilder.js'  ,
      '../../../flatpackapps.com/_lib/tom/js/utils/utils.js'         ,
      '../../../flatpackapps.com/_lib/tom/js/utils/utilsArray.js'    ,
      '../../../flatpackapps.com/_lib/tom/js/utils/utilsObject.js'   ,
      '../../../flatpackapps.com/_lib/tom/js/utils/utilsString.js'   ,
      '../../../flatpackapps.com/_lib/tom/js/utils/utilsValidator.js',
      'Block.js'                                     ,
      'Position.js'                                  ,
      'TetrisGame.js'                                ,
      'TetrisGameGui.js'                             ,
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
 foreach ($filesJs  as $file) {echo "  <script src='$file'></script>\n"        ;}
// foreach ($filesJs  as $file) {echo "  <script src='$file?$unixTime'></script>\n"        ;}
 foreach ($filesCss as $file) {echo "  <link rel='stylesheet' href='$file?$unixTime'/>\n";}
?>
  <title>Tom's Tetris Tribute</title>
 </head>
 <body></body>
</html>
<?php
/*******************************************END*OF*FILE********************************************/
?>
