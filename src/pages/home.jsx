import { useEffect } from "react";
import { Form, Link, useLoaderData, useActionData } from "react-router-dom";

//loader
export const loader = async () => {
  const req = await fetch("https://dummyjson.com/products");

  const data = req.json();
  return data;
};

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let firstName = formData.get("first-name");
  let lastName = formData.get("last-name");

  return { firstName, lastName };
};

function home() {
  const { products } = useLoaderData();
  const inputData = useActionData();

  useEffect(() => {
    if (inputData) {
      console.log(inputData);
    }
  }, [inputData]);

  return (
    <div>
      <div>
        <Form method="POST">
          <input
            type="text"
            className="border border-black"
            name="first-name"
          />
          <br />
          <br />
          <input type="text" className="border border-black" name="last-name" />
          <br />
          <button className="border">submit</button>
        </Form>
      </div>

      {products.map((product) => {
        return (
          <>
            <Link
              className="block"
              to={`product/${product.id}`}
              key={product.id}
            >
              {product.title}
            </Link>
          </>
        );
      })}
    </div>
  );
}

export default home;
