import './style.scss';

const FireRisk = ({risk}) => {
    
    return (
        <div className="container">
            <h1 className="title">Fire Risk</h1>
            <p className="metric">🔥</p>
            <h3 className="subtitle">{risk ?? "Medium"}</h3>
        </div>
    )
}

export default FireRisk