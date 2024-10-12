class HandleDataService {
  constructor() {
    this.tracks = [];
    this.track_obj = {};
  }

  tracksFormatter = (data) => {
    Object.entries(data).forEach(item => {
      if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
          let track_obj = {};
          // console.log("ITEM: ", item.track)
          
          track_obj.song = item.track.name;
          track_obj.album = item.track.album.name;
          track_obj.preview_url = item.track.preview_url;
          track_obj.artist = item.track.album.artists[0].name;
          track_obj.image = item.track.album.images[0].url
          
          this.tracks.push(track_obj);
        });
      }

      return this.tracks;
    })
  }

  itemFormatter = (data) => {
    // Object.entries(data).forEach(item => {
      // if (data.items && data.items.length > 0) {
      //   data.items.forEach((item) => {
          // console.log("ITEM: ", item.track)
          
          track.song = data.track.name;
          this.track_obj.album = data.track.album.name;
          this.track_obj.preview_url = data.track.preview_url;
          this.track_obj.artist = data.track.album.artists[0].name;
          this.track_obj.image = data.track.album.images[0].url
          // this.track_obj = {};
        // });
      // }
    // })

    return this.track_obj;
  }
}

// export default new HandleDataService();
export const tracksFormatter = new HandleDataService().tracksFormatter;
export const itemFormatter = new HandleDataService().itemFormatter;