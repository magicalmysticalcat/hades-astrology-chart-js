import Konva from "konva";
import ChartUtils from './ChartUtils';
import {CreateZodiacSign} from '@goldenius/hades-js';

class ZodiacWheelLayer
{
    constructor(theme)
    {
        this.theme = theme;
        this.chartUtils = new ChartUtils();
    }

    drawZodiac(circleSettings, layer, angleOffsetAC, zodiacBeltWidth)
    {
        let currentDegree = 0;
        while(currentDegree<=360)
        {
            let radius = circleSettings.radius+zodiacBeltWidth;
            let normalizedDegree = this.chartUtils.getNormalizedDegree(currentDegree,angleOffsetAC);
            let sign = CreateZodiacSign(currentDegree);

            let outerX = this.chartUtils.getX(normalizedDegree,radius)+circleSettings.x;
            let outerY = this.chartUtils.getY(normalizedDegree,radius)+circleSettings.y;
            let innerX = this.chartUtils.getX(normalizedDegree,radius-zodiacBeltWidth)+circleSettings.x;
            let innerY = this.chartUtils.getY(normalizedDegree,radius-zodiacBeltWidth)+circleSettings.y;

            let zodiacLine = new Konva.Line({
                points: [outerX, outerY, innerX, innerY],
                stroke: this.theme.DefaultWheelOutlineColor,
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            });
            layer.add(zodiacLine);

            let textDegree = this.chartUtils.getNormalizedDegree(currentDegree + 15,angleOffsetAC);
            let textRadius = radius - (zodiacBeltWidth * 0.3);

            let textX = this.chartUtils.getX(textDegree,textRadius) + circleSettings.x - 4;
            let textY = this.chartUtils.getY(textDegree,textRadius) + circleSettings.y - 6;
            let textColor = this.theme.DefaultColor;
            
            if(sign.Element=='f')
                textColor = this.theme.ZodiacFontColors.Fire;
            else if(sign.Element=='e')
                textColor = this.theme.ZodiacFontColors.Earth;
            else if(sign.Element=='a')
                textColor = this.theme.ZodiacFontColors.Air;
            else if(sign.Element=='w')
                textColor = this.theme.ZodiacFontColors.Water;

            let zodiacSymbolText = new Konva.Text({
                x: textX,
                y: textY,
                text: sign.Symbol,
                fontSize: zodiacBeltWidth * 0.5,
                fontFamily: 'AstroDotBasic',
                fill: textColor
            });
            layer.add(zodiacSymbolText);

            let ringRulerStep = 0;
            while(ringRulerStep<30)
            {
                let rulerLenght = 5;
                if(ringRulerStep==9 || ringRulerStep==19)
                    rulerLenght = 10;
                let rulerNormalizedDegree = this.chartUtils.getNormalizedDegree(currentDegree+ringRulerStep,angleOffsetAC);
                let rulerOuterX = this.chartUtils.getX(rulerNormalizedDegree,radius-zodiacBeltWidth+rulerLenght)+circleSettings.x;
                let rulerOuterY = this.chartUtils.getY(rulerNormalizedDegree,radius-zodiacBeltWidth+rulerLenght)+circleSettings.y;
                let rulerInnerX = this.chartUtils.getX(rulerNormalizedDegree,radius-zodiacBeltWidth)+circleSettings.x;
                let rulerInnerY = this.chartUtils.getY(rulerNormalizedDegree,radius-zodiacBeltWidth)+circleSettings.y;
                let rulerLine = new Konva.Line({
                    points: [rulerOuterX, rulerOuterY, rulerInnerX, rulerInnerY],
                    stroke: this.theme.DefaultWheelOutlineColor,
                    strokeWidth: 0.8,
                    lineCap: 'round',
                    lineJoin: 'round'
                });
                layer.add(rulerLine);
                ringRulerStep+=1;
            }

            currentDegree+=ringRulerStep;
        }
        layer.draw();
    }
}
export default ZodiacWheelLayer;