/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "TetrisGame.js"
*
* Project: Tetris.
*
* Purpose: Definition of the TetrisGame object.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

/**
 * Definition of the TetrisGame object.
 *
 * @param nRows {Number}
 *   The number of rows in the Tetris game grid.
 *
 * @param nCols {Number}
 *   The number of columns in the Tetris game grid.
 *
 * @param callbacks {Object}
 *   Object containing callback functions for the various game events that
 *   require changes to the game GUI.  The required callback functions are:
 *
 *    /*
 *     * Draw or erase a given block at a given position in the table.
 *     *
 *     * @param block {Block}
 *     *    The block to be drawn or erased.
 *     *
 *     * @param pos {Position}
 *     *    The position in the table of the top-left square of the block grid.
 *     *
 *     * @param bool {Boolean}
 *     *    True to draw using the current block's color,
 *     *    false to draw using the game grid background color (erase).
 *     *
 *    callbacks.drawBlock = function (block, pos, bool)
 *    {
 *       var f = 'callbacks.drawBlock()';
 *       UTILS.checkArgs(f, arguments, [Block, Position, Position]);
 *    };
 *
 *    /*
 *     * Add event listeners for user input events.
 *     * The 'on event' functions should use the functions:
 *     * {
 *     *    this.rotateCurrentBlockIfPossible(),
 *     *    this.moveCurrentBlockIfPossible()
 *     * }
 *     *
 *    callbacks.onStartGame = function (block, position)
 *    {
 *       var f = 'callbacks.onStartGame()';
 *       UTILS.checkArgs(f, arguments, [Block, Position]);
 *    };
 *
 *    /*
 *     * This function may be useful for keeping track of
 *     * the number and type of blocks that have fallen.
 *     *
 *    callbacks.onAddBlock = function (block)
 *    {
 *       var f = 'callbacks.onStartGame()';
 *       UTILS.checkArgs(f, arguments, [Block]);
 *    };
 *
 *    /*
 *     * Remove the event listeners that were added in callbacks.onStartGame().
 *     *
 *    callbacks.onFinishGame = function (block, oldPos, newPos)
 *    {
 *       var f = 'callbacks.onFinishGame()';
 *       UTILS.checkArgs(f, arguments, [Block, Position, Position]);
 *    };
 *
 *    /*
 *     * For each row number specified, remove the row, and move the above rows down one row.
 *     *
 *    callbacks.onRemoveRows = function (rowNos)
 *    {
 *       var f = 'callbacks.addedBlock()';
 *       UTILS.checkArgs(f, arguments, [Array]);
 *    };
 *
 *    /*
 *     * Update display of the score.
 *     * 
 *    callbacks.onUpdateScore = function (state)
 *    {
 *       var f = 'callbacks.onUpdateScore()';
 *       UTILS.checkArgs(f, arguments, [Object]);
 *    };
 *
 *    /*
 *     * Draw the game grid in its initial state as supplied in the parameter gamegrid.
 *     *
 *    callbacks.drawGameGridAtGameStart = function (gameGrid)
 *    {
 *       var f = 'callbacks.drawGameGridAtGameStart()';
 *       UTILS.checkArgs(f, arguments, [Object]);
 *    }
 */
