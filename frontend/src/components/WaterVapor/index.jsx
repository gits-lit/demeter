import './style.scss';

const WaterVapor = ({vapor}) => {
    
    return (
        <div className="container">
            <h1 className="title">Water Vapor</h1>
            <p className="metric">{vapor ?? 6.23}</p>
            <h3 className="subtitle">Fahrenheit</h3>
        </div>
    )
}

export default WaterVapor