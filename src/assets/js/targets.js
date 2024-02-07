//var targetDefinitions = {};
//var targetDefinitions = {modified: 0};
var targetDefinitions = [];
 
function getTargetDefinition(targetID)
{
  if (targetDefinitions != undefined)	  
  {
    for (var i = 0; i < targetDefinitions.length; i++) 
    {
      if (targetDefinitions[i].targetid == targetID) 
      {
        return targetDefinitions[i];
      }        
    }
  }
  return null;
} 


/*  
  var targetDefinition = 
  {
    width: 100,
    backgroundcolor: "#ffffff",
    blackwidth: 30.5,
    blackcolor: "#000000",
	rings: [],
	addRing: function(number, numbervaluable, width, ringvisible, textvisible, filled, ringcolor, textcolor) 
	{
      var ringDefinition = 
	  {
        number: number,
		numbervaluable: numbervaluable,
	    width: width,
        ringvisible: ringvisible,
        textvisible: textvisible,
	    filled: filled,
	    ringcolor: ringcolor, 
	    textcolor: textcolor 
      }
	  this.rings.push(ringDefinition);
	}
  }
  
  var targetDefinitionsJSON = 
  '{"targets":[' +
  '{"targetID":1,"layout":' +
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
  ']}},' +
  '{"targetID":2,"layout":' +
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
  ']}}' +
  ']}'; 
*/

function calcZoomWidth(targetDefinitionLayout, participant, calibermm)
{
  var returnValue = targetDefinitionLayout.width;
  if (participant != null)
  {
    var r = null;
    for (var i = 0; i < participant.shots.length; i++)
    {
      if ((participant.shots[i].x != null) && (participant.shots[i].y != null))
      {
        var cr = (participant.shots[i].x * participant.shots[i].x) + (participant.shots[i].y * participant.shots[i].y);
        if ((r == null) || (cr > r))
        {
          r = cr;
        }
      }
    }
    if (r != null)
    {
      r = Math.pow(r, 0.5);
      returnValue = (r * 2) + calibermm + 1;
    }
  }
  return returnValue;
}
  
function defineDrawGuidelines(drawGuidelines, x, y, width, height, zoomWidth, drawSightersSign)
{
  drawGuidelines.x = x;
  drawGuidelines.y = y;
  drawGuidelines.width = width;
  drawGuidelines.height = height;
  drawGuidelines.xc = x + (width - 1) / 2;  // center x
  drawGuidelines.yc = y + (height - 1) / 2; // center y
  drawGuidelines.scale = (width - 1) / zoomWidth; // muliplier
  drawGuidelines.sightersSign = drawSightersSign;
  drawGuidelines.caliber = 4.5;
  drawGuidelines.highScore = {};
  drawGuidelines.highScore.scoreThreshold = 10;
  drawGuidelines.highScore.fillColor = "#00ff00";
  drawGuidelines.mediumScore = {};
  drawGuidelines.mediumScore.scoreThreshold = 9;
  drawGuidelines.mediumScore.fillColor = "#ffff00";
  drawGuidelines.lowerScore = {};
  drawGuidelines.lowerScore.scoreThreshold = 8;
  drawGuidelines.lowerScore.fillColor = "#ff0000";
  
  if (competition != null)
  {
    if (competition.shotfillcolors.highscore != null)
    {
      drawGuidelines.highScore.fillColor = competition.shotfillcolors.highscore;
    }
    if (competition.shotfillcolors.mediumscore != null)
    {
      drawGuidelines.mediumScore.fillColor = competition.shotfillcolors.mediumscore;
    }
    if (competition.shotfillcolors.lowerscore != null)
    {
      drawGuidelines.lowerScore.fillColor = competition.shotfillcolors.lowerscore;
    }    
  }
}
   
