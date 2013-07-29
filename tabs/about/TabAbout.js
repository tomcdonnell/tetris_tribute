/**************************************************************************************************\
*
* vim: ts=3 sw=3 et co=100 wrap go-=b
*
* Filename: "TabAbout.js"
*
* Project: Tetris Tribute.
*
* Purpose: Definition of the TabAbout object.
*
* Author: Tom McDonnell 2009-09-24.
*
\**************************************************************************************************/

/*
 *
 */
function TabAbout()
{
   var f = 'TabAbout()';
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
      var f = 'TabAbout.setUpdateRequired()';
      UTILS.checkArgs(f, arguments, ['boolean']);

      updateRequired = bool;
   };

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.update = function (restrictions)
   {
      var f = 'TabAbout.update()';
      UTILS.checkArgs(f, arguments, ['object']);
   };

   // Private variables. ////////////////////////////////////////////////////////////////////////

   // HTML input elements. --------------------------------------------------------------------//

   // Other HTML elements. -------------------------------------------------------------------//

   var headingDiv = DIV('About');
   var contentDiv = DIV
   (
      'About Content'
   );

   // Other private variables. ----------------------------------------------------------------//


   // Initialisation code. //////////////////////////////////////////////////////////////////////
}

/*******************************************END*OF*FILE********************************************/
