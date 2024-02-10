// target.js

// target definition JSON string
const targetDefinitionsJSON = `{"targets":[
    {"targetName":"ISSF10R", "projectileDiameter": 4.5, "defaultZoom": 3.5, "layout":
        {"width":100, "backgroundcolor":"#ffffff", "blackwidth":30.5, "blackcolor":"#000000", "rings":[
            {"number":10, "numbervaluable":true, "width":0.5, "ringvisible":true, "textvisible":false, "filled":true, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":9, "numbervaluable":true, "width":5.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":8, "numbervaluable":true, "width":10.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":7, "numbervaluable":true, "width":15.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":6, "numbervaluable":true, "width":20.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":5, "numbervaluable":true, "width":25.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":4, "numbervaluable":true, "width":30.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#ffffff"},
            {"number":3, "numbervaluable":true, "width":35.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":2, "numbervaluable":true, "width":40.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":1, "numbervaluable":true, "width":45.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":0, "numbervaluable":false, "width":50.5, "ringvisible":false, "textvisible":false, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"}
        ]}
    },
    {"targetName":"ISSF10P", "projectileDiameter": 4.5, "defaultZoom": 0.8, "layout":
        {"width":170, "backgroundcolor":"#ffffff", "blackwidth":59.5, "blackcolor":"#000000", "rings":[
            {"number":11, "numbervaluable":false, "width":5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":10, "numbervaluable":true, "width":11.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":9, "numbervaluable":true, "width":27.5, "ringvisible":true, "textvisible":false, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":8, "numbervaluable":true, "width":43.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#ffffff", "textcolor":"#ffffff"},
            {"number":7, "numbervaluable":true, "width":59.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#ffffff"},
            {"number":6, "numbervaluable":true, "width":75.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":5, "numbervaluable":true, "width":91.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":4, "numbervaluable":true, "width":107.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":3, "numbervaluable":true, "width":123.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":2, "numbervaluable":true, "width":139.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":1, "numbervaluable":true, "width":155.5, "ringvisible":true, "textvisible":true, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"},
            {"number":0, "numbervaluable":false, "width":171.5, "ringvisible":false, "textvisible":false, "filled":false, "ringcolor":"#000000", "textcolor":"#000000"}
        ]}
    }
]}`;

let projectileDiameter;
let defaultZoom;

// Function to calculate the zoom factor based on the shots
function calculateZoomFactor(shots, width, projectileDiameter, defaultZoom) {
    if (shots.length > 0) {
        // Find the maximum distance of any shot from the center of the target
        const maxDistance = Math.max(
            ...shots.map(shot => Math.sqrt(shot.x ** 2 + shot.y ** 2))
        );
        
        // Calculate the effective diameter including the projectile's diameter
        const maxEffectiveDiameter = maxDistance + projectileDiameter / 2;
                
        // Calculate zoom factor based on the effective diameter
        let zoomFactor = width / maxEffectiveDiameter;

        // Limit the zoom factor to 3.5 if it exceeds that value
        zoomFactor = Math.min(zoomFactor, 3.5);

        // Define the allowed zoom factors
        const allowedZoomFactors = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5];

        // Find the closest allowed zoom factor to the calculated zoom factor
        const closestZoomFactor = allowedZoomFactors.reduce((prev, curr) => {
            return (Math.abs(curr - zoomFactor) < Math.abs(prev - zoomFactor) ? curr : prev);
        });

        return closestZoomFactor;
    }
    
    return defaultZoom // If there are no shots, return the default maximum zoom factor
}

// Function to calculate the position of text inside the circle stroke
function calculateTextPosition(cx, cy, radius, angle, zoomFactor) {
    // Convert angle to radians
    const radians = angle * Math.PI / 180;

    // Calculate text position with adjustment based on zoom factor and predefined radius
    const adjustedRadius = radius - 2.5 * zoomFactor; // Adjust the distance from the circle's edge as needed
    const x = cx + adjustedRadius * Math.cos(radians);
    const y = cy + adjustedRadius * Math.sin(radians);

    return { x, y };
}

