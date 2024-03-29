import { useAberturasContext } from "../../context/AluminioAberturas";
import { ModalEditaStock } from "./ModalEditarStock";
import { ModalEliminarAberturas } from "./ModalEliminarAbertura";
import { useState } from "react";
import { ModalNuevaSalida } from "./ModalNuevaSalida";
import { CrearNuevaEntrada } from "./CrearNuevaEntrada";
import XLSX from "xlsx";

export const TableAberturas = ({
  results,
  openModalEditar,
  handlePerfilSeleccionado,
}) => {
  const { handleEliminar } = useAberturasContext();

  const [openBorrarAccesorio, setOpenBorrarAccesorio] = useState(false);
  const [openModalEditarStock, setOpenModalEditarStock] = useState(false);
  const [guardarId, setGuardarId] = useState(false);

  const [obtenerId, setObtenerId] = useState(null);

  const handleId = (id) => setObtenerId(id);

  const [isOpenEntrada, setIsOpenEntrada] = useState(false);
  const openEntrada = () => setIsOpenEntrada(true);
  const closeEntrada = () => setIsOpenEntrada(false);

  const [isOpenSalida, setIsOpenSalida] = useState(false);
  const openSalida = () => setIsOpenSalida(true);
  const closeSalida = () => setIsOpenSalida(false);

  const handleBorrarAccesorioOpen = () => {
    setOpenBorrarAccesorio(true);
  };

  const handleBorrarAccesorioClose = () => {
    setOpenBorrarAccesorio(false);
  };

  const handleModalEditarStockOpen = () => {
    setOpenModalEditarStock(true);
  };

  const handleModalEditarStockClose = () => {
    setOpenModalEditarStock(false);
  };
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar primero los elementos con stock mayor que 0 y luego los que tienen stock menor o igual a 0
  const filteredResults = results
    ?.filter((p) => p.stock > 0)
    .concat(results?.filter((p) => p.stock <= 0));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calcular el total de páginas basado en los resultados filtrados
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDescargarExcel = () => {
    // Filtrar las aberturas con stock mayor que 0
    const aberturasConStock = results.filter((abertura) => abertura.stock > 0);

    // Mapear los datos a un formato adecuado para el archivo Excel
    const dataToExport = aberturasConStock.map((abertura) => ({
      // ID: abertura.id,
      // Codigo: abertura.nombre,
      Detalle: abertura.descripcion,
      Categoria: abertura.categoria,
      Color: abertura.color,
      "Ancho x Alto": `${abertura.ancho} x ${abertura.alto}`,
      Stock: abertura.stock,
    }));

    // Crear el libro de trabajo
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Escribir el archivo Excel y descargarlo
    XLSX.writeFile(wb, "datos.xlsx");
  };

  return (
    <div>
      <div className="flex flex-col gap-3 max-md:flex md:hidden">
        {currentResults.map((p) => (
          <div
            className="border-slate-300 border-[1px] shadow rounded-xl py-3 px-2 flex justify-between items-center"
            key={p.id}
          >
            <div className="w-full">
              <p className="font-bold text-slate-700 text-xs">{p.id}</p>
              <p className="font-bold text-slate-700 text-xs uppercase">
                - {p.descripcion}
              </p>
              <p className="font-bold text-slate-700 text-xs uppercase">
                {p.ancho}x{p.alto}
              </p>
              <p className="font-bold text-slate-700 text-xs uppercase">
                {p.categoria}
              </p>
              <p className="font-bold text-slate-700 text-xs">
                STOCK:{" "}
                <span
                  className={`${
                    p.stock_minimo > p.stock ? "text-red-600" : "text-green-500"
                  } text-xs`}
                >
                  {p.stock}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full  h-[70px] overflow-y-scroll">
              <button
                className="bg-red-500/10 text-red-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  handleBorrarAccesorioOpen(), setGuardarId(p.id);
                }}
              >
                Eliminar
              </button>

              <button
                className="bg-black/10 text-black-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openModalEditar(), handlePerfilSeleccionado(p.id);
                }}
              >
                Editar
              </button>

              <button
                className="bg-indigo-500/10 text-indigo-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openSalida(), handleId(p.id);
                }}
              >
                Crear Salida
              </button>

              <button
                className="bg-indigo-500/10 text-indigo-800 uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  openEntrada(), handleId(p.id);
                }}
              >
                Crear Entrada
              </button>

              <button
                className="bg-black text-white uppercase text-xs py-2 px-4 rounded-xl font-normal  cursor-pointer max-md:text-xs max-md:font-normal"
                onClick={() => {
                  handleModalEditarStockOpen(), handlePerfilSeleccionado(p.id);
                }}
              >
                Editar Stock
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5 max-md:mt-0 max-md:hidden md:block">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                ID
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Codigo
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Stock
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Categoria
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Color
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Detalle
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Ancho x Alto
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Eliminar
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Editar
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Editar stock
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Nueva Salida{" "}
              </th>
              <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                Nueva Entrada{" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-left">
            {currentResults.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
              >
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.id}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.nombre}
                </td>
                <td
                  className={`py-3 px-3 text-sm text-left ${
                    p.stock > 0 ? "text-green-500" : "text-red-800"
                  } font-bold uppercase`}
                >
                  {p.stock}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.categoria}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.color}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.descripcion}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  {p.ancho} x {p.alto}
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                  <button
                    onClick={() => {
                      handleBorrarAccesorioOpen(), setGuardarId(p.id);
                    }}
                    className="bg-red-100 text-red-800 py-2 shadow-black/30 px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                    // onClick={() => handleEliminar(p.id)}
                  >
                    ELIMINAR
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      openModalEditar(), handlePerfilSeleccionado(p.id);
                    }}
                    className="bg-indigo-500 text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    EDITAR
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      handleModalEditarStockOpen(),
                        handlePerfilSeleccionado(p.id);
                    }}
                    className="bg-slate-500 text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    EDITAR
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      openSalida(), handleId(p.id);
                    }}
                    className="bg-black text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    CREAR NUEVA SALIDA
                  </button>
                </td>
                <td className="py-3 px-3 text-sm text-left text-slate-700">
                  <button
                    onClick={() => {
                      openEntrada(), handleId(p.id);
                    }}
                    className="bg-green-500 text-white py-2 shadow px-6 rounded-xl text-sm cursor-pointer max-md:text-xs max-md:font-normal"
                  >
                    CREAR NUEVA ENTRADA
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Anterior
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-indigo-500 hover:bg-primary transition-all ease-in-out text-white shadow shadow-black/20 text-sm"
                  : "bg-gray-100 shadow shadow-black/20 text-sm"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-100 shadow shadow-black/20 text-sm flex gap-1 items-center hover:bg-indigo-500 transiton-all ease-in duration-100 hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
      <ModalEliminarAberturas
        p={guardarId}
        handleEliminar={handleEliminar}
        openBorrarAccesorio={openBorrarAccesorio}
        handleBorrarAccesorioClose={handleBorrarAccesorioClose}
      />
      <ModalEditaStock
        closeModalEditar={handleModalEditarStockClose}
        isOpenEditar={openModalEditarStock}
        p={guardarId}
      />
      <CrearNuevaEntrada
        isOpenEntrada={isOpenEntrada}
        closeOpenEntrada={closeEntrada}
        obtenerId={obtenerId}
      />
      <ModalNuevaSalida
        isOpenEntrada={isOpenSalida}
        closeOpenEntrada={closeSalida}
        obtenerId={obtenerId}
      />
      <button
        className="bg-green-500 rounded-xl shadow py-2 px-5 text-white mt-10 max-md:hidden max-md:block"
        onClick={handleDescargarExcel}
      >
        Descargar aberturas en stock formato Excel
      </button>{" "}
    </div>
  );
};
