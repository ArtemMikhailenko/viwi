// Proxy all requests to the original backend

const target = "backend:8000";

export async function loader({ request }) {
  const newUrl = new URL(request.url);
  newUrl.host = target;

  const newRequest = new Request(newUrl.toString(), new Request(request));
  return await fetch(newRequest);
}
export async function action({ request }) {
  const newUrl = new URL(request.url);
  newUrl.host = target;

  const newRequest = new Request(newUrl.toString(), new Request(request));
  return await fetch(newRequest);
}
