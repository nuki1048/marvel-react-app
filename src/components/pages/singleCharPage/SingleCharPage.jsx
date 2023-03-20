import "./SingleCharPage.scss";

const SingleCharPage = ({ data }) => {
  const { name, descr, thumnail } = data;

  return (
    <div className="single-comic">
      <img src={thumnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{descr}</p>
      </div>
    </div>
  );
};

export default SingleCharPage;