// Function to create a ring element with text positioned inside it
function createRing(cx, cy, radius, fill, filled, number, textVisible, textColor, zoomFactor) {
    const ringGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

    const ring = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    ring.setAttribute('cx', cx);
    ring.setAttribute('cy', cy);
    ring.setAttribute('r', radius); // Set the radius directly
    ring.setAttribute('fill', filled ? fill : 'none'); // Fill the ring if it's filled, otherwise set fill to 'none'
    ring.setAttribute('stroke', fill); // Set stroke color
    ring.setAttribute('stroke-width', filled ? 0 : 0.5); // Set stroke width based on filled status
    ringGroup.appendChild(ring);

    // Add text if textVisible is true
    if (textVisible) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute('fill', textColor);
        text.textContent = number.toString();

        // Calculate angle increment for placing text
        const angleIncrement = 360 / 4; // Divide the circle into 4 quadrants

        // Loop through each quadrant and place text
        for (let quadrant = 0; quadrant < 4; quadrant++) {
            // Calculate angle for this quadrant
            const angle = quadrant * angleIncrement;

            // Calculate text position inside the circle
            const textPosition = calculateTextPosition(cx, cy, radius, angle, zoomFactor); // Adjust the distance from the circle's edge as needed

            // Create text element for this position
            const textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            textElement.setAttribute('x', textPosition.x);
            textElement.setAttribute('y', textPosition.y);
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('alignment-baseline', 'middle');
            textElement.setAttribute('fill', textColor); // Set text color
            textElement.textContent = number.toString();

            // Append text element to ring group
            ringGroup.appendChild(textElement);
        }
    }

    // Add circle for text
    const textCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    textCircle.setAttribute('cx', cx);
    textCircle.setAttribute('cy', cy);
    textCircle.setAttribute('r', radius); // Set the same radius as the ring
    textCircle.setAttribute('fill', 'none'); // No fill
    textCircle.setAttribute('stroke', 'none'); // No stroke
    ringGroup.appendChild(textCircle);

    return ringGroup;
}


// Function to create target
export function createTarget(targetName, svg, width, shots) {
    const targetDefinitions = JSON.parse(targetDefinitionsJSON); // Parse JSON string
    const target = targetDefinitions.targets.find(target => target.targetName === targetName);
    projectileDiameter = target.projectileDiameter;
    defaultZoom = target.defaultZoom;
    const zoomFactor = calculateZoomFactor(shots, width, projectileDiameter, defaultZoom); // Calculate zoom factor based on shots

    if (target) {
        const layout = target.layout;
        const rings = layout.rings;

        // Clear any existing content
        svg.innerHTML = '';

        // Create background group
        const backgroundGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Create background
        const background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        background.setAttribute('width', width);
        background.setAttribute('height', width);
        background.setAttribute('fill', layout.backgroundcolor);
        backgroundGroup.appendChild(background);

        // Append background group to SVG
        svg.appendChild(backgroundGroup);

        // Create black circle group
        const blackCircleGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Create black circle
        const blackCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        const blackWidthRatio = (layout.blackwidth / 100) * width * zoomFactor;
        blackCircle.setAttribute('cx', '50%'); // Center X
        blackCircle.setAttribute('cy', '50%'); // Center Y
        blackCircle.setAttribute('r', blackWidthRatio); // Radius based on black width ratio
        blackCircle.setAttribute('fill', layout.blackcolor);
        blackCircleGroup.appendChild(blackCircle);

        // Append black circle group to SVG
        svg.appendChild(blackCircleGroup);

        // Create rings group
        const ringsGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Create rings (append them to rings group)
        rings.forEach(ring => {
            if (ring.ringvisible) {
                const ringRadius = (ring.width / 100) * width * zoomFactor;
                const ringElement = createRing(width / 2, width / 2, ringRadius, ring.ringcolor, ring.filled, ring.number, ring.textvisible, ring.textcolor, zoomFactor);
                ringsGroup.appendChild(ringElement);
            }
        });

        // Append rings group to SVG
        svg.appendChild(ringsGroup);

        // Store the groups in the SVG element's data attribute for future reference
        svg.dataset.backgroundGroup = backgroundGroup;
        svg.dataset.blackCircleGroup = blackCircleGroup;
        svg.dataset.ringsGroup = ringsGroup;

    }
}

// Function to draw a single shot onto the target SVG
export function drawShot(svg, x, y, radius, color, opacity) {
    const shot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    shot.setAttribute('cx', x);
    shot.setAttribute('cy', y);
    shot.setAttribute('r', radius); // Set the radius dynamically
    shot.setAttribute('fill', color);
    shot.setAttribute('fill-opacity', opacity);
    svg.appendChild(shot);
}

// Function to draw multiple shots onto the target SVG
export function drawShots(targetName, targetSVG, targetContainerWidth, shots) {
    // Draw the target rings
    createTarget(targetName, targetSVG, targetContainerWidth, shots);
    
    const zoomFactor = calculateZoomFactor(shots, targetContainerWidth, projectileDiameter, defaultZoom); // Calculate zoom factor

    // Adjusted center of the target
    const centerX = targetContainerWidth / 2;
    const centerY = targetContainerWidth / 2;

    if (shots.length > 0) {
        shots.forEach((shot, index) => {
            const adjustedX = centerX + (shot.x * zoomFactor);
            const adjustedY = centerY + (shot.y * zoomFactor);
            const color = index === shots.length - 1 ? 'red' : 'grey'; // Last shot red, others grey
            const opacity = index === shots.length - 1 ? '1' : '0.5'; // Last shot solid, others 50%
            const radius = calculateShotRadius(zoomFactor, projectileDiameter);
            drawShot(targetSVG, adjustedX, adjustedY, radius, color, opacity);
        });
    }
}

// Function to calculate shot radius based on zoom factor and projectile diameter
function calculateShotRadius(zoomFactor, projectileDiameter) {
    // Calculate radius in millimeters
    const radius = (projectileDiameter * zoomFactor);
    return radius;
}