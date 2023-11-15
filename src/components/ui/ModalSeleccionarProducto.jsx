import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAluminioContext } from "../../context/AluminioProvider";
import { Search } from "./Search";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";
import { ModalSeleccionarCantidadProducto } from "./ModalSeleccionarCantidadProducto";
import { Link } from "react-router-dom";

export const ModalSeleccionarProducto = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  const { search, searcher, results } = useAluminioContext();
  const { handleSeleccionarProducto, errorProducto } = usePresupuestoContext();

  let [isOpenModal, setIsModal] = useState(false);

  function closeModalCantidad() {
    setIsModal(false);
  }

  function openModalCantidad() {
    setIsModal(true);
  }

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenProductos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalProductos}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-1/2 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Elegir Producto
                </Dialog.Title>
                <Search search={search} searcher={searcher} />
                {errorProducto && (
                  <div>
                    <span className="bg-red-500 py-2 px-2 text-white font-bold rounded-md">
                      ¡El producto ya existe!
                    </span>
                  </div>
                )}
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded">
                    <thead>
                      <tr>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Numero
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Categoria
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Peso Barra
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((c) => (
                        <tr key={c.id}>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                            {c.id}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.nombre}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.descripcion}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.color}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.categoria}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.peso_neto_barra_6mts} kg
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm w-[120px] text-center">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-secondary py-1 px-2 text-center text-white rounded-md text-center"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ModalSeleccionarCantidadProducto
                  isOpenModal={isOpenModal}
                  closeModalCantidad={closeModalCantidad}
                  openModalCantidad={openModalCantidad}
                />
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={closeModalProductos}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
