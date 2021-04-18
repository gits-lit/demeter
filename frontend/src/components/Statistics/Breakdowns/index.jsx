import './style.scss';

const Breakdowns = (props) => {
  return (
    <div class="Breakdowns-Stats">
      <h3 className="stat-title">{props.title}</h3>
      <p className="sub-title">
        Grade calculated by realtime data on your location.
      </p>
      <div className="row">
        <div className="grade">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #7DBDF9, #4091DC)',
            }}
          >
            {props.grade}
          </h1>
          <p className="criteria">
            {props.criteria}
       
          </p>
        </div>
        <div className="explanation">{props.explanation}</div>
      </div>
    </div>
  );
};

export default Breakdowns;
