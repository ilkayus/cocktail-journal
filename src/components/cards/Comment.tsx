import { icons } from "img";
export interface Props {
  username: string;
  userPhoto: string | undefined;
  commentText: string;
  createDate: string;
}
const Comment = ({ username, userPhoto, commentText, createDate }: Props) => {
  const date = Date.now() - Date.parse(createDate);
  let dateText = "0s";
  // prettier-ignore
  if(date>(1000*60*60*24*7*4*12)) dateText = `${Math.floor(date/(1000*60*60*24*7*4*12))} y`;
  else if(date>(1000*60*60*24*7*4)) dateText = `${Math.floor(date/(1000*60*60*24*7*4))} m`;
  else if(date>(1000*60*60*24*7)) dateText = `${Math.floor(date/(1000*60*60*24*7))} w`;
  else if(date>(1000*60*60*24)) dateText = `${Math.floor(date/(1000*60*60*24))} d`;
  else if(date>(1000*60*60)) dateText = `${Math.floor(date/(1000*60*60))} h`;
  else if(date>(1000*60)) dateText = `${Math.floor(date/(1000*60))} m`;
  else if(date>(1000)) dateText = `${Math.floor(date/(1000))} s`;
  //console.log(date, "dt:", dateText);
  //1000ms*60s*60m*24h*30d*12m*1y
  return (
    <div className="comment--container" id="comment--comments">
      <div className="comment--head">
        <img
          src={userPhoto ? userPhoto : icons.user}
          alt="user icon"
          className="comment--image"
        />
        <h4 className="comment--username">{username}</h4>
        <h4 className="comment--createdate">{dateText}</h4>
      </div>
      <div className="comment--comment-text-container">
        <p className="comment--comment-text">{commentText}</p>
      </div>
    </div>
  );
};
export default Comment;
