// target.js

// target definition JSON string
const targetDefinitionsJSON = `{"targets":[
    {"targetName":"ISSF10R", "projectileDiameter": 4.5, "defaultZoom": 1, "maxZoom": 3.25, "layout":
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
    {"targetName":"ISSF10P", "projectileDiameter": 4.5, "defaultZoom": 0.5, "maxZoom": 3.25, "layout":
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

let projectileDiameterInPixel;

// Function to adjust width based on container width and layout width
function adjustWidthInPixel(containerWidth, layoutWidth, desiredWidth) {
    // Calculate the scaling factor based on the ratio between the container width and layout width
    const scaleFactor = containerWidth / layoutWidth;
    
    // Adjust the desired width proportionally using the scaling factor
    const adjustedWidth = desiredWidth * scaleFactor;
    
    // Return the adjusted width
    return adjustedWidth;
}

// Function to convert millimeter measurements to pixel values
function convertMillimeterToPixel(millimeterMeasurement) {
    // Convert millimeter measurement to pixels (assuming 1 millimeter = 3.7795275590551 pixels)
    const pixelMeasurement = millimeterMeasurement * 3.7795275590551;

    return pixelMeasurement;
}

// Function to calculate the zoom factor based on the shots
function calculateZoomFactor(shots, containerWidth, defaultZoom, maxZoom) {
    if (shots.length > 0) {
        // Find the maximum distance of any shot from the center of the target, considering the size of the shots
        const maxDistance = Math.max(
            ...shots.map(shot => {
                // Calculate the distance of the shot from the center
                const distanceFromCenter = Math.sqrt(convertMillimeterToPixel(shot.x) ** 2 + convertMillimeterToPixel(shot.y) ** 2);

                // Calculate the effective distance by adding half of the shot's diameter to the distance from the center
                const effectiveDistance = distanceFromCenter + (projectileDiameterInPixel / 2);
                return effectiveDistance;
            })
        );


        // Calculate the effective diameter including the projectile's diameter and the furthest shot
        const maxEffectiveDiameter = maxDistance + (projectileDiameterInPixel * 2.5);

        // Calculate zoom factor based on the effective diameter
        let zoomFactor = containerWidth / maxEffectiveDiameter;

        // Limit the zoom factor to the specified maximum zoom
        zoomFactor = Math.min(zoomFactor, maxZoom);

        return zoomFactor;
    }

    // Log default zoom factor if there are no shots
    console.log('Default zoom factor:', defaultZoom);
    return defaultZoom; // If there are no shots, return the default zoom factor
}


// Function to calculate the inner radius between two rings, ensuring text positioning between them
/*function calculateInnerRadius(currentRingIndex, rings) {
    if (currentRingIndex === 0) {
        return 0; // If the current ring is the first ring, its inner radius is 0
    } else {
        const currentRing = rings[currentRingIndex];
        const previousRing = rings[currentRingIndex - 1];
        // Calculate the inner radius as the average of the outer radius of the previous ring and the current ring
        // This ensures that the text is positioned between the rings
        return (previousRing.width + currentRing.width) / 2;
    }
}*/

// Function to calculate font size based on ring width and zoom factor
/*function calculateFontSize(radius, nextRingWidth, zoomFactor) {
    // Adjust font size based on the ratio between the radius and the next ring's width
    const fontSize = radius / nextRingWidth * zoomFactor;
    return fontSize;
}*/

// Function to calculate the position of text inside the circle stroke
/*function calculateTextPosition(cx, cy, radius, angle) {
    // Convert angle to radians
    const radians = angle * Math.PI / 180;

    // Calculate text position without adjusting the radius again
    const x = cx + radius * Math.cos(radians);
    const y = cy + radius * Math.sin(radians);

    return { x, y };
}*/

// Function to create a ring element with text positioned inside it
//function createRing(cx, cy, radius, fill, filled, number, textVisible, textColor, zoomFactor, currentRingIndex, rings) {
function createRing(cx, cy, radius, fill, filled) {
    //const width = containerWidth * widthRatio; // Calculate the width based on the container width and the width ratio
    const ringGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

    const ring = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    ring.setAttribute('cx', cx);
    ring.setAttribute('cy', cy);
    ring.setAttribute('r', radius); // Set the radius as half of the width
    ring.setAttribute('fill', filled ? fill : 'none'); // Fill the ring if it's filled, otherwise set fill to 'none'
    ring.setAttribute('stroke', fill); // Set stroke color
    ring.setAttribute('stroke-width', filled ? 0 : 0.5); // Set stroke width based on filled status
    ringGroup.appendChild(ring);

    // Add text if textVisible is true
    /*if (textVisible) {
        // Calculate the inner radius based on the width of the current ring and the adjacent ring
        const innerRadius = calculateInnerRadius(currentRingIndex, rings);


        // Calculate angle increment for placing text
        const angleIncrement = 360 / 4; // Divide the circle into 4 quadrants

        // Loop through each quadrant and place text
        for (let quadrant = 0; quadrant < 4; quadrant++) {
            // Calculate angle for this quadrant
            const angle = quadrant * angleIncrement;

            // Calculate text position inside the circle
            const textPosition = calculateTextPosition(cx, cy, innerRadius, angle, zoomFactor); 

            // Create text element for this position
            const textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            textElement.setAttribute('x', textPosition.x);
            textElement.setAttribute('y', textPosition.y);
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('alignment-baseline', 'middle');
            textElement.setAttribute('fill', textColor); // Set text color

            // Calculate font size based on zoom factor
            //const fontSize = calculateFontSize(radius, rings[currentRingIndex + 1].width, zoomFactor); // Adjust font size relative to the next ring's width
            //textElement.setAttribute('font-size', fontSize);

            textElement.textContent = number.toString();

            // Append text element to ring group
            ringGroup.appendChild(textElement);
        }
    }*/

    return ringGroup;
}

// Function to create target
export function createTarget(targetName, targetSVG, containerWidth, shots) {
    const targetDefinitions = JSON.parse(targetDefinitionsJSON); // Parse JSON string
    const target = targetDefinitions.targets.find(target => target.targetName === targetName);
    
    // Adjust projectile diameter based on container width and layout width
    projectileDiameterInPixel = adjustWidthInPixel(containerWidth, convertMillimeterToPixel(target.layout.width), convertMillimeterToPixel(target.projectileDiameter));

    const zoomFactor = calculateZoomFactor(shots, containerWidth, target.defaultZoom, target.maxZoom); // Calculate zoom factor based on shots

    if (target) {
        const layout = target.layout;
        const rings = layout.rings;

        // Clear any existing content
        targetSVG.innerHTML = '';

        // Create background group
        const backgroundGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Create background
        const background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        background.setAttribute('width', containerWidth); // Set width as percentage
        background.setAttribute('height', containerWidth); // Set height as percentage
        background.setAttribute('fill', layout.backgroundcolor);
        backgroundGroup.appendChild(background);

        // Append background group to SVG
        targetSVG.appendChild(backgroundGroup);

        // Create black circle group
        const blackCircleGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Calculate black width ratio
        const blackWidthRatio = adjustWidthInPixel(containerWidth, convertMillimeterToPixel(layout.width), convertMillimeterToPixel(layout.blackwidth)) * zoomFactor;
        //const blackWidthRatio = adjustWidthInPixel(containerWidth, convertMillimeterToPixel(layout.width), convertMillimeterToPixel(layout.blackwidth));

        // Create black circle
        const blackCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        blackCircle.setAttribute('cx', containerWidth / 2); // Center X
        blackCircle.setAttribute('cy', containerWidth / 2); // Center Y
        blackCircle.setAttribute('r', blackWidthRatio); // Adjusted radius
        blackCircle.setAttribute('fill', layout.blackcolor);
        blackCircleGroup.appendChild(blackCircle);

        // Append black circle group to SVG
        targetSVG.appendChild(blackCircleGroup);

       // Create rings group
        const ringsGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        // Create rings (append them to rings group)
        //rings.forEach((ring, index) => {
        rings.forEach((ring) => {
                if (ring.ringvisible) {
                const ringRadius = adjustWidthInPixel(containerWidth, convertMillimeterToPixel(layout.width), convertMillimeterToPixel(ring.width)) * zoomFactor;
                //const ringRadius = adjustWidthInPixel(containerWidth, convertMillimeterToPixel(layout.width), convertMillimeterToPixel(ring.width));
                //const ringElement = createRing(containerWidth / 2, containerWidth / 2, ringRadius, ring.ringcolor, ring.filled, ring.number, ring.textvisible, ring.textcolor, zoomFactor, index, rings);
                //const ringElement = createRing(containerWidth / 2, containerWidth / 2, ringRadius, ring.ringcolor, ring.filled, ring.number, ring.textvisible, ring.textcolor, zoomFactor);
                const ringElement = createRing(containerWidth / 2, containerWidth / 2, ringRadius, ring.ringcolor, ring.filled, ring.number, ring.textvisible, ring.textcolor);
                ringsGroup.appendChild(ringElement);
            }
        });

        // Append rings group to SVG
        targetSVG.appendChild(ringsGroup);

        // Store the groups in the SVG element's data attribute for future reference
        targetSVG.dataset.backgroundGroup = backgroundGroup;
        targetSVG.dataset.blackCircleGroup = blackCircleGroup;
        targetSVG.dataset.ringsGroup = ringsGroup;

    }

    if (shots.length > 0) {
        drawShots(targetSVG, containerWidth, shots, zoomFactor)
    }
}

// Function to draw a single shot onto the target SVG
export function drawShot(targetSVG, x, y, radius, color, opacity) {
    const shot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    shot.setAttribute('cx', x);
    shot.setAttribute('cy', y);
    shot.setAttribute('r', radius); // Set the radius dynamically
    shot.setAttribute('fill', color);
    shot.setAttribute('fill-opacity', opacity);
    targetSVG.appendChild(shot);
}

// Function to draw multiple shots onto the target SVG
export function drawShots(targetSVG, containerWidth, shots, zoomFactor) {

    // Adjusted center of the target
    const centerX = containerWidth / 2;
    const centerY = containerWidth / 2;

    if (shots.length > 0) {
        shots.forEach((shot, index) => {
            const adjustedX = centerX + (convertMillimeterToPixel(shot.x) / 2) * zoomFactor;
            const adjustedY = centerY - (convertMillimeterToPixel(shot.y) / 2) * zoomFactor;
            const color = index === shots.length - 1 ? 'red' : 'grey'; // Last shot red, others grey
            const opacity = index === shots.length - 1 ? '1' : '0.5'; // Last shot solid, others 50%
            const radius = projectileDiameterInPixel * zoomFactor;
            drawShot(targetSVG, adjustedX, adjustedY, radius, color, opacity);
        });
    }
}

