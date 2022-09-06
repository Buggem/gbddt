// GameBoy Display Development Toolchain
// Copyright (C) Buggem (github.com/buggem) 2022
// This software is under the MIT License.
// I didn't bother with putting boring code in the program, so just read it for yourself
window.gbDDT = {
	'isHex': function(num) {
		return Boolean(('0x' + num).match(/^0x[0-9a-f]+$/i))
	},
	'line': class {
		constructor(hexastr) {
			this.pieces = hexastr.split(' ');
		}
	},
	'tile': class {
		constructor(hexastr) {
			let lines = hexastr.split('|');
			let newlines = [];
			for(let hexas of lines) {
				newlines.push(hexas.split(' '));
			}
			this.lines = newlines;
		}
	},
	'evaluateLine': function(hexaarr) {
		let line = hexaarr.filter(str => ((str.length > 0) && (str.length < 3) && this.isHex(str)));
		let readableLine = [];
		let readyLine = [];
		for(let i = 0; i < line.length; i++) {
			readableLine[i] = ((parseInt(line[i], 16)).toString(2)).padStart(8, '0');
		}
		for(let i = 0; i < 8; i++) {
			readyLine[i] = parseInt(([readableLine[1].charAt(i), readableLine[0].charAt(i)].join('')), 2);
		}
		return readyLine;
		//return readableLine;
	},
	'translateArray': function(arr) {
		let tileStr = '';
		let arrStage = [];
		for(let y = 0; y < arr.length; y++) {
			let xArr = arr[y];
			xArr = xArr.map(function(num) { return num.toString(16); });
			arrStage[y] = xArr.join(' ');
		}
		tileStr = arrStage.join('|');
		return tileStr;
	},
	'translateRGBDS': function(syntax, commas) {
		let arr = syntax.split(((commas) ? (', ') : (' ')));
		let arrStage = [];
		let tileStr = '';
		for(let i = 0; i < (arr.length / 2); i++) {
			let index = i * 2;
			arrStage.push(([arr[index].trim().replace('$', ' '), arr[index+1].trim().replace('$', ' ')].join(' ')).slice(1));
		}
		tileStr = arrStage.join('|');
		return tileStr;
	}
};
window.gbDDT.p5 = {
	'drawTile': function(tile, pxsize, startx, starty) {
		for(let y = 0; y < (tile.lines).length; y++) {
			let colorIDs = window.gbDDT.evaluateLine(tile.lines[y]);
			for(let x = 0; x < 8; x++) {
				noStroke();
				fill(( 255 - ( ( ( 256 / 4 ) * colorIDs[x] ) - 1 ) )); // a formula for the ages.
				rect((x * pxsize) + startx, (y * pxsize) + starty, pxsize, pxsize);
			}
		}
	}

};
