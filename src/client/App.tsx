import { useGetProductsQuery } from "./api/api";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { reset, addMany, addOne } from "./slices/counter";

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);

  const { isLoading, isSuccess, data, isError, error } =
    useGetProductsQuery(null);

  const content = isLoading ? (
    <div>Loading... (2 second wait)</div>
  ) : isSuccess && data ? (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  ) : isError && error ? (
    <div>{error.toString()}</div>
  ) : null;

  return (
    <>
      <h1>React Template</h1>
      <h2>State</h2>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(addOne())}>Add 1</button>
      <button onClick={() => dispatch(addMany(2))}>Add 2</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <h2>API</h2>
      <div>{content}</div>
    </>
  );
}

export default App;
