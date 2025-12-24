window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('HTK_ADVENT_CALENDAR_CURSOR_UNLOCK') === 'true') {
        addCursorStyling();
    }
})

const CURSOR_UNLOCK_BUTTON = document.querySelector('#custom-cursors-unlock');

CURSOR_UNLOCK_BUTTON.addEventListener('click', () => {
    if (localStorage.getItem('HTK_ADVENT_CALENDAR_CURSOR_UNLOCK') === 'true') return;

    localStorage.setItem('HTK_ADVENT_CALENDAR_CURSOR_UNLOCK', 'true');
    addCursorStyling();
});

function addCursorStyling() {
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
            body {
                cursor: url('./assets/cursor/normal.cur'), auto;
            }
            
            a, button {
                cursor: url('./assets/cursor/link.cur'), auto;
            }
            
            .clickable {
                cursor: url('./assets/cursor/select.cur'), auto;
            }
            
            .catjs {
                cursor: url('./assets/cursor/petpet-transparent.gif'), auto;
            }
        `;
    document.head.appendChild(cursorStyle);
}