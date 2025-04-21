import { loadMovie } from "../reducers/movieSlice";
import baseUrl from "../../utils/axios";

export { removeMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await baseUrl.get(`/movie/${id}`);
    const externalId = await baseUrl.get(`/movie/${id}/external_ids`);
    const recommendations = await baseUrl.get(`/movie/${id}/recommendations`);
    const similar = await baseUrl.get(`/movie/${id}/similar`);
    const videos = await baseUrl.get(`/movie/${id}/videos`);
    const watchProviders = await baseUrl.get(`/movie/${id}/watch/providers`);
    const translations = await baseUrl.get(`movie/${id}/translations`);

    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((video) => video.type === "Trailer"),
      watchProviders: watchProviders.data.results.US,
    };

    dispatch(loadMovie(ultimateDetails));
  } catch (error) {
    console.error(error);
  }
};
