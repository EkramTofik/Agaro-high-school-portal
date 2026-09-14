import api from "./axios";

export async function homeLoader() {
  const getPayload = (response) =>
    response.data?.data?.data || response.data?.data || response.data || [];

  const [schoolResult, presidentResult, newsResult] = await Promise.allSettled([
    api.get("/school"),
    api.get("/staff", { params: { isPresident: true, isActive: true } }),
    api.get("/news/top-news"),
  ]);

  const schoolPayload =
    schoolResult.status === "fulfilled" ? getPayload(schoolResult.value) : [];
  const presidentPayload =
    presidentResult.status === "fulfilled"
      ? getPayload(presidentResult.value)
      : [];
  const newsPayload =
    newsResult.status === "fulfilled" ? getPayload(newsResult.value) : [];

  const presidents = Array.isArray(presidentPayload)
    ? presidentPayload
    : [presidentPayload];

  return {
    school: Array.isArray(schoolPayload)
      ? schoolPayload[0] || null
      : schoolPayload,
    president:
      presidents.find((member) => member?.isPresident) || presidents[0] || null,
    topNews: Array.isArray(newsPayload) ? newsPayload : [],
  };
}
