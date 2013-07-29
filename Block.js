/**************************************************************************************************\
*
* vim: ts=3 sw=3 et wrap co=100 go-=b
*
* Filename: "Block.js"
*
* Project: Tetris.
*
* Purpose: Definition of the Block object.
*
* Author: Tom McDonnell 2007.
*
\**************************************************************************************************/

/**
 * Definition of the Block object.
 *
 * @param gridArg {Array}
 *
 *    A two dimensional array defining a block.
 *
 *    The example below defines a tetris 'L' block.
 *    The zeros denote empty squares, while the ones denote block squares.
 *
 *    blockExample =
 *    [
 *       [0, 0, 1],
 *       [1, 1, 1]
 *    ];
 *
 * @param color {String}
 *
 *    A string in the format used by CSS to define colors.
 */
function Block(gridArg, color)
{
   var f = 'Block()';
   UTILS.checkArgs(f, arguments, ['array', 'string']);
   UTILS.assert(f, 0, gridArg.length > 0);
   UTILS.assert(f, 1, gridArg[0].constructor == Array);
   UTILS.assert(f, 2, gridArg[0].length > 0);

   // Priviliged functions. /////////////////////////////////////////////////////////////////////

   // Getters. --------------------------------------------------------------------------------//

   this.getColor               = function () {return color               ;};
   this.getNRows               = function () {return _nRows              ;};
   this.getNCols               = function () {return _nCols              ;};
   this.getNUniqueOrientations = function () {return _nUniqueOrientations;};
   this.getGrid                = function ()
   {
      var grid = _grids[_orientation];
      return (grid.constructor == Array)? grid: _grids[grid];
   };

   // Setters. --------------------------------------------------------------------------------//

   /*
    *
    */
   this.setRandomOrientation = function ()
   {
      var f = 'Block.setRandomOrientation()';
      UTILS.checkArgs(f, arguments, []);

      // Set the _orientation randomly.
      _orientation = Math.floor(Math.random() * _nUniqueOrientations);

      // Set _nRows and _nCols to match the new _orientation.
      var grid = _grids[_orientation];
      grid = (grid.constructor == Array)? grid: _grids[grid];
      _nRows = grid.length;
      _nCols = grid[0].length;
   };

   // Simple boolean functions. ---------------------------------------------------------------//

   // Other public functions. ---00------------------------------------------------------------//

   /*
    * Rotate the block 90 degrees, either clockwise or anti-clockwise.
    *
    * @param bool {Boolean}
    *    True for clockwise, false for anti-clockwise.
    */
   this.rotate = function (bool)
   {
      var f = 'Block.rotate()';
      UTILS.checkArgs(f, arguments, ['boolean']);

      _orientation += (bool)? 1: -1;
      if (_orientation >= _nUniqueOrientations) _orientation = 0;
      if (_orientation <  0                   ) _orientation = _nUniqueOrientations - 1;

      // Swap _nRows with _nCols;
      var tmp = _nRows;
      _nRows  = _nCols;
      _nCols  = tmp;
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   /*
    * Return a new grid, that is the supplied grid rotated 90 degrees clockwise.
    */
   function _createRotatedGrid(grid)
   {
      var f = 'Block._createRotatedGrid()';
      UTILS.checkArgs(f, arguments, ['array']);
      UTILS.assert(f, 0, grid.length > 0);
      UTILS.assert(f, 1, grid[0].length > 0);

      var nGridRows = grid.length;
      var nGridCols = grid[0].length;

      // Create 'rotatedGrid' as a two dimensional array with the correct number of rows.
      var rotatedGrid = [];
      for (var c = 0; c < nGridCols; ++c)
      {
         rotatedGrid[c] = [];
      }

      // Set 'rotatedGrid' as 'grid' with rows exchanged with reversed columns.
      for (var r = 0; r < nGridRows; ++r)
      {
         for (var c = 0; c < nGridCols; ++c)
         {
            rotatedGrid[c][nGridRows - 1 - r] = grid[r][c];
         }
      }

      return rotatedGrid;
   }

   /*
    * Create _grids for all the unique orientations of the block, and add them to the _grids array.
    *
    * Thee are four possible unique orientations, corresponding to zero, one,
    * two, and three clockwise 90 degree rotations of the original grid.
    *
    * Some examples are given below.
    *
    * Example 1: Block with all orientations equivalent.
    *    _grids =
    *    [
    *       [
    *          [1, 1],
    *          [1, 1]
    *       ]
    *    ];
    *
    * Example 2: Block with two orientations equivalent.
    *    _grids =
    *    [
    *       [
    *          [1, 1, 0],
    *          [0, 1, 1]
    *       ],
    *
    *       [
    *          [0, 1],
    *          [1, 1],
    *          [1, 0]
    *       ]
    *    ];
    */
   function _fillGridsArray()
   {
      var f = 'Block._fillGridsArray()';
      UTILS.checkArgs(f, arguments, []);

      var grid = _grids[0];
      var rotatedGrid = _createRotatedGrid(grid);

      if (!UTILS.array.compare(rotatedGrid, grid))
      {
         _grids.push(rotatedGrid);
         rotatedGrid = _createRotatedGrid(rotatedGrid);

         if (!UTILS.array.compare(rotatedGrid, grid))
         {
            _grids.push(rotatedGrid);
            _grids.push(_createRotatedGrid(rotatedGrid));
         }
      }

      _nUniqueOrientations = _grids.length;
   }

   /*
    * Check that all rows of the grid have the same length.
    * Also create separate _grids for each of the unique orientations.
    *
    * @see var _orientation.
    */
   function _init()
   {
      var f = 'Block._init()';
      UTILS.checkArgs(f, arguments, []);

      // Check the grid array.
      var grid = _grids[0];
      for (var r = 0; r < _nRows; ++r)
      {
         var row = grid[r];

         UTILS.assert(f, 0, row.constructor == Array );
         UTILS.assert(f, 1, row.length      == _nCols);

         for (var c = 0; c < _nCols; ++c)
         {
            var square = grid[r][c];

            if (square != 0 && square != 1)
            {
               throw new Exception
               (
                  f, 'Illegal element in grid array.',
                  'Expected 0 or 1.  Received "' + square + '".'
               );
            }
         }
      }

      _fillGridsArray();
   }

   // Private variables. ////////////////////////////////////////////////////////////////////////

   /*
    * A 2d array for each unique _orientation of the block.
    *
    * @see comment for _fillGridsArray().
    */
   var _grids = [gridArg];

   /*
    * Length of the _grids array.
    * Stored as a variable for efficiency reasons.
    *
    * @see comment for _fillGridsArray().
    */
   var _nUniqueOrientations = null;

   /*
    * The dimensions of the block in its current _orientation.
    */
   var _nRows = gridArg.length;
   var _nCols = gridArg[0].length;

   /*
    * @var _orientation {Number}
    *
    * Integer in range [0, 3].  Defines the current _orientation of the block.
    *
    * Definition:
    *   The number of 90 degree clockwise rotations the original
    *   block must be subjected to in order to rech its current state.
    */
   var _orientation = 0;

   // Initialisation code. //////////////////////////////////////////////////////////////////////

   _init();
}

/*******************************************END*OF*FILE********************************************/
