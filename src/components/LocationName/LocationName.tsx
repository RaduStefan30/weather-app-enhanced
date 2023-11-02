import './LocationName.scss';

const LocationName = ({
  name,
  region,
  country,
  classNames,
}: {
  name: string;
  region: string;
  country: string;
  classNames: string;
}) => {
  return (
    <div className={classNames}>
      {name}
      {region && `,  ${region}`}, {country}
    </div>
  );
};

export default LocationName;