function drawTargetLayout(context, drawGuidelines, targetDefinitionLayout) 
{	  
  var x = drawGuidelines.x;
  var y = drawGuidelines.y;
  var width = drawGuidelines.width;
  var height = drawGuidelines.height;
  var xc = drawGuidelines.xc;
  var yc = drawGuidelines.yc;
  var mp = drawGuidelines.scale;
  var drawSightersSign = drawGuidelines.sightersSign;

  var r = xc; // radius
  var ringlen = targetDefinitionLayout.rings.length; 

  var preWidth = -1;
  var minSpacing = -1;
  for (var i = 0; i < ringlen; i++) 
  {
    if (targetDefinitionLayout.rings[i].numbervaluable) 
    {
      if (preWidth >= 0)
      {
        if ((Math.abs(targetDefinitionLayout.rings[i].width - preWidth) < minSpacing) || (minSpacing < 0))
        {			
          minSpacing = Math.abs(targetDefinitionLayout.rings[i].width - preWidth) / 2;  
        }			
      }
      preWidth = targetDefinitionLayout.rings[i].width;  
    }      
  }	
  var textWidth = Math.floor(mp * (minSpacing / 1.4));
  var textOffset = mp * (minSpacing / 2);
  var lineWidth = mp * 0.10;	// line thickness 0.1mm

  if (drawSightersSign === undefined) {
    drawSightersSign = false;
  }

  // save() allows us to save the canvas context before
  // defining the clipping region so that we can return
  // to the default state later on

  context.save();

  // border
/*
  context.lineWidth = 1;
  context.rect(x, y, width, height);
  context.strokeStyle = '#00000055';
  context.stroke();	   	
*/

  context.globalAlpha = 1;
  context.imageSmoothingEnabled = true;

  // defaults
  context.lineWidth = mp * 0.10;	// line thickness 0.1mm
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  context.translate(0.5, 0.5);
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();  

  context.beginPath(); 
  context.rect(x, y, width, height);
  context.fillStyle = targetDefinitionLayout.backgroundcolor;
  context.fill();	   

  r = mp * targetDefinitionLayout.blackwidth / 2;  
  context.beginPath(); 
  context.arc(xc, yc, r, 0, 2 * Math.PI, false);
  context.fillStyle = targetDefinitionLayout.blackcolor;
  context.fill();	   
  context.strokeStyle = targetDefinitionLayout.blackcolor;
  context.stroke();	   

  for (var i = 0; i < ringlen; i++) 
  {
    r = mp * targetDefinitionLayout.rings[i].width / 2;  
    context.beginPath(); 
    if (targetDefinitionLayout.rings[i].ringvisible) 
    {
      context.arc(xc, yc, r, 0, 2 * Math.PI, false);
      if (targetDefinitionLayout.rings[i].filled) 
      {
        context.fillStyle = targetDefinitionLayout.rings[i].ringcolor;
        context.fill();	   
      }	
      context.strokeStyle = targetDefinitionLayout.rings[i].ringcolor;
      context.stroke();	   
    }	

    if (targetDefinitionLayout.rings[i].textvisible) 
    {
      context.fillStyle = targetDefinitionLayout.rings[i].textcolor;
      context.font = textWidth + 'px arial';
      context.fillText(targetDefinitionLayout.rings[i].number.toString(), xc - r + textOffset, yc);
      context.fillText(targetDefinitionLayout.rings[i].number.toString(), xc, yc - r + textOffset);
      context.fillText(targetDefinitionLayout.rings[i].number.toString(), xc + r - textOffset, yc);
      context.fillText(targetDefinitionLayout.rings[i].number.toString(), xc, yc + r - textOffset);
    }	
  } 

  if (drawSightersSign)
  {
    context.beginPath(); 
    var br = mp * targetDefinitionLayout.blackwidth / 2;  
    var vr = xc * Math.sqrt(2);
    if (br > vr) 
    {
      context.strokeStyle = targetDefinitionLayout.backgroundcolor;
      context.fillStyle = targetDefinitionLayout.backgroundcolor;
    } else {		  
      context.strokeStyle = targetDefinitionLayout.blackcolor;
      context.fillStyle = targetDefinitionLayout.blackcolor;
    }		  
    context.moveTo(width * 3 / 4, 0);
    context.lineTo(width, 0);	  
    context.lineTo(width, width * 1 / 4);	  
    context.fill();	   

    context.beginPath(); 
    context.lineWidth = 1;
    context.strokeStyle = targetDefinitionLayout.backgroundcolor;
    context.fillStyle = targetDefinitionLayout.backgroundcolor;
    context.moveTo(width * 3 / 4, 0);
    context.lineTo(width, width * 1 / 4);	  
    context.stroke();	   
  } 

  context.restore();
}

function drawShot(context, drawGuidelines, shot, fillColor) 
{
  var xc = drawGuidelines.xc + (drawGuidelines.scale * shot.x);
  var yc = drawGuidelines.yc + (drawGuidelines.scale * -1 * shot.y);
  var r = drawGuidelines.scale * drawGuidelines.caliber / 2;

  context.beginPath();
  context.arc(xc, yc, r, 0, 2 * Math.PI, false);
  context.strokeStyle = "#000000";
  //context.fillStyle = "#ffffff";
  context.fillStyle = fillColor;
  context.lineWidth = 0.5;
  context.fill();	       
  context.stroke();	   
}

