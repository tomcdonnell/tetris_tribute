/**************************************************************************************************\
*
* vim: ts=3 sw=3 et co=100 wrap go-=b
*
* Filename: "TabGameModes.js"
*
* Project: Tetris Tribute.
*
* Purpose: Definition of the TabGameModes object.
*
* Author: Tom McDonnell 2009-09-24.
*
\**************************************************************************************************/

/*
 *
 */
function TabGameModes()
{
   var f = 'TabGameModes()';
   UTILS.checkArgs(f, arguments, []);

   // Priviliged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getHeadingDiv = function () {return headingDiv;};
   this.getContentDiv = function () {return contentDiv;};

   // Setters. --------------------------------------------------------------------------------//

   /*
    *
    */
   this.setUpdateRequired = function (bool)
   {
      var f = 'TabGameModes.setUpdateRequired()';
      UTILS.checkArgs(f, arguments, [Boolean]);

      updateRequired = bool;
   };

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.update = function (restrictions)
   {
      var f = 'TabGameModes.update()';
      UTILS.checkArgs(f, arguments, [Object]);
   };

   // Private variables. ////////////////////////////////////////////////////////////////////////

   // HTML input elements. --------------------------------------------------------------------//

   // Other HTML elements. -------------------------------------------------------------------//

   var headingDiv = DIV('Game Modes');
   var contentDiv = DIV
   (
      'Game Modes Content'
   );

   // Other private variables. ----------------------------------------------------------------//


   // Initialisation code. //////////////////////////////////////////////////////////////////////
}

/*******************************************END*OF*FILE********************************************/
