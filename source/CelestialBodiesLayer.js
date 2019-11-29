import Konva from "konva";
import ChartUtils from './ChartUtils';

class CelestialBodiesLayer
{
    constructor(theme)
    {
        this.theme = theme;
        this.chartUtils = new ChartUtils();
        this.onCelestialBodyTouched = null;
        this.drawOuterCircle = null;
    }
    drawCelestialBodies(circleSettings, layer, celestialBodies, angleOffsetAC, zodiacBeltWidth, drawOuterCircle)
    {
        this.drawOuterCircle = drawOuterCircle;
        if(this.drawOuterCircle)
            this.drawMiddleFilledCircle(circleSettings,layer);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[0],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[1],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[2],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[3],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[4],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[5],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[6],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[7],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[8],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[9],angleOffsetAC,zodiacBeltWidth);
        this.drawCelestialBody(layer,circleSettings,celestialBodies[10],angleOffsetAC,zodiacBeltWidth);
        
        layer.draw();
    }
    
    drawCelestialBody(layer, circleSettings, celestialBody, angleOffsetAC, zodiacBeltWidth)
    {
        let radius = circleSettings.radius;
        let deg = this.chartUtils.getNormalizedDegree(parseFloat(celestialBody.TotalDegree),angleOffsetAC);
        let correctedDeg = celestialBody.TotalDegreeCorrected!==undefined?this.chartUtils.getNormalizedDegree(parseFloat(celestialBody.TotalDegreeCorrected),angleOffsetAC):deg;
        let celestialBodyRadius = radius - 20;

        if(this.drawOuterCircle)
        {
            let rulerX = this.chartUtils.getX(deg,radius) + circleSettings.x;
            let rulerY = this.chartUtils.getY(deg,radius) + circleSettings.y;
            let rulerEndX = this.chartUtils.getX(correctedDeg,radius-5) + circleSettings.x;
            let rulerEndY = this.chartUtils.getY(correctedDeg,radius-5) + circleSettings.y;
            let lineToPlanet = new Konva.Line({
                points: [rulerX, rulerY, rulerEndX, rulerEndY],
                stroke: this.theme.DefaultWheelOutlineColor,
                strokeWidth: 0.5
            });
            layer.add(lineToPlanet);
        }
        
        let celestialBodyX = this.chartUtils.getX(correctedDeg,celestialBodyRadius) + circleSettings.x - 4;
        let celestialBodyY = this.chartUtils.getY(correctedDeg,celestialBodyRadius) + circleSettings.y - 10 ;
        let celestialBodySymbolText = celestialBody.Symbol;
        
        let celestialBodySymbol = new Konva.Text({
            x: celestialBodyX,
            y: celestialBodyY,
            text: celestialBodySymbolText,
            fontSize: zodiacBeltWidth * 0.6,
            fontFamily: 'AstroDotBasic',
            fill: this.theme.PlanetColor,
            hadesMetadata:celestialBody,
            onCelestialBodyTouched: this.onCelestialBodyTouched,
            draggable: false,
            dragBoundFunc: this.celestialBodyDragged
        });

        celestialBodySymbol.on('mousedown touchstart click', function (evt) {
            let shape = evt.target;
            let onCelestialBodyTouched = shape.getAttr('onCelestialBodyTouched');
            if(onCelestialBodyTouched!==null)
                onCelestialBodyTouched(shape.getAttr('hadesMetadata'));
        });

        layer.add(celestialBodySymbol);
    }

    celestialBodyDragged(pos) {
        return {
          x: pos.x,
          y: pos.y
        };
    }

    drawMiddleFilledCircle(circleSettings, layer)
    {
        let innerCircle = new Konva.Circle({
            x: circleSettings.x,
            y: circleSettings.y,
            radius: circleSettings.radius,
            stroke: this.theme.DefaultWheelOutlineColor,
            strokeWidth: 1
        });
        
        layer.add(innerCircle);
    }
}
export default CelestialBodiesLayer;