import React from "react";

function Album(props) {
  console.log(props.album);
  return (
    <>
      <div className="album">
        <div className="album_info">
          <img src={props.albumCover} alt="Album-cover" className="album-img" />
          <p className="album-title">{props.album}</p>
          <span className="album-artist">{props.artist}</span>
          <button className="btn dt" onClick={() => props.onRemove(props.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Album;
