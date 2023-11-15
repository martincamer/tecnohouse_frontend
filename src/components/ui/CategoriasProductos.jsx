import { useAluminioContext } from "../../context/AluminioProvider";

export const CategoriasProductos = ({
  openModal,
  openModalCrearCategoria,
  openModalVerCategoria,
}) => {
  const { openModalEditarColores, openModalVerColores } = useAluminioContext();

  return (
    <div>
      <div className="space-x-3">
        <button
          onClick={openModal}
          className="bg-green-500 text-primary font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo perfil
        </button>
        <button
          onClick={openModalCrearCategoria}
          className="bg-yellow-300 text-primary font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nueva categoria
        </button>
        <button
          onClick={openModalVerColores}
          className="bg-blue-300 text-primary font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Crear nuevo color
        </button>
        <button
          onClick={openModalVerCategoria}
          className="bg-slate-300 text-primary font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Ver categorias creadas
        </button>
        <button
          onClick={openModalEditarColores}
          className="bg-red-300 text-primary font-bold py-2 px-3 rounded cursor-pointer hover:shadow hover:shadow-black/20 transition-all ease-in-out"
        >
          Ver colores creados
        </button>
      </div>
    </div>
  );
};
