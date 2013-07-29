/**************************************************************************************************\
*
* vim: ts=3 sw=3 et co=100 wrap go-=b
*
* Filename: "TabHighScores.js"
*
* Project: Tetris Tribute.
*
* Purpose: Definition of the TabHighScores object.
*
* Author: Tom McDonnell 2009-09-24.
*
\**************************************************************************************************/

/*
 *
 */
function TabHighScores()
{
   var f = 'TabHighScores()';
   UTILS.checkArgs(f, arguments, []);

   // Priviliged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getHeadingDiv = function () {return _headingDiv;};
   this.getContentDiv = function () {return _contentDiv;};

   // Setters. --------------------------------------------------------------------------------//

   /*
    *
    */
   this.setUpdateRequired = function (bool)
   {
      var f = 'TabHighScores.setUpdateRequired()';
      UTILS.checkArgs(f, arguments, ['boolean']);

      updateRequired = bool;
   };

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.update = function (gameMode)
   {
      var f = 'TabHighScores.update()';
      UTILS.checkArgs(f, arguments, ['string']);

      // Note Regarding $.ajaxSetup()
      // ----------------------------
      // Function $.ajaxSetup() is not used because the default
      // ajaxSetup is already used by the TetrisGameGui object.
      $.ajax
      (
         {
            dataType: 'json'                                 ,
            success : _processAjaxMessage                    ,
            type    : 'POST'                                 ,
            url     : 'tabs/high_scores/ajax_high_scores.php',
            data    : JSON.stringify(['request_high_scores', {gameMode: gameMode}])
         }
      );
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   // Event handlers. -------------------------------------------------------------------------//

   /*
    *
    */
   function _processAjaxMessage(msg, textStatus, jqXhr)
   {
      try
      {
         var f = 'TabHighScores._processAjaxMessage()';
         UTILS.checkArgs(f, arguments, ['array', 'string', 'object']);
         UTILS.assert(f, 0, msg.length == 2);

         var header  = msg[0];
         var payload = msg[1];

         switch (header)
         {
          case 'supply_high_scores':
            UTILS.validator.checkObject
            (
               payload,
               {
                  heading     : 'string'        ,
                  subheading  : 'string'        ,
                  colHeadings : 'array'         ,
                  colClasses  : 'array'         ,
                  nRowsTotal  : 'nonNegativeInt',
                  offset      : 'nonNegativeInt',
                  firstRowRank: 'positiveInt'   ,
                  rows        : 'array'         ,
                  footer      : 'string'        ,
                  sortOverride: 'nullOrString'
               }
            );
            break;
          default:
            throw new Exception(f, "Unknown header '" + header + "'.", '');
         }

         var resultTable = new ResultTable(payload);

         _contentDiv.innerHTML = '';
         _contentDiv.appendChild(resultTable.getTable());
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   // Private variables. ////////////////////////////////////////////////////////////////////////

   // HTML input elements. --------------------------------------------------------------------//

   // Other HTML elements. --------------------------------------------------------------------//

   var _headingDiv = DIV('High Scores');
   var _contentDiv = DIV();

   // Other private variables. ----------------------------------------------------------------//
}

/*******************************************END*OF*FILE********************************************/
