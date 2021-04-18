import './style.scss';

const SoilTemp = ({temperature}) => {
    
    return (
        <div className="container">
            <h1 className="title">Soil Temp</h1>
            <p className="metric">{temperature ?? 70}°</p>
            <h3 className="subtitle">Fahrenheit</h3>
        </div>
    )
}

export default SoilTemp