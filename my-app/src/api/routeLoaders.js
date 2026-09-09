import api from "./axios";

export const createPageLoader = (endpoints) => async () => {
  await Promise.allSettled(endpoints.map((endpoint) => api.get(endpoint)));
  return null;
};

export const newsDetailLoader = async ({ params }) => {
  await Promise.allSettled([api.get(`/news/${params.slug}`)]);
  return null;
};
