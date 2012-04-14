/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "Position.js"
*
* Project: Tetris.
*
* Purpose: Definition of the Position object.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

/**
 * Definition of the Position object.
 */
function Position(row, col)
{
   var f = 'Position()';
   UTILS.checkArgs(f, arguments, [Number, Number]);

   // Public functions. /////////////////////////////////////////////////////////////////////////

   /*
    *
    */
   this.clone = function ()
   {
      return new Position(this.r, this.c);
   };

   // Public variables. /////////////////////////////////////////////////////////////////////////

   this.r = row;
   this.c = col;
}

/*******************************************END*OF*FILE********************************************/
