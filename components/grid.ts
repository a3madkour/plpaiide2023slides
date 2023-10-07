import cytoscape from "cytoscape";

enum DisplayMode {
    Valid,
    Invalid,
    NA
}

interface Grid {
    id: number
    elements: Array<number>,
    s: number,
    e: number
    prob: number,
    valid: DisplayMode,
    isHovered: bool
}

function generateAllGrids() {
    const n = 4;
    var grids = [];
    var biggest_digit = parseInt("1".repeat(n), 2);
    for (var i = 0; i <= biggest_digit; i++) {
        var g = { id: i, elements: i.toString(2).padStart(n, '0').split("").map(Number), s: 0, e: 3, prob: 1 / biggest_digit, valid: DisplayMode.NA, isHovered: false }
        grids.push(g);
    }
    return grids;
}

function convertGridToGraph(g: Grid) {
    var nodes = []
    var edges = []
    for (var i = 0; i < g.elements.length; i++) {
        nodes.push({
            data: {
                id: i,
                active: g.elements[i]
            }
        })
    }

    for (var i = 0; i < g.elements.length; i++) {
        if (g.elements[i] == 0) {
            continue
        }
        if (i + 1 < g.elements.length && g.elements[i + 1] == 1 && (i + 1) % 2 != 0) {
            edges.push({
                data: {
                    source: i,
                    target: i + 1
                }
            })
        }
        if (i + 2 < g.elements.length && g.elements[i + 2] == 1) {
            edges.push({
                data: {
                    source: i,
                    target: i + 2
                }
            })
        }
    }

    var gr = cytoscape({
        elements: {
            nodes: nodes,
            edges: edges
        }
    });

    return gr

}


function findShortestPath(g: Grid) {
    var start = g.s
    var end = g.e

    var cy = convertGridToGraph(g)
    var dijk_res = cy.elements().dijkstra(cy.nodes("[id = '" + start + "']"))
    var path = dijk_res.pathTo(cy.nodes("[id = '" + end + "']"))

    return path
}

function renderGrid(g: Grid, size: number) {
    var svg_str = "<svg height = " + size * 2 + " width = " + size * 2 + " >"
    for (var i = 0; i < g.elements.length; i++) {
        var is_start = i == g.s
        var is_end = i == g.e
        var x = i % 2 == 0 ? 0 : size
        var y = i - 2 >= 0 ? size : 0
        var fill = "white"
        if (is_start) {
            fill = "green"
        }
        if (is_end) {
            fill = "red"
        }
        if (g.elements[i] == 0) {
            fill = "black"
        }
        svg_str += "<rect width = " + size + " height =  " + size + " x = " + x + " y = " + y + " fill=" + fill + " stroke=black stroke-width = " + (size / 15) + " />"
    }

    return svg_str + "</svg>"
}

function renderNumGrid(g: Grid, size: number) {
    var svg_str = "<svg height = " + size * 2 + " width = " + size * 2 + " >"
    for (var i = 0; i < g.elements.length; i++) {
        var is_start = i == g.s
        var is_end = i == g.e
        var x = i % 2 == 0 ? 0 : size
        var y = i - 2 >= 0 ? size : 0
        var fill = "white"
        svg_str += "<rect width = " + size + " height =  " + size + " x = " + x + " y = " + y + " fill=" + fill + " stroke=black stroke-width = " + (size / 15) + " />"
        svg_str += "<text font-size=40" + " x = " + String(Number(x) + size / 2.5) + " y = " + String(Number(y) + size / 1.5) + " > " + g.elements[i] + "</text>"

    }

    return svg_str + "</svg>"
}

function renderTable(g: any) {
    var ot_str = "<table><tr><th>Grid</th> <th> cell(1) </th> <th> cell(2) </th> <th> cell(3) </th> <th> cell(4)  </th> </tr>"
    for (var i = 0; i < g.length; i++) {
        ot_str += "<tr>"
        ot_str += renderRow(g[i])
        ot_str += "</tr>"
    }

    return ot_str + "</table>"
}

function renderRow(grid: Grid) {
    var ot_str = ""
    ot_str += "<th>"
    ot_str += grid.id
    ot_str += "</th>"
    for (var i = 0; i < grid.elements.length; i++) {
        ot_str += "<th>"
        ot_str += grid.elements[i]
        ot_str += "</th>"
    }

    return ot_str
}




function numDegrees(g: Grid) {
    var degrees = {}

    for (var i = 0; i < g.elements.length; i++) {
        if (degrees[i] === undefined) {
            degrees[i] = 0
        }

        if (g.elements[i] == 0) {
            continue
        }

        if (i + 1 < g.elements.length && g.elements[i + 1] == 1 && (i + 1) % 2 != 0) {
            degrees[i] += 1

            if (degrees[i + 1] === undefined) {
                degrees[i + 1] = 0
            }
            degrees[i + 1] += 1
        }
        if (i + 2 < g.elements.length && g.elements[i + 2] == 1) {
            degrees[i] += 1

            if (degrees[i + 2] === undefined) {
                degrees[i + 2] = 0
            }

            degrees[i + 2] += 1
        }

    }
    return degrees
}

var grids = {
    renderGrid: renderGrid,
    renderNumGrid: renderNumGrid,
    findShortestPath: findShortestPath,
    generateAllGrids: generateAllGrids,
    DisplayMode: DisplayMode,
    numDegrees: numDegrees,
    renderTable: renderTable,
    renderRow: renderRow
}

export default grids;
