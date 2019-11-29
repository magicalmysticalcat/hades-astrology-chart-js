import {TimeConversions} from '@goldenius/hades-js';
import Konva from "konva";
import ChartUtils from './ChartUtils';
import AspectsLayer from './AspectsLayer';
import CelestialBodiesLayer from './CelestialBodiesLayer';
import HousesLayer from './HousesLayer';
import ZodialWheelLayer from './ZodiacWheelLayer';

class ChartStage 
{
    constructor(theme)
    {
        Konva.pixelRatio = 2;
        this.theme = theme;
        this.timeConversions = new TimeConversions();
        this.chartUtils = new ChartUtils();
        this.aspectsLayer = new AspectsLayer(this.theme);
        this.aspectsLayer.onAspectTouched = function(aspect){
            if(this.onAspectTouched!==null && this.onAspectTouched!==undefined)
                this.onAspectTouched(aspect);
        }.bind(this);
        this.housesLayer = new HousesLayer(this.theme);
        this.zodiacWheelLayer = new ZodialWheelLayer(this.theme);        
        this.stage = {};
        this.mainLayer = {};
    }
    
    updateCanvas(canvas, arrayOfCelestialBodies, zodiacBeltWidth, houses, aspects)
    {
        let side = canvas.width;
        this.zodiacBeltWidth = zodiacBeltWidth;
        this.houses = houses;
        this.aspects = aspects;
        this.angleOffsetAC = this.houses[0].FullDistance;

        let radius = (side / 2)-this.zodiacBeltWidth-20;
        let circleSettings = {
            radius:radius,
            width:side,
            height:side,
            x:(side / 2),
            y:(side / 2)
        };

        let aspectCircleSettings = Object.assign({}, circleSettings);
        aspectCircleSettings.radius = circleSettings.radius * 0.3;

        if(typeof this.mainLayer.destroy === "function")
            this.mainLayer.destroy();

        if(typeof this.stage.destroy === "function")
            this.stage.destroy();
        
        this.stage = new Konva.Stage({
            container: 'chartCanvas',
            width: side,
            height: side,
        });

        this.mainLayer = new Konva.Layer();

        this.drawOuterFilledCircle(circleSettings, this.mainLayer);
        this.drawMiddleFilledCircle(circleSettings, this.mainLayer);

        this.zodiacWheelLayer.drawZodiac(circleSettings, this.mainLayer,this.angleOffsetAC,this.zodiacBeltWidth);
        this.housesLayer.drawHouses(circleSettings, this.mainLayer,this.houses,this.angleOffsetAC,this.zodiacBeltWidth);
        
        let radiusIncrement = (circleSettings.radius -  aspectCircleSettings.radius )/ arrayOfCelestialBodies.length;
        let currentRadius = aspectCircleSettings.radius + radiusIncrement;
        for(let i=0; i < arrayOfCelestialBodies.length; i++)
        {
            let celestialBodies = this.correctCelestialBodyLabelsDegrees(arrayOfCelestialBodies[i].sort((a, b) => a.TotalDegree - b.TotalDegree));
            let celestialBodiesSettings = Object.assign({}, circleSettings);

            celestialBodiesSettings.radius = currentRadius;
            let cbl = new CelestialBodiesLayer(this.theme);
            cbl.onCelestialBodyTouched = function (celestialBody){
                console.log(celestialBody);
                if(this.onCelestialBodyTouched!==null && this.onCelestialBodyTouched!==undefined)
                {
                    this.onCelestialBodyTouched(celestialBody);
                }
            }.bind(this);
            cbl.drawCelestialBodies(celestialBodiesSettings, 
                this.mainLayer,
                celestialBodies,
                this.angleOffsetAC,
                this.zodiacBeltWidth,
                true);
            currentRadius += radiusIncrement;
        }

        this.aspectsLayer.drawAspectCircle(aspectCircleSettings, this.mainLayer);
        this.aspectsLayer.drawAspects(aspectCircleSettings, this.aspects, this.mainLayer,this.angleOffsetAC,this.zodiacBeltWidth);

        this.stage.add(this.mainLayer);
    }

    correctCelestialBodyLabelsDegrees(celestialBodies)
    {
        for(let i=0;i<celestialBodies.length;i++)
        {
            celestialBodies[i].TotalDegreeCorrected = celestialBodies[i].TotalDegree;
            if(i<(celestialBodies.length-2))
                if( (celestialBodies[i+1].TotalDegree - celestialBodies[i].TotalDegree) <5)
                    celestialBodies[i].TotalDegreeCorrected -= 5;
        }
        return celestialBodies;
    }

    drawOuterFilledCircle(circleSettings, layer)
    {    
        let outerCircle = new Konva.Circle({
            x: circleSettings.x,
            y: circleSettings.y,
            radius: circleSettings.radius + this.zodiacBeltWidth,
            fill: this.theme.DefaultWheelBackgroundColor,
            stroke: this.theme.DefaultWheelOutlineColor,
            strokeWidth: 1.5
        });
        layer.add(outerCircle);
        layer.draw();
    }

    drawMiddleFilledCircle(circleSettings, layer)
    {
        let innerCircle = new Konva.Circle({
            x: circleSettings.x,
            y: circleSettings.y,
            radius: circleSettings.radius,
            fill: this.theme.DefaultWheelBackgroundColor,
            stroke: this.theme.DefaultWheelOutlineColor,
            strokeWidth: 1
        });
        
        layer.add(innerCircle);
        layer.draw();
    }
}

export default ChartStage;