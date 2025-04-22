import { loadPerson } from "../reducers/personSlice";
import baseUrl from "../../utils/axios";

export { removePerson } from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const details = await baseUrl.get(`/person/${id}`);
    const externalId = await baseUrl.get(`/person/${id}/external_ids`);
    const combinedCredits = await baseUrl.get(`/person/${id}/combined_credits`);
    const movieCredits = await baseUrl.get(`/person/${id}/movie_credits`);
    const tvCredits = await baseUrl.get(`/person/${id}/tv_credits`);

    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movies: movieCredits.data,
      tvShows: tvCredits.data,
    };

    dispatch(loadPerson(ultimateDetails));
  } catch (error) {
    console.error(error);
  }
};
