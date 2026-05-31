/* ============================================================
   Windows 98 desktop — window manager, taskbar, start menu,
   clock, and a self-contained Minesweeper.
   ============================================================ */
(function () {
    'use strict';

    var zTop = 100;
    var openWindows = {};                 // id -> { el, taskBtn }
    var cascade = 0;                      // offset for staggering windows
    var taskbarWindows = document.getElementById('taskbar-windows');

    /* ---------- Window management ---------- */
    function winEl(id) { return document.getElementById('win-' + id); }

    function focusWindow(id) {
        var rec = openWindows[id];
        if (!rec) return;
        rec.el.style.zIndex = ++zTop;
        Object.keys(openWindows).forEach(function (k) {
            var b = openWindows[k].taskBtn;
            if (b) b.classList.toggle('active', k === id);
        });
    }

    function placeWindow(el) {
        // Center with a small cascade offset (desktop only; mobile CSS overrides).
        if (window.matchMedia('(max-width: 640px)').matches) return;
        var w = el.querySelector('.window');
        var ww = w.offsetWidth || 460;
        var wh = w.offsetHeight || 320;
        var maxX = Math.max(8, window.innerWidth - ww - 8);
        var maxY = Math.max(8, window.innerHeight - 36 - wh - 8);
        var x = Math.min(maxX, Math.round((window.innerWidth - ww) / 2) + cascade);
        var y = Math.min(maxY, Math.round((window.innerHeight - 36 - wh) / 2) - 20 + cascade);
        el.style.left = Math.max(8, x) + 'px';
        el.style.top = Math.max(8, y) + 'px';
        cascade = (cascade + 24) % 120;
    }

    function openWindow(id) {
        var el = winEl(id);
        if (!el) return;
        if (openWindows[id]) {            // already open -> restore + focus
            el.hidden = false;
            focusWindow(id);
            return;
        }
        el.hidden = false;
        placeWindow(el);

        var btn = document.createElement('button');
        btn.className = 'task-btn';
        btn.textContent = el.getAttribute('data-title') || id;
        btn.addEventListener('click', function () {
            if (el.hidden) { el.hidden = false; focusWindow(id); }
            else if (openWindows[id].taskBtn.classList.contains('active')) { el.hidden = true; }
            else { focusWindow(id); }
        });
        taskbarWindows.appendChild(btn);

        openWindows[id] = { el: el, taskBtn: btn };
        focusWindow(id);

        if (id === 'minesweeper') Minesweeper.start();
    }

    function closeWindow(id) {
        var rec = openWindows[id];
        if (!rec) return;
        rec.el.hidden = true;
        if (rec.taskBtn) rec.taskBtn.remove();
        delete openWindows[id];
    }

    function minimizeWindow(id) {
        var rec = openWindows[id];
        if (!rec) return;
        rec.el.hidden = true;
        rec.taskBtn.classList.remove('active');
    }

    /* ---------- Wire up icons, start-menu items, title-bar buttons ---------- */
    document.querySelectorAll('[data-open]').forEach(function (el) {
        var id = el.getAttribute('data-open');
        // Double-click for desktop icons; single click everywhere else.
        if (el.classList.contains('desk-icon')) {
            el.addEventListener('dblclick', function () { openWindow(id); });
            // touch / single-click also opens (lighter, friendlier behavior)
            el.addEventListener('click', function () {
                document.querySelectorAll('.desk-icon.selected').forEach(function (s) { s.classList.remove('selected'); });
                el.classList.add('selected');
            });
        }
        el.addEventListener('click', function () {
            if (!el.classList.contains('desk-icon')) { openWindow(id); closeStart(); }
        });
    });

    // make single tap open on touch devices
    document.querySelectorAll('.desk-icon[data-open]').forEach(function (el) {
        var id = el.getAttribute('data-open');
        var lastTap = 0;
        el.addEventListener('touchend', function (e) {
            e.preventDefault();
            openWindow(id);
        }, { passive: false });
    });

    document.querySelectorAll('.win98-window').forEach(function (win) {
        var id = win.id.replace('win-', '');
        win.addEventListener('mousedown', function () { focusWindow(id); });
        win.querySelectorAll('[data-act]').forEach(function (b) {
            b.addEventListener('click', function (e) {
                e.stopPropagation();
                if (b.getAttribute('data-act') === 'close') closeWindow(id);
                else minimizeWindow(id);
            });
        });
    });

    /* ---------- Start menu ---------- */
    var startMenu = document.getElementById('start-menu');
    var startButton = document.getElementById('start-button');
    function closeStart() { startMenu.hidden = true; startButton.classList.remove('active'); }
    startButton.addEventListener('click', function (e) {
        e.stopPropagation();
        startMenu.hidden = !startMenu.hidden;
        startButton.classList.toggle('active', !startMenu.hidden);
    });
    document.addEventListener('click', function (e) {
        if (!startMenu.hidden && !startMenu.contains(e.target) && e.target !== startButton) closeStart();
    });

    /* ---------- Clock ---------- */
    var clock = document.getElementById('clock');
    function tick() {
        var d = new Date();
        var h = d.getHours(), m = d.getMinutes();
        var ap = h < 12 ? 'AM' : 'PM';
        h = h % 12; if (h === 0) h = 12;
        clock.textContent = h + ':' + (m < 10 ? '0' + m : m) + ' ' + ap;
    }
    tick();
    setInterval(tick, 1000 * 15);

    /* ============================================================
       Minesweeper (9x9, 10 mines)
       ============================================================ */
    var Minesweeper = (function () {
        var ROWS = 9, COLS = 9, MINES = 10;
        var board = document.getElementById('ms-board');
        var faceEl = document.getElementById('ms-face');
        var mineEl = document.getElementById('ms-mines');
        var statusEl = document.getElementById('ms-status');
        var grid = [];          // {mine, adj, revealed, flagged, el}
        var over = false, won = false, started = false, flags = 0, revealedCount = 0;
        var timer = null, seconds = 0;

        function pad(n) { n = Math.max(0, n); return ('00' + n).slice(-3); }

        function reset() {
            board.innerHTML = '';
            grid = [];
            over = won = started = false;
            flags = 0; revealedCount = 0; seconds = 0;
            if (timer) { clearInterval(timer); timer = null; }
            faceEl.textContent = '🙂';
            mineEl.textContent = pad(MINES);
            statusEl.textContent = pad(0);
            board.style.gridTemplateColumns = 'repeat(' + COLS + ', 22px)';

            for (var r = 0; r < ROWS; r++) {
                grid[r] = [];
                for (var c = 0; c < COLS; c++) {
                    var cell = { mine: false, adj: 0, revealed: false, flagged: false };
                    var btn = document.createElement('button');
                    btn.className = 'ms-cell';
                    (function (rr, cc) {
                        btn.addEventListener('click', function () { reveal(rr, cc); });
                        btn.addEventListener('contextmenu', function (e) { e.preventDefault(); toggleFlag(rr, cc); });
                        // long-press flag for touch
                        var lp;
                        btn.addEventListener('touchstart', function () { lp = setTimeout(function () { toggleFlag(rr, cc); lp = null; }, 400); }, { passive: true });
                        btn.addEventListener('touchend', function (e) { if (lp) { clearTimeout(lp); } });
                    })(r, c);
                    cell.el = btn;
                    grid[r][c] = cell;
                    board.appendChild(btn);
                }
            }
        }

        function plantMines(safeR, safeC) {
            var placed = 0;
            while (placed < MINES) {
                var r = Math.floor(Math.random() * ROWS);
                var c = Math.floor(Math.random() * COLS);
                if (grid[r][c].mine) continue;
                if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue; // keep first click clear
                grid[r][c].mine = true;
                placed++;
            }
            for (var rr = 0; rr < ROWS; rr++) {
                for (var cc = 0; cc < COLS; cc++) {
                    if (grid[rr][cc].mine) continue;
                    grid[rr][cc].adj = neighbours(rr, cc).filter(function (n) { return n.mine; }).length;
                }
            }
        }

        function neighbours(r, c) {
            var out = [];
            for (var dr = -1; dr <= 1; dr++)
                for (var dc = -1; dc <= 1; dc++) {
                    if (!dr && !dc) continue;
                    var nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(grid[nr][nc]);
                }
            return out;
        }
        function coordsOf(cell) {
            for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) if (grid[r][c] === cell) return [r, c];
            return null;
        }

        function startTimer() {
            timer = setInterval(function () {
                seconds++; statusEl.textContent = pad(seconds);
                if (seconds >= 999) clearInterval(timer);
            }, 1000);
        }

        function reveal(r, c) {
            if (over) return;
            var cell = grid[r][c];
            if (cell.revealed || cell.flagged) return;
            if (!started) { plantMines(r, c); started = true; startTimer(); }

            if (cell.mine) { loseGame(); return; }

            floodReveal(r, c);
            checkWin();
        }

        function floodReveal(r, c) {
            var stack = [[r, c]];
            while (stack.length) {
                var pos = stack.pop(), cr = pos[0], cc = pos[1];
                var cell = grid[cr][cc];
                if (cell.revealed || cell.flagged || cell.mine) continue;
                cell.revealed = true; revealedCount++;
                cell.el.classList.add('revealed');
                cell.el.disabled = false;
                if (cell.adj > 0) {
                    cell.el.textContent = cell.adj;
                    cell.el.classList.add('ms-c' + cell.adj);
                } else {
                    neighbours(cr, cc).forEach(function (n) {
                        var co = coordsOf(n);
                        if (co && !n.revealed) stack.push(co);
                    });
                }
            }
        }

        function toggleFlag(r, c) {
            if (over) return;
            var cell = grid[r][c];
            if (cell.revealed) return;
            cell.flagged = !cell.flagged;
            flags += cell.flagged ? 1 : -1;
            cell.el.textContent = cell.flagged ? '🚩' : '';
            cell.el.classList.toggle('flag', cell.flagged);
            mineEl.textContent = pad(MINES - flags);
        }

        function loseGame() {
            over = true;
            faceEl.textContent = '😵';
            if (timer) clearInterval(timer);
            for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
                var cell = grid[r][c];
                if (cell.mine) { cell.el.classList.add('revealed', 'mine'); cell.el.textContent = '💣'; }
            }
        }

        function checkWin() {
            if (revealedCount === ROWS * COLS - MINES) {
                over = won = true;
                faceEl.textContent = '😎';
                if (timer) clearInterval(timer);
            }
        }

        faceEl.addEventListener('click', reset);

        return { start: function () { reset(); } };
    })();

    /* ---------- Open About on first load for a friendly landing ---------- */
    window.addEventListener('load', function () { openWindow('about'); });

})();
