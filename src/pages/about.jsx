import useGlobalContext from "../hooks/useGlobalContext";
function about() {
  const { name } = useGlobalContext();

  return <div>{name}</div>;
}

export default about;