function drawShots(context, drawGuidelines, shots, selection) 
{
  context.save();

  context.globalAlpha = 0.70;	  
      
  var selectShotNr = null;
  var fromNumber = 0;
  var toNumber = 10000; // just a very big number
  
  if (selection != null)
  {  
    selectShotNr = selection.highlightshotnumber;
    if (selection.fromnumber != null)
    {
      fromNumber = selection.fromnumber;
    }
    if ((selection.tonumber != null) && (selection.tonumber != 0))
    {
      toNumber = selection.tonumber;
    }
  }  

  if (selectShotNr == null)
  {  
    if (shots.length >= 1)
    {
      selectShotNr = shots[shots.length - 1].nr;        
    }
  }
  
  for (var i=0; i < shots.length; i++)
  {
    var shot = shots[i];
    var visibleShot = ((shot.x != null) && (shot.y != null) && (shot.nr != selectShotNr));
    if (visibleShot)
    {
      visibleShot = ((shot.nr >= fromNumber) && (shot.nr <= toNumber));
    }
    if (visibleShot)
    {
      drawShot(context, drawGuidelines, shot, "#ffffff");
    }
  }

  context.globalAlpha = 0.85;	  

  for (var i=0; i < shots.length; i++)
  {
    var shot = shots[i];
    var visibleShot = ((shot.x != null) && (shot.y != null) && (shot.nr == selectShotNr));
    if (visibleShot)
    {
      visibleShot = ((shot.nr >= fromNumber) && (shot.nr <= toNumber));
    }
    if (visibleShot)
    //if ((shot.nr == selectShotNr) && (shot.x != null) && (shot.y != null))
    {
      var fillColor = drawGuidelines.lowerScore.fillColor;
      if (shot.score >= drawGuidelines.mediumScore.scoreThreshold)
      {
        fillColor = drawGuidelines.mediumScore.fillColor;
      }
      if (shot.score >= drawGuidelines.highScore.scoreThreshold)
      {
        fillColor = drawGuidelines.highScore.fillColor;
      }          
      drawShot(context, drawGuidelines, shot, fillColor);
    }
  }
  
  context.restore();  
}

function drawRank(context, drawGuidelines, rank) 
{
  var textHeight = Math.floor(drawGuidelines.height / 14);
  var text = rank.toString();
  var paddingtb = 4;
  var paddinglr = 8;
   
  context.save();
  context.globalAlpha = 0.9;	  
  context.beginPath();

  context.font = textHeight + 'px arial';
  context.textAlign = 'start';
  context.textBaseline = 'middle';

  var metrics = context.measureText(text);
  var blockHeight = textHeight + (2 * paddingtb);
  var blockWidth = metrics.width + (2 * paddinglr);

  context.rect(0, 0, blockWidth, blockHeight);
  context.fillStyle = '#dddddd';
  context.fill();

  context.globalAlpha = 1;	  

  context.fillStyle = '#000000';
  context.fillText(rank.toString(), paddinglr, (blockHeight / 2));

  context.restore();  
}
 
function drawTarget(participantID)
{  
  //console.log('drawTarget(' + participantID + ') ');

  var canvas = document.getElementById('target-' + participantID);
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);    	  

  var participant = participants[participantID];  
  //console.log('drawTarget(' + participantID + '): ' + JSON.stringify(participant));
  
  if (participant != null)
  {
    var drawGuidelines = {};
    var targetDefinition = getTargetDefinition(participant.targetid);
    var discipline = getDiscipline(participant.disciplineid);

	  if (targetDefinition != null)
    {	      
      var zoomWidth = 9;//calcZoomWidth();
      var calibermm = 4.5;
      
      if ((discipline != null) && (discipline.calibermm != null))
      {
        calibermm = discipline.calibermm;
      }
           
      zoomWidth = calcZoomWidth(targetDefinition.layout, participant, calibermm);
      
      drawSighters = (participant.shots.length <= 0);

      defineDrawGuidelines(drawGuidelines, 0, 0, canvas.width, canvas.height, zoomWidth, drawSighters);
      drawGuidelines.caliber = calibermm;

      drawTargetLayout(context, drawGuidelines, targetDefinition.layout);
      
      if (drawSighters) 
      {
        drawShots(context, drawGuidelines, participant.sightingshots, participant.selection);
      } 
      else
      {
        drawShots(context, drawGuidelines, participant.shots, participant.selection);        
      }

      if (participant.rank != null)
      {
        drawRank(context, drawGuidelines, participant.rank);
      }  
    }    
  }
}  

function highlightShot(participantID, number)
{
  var participant = participants[participantID];  
  //console.log('highlightShot(' + participantID + ', ' + number + ')');
  
  if (participant != null)
  {
    if (participant.selection == null)
    {
      participant.selection = {};
    }
    participant.selection.highlightshotnumber = number;
    drawTarget(participantID);
  }
}

function setShotViewRange(participantID, fromNumber, toNumber)
{
  var participant = participants[participantID];  
  //console.log('setShotViewRange(' + participantID + ', ' + fromNumber + ', ' + toNumber + ')');
  
  if (participant != null)
  {
    if (participant.selection == null)
    {
      participant.selection = {};
    }
    participant.selection.fromnumber = fromNumber;
    participant.selection.tonumber = toNumber;
    drawTarget(participantID);
  }  
}
