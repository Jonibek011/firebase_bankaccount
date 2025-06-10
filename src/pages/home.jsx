import { useEffect } from "react";
import { Form, Link, useLoaderData, useActionData } from "react-router-dom";

//loader
export const loader = async () => {
  const req = await fetch("https://dummyjson.com/products");

  const data = req.json();
  return data;
};

//useGlobalContext
import useGlobalContext from "../hooks/useGlobalContext";
//firestore
import { useFirestore } from "../hooks/useFirestore";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let firstName = formData.get("first-name");
  let lastName = formData.get("last-name");

  return { firstName, lastName };
};

function home() {
  const { addDocument } = useFirestore();
  const { products } = useLoaderData();
  const inputData = useActionData();

  const { user } = useGlobalContext();

  useEffect(() => {
    if (inputData) {
      console.log(inputData);
    }
  }, [inputData]);

  useEffect(() => {
    addDocument("product", { name: "Jonibek", age: 29, uid: user.uid });
  }, []);

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
