import userIcon from "../img/user.svg";
export interface Props {
  username: string;
  userPhoto: string | undefined;
  commentText: string;
}
const Comment = ({ username, userPhoto, commentText }: Props) => {
  return (
    <div className="comment--container">
      <div className="comment--head">
        <img
          src={userPhoto ? userPhoto : userIcon}
          alt="user icon"
          className="comment--image"
        />
        <h4 className="comment--username">{username}</h4>
      </div>
      <div>
        <p className="comment--comment">{commentText}</p>
      </div>
    </div>
  );
};
export default Comment;
