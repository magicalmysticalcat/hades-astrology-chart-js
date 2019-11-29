import Konva from "konva";
import ChartUtils from './ChartUtils';

class AspectsLayer
{
    constructor(theme)
    {
        this.theme = theme
        this.chartUtils = new ChartUtils();
        this.onAspectTouched = null;
    }


    drawAspectCircle(circleSettings, layer)
    {
        let aspectsCircle = new Konva.Circle({
            x: circleSettings.x,
            y: circleSettings.y,
            radius: circleSettings.radius,
            stroke: this.theme.DefaultWheelOutlineColor,
            fill:this.theme.DefaultWheelBackgroundColor
        });
        layer.add(aspectsCircle);
        layer.draw();
    }

    drawAspects(circleSettings, aspects, layer, angleOffsetAC)
    {        
        aspects.forEach(aspect => {

            let degFrom = this.chartUtils.getNormalizedDegree(parseFloat(aspect.fromDeg),angleOffsetAC);
            let xFrom = this.chartUtils.getX(degFrom,circleSettings.radius) + circleSettings.x;
            let yFrom = this.chartUtils.getY(degFrom,circleSettings.radius) + circleSettings.y;
            let degTo = this.chartUtils.getNormalizedDegree(parseFloat(aspect.toDeg),angleOffsetAC);
            let xTo = this.chartUtils.getX(degTo,circleSettings.radius) + circleSettings.x;
            let yTo = this.chartUtils.getY(degTo,circleSettings.radius) + circleSettings.y;
            let aspectColor = this.getAspectColor(aspect.type);

            let aspectLine = new Konva.Line({
                points: [xFrom, yFrom, xTo, yTo],
                stroke: aspectColor,
                strokeWidth: 1,
                hitStrokeWidth: 3, 
                hadesMetadata:aspect,
                onAspectTouched:this.onAspectTouched
            });
            aspectLine.on('mousedown touchstart', function (evt) {
                let shape = evt.target;
                let onAspectTouched = shape.getAttr('onAspectTouched')
                if(onAspectTouched!==null)
                    onAspectTouched(shape.getAttr('hadesMetadata'));
            });
            
            layer.add(aspectLine);
        });
        layer.draw();
    }

    getAspectColor (aspectType) {
        if(aspectType === undefined || aspectType == null || aspectType.length < 2)
            return this.theme.AspectsColors.Undefined;
        
        return this.theme.AspectsColors[this.capitalizeFirstLetter(aspectType)];
    }

    capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default AspectsLayer;