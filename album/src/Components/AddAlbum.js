import React, { Component } from "react";

class AddAlbum extends Component {
  state = {
    album: "",
    artist: "",
    albumCover: null,
  };

  fileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({
      albumCover: URL.createObjectURL(file),
    });
  };

  handleSumbit = (e) => {
    e.preventDefault();
    const { album, artist, albumCover } = this.state;
    const newAlbum = {
      id: new Date().getTime().toString(),
      album: album,
      artist: artist,
      albumCover: albumCover,
    };
    const albumList = this.props.onAdd(newAlbum);

    this.setState({
      album: "",
      artist: "",
      albumCover: null,
      albumList: albumList,
    });

    const formdata = new FormData();
    formdata.append("image", newAlbum.albumCover);
    formdata.append("albumTitle", newAlbum.album);
    formdata.append("artist", newAlbum.artist);

    const API_URL = "https://api.imgur.com/3/image";

    let config = {
      Headers: {
        Authorization: "Client-ID 065b977c9d3b24a",
        Accept: "application/json",
      },
    };

    fetch(API_URL, formdata, config)
      .then((res) => {
        return console.log(res);
      })
      .catch((err) => {
        return console.log("error", err);
      });
  };

  render() {
    return (
      <>
        <div className="form-header">
          <form onSubmit={this.handleSumbit}>
            <h2>Add Album</h2>
            <input
              type="text"
              name="album"
              placeholder="Add Title"
              className="input_text"
              onChange={(e) => this.setState({ album: e.target.value })}
              value={this.state.album}
              required={true}
            />
            <input
              type="text"
              name="artist"
              placeholder="Add Artist"
              className="input_text"
              onChange={(e) => this.setState({ artist: e.target.value })}
              value={this.state.artist}
              required={true}
            />
            <input
              type="file"
              accept="image/*"
              name="albumCover"
              className="choose_img"
              onChange={this.fileChange}
              required={true}
            />
            <button className="btn upload">Upload</button>
          </form>
        </div>
      </>
    );
  }
}

export default AddAlbum;
