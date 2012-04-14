/**************************************************************************************************\
*
* vim: ts=3 sw=3 et co=100 wrap go-=b
*
* Filename: "TabStatistics.js"
*
* Project: Tetris Tribute.
*
* Purpose: Definition of the TabStatistics object.
*
* Author: Tom McDonnell 2009-09-24.
*
\**************************************************************************************************/

/*
 *
 */
function TabStatistics()
{
   var f = 'TabStatistics()';
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
      var f = 'TabStatistics.setUpdateRequired()';
      UTILS.checkArgs(f, arguments, [Boolean]);

      updateRequired = bool;
   };

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.update = function (restrictions)
   {
      var f = 'TabStatistics.update()';
      UTILS.checkArgs(f, arguments, [Object]);
   };

   // Private variables. ////////////////////////////////////////////////////////////////////////

   // HTML input elements. --------------------------------------------------------------------//

   // Other HTML elements. -------------------------------------------------------------------//

   var headingDiv = DIV('Statistics');
   var contentDiv = DIV
   (
      'Statistics Content'
   );

   // Other private variables. ----------------------------------------------------------------//


   // Initialisation code. //////////////////////////////////////////////////////////////////////
}

/*******************************************END*OF*FILE********************************************/
