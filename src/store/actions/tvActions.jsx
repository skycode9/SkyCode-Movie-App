import { loadTV } from "../reducers/tvSlice";
import baseUrl from "../../utils/axios";

export { removeTV } from "../reducers/tvSlice";

export const asyncLoadTV = (id) => async (dispatch, getState) => {
  try {
    const details = await baseUrl.get(`/tv/${id}`);
    const externalId = await baseUrl.get(`/tv/${id}/external_ids`);
    const recommendations = await baseUrl.get(`/tv/${id}/recommendations`);
    const similar = await baseUrl.get(`/tv/${id}/similar`);
    const videos = await baseUrl.get(`/tv/${id}/videos`);
    const watchProviders = await baseUrl.get(`/tv/${id}/watch/providers`);
    const translations = await baseUrl.get(`tv/${id}/translations`);

    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((video) => video.type === "Trailer"),
      watchProviders: watchProviders.data.results.US,
    };

    dispatch(loadTV(ultimateDetails));
  } catch (error) {
    console.error(error);
  }
};
