import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const req = await fetch(`https://dummyjson.com/products/${params.id}`);
  const data = req.json();

  return data;
};

function products() {
  const data = useLoaderData();

  return <div key={data.id}>{data.title}</div>;
}

export default products;
