import { Link } from "react-router-dom";
import { usePedidoContext } from "../../context/PedidoProvider";
import { ModalEditarRemito } from "./ModalEditarRemito";
import { useState } from "react";

export const TablePedidos = () => {
  const { handleDeletePresupuesto, results } = usePedidoContext();
  const [obtenerId, setObtenerId] = useState("");

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function dateTime(data) {
    return new Date(data).toLocaleDateString("arg", options);
  }

  let [isOpen, setIsOpen] = useState(false);

  const openModalRemito = () => {
    setIsOpen(true);
  };

  const closeModalRemito = () => {
    setIsOpen(false);
  };

  const handleObtenerId = (id) => {
    setObtenerId(id);
  };

  console.log(obtenerId);

  console.log(results);

  // Función para sumar la cantidad de todos los objetos

  return (
    <table className="border-[1px]  p-[5px] table-auto w-full rounded">
      <thead>
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Cliente</th>
          <th className="p-3">Detalle de linea - categoria</th>
          <th className="p-3">Total aberturas</th>
          <th className="p-3">Fecha de entrega</th>
          <th className="p-3">Remito</th>
          <th className="p-3">Eliminar</th>
          <th className="p-3">Ver pedido</th>
        </tr>
      </thead>
      <tbody>
        {results.map((p) => (
          <tr key={p?.id}>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.id}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.cliente}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.detalle}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm">
              {p?.productos.respuesta.reduce((sum, b) => {
                return sum + Number(b?.cantidad);
              }, 0)}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {dateTime(p?.fecha)}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {p?.remito}-{" "}
              <button
                onClick={() => {
                  openModalRemito(), handleObtenerId(p?.id);
                }}
                className="bg-orange-500 font-bold py-1 px-2 text-white rounded text-sm cursor-pointer"
              >
                editar
              </button>
            </th>
            <th className="border-[1px] border-gray-300 p-3">
              <button
                className="bg-red-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
                onClick={() => handleDeletePresupuesto(p.id)}
              >
                eliminar
              </button>
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-bold">
              <Link
                to={`/pedido/${p?.id}`}
                className="bg-blue-500 py-1 px-2 text-white rounded text-sm cursor-pointer"
              >
                ver pedido
              </Link>
            </th>
          </tr>
        ))}
        <ModalEditarRemito
          obtenerId={obtenerId}
          isOpen={isOpen}
          closeModalRemito={closeModalRemito}
        />
      </tbody>
    </table>
  );
};
