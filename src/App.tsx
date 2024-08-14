import { ReactQuill } from "./components";

function App() {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h1 className="text-4xl">Teste de bibliotecas de editores Rich Text</h1>
      <hr className="my-4" />

      <h2 className="text-2xl mb-2 ">ReactQuill</h2>

      <div className="w-full">
        <ReactQuill />
      </div>
    </div>
  );
}

export default App;