function TetrisGame(nGameGridRows, nGameGridCols, callbacks)
{
   var f = 'TetrisGame()';
   UTILS.checkArgs(f, arguments, [Number, Number, Object]);
   UTILS.validator.checkObject
   (
      callbacks,
      {
         drawBlock              : 'function',
         onStartGame            : 'function',
         onAddBlock             : 'function',
         onFinishGame           : 'function',
         onRemoveRows           : 'function',
         onUpdateScore          : 'function',
         drawGameGridAtGameStart: 'function'
      },
      {}
   );

   // Privileged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getGameGrid = function () {return _state.gameGrid;};
   this.getSettings = function () {return _settings      ;};
   this.getState    = function () {return _state         ;};

   // Setters. --------------------------------------------------------------------------------//

   /*
    *
    */
   this.setSettingsStateAndGrid = function (newSettings)
   {
      var f = 'TetrisGame.setSettingsStateAndGrid()';
      UTILS.checkArgs(f, arguments, [Object]);

      UTILS.validator.checkObject
      (
         newSettings,
         {
            gameMode       : 'nonEmptyString',
            jumbleHeight   : 'nonNegativeInt',
            nBlocksPerLevel: 'positiveInt'   ,
            nPointsPerLevel: 'positiveInt'   ,
            startLevel     : 'nonNegativeInt'
         }
      );

      if (!UTILS.array.hasElement(_possibleGameModes, newSettings.gameMode))
      {
         throw new Exception(f, 'Unknown game mode "' + newSettings.gameMode + '".', '');
      }

      _settings = newSettings;
      _initStateObjectDependingOnSettings();
      callbacks.drawGameGridAtGameStart(_state.gameGrid);
   };

   // Simple boolean functions. ---------------------------------------------------------------//

   // Other functions. ------------------------------------------------------------------------//

   /*
    *
    */
   this.start = function ()
   {
      var f = 'TetrisGame.start()';
      UTILS.checkArgs(f, arguments, []);

      _initStateObjectDependingOnSettings();
      callbacks.drawGameGridAtGameStart(_state.gameGrid);
      _addNewBlock();

      callbacks.onUpdateScore(_state);
      callbacks.onStartGame();
   };

   /*
    *
    */
   this.pause = function ()
   {
      var f = 'TetrisGame.pause()';
      UTILS.checkArgs(f, arguments, []);

      window.clearTimeout(_state.activeTimeout);
      _state.boolPaused = true;
   };

   /*
    *
    */
   this.unpause = function ()
   {
      var f = 'TetrisGame.unpause()';
      UTILS.checkArgs(f, arguments, []);

      // NOTE
      // ----
      // The hover period is reduced here to prevent cheating
      // by using the pause button to slow the game.
      _state.activeTimeout = setTimeout(_moveCurrentBlockDueToGravity, _state.hoverPeriod / 2);
      _state.boolPaused    = false;
   };

   /*
    *
    */
   this.finishGame = function ()
   {
      var f = 'TetrisGame.finishGame()';
      UTILS.checkArgs(f, arguments, []);

      window.clearTimeout(_state.activeTimeout);
      _state.boolFinished = true;

      console.info('Game Over.');

      callbacks.onFinishGame();
   };

   /*
    * Rotate the current block either clockwise or anti-clockwise if it is possible to do so.
    *
    * @param bool {Boolean}
    *    True for clockwise, false for anti-clockwise.
    */
   this.rotateCurrentBlockIfPossible = function (bool)
   {
      var f = 'TetrisGame.rotateCurrentBlockIfPossible()';
      UTILS.checkArgs(f, arguments, [Boolean]);

      if (_state.boolPaused)
      {
         return false;
      }

      var currentBlock    = _state.currentBlock;
      var currentBlockPos = _state.currentBlockPos;

      currentBlock.rotate(bool);
      var newPos = currentBlockPos.clone();

      // Move elongated rectangular blocks to avoid top/left side bias.
      //
      //                 1111          1000               0100          0000
      // Eg. Without     0000 rotated  1000   With        0100 rotated  1111   And
      //     correction: 0000 becomes: 1000.  correction: 0100 becomes: 0000.  vice-versa.
      //                 0000          1000               0100          0000
      //
      var nRows = currentBlock.getNRows();
      var nCols = currentBlock.getNCols();
      var ratio  = (nRows > nCols)? nRows / nCols: nCols / nRows;
      if (ratio > 2)
      {
         switch (nRows > nCols)
         {
          case true : newPos.c += 1; newPos.r -= 1; break;
          case false: newPos.c -= 1; newPos.r += 1; break;
         }
      }

      if (_currentBlockFits(newPos))
      {
         currentBlock.rotate(!bool);
         callbacks.drawBlock(currentBlock,        currentBlockPos, false);
         _state.currentBlockPos = newPos.clone();
         currentBlock.rotate(bool);
         callbacks.drawBlock(currentBlock, _state.currentBlockPos, true );
         return true;
      }
      else
      {
         currentBlock.rotate(!bool);
      }

      return false;
   };

   /*
    * Move the current block if it is possible to do so.
    *
    * @param dr {Number}
    *    The number of rows to move the block in the positive direction (down).
    *
    * @param dc {Number}
    *    The number of cols to move the block in the positive direction (right).
    */
   this.moveCurrentBlockIfPossible = function (dr, dc)
   {
      var f = 'TetrisGame.moveCurrentBlockIfPossible()';
      UTILS.checkArgs(f, arguments, [Number, Number]);

      if (_state.boolPaused)
      {
         return false;
      }

      var currentBlock    = _state.currentBlock;
      var currentBlockPos = _state.currentBlockPos;
      var newPos          = new Position(currentBlockPos.r + dr, currentBlockPos.c + dc);

      if (_currentBlockFits(newPos))
      {
         callbacks.drawBlock(currentBlock, currentBlockPos, false);
         currentBlockPos.r += dr;
         currentBlockPos.c += dc;
         callbacks.drawBlock(currentBlock, currentBlockPos, true );

         return true;
      }

      return false;
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   /*
    *
    */
   function _addNewBlock()
   {
      var f = 'TetrisGame._addNewBlock()';
      UTILS.checkArgs(f, arguments, []);

      if (_state.boolFinished)
      {
         return;
      }

      // Select a random block, with a random orientation.
      _state.currentBlock = _blockSet[Math.floor(Math.random() * _blockSet.length)];
      _state.currentBlock.setRandomOrientation();

      // Position the block at the top of the tetris grid and centred horizontally.
      var pos = new Position
      (
         -1 * _state.currentBlock.getNRows() + 1,
         Math.floor((nGameGridCols - _state.currentBlock.getNCols()) / 2)
      );

      // If the block fits in its new position...
      if (_currentBlockFits(pos))
      {
         _state.currentBlockPos = pos;
         callbacks.drawBlock(_state.currentBlock, _state.currentBlockPos, true);
         _state.activeTimeout = setTimeout(_moveCurrentBlockDueToGravity, _state.hoverPeriod);
      }
      else
      {
         // Game over.
         self.finishGame();
      }

      // Increment nBlocksFallen and increment level if necessary.
      if (++_state.nBlocksFallen % _settings.nBlocksPerLevel == 0)
      {
         _setGameLevelDuringGame(_state.nBlocksFallen / _settings.nBlocksPerLevel);
      }

      callbacks.onAddBlock(_state.currentBlock);
      callbacks.onUpdateScore(_state);
   }

   /*
    *
    */
   function _moveCurrentBlockDueToGravity(t)
   {
      try
      {
         var f = 'TetrisGame._moveCurrentBlockDueToGravity()';
         // Note Regarding Arguments to Timeout Functions
         // ---------------------------------------------
         // Not checking arguments to this functin because IE does not send arguments
         // to functions called in response to a timeout event, while Firefox does.

         if (!_state.boolPaused)
         {
            if (self.moveCurrentBlockIfPossible(1, 0))
            {
               _state.activeTimout = setTimeout(_moveCurrentBlockDueToGravity, _state.hoverPeriod);
            }
            else
            {
               if (_cementCurrentBlock())
               {
                  _addNewBlock();
               }
               else
               {
                  // Block cannot be cemented.
                  // Game over.
                  self.finishGame();
               }
            }
         }
      }
      catch (e)
      {
         UTILS.printExceptionToConsole(f, e);
      }
   }

   /*
    *
    */
   function _cementCurrentBlock()
   {
      var f = 'TetrisGame._cementCurrentBlock()';
      UTILS.checkArgs(f, arguments, []);

      var gameGrid         = _state.gameGrid;
      var currentBlockPos  = _state.currentBlockPos;
      var currentBlockGrid = _state.currentBlock.getGrid();
      var nRows            = _state.currentBlock.getNRows();
      var nCols            = _state.currentBlock.getNCols();

      for (var r = 0; r < nRows; ++r)
      {
         if (currentBlockPos.r + r < 0)
         {
            // Block is overlapping top of gameGrid.
            return false;
         }

         var gameGridRow = gameGrid[currentBlockPos.r + r];

         for (var c = 0; c < nCols; ++c)
         {
            if (currentBlockGrid[r][c] == 1)
            {
               gameGrid[currentBlockPos.r + r][currentBlockPos.c + c] = 1;
            }
         }
      }

      var startCheckingRow = (currentBlockPos.r < 0)? 0: currentBlockPos.r;
      var rows             = _findCompletedRows(startCheckingRow, currentBlockPos.r + nRows);
      var nRowsCleared     = rows.length;

      if (nRowsCleared > 0)
      {
         _clearCompletedRows(rows);
         _updateScore(nRowsCleared);
      }

      _state.currentBlock    = null;
      _state.currentBlockPos = null;

      return true;
   }

   /*
    *
    */
   function _findCompletedRows(startRow, finishRow)
   {
      var f = 'TetrisGame._findCompletedRows()';
      UTILS.checkArgs(f, arguments, [Number, Number]);
      UTILS.assert(f, 0,        0 <=  startRow &&  startRow <=     finishRow);
      UTILS.assert(f, 1, startRow <= finishRow && finishRow <= nGameGridRows);

      var rows     = [];
      var gameGrid = _state.gameGrid;

      // Check for completed rows.
      for (var r = startRow; r < finishRow; ++r)
      {
         var gameGridRow = gameGrid[r];

         for (var c = 0; c < nGameGridCols; ++c)
         {
            // If the square is empty...
            if (gameGridRow[c] == 0)
            {
               break;
            }
         }

         if (c == nGameGridCols)
         {
            rows.push(r);            
         }
      }

      return rows;
   }

   /*
    * Remove the given rows from the game grid.
    *
    * @param rowNos {Array}
    *    An array containing the number of the rows to be removed.
    */
   function _clearCompletedRows(rowNos)
   {
      var f = 'TetrisGame._clearCompletedRows()';
      UTILS.checkArgs(f, arguments, [Array]);
      UTILS.assert(f, 0, rowNos.length > 0);

      var bottomRowWasRemoved = false;
      var gameGrid            = _state.gameGrid;
      var bottomRowNo         = gameGrid.length - 1;

      for (var i = 0, len = rowNos.length; i < len; ++i)
      {
         var rowNo = rowNos[i];

         if (rowNo == bottomRowNo)
         {
            bottomRowWasRemoved = true;
         }

         // Create new empty grid row.
         var newGameGridRow = [];
         for (var c = 0; c < nGameGridCols; ++c)
         {
            newGameGridRow.push(0);
         }

         // Remove completed grid row.
         gameGrid.splice(rowNo, 1);

         // Insert new grid row at the top.
         gameGrid.unshift(newGameGridRow);
      }

      if (_settings.gameMode == 'jumble' && bottomRowWasRemoved)
      {
         // In game mode 'jumble', the object of the game is to remove all the jumbled blocks.
         // If the bottom row has been removed, then all jumbled blocks must have been removed.
         self.finishGame();
         _state.jumbleGameCompleted = true;
      }

      callbacks.onRemoveRows(rowNos);
   }

   /*
    *
    */
   function _updateScore(nRowsRemoved)
   {
      var f = 'TetrisGame._updateScore()';
      UTILS.checkArgs(f, arguments, [Number]);
      UTILS.assert(f, 0, nRowsRemoved > 0);

      if (_settings.gameMode == 'tetrisStreak')
      {
         if (nRowsRemoved == 4) {++_state.playerScore;}
         else                   {self.finishGame()   ;}
      }
      else
      {
         var nPointsPerLevel      = _settings.nPointsPerLevel;
         var playerScoreIncrement = nRowsRemoved * nRowsRemoved;
         var playerScoreNew       = _state.playerScore + playerScoreIncrement;

         // If the score has passed a multiple of nPointsPerLevel...
         if ((playerScoreNew % nPointsPerLevel) < playerScoreIncrement)
         {
            if (_state.gameLevel == _settings.startLevel)
            {
               playerScoreNew += nPointsPerLevel * (_settings.startLevel);
            }

            _setGameLevelDuringGame(Math.floor(playerScoreNew / nPointsPerLevel));
         }

         _state.nRowsRemovedRecent            = nRowsRemoved;
         _state.nRowsRemovedTotal            += nRowsRemoved;
         _state.playerScore                   = playerScoreNew;
         _state.previousPlayerScoreIncrement  = playerScoreIncrement;
      }

      callbacks.onUpdateScore(_state);
   }

   /*
    * Test whether the current block will fit in a given position in the tetris grid.
    *
    * @param pos {Position}
    *    Game grid position in which the top-left square of the current block grid will be placed.
    *
    * @return {Boolean}
    */
   function _currentBlockFits(pos)
   {
      var f = 'TetrisGame._currentBlockFits()';
      UTILS.checkArgs(f, arguments, [Position]);

      var nRows = _state.currentBlock.getNRows();
      var nCols = _state.currentBlock.getNCols();

      if
      (
         !(              pos.r <= nGameGridRows - nRows) ||
         !(0 <= pos.c && pos.c <= nGameGridCols - nCols)
      )
      {
         return false;
      }

      var currentBlockGrid = _state.currentBlock.getGrid();
      var gameGrid         = _state.gameGrid;

      for (var r = 0; r < nRows; ++r)
      {
         if (pos.r + r < 0) {continue;}

         var gameGridRow = gameGrid[pos.r + r];

         for (var c = 0; c < nCols; ++c)
         {
            if (currentBlockGrid[r][c] == 1 && gameGrid[pos.r + r][pos.c + c] == 1)
            {
               return false;
            }
         }
      }

      return true;
   }

   /*
    *
    */
   function _setGameLevelDuringGame(newGameLevel)
   {
      var f = 'TetrisGame._setGameLevelDuringGame()';
      UTILS.checkArgs(f, arguments, ['nonNegativeInt']);

      _state.gameLevel   = newGameLevel;
      _state.hoverPeriod = _getHoverPeriodMatchingGameLevel(_state.gameLevel);
   }

   /*
    *
    */
   function _getHoverPeriodMatchingGameLevel(gameLevel)
   {
      var f = 'TetrisGame._getHoverPeriodMatchingGameLevel()';
      UTILS.checkArgs(f, arguments, ['nonNegativeInt']);

      // Hover period decreases from 600 towards a limit of 50 as gameLevel goes to infinity.
      // The hover period for level  0 is 600.
      // The hover period for level 20 is 100.
      return 550 * Math.exp(-0.12 * gameLevel) + 50;
   }

   /*
    *
    */
   function _getInitialisedGameGridDependingOnSettings()
   {
      var f = 'TetrisGame._getInitialisedGameGridDependingOnSettings()';
      UTILS.checkArgs(f, arguments, []);

      var gameGrid = [];

      for (var r = 0; r < nGameGridRows; ++r)
      {
         var gameGridRow = new Array();

         for (var c = 0; c < nGameGridCols; ++c)
         {
            gameGridRow.push
            (
               (r < nGameGridRows - _settings.jumbleHeight)? 0:
               (c % 2 == ((r % 2 == 0)? 1: 0))? 1: 0
            );
         }

         gameGrid.push(gameGridRow);
      }

      return gameGrid;
   }

   /*
    *
    */
   function _initStateObjectDependingOnSettings()
   {
      var f = 'TetrisGame._initStateObjectDependingOnSettings()';
      UTILS.checkArgs(f, arguments, []);

      var gameLevel = _settings.startLevel;

      _state =
      {
         activeTimeout               : null                                        ,
         boolFinished                : false                                       ,
         boolPaused                  : false                                       ,
         currentBlock                : null                                        ,
         currentBlockPos             : null                                        ,
         gameGrid                    : _getInitialisedGameGridDependingOnSettings(),
         gameLevel                   : gameLevel                                   ,
         hoverPeriod                 : _getHoverPeriodMatchingGameLevel(gameLevel) ,
         jumbleGameCompleted         : false                                       ,
         nBlocksFallen               : 0                                           ,
         nRowsRemovedRecent          : 0                                           ,
         nRowsRemovedTotal           : 0                                           ,
         playerScore                 : 0                                           ,
         previousPlayerScoreIncrement: 0
      };
   }

   // Private constants. ////////////////////////////////////////////////////////////////////////

   var _blockSet =
   [
      new Block
      (
         [
            [1, 1],
            [1, 1]
         ],

         '#0000ff' // Blue.
      ),

      new Block
      (
         [
            [0, 1, 1],
            [1, 1, 0]
         ],

         '#00ff00' // Green.
      ),

      new Block
      (
         [
            [1, 1, 0],
            [0, 1, 1]
         ],

         '#00ffff' // Aqua.
      ),

      new Block
      (
         [
            [0, 1, 0],
            [1, 1, 1]
         ],

         '#ff0000' // Red.
      ),

      new Block
      (
         [
            [1, 0, 0],
            [1, 1, 1]
         ],

         '#ff00ff' // Magenta.
      ),

      new Block
      (
         [
            [1, 1, 1],
            [1, 0, 0]
         ],

         '#ffff00' // ?.
      ),

      new Block
      (
         [
            [1, 1, 1, 1]
         ],

         '#ffffff' // White.
      )
   ];

   // Private variables. ////////////////////////////////////////////////////////////////////////

   var _state    = null;
   var _settings =
   {
      gameMode       : 'arcade'        ,
      jumbleHeight   : 0               ,
      nBlocksPerLevel: 25              ,
      nPointsPerLevel: Number.MAX_VALUE,
      startLevel     : 0
   };

   var _possibleGameModes =
   [
      'advanced',
      'arcade'  ,
      'jumble'  ,
      'tetrisStreak'
   ];

   var self = this;
}

/*******************************************END*OF*FILE********************************************/
