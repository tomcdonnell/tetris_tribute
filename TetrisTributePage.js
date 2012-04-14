/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "TetrisTributePage.js"
*
* Project: Tetris.
*
* Purpose: Definition of the TetrisTributePage object.
*
* Author: Tom McDonnell 2009-02-28.
*
\**************************************************************************************************/

/*
 *
 */
function TetrisTributePage()
{
   var f = 'TetrisTributePage()';
   UTILS.checkArgs(f, arguments, []);

   // Priviliged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getMainDiv = function () {return _domElements.divs.main;};

   // Setters. --------------------------------------------------------------------------------//

   // Simple boolean functions. ---------------------------------------------------------------//

   // Other public functions. -----------------------------------------------------------------//

   /*
    *
    */
   this.appendChildNodes = function (body)
   {
      var f = 'TetrisTributePage.appendChildNodes()';
      UTILS.checkArgs(f, arguments, [HTMLBodyElement]);

      $(body).append(_domElements.h1s.mainHeading);
      $(body).append(_tabs.getContainerDiv()     );
      $(body).append(_domElements.divs.main      );
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   // Event listeners. ------------------------------------------------------------------------//

   /*
    *
    */
   function _onChangeSelectedTab(newHeadingDiv, oldHeadingDiv)
   {
      try
      {
         var f = 'TetrisTributePage._onChangeSelectedTab()';
         UTILS.checkArgs(f, arguments, [HTMLDivElement, HTMLDivElement])

         switch (newHeadingDiv)
         {
          case _tabPages.about.getHeadingDiv():
            break;
          case _tabPages.instructions.getHeadingDiv():
            break;
          case _tabPages.gameModes.getHeadingDiv():
            break;
          case _tabPages.highScores.getHeadingDiv():
            _tabPages.highScores.update(_tetrisGameGui.getSelectedGameMode());
            break;
          case _tabPages.statistics.getHeadingDiv():
            break;
          default:
            throw new Exception(f, 'Unknown tab heading div.', '');
         }
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   // Other private functions. ----------------------------------------------------------------//

   /*
    *
    */
   function _init()
   {
      var f = 'TetrisTributePage._init()';
      UTILS.checkArgs(f, arguments, []);

      _tabs.setOnChangeFunction(_onChangeSelectedTab);
   }

   // Private variables. ////////////////////////////////////////////////////////////////////////

   var _tabPages =
   {
      about       : new TabAbout()       ,
      instructions: new TabInstructions(),
      gameModes   : new TabGameModes()   ,
      highScores  : new TabHighScores()  ,
      statistics  : new TabStatistics()
   };

   var _tabs = new Tabs
   (
      [
         [_tabPages.about.getHeadingDiv()       , _tabPages.about.getContentDiv()       ],
         [_tabPages.instructions.getHeadingDiv(), _tabPages.instructions.getContentDiv()],
         [_tabPages.gameModes.getHeadingDiv()   , _tabPages.gameModes.getContentDiv()   ],
         [_tabPages.highScores.getHeadingDiv()  , _tabPages.highScores.getContentDiv()  ],
         [_tabPages.statistics.getHeadingDiv()  , _tabPages.statistics.getContentDiv()  ]
      ]
   );

   var _tetrisGameGui = new TetrisGameGui();

   var _domElements =
   {
      h1s:
      {
         mainHeading: H1('Tom\'s Tetris Tribute')
      },
      divs:
      {
         main: DIV
         (
            {style: 'float: right; width: 25%;'},

            _tetrisGameGui.getSettingsTable(),
            _tetrisGameGui.getGameGridTable(),
            _tetrisGameGui.getScoreTable()
         )
      }
   };

   // Initialisation code. //////////////////////////////////////////////////////////////////////

   _init();
}

/*******************************************END*OF*FILE********************************************/
