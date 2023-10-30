import './LocationName.scss';

const LocationName = ({
  name,
  region,
  country,
}: {
  name: string;
  region: string;
  country: string;
}) => {
  return (
    <>
      {name}
      {region && `,  ${region}`}, {country}
    </>
  );
};

export default LocationName;
