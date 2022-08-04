import { youtubeDark, instargramDark, twitterDark, facebookDark } from '../../images';

function Footer() {
  return (
    <>
      <div className="Issuemoa-footer m-5">
        <br/>
        <small className="text-muted">Represented mail : conf312@gmail.com</small>
        <br/>
        <small className="text-muted">Inquiries about partnership : conf312@gmail.com</small>
        <br/>
        <small className="text-muted">Hosting businesses : AWS Korea</small>
        <p className="mt-3">
          <img src={youtubeDark} className="Cursor-pointer" height="30px;"></img>
          <img src={instargramDark} className="m-3 Cursor-pointer" height="30px;"></img>
          <img src={twitterDark} className="m-3 Cursor-pointer" height="30px;"></img>
          <img src={facebookDark} className="m-3 Cursor-pointer" height="30px;"></img>
        </p>
        <p><small className="text-muted">Copyright © VNEH Corp. All Rights Reserved.</small></p>
      </div>
    </>
  );
}

export default Footer;
