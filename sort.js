'use strict';

class Table {
  constructor(options) {
    this._el = options.el;

    this._el.addEventListener('click', this._onTableClick.bind(this));
  }

  _onTableClick(event) {
    let clickedTh = event.target.closest('th');
    if (!clickedTh) return;

    this._sort(clickedTh);
  }

  _sort(th) {
    this._rows = Array.from(this._el.tBodies[0].rows);
    this._sortType = th.getAttribute('data-type');
    this._sortFieldIndex = th.cellIndex;

    let rowsSorted = this._sortRows();

    this._renderTbodyWith(rowsSorted);
  }

  _sortRows() {
    if (this._sortType == 'number') {
      return this._rows.sort(this._sortByNumber.bind(this));
    }

    if (this._sortType == 'string') {
      return this._rows.sort(this._sortByString.bind(this));
    }
  }

  _renderTbodyWith(rows) {
    let newTbody = document.createElement('tbody');

    rows.forEach((row) => newTbody.appendChild(row));
    this._el.tBodies[0].parentNode.replaceChild(newTbody, this._el.tBodies[0]);
  }

  _sortByNumber(row1, row2) {
    let cell1 = row1.cells[this._sortFieldIndex];
    let cell2 = row2.cells[this._sortFieldIndex];

    let cell1Number = Number.parseFloat(cell1.textContent)
    let cell2Number = Number.parseFloat(cell2.textContent)

    return cell1Number - cell2Number;
  }

  _sortByString(row1, row2) {
    let cell1 = row1.cells[this._sortFieldIndex];
    let cell2 = row2.cells[this._sortFieldIndex];

    if (cell1.textContent < cell2.textContent) return -1;
    return 1;
  }

}

new Table( {el: document.querySelector('#grid')} );
