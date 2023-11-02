import './Night.scss';

const Night = () => {
  return (
    <div className="night background" data-testid="night-background">
      <img src="/night.png" alt="night landscape" loading="lazy" />
    </div>
  );
};

export default Night;
