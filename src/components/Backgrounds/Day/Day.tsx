import './Day.scss';

const Day = () => {
  return (
    <div className="background day" data-testid="day-background">
      <img src="/day.png" alt="colorful day landscape" loading="lazy" />
    </div>
  );
};

export default Day;
