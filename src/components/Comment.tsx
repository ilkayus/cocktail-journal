import userIcon from "../img/user.svg";

const Comment = () => {
  return (
    <div className="comment--container">
      <div className="comment--head">
        <img src={userIcon} alt="user icon" className="comment--image" />
        <h4 className="comment--username">Username</h4>
      </div>
      <div>
        <p className="comment--comment">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          voluptatum earum animi, perspiciatis repellendus tenetur sequi
          suscipit saepe dolor nemo facere eum ex.
        </p>
      </div>
    </div>
  );
};
export default Comment;
