import './style.scss';

const Breakdowns = (props) => {
  return (
    <div className="Breakdowns fade-up">
      <h3>{props.title}</h3>
      <p className="subtitle">
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
        </div>
        <div className="explanation">{props.explanation}</div>
      </div>
    </div>
  );
};

export default Breakdowns;
