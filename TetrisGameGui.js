/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "TetrisGameGui.js"
*
* Project: Tetris.
*
* Purpose: Definition of the TetrisGameGui object.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

function TetrisGameGui()
{
   var f = 'TetrisGameGui()';
   UTILS.checkArgs(f, arguments, []);

   // Privileged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getGameGridTable    = function () {return _domElements.tables.gameGrid;};
   this.getScoreTable       = function () {return _domElements.tables.score   ;};
   this.getSettingsTable    = function () {return _domElements.tables.settings;};
   this.getSelectedGameMode = function ()
   {
      var f = 'TetrisGameGui.getSelectedGameMode()';
      UTILS.checkArgs(f, arguments, []);

      var selector = _inputs.selectors.gameMode;
      return selector.options[selector.selectedIndex].value;
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   // Event listeners. ------------------------------------------------------------------------//

   function _onKeyDown(e)
   {
      try
      {
         var f = 'TetrisGameGui._onKeyDrown()';

         if (e.keyCode != 0)
         {
            switch (e.keyCode)
            {
             case 37: // Left arrow (e.keyCode).
               _tetrisGame.moveCurrentBlockIfPossible(0, -1);
               return;

             case 39: // Right arrow (e.keyCode).
               _tetrisGame.moveCurrentBlockIfPossible(0,  1);
               return;

             case 40: // Down arrow (e.keyCode).
               _tetrisGame.moveCurrentBlockIfPossible(1,  0);
               return;

             case 33: // Numeric keypad '9' (e.keyCode).
             case 34: // Numeric keypad '3' (e.keyCode).
               // Rotate anticlockwise.
               _tetrisGame.rotateCurrentBlockIfPossible(false);
               return;

             case 35: // Numeric keypad '1' (e.keyCode).
             case 36: // Numeric keypad '7' (e.keyCode).
               // Rotate clockwise.
               _tetrisGame.rotateCurrentBlockIfPossible(true);
               return;

             default:
               // Do nothing.
            }
         }

         if (e.which != 0)
         {
            switch (e.which)
            {
             case 32: // Spacebar (e.charCode & e.which).
               // Rotate clockwise.
               _tetrisGame.rotateCurrentBlockIfPossible(true);
               return;

             case 104: // 'h' - left key in VIM (e.which).
               _tetrisGame.moveCurrentBlockIfPossible(0, -1);
               return;

             case 108: // 'l' - right key in VIM (e.which).
               _tetrisGame.moveCurrentBlockIfPossible(0,  1);
               return;

             case 106: // 'j' - down key in VIM (e.which).
               _tetrisGame.moveCurrentBlockIfPossible(1,  0);
               return;

             case 107: // 'k' - up key in VIM (e.which).
               // Rotate clockwise.
               _tetrisGame.rotateCurrentBlockIfPossible(true);
               return;

             case 35: // Numeric keypad '1' (e.keyCode).
             case 36: // Numeric keypad '7' (e.keyCode).
               // Rotate anticlockwise.
               _tetrisGame.rotateCurrentBlockIfPossible(false);
               return;

             default:
               // Do nothing.
            }
         }
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _onClickStartOrPauseGame(e)
   {
      try
      {
         var f = 'TetrisGameGui._onClickStartOrPauseGame()';

         var startOrPauseGame = _inputs.buttons.startOrPauseGame;

         $(startOrPauseGame).blur();

         switch (startOrPauseGame.value)
         {
          case 'Start Game':
            _tetrisGame.start();
            startOrPauseGame.value                  = 'Pause Game';
            _inputs.selectors.gameMode.disabled     = true;
            _inputs.textboxes.startLevel.disabled   = true;
            _inputs.selectors.jumbleHeight.disabled = true;
            break;

          case 'Pause Game':
            _tetrisGame.pause();
            startOrPauseGame.value = 'Continue Game';
            break;

          case 'Continue Game':
            _tetrisGame.unpause();
            startOrPauseGame.value = 'Pause Game';
            break;

          default:
            throw new Exception(f, 'Unexpected startOrPauseGame text.', '');
         }
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _onChangeGameModeSelector(e)
   {
      try
      {
         var f = 'TetrisGameGui._onChangeGameModeSelector()';
         UTILS.checkArgs(f, arguments, ['nullOrObject']);

         var selectedGameMode = self.getSelectedGameMode();

         switch (selectedGameMode)
         {
          case 'arcade':
            var newSettings  =
            {
               startLevel     : 0               ,
               nPointsPerLevel: Number.MAX_VALUE,
               nBlocksPerLevel: 10              ,
               jumbleHeight   : 0
            };
            var displayItems = ['currentScore','currentLevel','prevIncrement','blocksToNextLevel'];
            var gameOptions  = [];
            break;
          case 'advanced':
            var newSettings  =
            {
               startLevel     : 15              ,
               nPointsPerLevel: 100             ,
               nBlocksPerLevel: Number.MAX_VALUE,
               jumbleHeight   : 0
            };
            var displayItems = ['currentScore','currentLevel','prevIncrement','pointsToNextLevel'];
            var gameOptions  = ['startLevel'];
            break;
          case 'jumble':
            var newSettings  =
            {
               startLevel     : 0               ,
               nPointsPerLevel: Number.MAX_VALUE,
               nBlocksPerLevel: Number.MAX_VALUE,
               jumbleHeight   :15
            };
            var displayItems = ['nBlocksFallen'];
            var gameOptions  = ['jumbleHeight' ];
            break;
          case 'tetrisStreak':
            var newSettings  =
            {
               startLevel     : 0               ,
               nPointsPerLevel: Number.MAX_VALUE,
               nBlocksPerLevel: Number.MAX_VALUE,
               jumbleHeight   : 0
            };
            var displayItems = ['currentScore'];
            var gameOptions  = [];
            break;
          default:
            throw new Exception(f, "Unknown game mode '" + newGameMode + "'.", '');
         }

         newSettings.gameMode = selectedGameMode;
         _tetrisGame.setSettingsStateAndGrid(newSettings);
         _setSelectedGameOptions(newSettings);
         _setScoreItemsToDisplay(displayItems);
         _setGameOptionsToDisplay(gameOptions);

         var tds                         = _domElements.tds;
         tds.currentLevel.innerHTML      = newSettings.startLevel;
         tds.pointsToNextLevel.innerHTML = newSettings.nPointsPerLevel;
         tds.blocksToNextLevel.innerHTML = newSettings.nBlocksPerLevel;
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _onBlurStartLevelTextbox(e)
   {
      try
      {
         var f = 'TetrisGameGui._onBlurStartLevelTextbox()';

         if (!UTILS.validator.validatePositiveInteger(e.target.value))
         {
            e.target.value = '0';
         }

         var settings        = _tetrisGame.getSettings();
         settings.startLevel = Number(e.target.value);
         _tetrisGame.setSettingsStateAndGrid(settings);
         _domElements.tds.currentLevel.innerHTML = settings.startLevel;
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _onChangeJumbleHeight(e)
   {
      try
      {
         var f = 'TetrisGameGui._onChangeJumbleHeight()';

         var settings          = _tetrisGame.getSettings();
         settings.jumbleHeight = Number(e.target.value);
         _tetrisGame.setSettingsStateAndGrid(settings);
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _onClickSubmitPlayerName(e)
   {
      try
      {
         var f = 'TetrisGameGui._onClickSubmitPlayerName()';

         _inputs.selectors.gameMode.disabled       = false;
         _inputs.textboxes.startLevel.disabled     = false;
         _inputs.selectors.jumbleHeight.disabled   = false;
         _inputs.buttons.startOrPauseGame.disabled = false;

         var settings = _tetrisGame.getSettings();
         var state    = _tetrisGame.getState();
         var gameMode = settings.gameMode;
         var tds      = _domElements.tds;

         switch (gameMode)
         {
          case 'arcade':
            var score   = tds.currentScore.innerHTML;
            var details = null;
            break;
          case 'advanced':
            var score   = tds.currentScore.innerHTML;
            var details = null;
            break;
          case 'jumble':
            var score   = tds.nBlocksFallen.innerHTML;
            var details = JSON.stringify
            (
               {
                  jumbleHeight: settings.jumbleHeight,
                  completed   : state.jumbleGameCompleted
               }
            );
            break;
          case 'tetrisStreak':
            var score   = tds.currentScore.innerHTML;
            var details = null;
            break;
          default:
            throw new Exception(f, "Unknown game mode '" + gameMode + "'.", '');
         }

         $.ajax
         (
            {
               data: JSON.stringify
               (
                  [
                     'submit_score',
                     {
                        playerName: _inputs.textboxes.playerName.value,
                        gameMode  : gameMode                          ,
                        score     : Number(score)                     ,
                        details   : details
                     }
                  ]
               )
            }
         );
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   // Other functions. //////////////////////////////////////////////////////////////////////////

   function _init()
   {
      var f = 'TetrisGameGui._init()';
      UTILS.checkArgs(f, arguments, []);

      var tables = _domElements.tables;
      var tds    = _domElements.tds;
      var tbody  = TBODY();

      for (var r = 0; r < _nGameGridRows; ++r)
      {
         var tr = TR();

         for (var c = 0; c < _nGameGridCols; ++c)
         {
            tr.appendChild(TD());
         }

         tbody.appendChild(tr);
      }

      tables.gameGrid.appendChild(tbody);
      tables.gameGridOverlay = $(tables.gameGrid).clone();

      tables.score.appendChild
      (
         TBODY
         (
            TR(TH('Current Score'          ), tds.currentScore       ),
            TR(TH('Current Level'          ), tds.currentLevel       ),
            TR(TH('Previous Increment'     ), tds.prevIncrement      ),
            TR(TH('Points to Next Level'   ), tds.pointsToNextLevel  ),
            TR(TH('Blocks to Next Level'   ), tds.blocksToNextLevel  ),
            TR(TH('Current Tetris Streak'  ), tds.currentTetrisStreak),
            TR(TH('Best Tetris Streak'     ), tds.bestTetrisStreak   ),
            TR(TH('Number of blocks fallen'), tds.nBlocksFallen      )
         )
      );

      var trs = _domElements.trs;

      tables.settings.appendChild
      (
         TBODY
         (
            TR(TH('Game Mode'), TD(_inputs.selectors.gameMode)),
            trs.startLevel  ,
            trs.jumbleHeight,
            TR(TH({colspan: 2}, _inputs.buttons.startOrPauseGame ))
         )
      );

      $(_inputs.buttons.startOrPauseGame).click(_onClickStartOrPauseGame);
      $(_inputs.selectors.gameMode      ).change(_onChangeGameModeSelector);
      $(_inputs.selectors.jumbleHeight  ).change(_onChangeJumbleHeight    );
      $(_inputs.textboxes.startLevel    ).blur(_onBlurStartLevelTextbox);

      _onChangeGameModeSelector(null);
   }

   function _setScoreItemsToDisplay(itemsToDisplay)
   {
      var f = 'TetrisGameGui._setScoreItemsToDisplay()';
      UTILS.checkArgs(f, arguments, ['array']);

      var tds = _domElements.tds;

      // Hide all items.
      for (var key in tds)
      {
         // NOTE: Hide rows, not cells.
         $(tds[key]).parent().css('display', 'none');
      }

      // Show chosen items.
      for (var i = 0, len = itemsToDisplay.length; i < len; ++i)
      {
         var itemName = itemsToDisplay[i];

         if (typeof tds[itemName] == 'undefined')
         {
            throw new Exception(f, "Unknown item name '" + itemName + "'.", '');
         }

         // NOTE: Show rows, not cells.
         $(tds[itemName]).parent().css('display', 'table-row');
      }
   }

   function _setGameOptionsToDisplay(itemsToDisplay)
   {
      var f = 'TetrisGameGui._setGameOptionsToDisplay()';
      UTILS.checkArgs(f, arguments, ['array']);

      var trs = _domElements.trs;

      // Hide all items.
      for (var key in trs)
      {
         $(trs[key]).css('display', 'none');
      }

      // Show chosen items.
      for (var i = 0, len = itemsToDisplay.length; i < len; ++i)
      {
         var itemName = itemsToDisplay[i];

         if (typeof trs[itemName] == 'undefined')
         {
            throw new Exception(f, "Unknown game option name '" + itemName + "'.", '');
         }

         $(trs[itemName]).css('display', 'table-row');
      }
   }

   function _setSelectedGameOptions(settings)
   {
      var f = 'TetrisGameGui._setSelectedGameOptions()';

      for (var key in settings)
      {
         var setting = settings[key];

         switch (key)
         {
          case 'startLevel':
            _inputs.textboxes.startLevel.value = setting;
            break;
          case 'jumbleHeight':
            if (setting != 0)
            {
               $(_inputs.selectors.jumbleHeight).val(String(setting));
            }
            break;
          default:
            // Do nothing.
         }
      }
   }

   function _processAjaxMessage(msg, textStatus, jqXhr)
   {
      try
      {
         var f = 'TetrisGameGui._processAjaxMessage()';
         UTILS.checkArgs(f, arguments, ['array', 'string', 'object']);
         UTILS.assert(f, 0, msg.length == 2);

         var header  = msg[0];
         var payload = msg[1];

         switch (header)
         {
          case 'submit_score_result':
            var tables = _domElements.tables;
            $(tables.gameGridOverlay).replaceWith(tables.gameGrid);
            break;
          default:
            throw new Exception(f, "Unknown header '" + header + "'.", '');
         }
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   function _drawGameOverSubmitNameRows()
   {
      var f = 'TetrisGameGui._drawGameOverSubmitNameRows()';
      UTILS.checkArgs(f, arguments, []);

      var gameGrid             = _domElements.tables.gameGrid;
      var trs                  = $(gameGrid).find('tr');
      var gameGridOverlay      = _domElements.tables.gameGridOverlay;
      var gameGridOverlayTbody = $(gameGridOverlay).find('tbody');
      var submitButton         = _inputs.buttons.submitPlayerName;
      var playerNameTextbox    = _inputs.textboxes.playerName;
      $(gameGridOverlayTbody).html('');

      for (var r = 0; r < trs.length; ++r)
      {
         switch (r)
         {
          case 7 : var content = TR(TH('Game Over'        )); break;
          case 8 : var content = TR(TH('Enter name for'   )); break;
          case 9 : var content = TR(TH('High Score Charts')); break;
          case 10: var content = TR(TH(playerNameTextbox  )); break;
          case 11: var content = TR(TH(submitButton       )); break;
          default: var content = '<tr><th>&nbsp;</th></tr>' ; break;
          // NOTE: HTML string used for &nbsp; above to avoid literal '&nbsp;' appearing on page.
         }

         $(gameGridOverlayTbody).append(content);
      }

      $(gameGrid).replaceWith(gameGridOverlay);

      // Event listeners must be attached each time the button is added to the DOM.
      $(submitButton).click(_onClickSubmitPlayerName);
   }

   // Private variables. ////////////////////////////////////////////////////////////////////////

   var _callbacks =
   {
      /*
       * Draw the game grid in its initial state as supplied in the parameter gamegrid.
       */
      drawGameGridAtGameStart: function (gameGrid)
      {
         var f = 'TetrisGameGui._callbacks.drawGameGridAtGameStart()';
         UTILS.checkArgs(f, arguments, ['array']);

         var gameGridTrs = _domElements.tables.gameGrid.firstChild.childNodes;
         var nRows       = gameGrid.length;
         var nCols       = gameGrid[0].length;

         for (var r = 0; r < nRows; ++r)
         {
            var gameGridTds = gameGridTrs[r].childNodes;

            for (var c = 0; c < nCols; ++c)
            {
               $(gameGridTds[c]).css
               (
                  'backgroundColor', ((gameGrid[r][c] == 1)? '#888888': '#000000')
               );
            }
         }
      },

      /*
       * Draw or erase a given block at a given position in the gameGrid table.
       *
       * @param block {Block}
       *    The block to be drawn or erased.
       *
       * @param pos {Position}
       *    The position in the gameGrid table of the top-left square of the block grid.
       *
       * @param bool {Boolean}
       *    True to draw using the current block's color,
       *    false to draw using the game grid background color (erase).
       */
      drawBlock: function (block, pos, bool)
      {
         var f = 'TetrisGameGui._callbacks.drawBlock()';
         UTILS.checkArgs(f, arguments, ['Block', 'Position', 'boolean']);

         var blockColor  = (bool)? block.getColor(): _gameGridBackgroundColor;
         var blockGrid   = block.getGrid();
         var gameGridTrs = _domElements.tables.gameGrid.firstChild.childNodes;
         var nRows       = block.getNRows();
         var nCols       = block.getNCols();

         for (var r = 0; r < nRows; ++r)
         {
            if (pos.r + r < 0) {continue;}

            var gameGridTds = gameGridTrs[pos.r + r].childNodes;

            for (var c = 0; c < nCols; ++c)
            {
               if (blockGrid[r][c] == 1)
               {
                  $(gameGridTds[pos.c + c]).css('backgroundColor', blockColor);
               }
            }
         }
      },

      /*
       * Add event listeners.
       */
      onStartGame: function ()
      {
         $(document).keydown(_onKeyDown);
      },

      /*
       * Remove event listeners.
       */
      onFinishGame: function ()
      {
         $(document).unbind('keydown', _onKeyDown);

         var button      = _inputs.buttons.startOrPauseGame;
         button.value    = 'Start Game';
         button.disabled = true;

         _drawGameOverSubmitNameRows();
      },

      /*
       * Update number of blocks fallen.
       */
      onAddBlock: function ()
      {
         var td = _domElements.tds.nBlocksFallen;
         td.innerHTML = Number(td.innerHTML) + 1;
      },

      /*
       * For each row number specified, remove the row, and move the above rows down one row.
       */
      onRemoveRows: function (rowNos)
      {
         var f = 'TetrisGameGui._callbacks.removedRows()';
         UTILS.checkArgs(f, arguments, ['array']);

         var gameGridTrs = _domElements.tables.gameGrid.firstChild.childNodes;

         for (var i = 0, len = rowNos.length; i < len; ++i)
         {
            var rowNo = rowNos[i];

            // Create new empty gameGrid table row.
            var newTrElem = TR();
            for (var c = 0; c < _nGameGridCols; ++c)
            {
               newTrElem.appendChild(TD());
            }

            // Remove completed gameGrid table row.
            var trElem = gameGridTrs[rowNo];
            var tbody = trElem.parentNode;
            tbody.removeChild(trElem);

            // Insert new gameGrid table row at the top.
            tbody.insertBefore(newTrElem, gameGridTrs[0]);
         }
      },

      /*
       * Output the score, score increment, and level.
       */
      onUpdateScore: function (state)
      {
         var f = 'TetrisGameGui._callbacks.onUpdateScore()';
         UTILS.checkArgs(f, arguments, ['object']);

         var settings          = _tetrisGame.getSettings();
         var nBlocksPerLevel   = settings.nBlocksPerLevel;
         var nPointsPerLevel   = settings.nPointsPerLevel;
         var pointsToNextLevel = nPointsPerLevel - state.playerScore   % nPointsPerLevel;
         var blocksToNextLevel = nBlocksPerLevel - state.nBlocksFallen % nBlocksPerLevel;

         var textNodeBN = document.createTextNode(blocksToNextLevel                 );
         var textNodeCL = document.createTextNode(state.gameLevel                   );
         var textNodeCS = document.createTextNode(state.playerScore                 );
         var textNodeNB = document.createTextNode(state.nBlocksFallen               );
         var textNodePI = document.createTextNode(state.previousPlayerScoreIncrement);
         var textNodePN = document.createTextNode(pointsToNextLevel                 );

         var tds          = _domElements.tds;
         var elementPairs =
         [
            // For each array element below, the first child of the first
            // array element will be replaced with the second array element.
            [tds.blocksToNextLevel  , textNodeBN],
            [tds.currentLevel       , textNodeCL],
            [tds.currentScore       , textNodeCS],
            [tds.nBlocksFallen      , textNodeNB],
            [tds.pointsToNextLevel  , textNodePN],
            [tds.prevIncrement      , textNodePI]
         ];

         for (var i = 0, len = elementPairs.length; i < len; ++i)
         {
            var elementPair = elementPairs[i];
            var contents = $(elementPair[0]).contents();
            $(contents[0]).replaceWith(elementPair[1]);
         }
      }
   };

   // Private constants. ////////////////////////////////////////////////////////////////////////

   // NOTE: Cannot declare as const because IE does not support const.
   var _nGameGridRows           = 20;
   var _nGameGridCols           = 10;
   var _gameGridBackgroundColor = '#000000';

   // Private variables. ///////////////////////////////////////////////////////////////////////

   var self        = this;
   var _tetrisGame = new TetrisGame(_nGameGridRows, _nGameGridCols, _callbacks);
   var _inputs     =
   {
      selectors:
      {
         gameMode: SELECT
         (
            OPTION({value: 'arcade'      }, 'Arcade'       ),
            OPTION({value: 'advanced'    }, 'Advanced'     ),
            OPTION({value: 'jumble'      }, 'Jumble'       ),
            OPTION({value: 'tetrisStreak'}, 'Tetris Streak')
         ),
         jumbleHeight: SELECT
         (
            OPTION({value:  '1'},  '1'),
            OPTION({value:  '2'},  '2'),
            OPTION({value:  '3'},  '3'),
            OPTION({value:  '4'},  '4'),
            OPTION({value:  '5'},  '5'),
            OPTION({value:  '6'},  '6'),
            OPTION({value:  '7'},  '7'),
            OPTION({value:  '8'},  '8'),
            OPTION({value:  '9'},  '9'),
            OPTION({value: '10'}, '10'),
            OPTION({value: '11'}, '11'),
            OPTION({value: '12'}, '12'),
            OPTION({value: '13'}, '13'),
            OPTION({value: '14'}, '14'),
            OPTION({value: '15'}, '15'),
            OPTION({value: '16'}, '16')
         )
      },
      textboxes:
      {
         startLevel: INPUT({type: 'text', size: 5}),
         playerName: INPUT({type: 'text'         })
      },
      buttons:
      {
         startOrPauseGame: INPUT({type: 'button', value: 'Start Game', 'class': 'startButton'}),
         submitPlayerName: INPUT({type: 'button', value: 'Submit'                            })
      }
   };

   var _domElements =
   {
      tables:
      {
         settings: TABLE({'class': 'tetrisGameGuiSettingsTable'}),
         score   : TABLE({'class': 'tetrisGameGuiScoresTable'  }),
         gameGrid: TABLE
         (
            {
               'class': 'tetrisGameGuiGridTable',
               style: 'background-color: ' + _gameGridBackgroundColor + ';'
            }
         ),
         gameGridOverlay: null
      },
      trs:
      {
         startLevel  : TR(TH('Start Level'  ), TD(_inputs.textboxes.startLevel  )),
         jumbleHeight: TR(TH('Jumble Height'), TD(_inputs.selectors.jumbleHeight))
      },
      tds:
      {
         currentScore       : TD('0'),
         currentLevel       : TD('0'),
         prevIncrement      : TD('0'),
         pointsToNextLevel  : TD('0'),
         blocksToNextLevel  : TD('0'),
         currentTetrisStreak: TD('0'),
         bestTetrisStreak   : TD('0'),
         nBlocksFallen      : TD('0')
      }
   };

   $.ajaxSetup
   (
      {
         dataType: 'json'             ,
         success : _processAjaxMessage,
         type    : 'POST'             ,
         url     : 'ajax.php'
      }
   );

   // Initialisation code. //////////////////////////////////////////////////////////////////////

   _init();
}

/*******************************************END*OF*FILE********************************************/
