// target.js

// Function to create a ring element
function createRing(cx, cy, radius, fill) {
    const ring = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    ring.setAttribute('cx', cx);
    ring.setAttribute('cy', cy);
    ring.setAttribute('r', radius);
    ring.setAttribute('fill', fill);
    return ring;
}

// Function to create target
function createTarget(target, svg) {
    const layout = target.layout;
    const rings = layout.rings;

    // Create background
    const background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    background.setAttribute('width', layout.width);
    background.setAttribute('height', layout.width);
    background.setAttribute('fill', layout.backgroundcolor);
    svg.appendChild(background);

    // Create rings
    const centerX = layout.width / 2;
    const centerY = layout.width / 2;
    rings.forEach(ring => {
        svg.appendChild(createRing(centerX, centerY, ring.width, ring.ringcolor));
    });

    // Create central black circle
    const centralCircle = createRing(centerX, centerY, layout.blackwidth, layout.blackcolor);
    svg.appendChild(centralCircle);
}

// Function to draw circle (shot) onto the target SVG at specified coordinates
export function drawShot(svg, x, y, color) {
    const shot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    shot.setAttribute('cx', x);
    shot.setAttribute('cy', y);
    shot.setAttribute('r', 2.25); // Adjust the radius as needed
    shot.setAttribute('fill', color); // Color of the shot circle
    svg.appendChild(shot);
}

// Function to draw target along with shots
export function drawTargetWithShots(targetName, svgElement, shots) {
    const svg = svgElement;
    const targetDefinitionsJSON =
        '{"targets":[' +
            '{"targetID":1, "targetName":"ISSF10R", "layout":' +
            '{"width":100, "backgroundcolor":"#ffffff", "blackwidth":30.5, "blackcolor":"#000000", "rings":[' +
                '{"number":10, "numbervaluable":true, "width":0.5, "ringvisible":true, "textvisible":false, "filled":true, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":9, "numbervaluable":true, "width":5.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":8, "numbervaluable":true, "width":10.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":7, "numbervaluable":true, "width":15.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":6, "numbervaluable":true, "width":20.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":5, "numbervaluable":true, "width":25.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                '{"number":4, "numbervaluable":true, "width":30.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#ffffff"},' +
                '{"number":3, "numbervaluable":true, "width":35.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                '{"number":2, "numbervaluable":true, "width":40.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                '{"number":1, "numbervaluable":true, "width":45.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                '{"number":0, "numbervaluable":false, "width":50.5, "ringvisible":false, "textvisible":false, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"}' +
                ']}' +
            '},' +
            '{"targetID":2, "targetName":"ISSF10P", "layout":' +
                '{"width":170, "backgroundcolor":"#ffffff", "blackwidth":59.5, "blackcolor":"#000000", "rings":[' +
                    '{"number":11, "numbervaluable":false, "width":5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                    '{"number":10, "numbervaluable":true, "width":11.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                    '{"number":9, "numbervaluable":true, "width":27.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                    '{"number":8, "numbervaluable":true, "width":43.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},' +
                    '{"number":7, "numbervaluable":true, "width":59.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#ffffff"},' +
                    '{"number":6, "numbervaluable":true, "width":75.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":5, "numbervaluable":true, "width":91.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":4, "numbervaluable":true, "width":107.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":3, "numbervaluable":true, "width":123.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":2, "numbervaluable":true, "width":139.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":1, "numbervaluable":true, "width":155.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},' +
                    '{"number":0, "numbervaluable":false, "width":171.5, "ringvisible":false, "textvisible":false, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"}' +
                ']}' +
            '}' +
        ']}';
    const targetDefinitions = JSON.parse(targetDefinitionsJSON); // Parse JSON string

    const target = targetDefinitions.targets.find(target => target.targetName === targetName);

    if (target) {
        createTarget(target, svg);
        if (shots.length > 0) {
            shots.forEach((shot, index) => {
                const x = mapCoordinate(shot.x);
                const y = mapCoordinate(shot.y);
                const color = index === shots.length - 1 ? 'red' : 'green'; // Last shot red, others green
                drawShot(svg, x, y, color);
            });
        }
    }
}

// Function to map coordinate
function mapCoordinate(coordinate) {
    // Adjust the mapping as per your requirement based on the target size
    return (coordinate + 5) * 10; // Example mapping
}
