import { useState } from "react";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalEliminarAccesorio } from "./ModalEliminarAccesorio";

export const TableAccesorios = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
  resultadosFiltrados,
}) => {
  const { handleEliminar } = useAccesoriosContext();

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  return (
    <div className=" rounded shadow-black/10 shadow max-md:shadow-none max-md:flex-none flex flex-col gap-3 w-full">
      <table className="border-[1px] border-gray-200  p-[5px] w-full rounded uppercase">
        <thead>
          <tr>
            <th className="p-3 max-md:p-2 text-sm">ID</th>
            <th className="p-3 max-md:p-2 text-sm">Codigo</th>
            <th className="p-3 max-md:p-2 text-sm">Stock</th>
            <th className="p-3 max-md:p-2 text-sm">Categoria</th>
            <th className="p-3 max-md:p-2 text-sm">Color</th>
            <th className="p-3 max-md:p-2 text-sm">Detalle</th>
            <th className="p-3 max-md:p-2 text-sm">Eliminar</th>
            <th className="p-3 max-md:p-2 text-sm">Editar</th>
          </tr>
        </thead>
        <tbody>
          {resultadosFiltrados?.map((p) => (
            <tr key={p.id}>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.id}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.nombre}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.stock}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.categoria}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium max-md:p-2 max-md:text-sm">
                {p.descripcion}
              </th>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium">
                {p.disponible ? "SI" : "NO"}
              </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-bold max-md:p-2">
                <button
                  className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-xs max-md:font-normal 
"
                  // onClick={() => handleEliminar(p.id)}
                  onClick={() => handleBorrarAccesorioOpen()}
                >
                  eliminar
                </button>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-bold  max-md:p-2">
                <button
                  onClick={() => {
                    openModalEditar(), handlePerfilSeleccionado(p.id);
                  }}
                  className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                >
                  editar
                </button>
              </th>
              <ModalEliminarAccesorio
                p={p.id}
                handleEliminar={handleEliminar}
                openBorrarAccesorio={openBorrarAccesorio}
                handleBorrarAccesorioClose={handleBorrarAccesorioClose}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
