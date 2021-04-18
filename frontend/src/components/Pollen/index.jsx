import './style.scss';

const Pollen = ({risk}) => {
    
    return (
        <div className="container">
            <h1 className="title">Pollen</h1>
            <p className="metric">🌿</p>
            <h3 className="subtitle">{risk ?? "Low"}</h3>
        </div>
    )
}

export default Pollen