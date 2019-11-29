class Theme
{
    constructor(){
        
    }

    GetTheme (type){
        return Theme.GetClassic();
    }

    GetClassic()
    {
        return {
            BackgroundColor:'#040e19',
            ZodiacFontColors:{
                Water:'#0ED0C1',
                Fire:'#E63C17',
                Air:'#EAE30C',
                Earth:'#20B90E'
            },
            DefaultWheelBackgroundColor:'#040e19',
            DefaultWheelOutlineColor:'#2da6a9',
            AspectsColors:{
                Conjunction:'#E63C17',
                Trine:'#0ED0C1',
                Sextile:'#0ED0C1',
                Opposition:'#E63C17',
                Square:'#E63C17',
                Quincux:'#0ED0C1',
                Undefined:'#FFFFFF'
            },
            PlanetColor:'#FFFFFF',
            DetailsTextColor:'',
            TransitingBodyColor:'#3892FF',
            DefaultColor: '#2da6a9',
            Houses:{
                DivisionThickness:1,
                DivisionColor:'#2da6a9',
                AxisThickness:3,
                AxisColor:'#2da6a9'
            }
        };
    }
}

export default Theme;