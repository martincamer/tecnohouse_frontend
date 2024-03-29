import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { usePedidoContext } from "../../context/PedidoProvider";
import { ModalSeleccionarAberturas } from "./ModalSeleccionarAberturas";
import { crearValorPedidoUnicos } from "../../api/factura.api";

export const CrearNuevoPedidoViewPedido = ({
  isOpenCrarPedido,
  closeModalCrearPedidos,
  datosCliente,
}) => {
  const {
    openModalProductos,
    productoSeleccionado,
    deleteProducto,
    deleteToResetProductos,
  } = usePedidoContext();

  const onSubmit = async () => {
    try {
      const res = await crearValorPedidoUnicos(
        datosCliente.id,
        productoSeleccionado
      );

      setTimeout(() => {
        location.reload();
      }, 1500);

      toast.success("¡Pedido creado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error durante la solicitud:", error.message);
      // Maneja el error de la solicitud
    }
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenCrarPedido} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCrearPedidos}
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
              <div className="inline-block w-[1220px] max-md:px-3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-md:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 max-md:text-md"
                >
                  Crear el pedido
                </Dialog.Title>
                <form className="mt-2 border-t pt-4 pb-4 space-y-5">
                  <div>
                    <button
                      className="border-[1px] border-slate-400 bg-slate-500/10  py-2 px-6 rounded-xl text-slate-700 shadow max-md:text-xs"
                      type="button"
                      onClick={openModalProductos}
                    >
                      Seleccionar aberturas pedido
                    </button>
                  </div>

                  <div className="rounded-xl border-slate-300 border-[1px] shadow-black/10 shadow flex flex-col gap-3 w-full max-md:overflow-y-scroll h-[300px] overflow-y-scroll">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead>
                        <tr className="divide-gray-100">
                          {/* <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Numero
                          </th> */}
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Codigo
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Detalle
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Color
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Ancho - Alto
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Categoria
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Cliente
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Cantidad
                          </th>
                          <th className="py-4 px-2 font-normal uppercase text-sm text-indigo-600 text-left">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-left">
                        {productoSeleccionado.map((p) => (
                          <tr
                            key={p.id}
                            className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
                          >
                            {/* <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.id}
                            </td> */}
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.nombre}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.detalle}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.color}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.ancho}x{p.alto}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.categoria}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p.cliente}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              {p?.cantidad}
                            </td>
                            <td className="py-3 px-3 text-sm text-left text-slate-700 uppercase">
                              <button
                                className="justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-50 duration-300 cursor-pointer font-normal text-center border-red-800 flex items-center gap-2"
                                onClick={() => deleteProducto(p.id)}
                              >
                                Eliminar producto
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button
                      onClick={deleteToResetProductos}
                      type="button"
                      className="bg-red-100 border-red-900 border-[0.5px] text-red-800 rounded-xl py-1 px-4 shadow font-normal text-base mt-2 max-md:text-sm"
                    >
                      Resetear productos
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => onSubmit()}
                      className="bg-indigo-500 rounded-xl py-2 px-6 text-white font-normal shadow-md hover:translate-x-1 transition-all ease-in-out max-md:text-xs"
                    >
                      Generar aberturas
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeModalCrearPedidos}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
          <ModalSeleccionarAberturas />
        </Dialog>
      </Transition>
    </Menu>
  );
};
