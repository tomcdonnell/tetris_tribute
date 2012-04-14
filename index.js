/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "index.js"
*
* Project: Tetris.
*
* Purpose: Starting point for the client-side code.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

// Globally executed code. /////////////////////////////////////////////////////////////////////////

$(document).ready
(
   function (e)
   {
      try
      {
         var f = 'onLoadWindow()';
         UTILS.checkArgs(f, arguments, [Function]);

         DomBuilder.apply(window);

         var tetrisTributePage = new TetrisTributePage();

         tetrisTributePage.appendChildNodes(document.body);
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   },
   false
);

/*******************************************END*OF*FILE********************************************/