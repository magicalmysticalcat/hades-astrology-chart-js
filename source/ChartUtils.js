
import {MathCalcs} from '@goldenius/hades-js';

class ChartUtils
{
    constructor()
    {
        this.mathCalcs = new MathCalcs();
    }

    getNormalizedDegree(degree, angleOffsetAC)
    {
        degree = this.mathCalcs.MOD(180-degree+angleOffsetAC);
        return degree;
    }

    getX(degree, radius)
    {
        let degRad = this.mathCalcs.Deg2Rad(degree);
        let val = Math.cos(degRad) * radius;
        return val;
    }

    getY(degree, radius)
    {
        let degRad = this.mathCalcs.Deg2Rad(degree);
        let val = Math.sin(degRad) * radius;
        return val;
    }

    getOpposite(degree)
    {
        degree += 180;
        if(degree > 360)
            degree -= 360;
        return degree;
    }
}

export default ChartUtils;