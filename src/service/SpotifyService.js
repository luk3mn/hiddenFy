class SpotifyService {
  constructor() {
    this.base_endpoint = 'https://api.spotify.com/v1/me';
    this.error = '';
  }

  recentlyPlayed = async (limit, token) => {
    try {
      const response = await fetch(this.base_endpoint+`/player/recently-played?limit=${limit}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch recently played: ", error)
    }
  }

  currentlyPlayingTrack = async (token) => {
    try {
      const response = await fetch(`${this.base_endpoint}/player/currently-playing`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status == '204') {
        this.error = response.status
      }
        return await response.json();
    } catch (error) {
      return this.error;
    }
  }

}

export default new SpotifyService();