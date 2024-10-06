class SpotifyService {
  constructor() {
    this.base_endpoint = 'https://api.spotify.com/v1/me';
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

}

export default new SpotifyService();