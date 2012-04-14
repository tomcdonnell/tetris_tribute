/**************************************************************************************************\
*
* vim: ts=3 sw=3 et co=100 wrap go-=b
*
* Filename: "TabInstructions.js"
*
* Project: Tetris Tribute.
*
* Purpose: Definition of the TabInstructions object.
*
* Author: Tom McDonnell 2009-09-24.
*
\**************************************************************************************************/

/*
 *
 */
function TabInstructions()
{
   var f = 'TabInstructions()';
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
      var f = 'TabInstructions.setUpdateRequired()';
      UTILS.checkArgs(f, arguments, [Boolean]);

      updateRequired = bool;
   };

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.update = function (restrictions)
   {
      var f = 'TabInstructions.update()';
      UTILS.checkArgs(f, arguments, [Object]);
   };

   // Private variables. ////////////////////////////////////////////////////////////////////////

   // HTML input elements. --------------------------------------------------------------------//

   // Other HTML elements. -------------------------------------------------------------------//

   var headingDiv = DIV('Instructions');
   var contentDiv = DIV
   (
      'Instructions Content'
   );

   // Other private variables. ----------------------------------------------------------------//


   // Initialisation code. //////////////////////////////////////////////////////////////////////
}

/*******************************************END*OF*FILE********************************************/
