import Konva from "konva";
import ChartUtils from './ChartUtils';

class HousesLayer
{
    constructor(theme)
    {
        this.theme = theme;
        this.chartUtils = new ChartUtils();
    }

    drawHouses(circleSettings, layer, houses, angleOffsetAC)
    {
        this.drawHouse(layer,circleSettings,houses[0],true,angleOffsetAC);
        this.drawHouse(layer,circleSettings,houses[1],false,angleOffsetAC);
        this.drawHouse(layer,circleSettings,houses[2],false,angleOffsetAC);
        this.drawHouse(layer,circleSettings,houses[3],true,angleOffsetAC);
        this.drawHouse(layer,circleSettings,houses[4],false,angleOffsetAC);
        this.drawHouse(layer,circleSettings,houses[5],false,angleOffsetAC);

        layer.draw();
    }

    drawHouse(layer,circleSettings, house, bold, angleOffsetAC)
    {
        let radius = circleSettings.radius;

        let deg = this.chartUtils.getNormalizedDegree(parseFloat(house.FullDistance),angleOffsetAC);
        let opDeg = this.chartUtils.getNormalizedDegree(this.chartUtils.getOpposite(parseFloat(house.FullDistance)),angleOffsetAC);

        let x = this.chartUtils.getX(deg,radius) + circleSettings.x;
        let y = this.chartUtils.getY(deg,radius) + circleSettings.y;
        let opX = this.chartUtils.getX(opDeg,radius) + circleSettings.x;
        let opY = this.chartUtils.getY(opDeg,radius) + circleSettings.y;

        let lineWidth = bold?this.theme.Houses.AxisThickness:this.theme.Houses.DivisionThickness;
        let lineColor = bold?this.theme.Houses.AxisColor:this.theme.Houses.DivisionColor;

        let houseLine = new Konva.Line({
            points: [x, y, opX, opY],
            stroke: lineColor,
            strokeWidth: lineWidth
        });
        layer.add(houseLine);
    }
}
export default HousesLayer;