import './style.scss';

const CurrentlySelected = () => {
  return (
    <div className="currently-selected">
      <div className="text">
        <h2>Selected</h2>
        <h1>{ true ? "Drip Irrigation".substring(0, 6) + '...' : 'N/A'}</h1>
      </div>
      <div className="text">
        <h2>Size</h2>
        <h1>{true ? "Drip Irrigation".substring(0, 6) : 'N/A'}</h1>
      </div>
    </div>
  )
}

export default CurrentlySelected;