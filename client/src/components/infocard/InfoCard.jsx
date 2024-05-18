import "./InfoCard.css";

const InfoCard = (props) => {
  return (
    <div className="infoCard">
      <img src={"/profile.png"} alt="pfp" className="pfp" style={{height:"150px"}} />
      <p className="name">
         {"Abhishek"} {"sharma"}
      </p>
      <p className="username">
        {`Username:    ${"abhiii"}`}
      </p>
      <p className="uni">{`University: ${"aktu"}`}</p>
    </div>
  );
};

export default InfoCard;
