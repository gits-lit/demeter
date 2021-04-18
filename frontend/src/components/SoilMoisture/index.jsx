import './style.scss';

const SoilTemp = ({moisture}) => {
    
    return (
        <div className="container">
            <h1 className="title">Soil Moisture</h1>
            <p className="metric">{moisture ?? 95}%</p>
            <h3 className="subtitle">Volumetric Moisture</h3>
        </div>
    )
}

export default SoilTemp