var grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


const getRow = row => grid[row];
const getCol = col => grid.map(x => x[col]);
const setRow = (row, to) => grid[row] = to;
const setCol = (col, to) => to.forEach((x, i) => grid[i][col] = x);


function moveAct(group, rot) {
    var stack = [],
        last;

    if (rot) //rotates if other way
        group.reverse();

    group.forEach(cel => {
        if (cel != 0)
            switch (last) {
                case 0:
                    last = cel;
                    break;
                case cel:
                    stack.push(cel + last);
                    last = 0;
                    break;
                default:
                    if (last)
                        stack.push(last);
                    last = cel;
                    break;
            };
    });

    if (last != 0 && last) //pushes last bit
        stack.push(last);

    while (stack.length < 4) // adds over rest
        stack.push(0);

    if (rot) //rotates if other way
        stack.reverse();

    return stack;
}

function spawnNew() {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    var end = false;
    order.forEach(row => {
        const col = grid[row].findIndex(x => x === 0);
        if (col != NaN && !end)
            grid[row][col] = 2,
                end = true;
    });
}
function createItem(number) {
    var r = 238, g = 228, b = 218;
    const ram = (v, a) => v * (a / (number / 2));
    const Item = document.createElement("div");
    Item.textContent = number;
    Item.style.backgroundColor = `rgb(${ram(r, .998)}, ${ram(g, .980)},${ram(b, .970)})`
    return Item;
}
function gridToHtml() {
    const gridEl = document.querySelectorAll(".grid>div");
    grid.forEach((row, i) => {
        row.forEach((cel, j) => {
            gridEl[j + (i * 4)].innerHTML = "";
            if (cel != 0)
                gridEl[j + (i * 4)].appendChild(createItem(cel));
        });
    });
}

window.onload = () => {

    spawnNew();
    gridToHtml();
}

function arrowAct(type, rot) {
    switch (type) {
        case "row":
            for (let i = 0; i < grid.length; i++)
                setRow(i, moveAct(getRow(i), rot));
            spawnNew();
            gridToHtml();
            break;
        case "col":
            for (let i = 0; i < grid.length; i++)
                setCol(i, moveAct(getCol(i), rot));
            spawnNew();
            gridToHtml();
            break;
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case "ArrowUp":
        case "KeyW":
            arrowAct("col")
            break;
        case "ArrowDown":
        case "KeyS":
            arrowAct("col", true);
            break;
        case "ArrowLeft":
        case "KeyA":
            arrowAct("row");
            break;
        case "ArrowRight":
        case "KeyD":
            arrowAct("row", true);
            break;
    }
});