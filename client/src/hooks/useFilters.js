import useQuery from "./useQuery";

export default function useFilters() {
  const query = useQuery();
  const limit = query.has("limit") ? query.get("limit") : 10;
  const page = query.has("page") ? query.get("page") : 0;
  const s = query.has("s") ? query.get("s") : "";
  const myPosts = query.has("myPosts") ? true : false;
  const filters = {
    limit,
    page,
    s,
    myPosts,
  };
  return filters;
}
