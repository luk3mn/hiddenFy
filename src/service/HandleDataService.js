import moment from "moment";

class HandleDataService {
  constructor() {
    this.tracks = [];
    this.track_obj = {};
  }

  // tracksFormatter = (data) => {
  //   let objects = {};
  //   if (data.items && data.items.length > 0) {
  //     Object.entries(data.items).map(item => {

  //       objects.played_at = moment(new Date(item[1].played_at)).format('YYYY-MM-DD:hh:mm:SS');
  //       objects.title = item[1].track.name;
  //       objects.album = item[1].track.album.name;
  //       objects.preview_url = item[1].track.preview_url;
  //       objects.artist = item[1].track.album.artists[0].name;
  //       objects.image = item[1].track.album.images[0].url
        
  //       this.tracks.push(objects);
  //       // this.tracks.map((item) => {
  //       //   if (!item.played_at === objects.played_at) {
  //       //   }
  //       // })
  //     })
      
  //     console.log("TRACKS.............>>>.: ", this.tracks)
  //   }

  //   return this.tracks
  // }

  tracksFormatter = (data) => {
    this.tracks = [];

    if (data.items && data.items.length > 0) {
      Object.entries(data.items).forEach(item => {

        let trackObject = {};

        trackObject.played_at = moment(new Date(item[1].played_at)).format('YYYY-MM-DD HH:mm:ss:SSS');
        trackObject.title = item[1].track.name;
        trackObject.album = item[1].track.album.name;
        trackObject.preview_url = item[1].track.preview_url;
        trackObject.artist = item[1].track.album.artists[0].name;
        trackObject.image = item[1].track.album.images[0].url
        
        this.tracks.push(trackObject);
        // this.tracks.map((item) => {
        //   if (!item.played_at === objects.played_at) {
        //   }
        // })
      })
      
      console.log("TRACKS.............>>>.: ", this.tracks)
    }

    return this.tracks
  }

  itemFormatter = (data) => {
    
    if (data.item) {
      this.track_obj.title = data.item.name;
      this.track_obj.album = data.item.album.name;
      this.track_obj.preview_url = data.item.preview_url;
      this.track_obj.artist = data.item.album.artists[0].name;
      this.track_obj.image = data.item.album.images[0].url

      console.log("DATA............: ", data.item.preview_url)
    }

    return this.track_obj;
  }
}

// export default new HandleDataService();
export const tracksFormatter = new HandleDataService().tracksFormatter;
export const itemFormatter = new HandleDataService().itemFormatter;