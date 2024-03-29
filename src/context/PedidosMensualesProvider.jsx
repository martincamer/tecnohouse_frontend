//imports
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  crearFacturaNueva,
  deleteFactura,
  obtenerFacturas,
  obtenerFactura,
} from "../api/factura.api";

import { obtenerUnicoPerfil } from "../api/aberturas.api";

//context
export const PedidoContext = createContext();

//use context
export const usePedidoContext = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("use factura context");
  }
  return context;
};

//provider
export const PedidosMensualesProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [obtenerProductoId, setObtenerProductoId] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [errorProducto, setErrorProducto] = useState(false);
  const [datosPresupuesto, setDatosPresupuesto] = useState([]);
  const [unicoPresupuesto, setUnicoPresupuesto] = useState([]);
  const [cliente, setCliente] = useState("");
  const [detalle, setDetalle] = useState("");
  const [fecha, setFecha] = useState("");
  const [remito, setRemito] = useState("");

  const [isOpenProductos, setIsOpenProductos] = useState(false);

  function closeModalProductos() {
    setIsOpenProductos(false);
  }

  function openModalProductos() {
    setIsOpenProductos(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  const [results, setResults] = useState([]); // State to hold filtered results

  useEffect(() => {
    setResults(datosPresupuesto);
  }, [datosPresupuesto]);

  const handleMesChange = (e) => {
    const mesCategoria = e.target.value;
    setMesSeleccionado(mesCategoria);

    // Filtrar los resultados por mes y término de búsqueda
    const resultadosFiltrados = datosPresupuesto.filter(
      (dato) =>
        (mesCategoria === "" ||
          new Date(dato.created_at).getUTCMonth() + 1 ===
            parseInt(mesCategoria)) &&
        (search === "" ||
          dato?.cliente?.toLowerCase().includes(search.toLowerCase()) ||
          dato?.remito?.toLowerCase().includes(search.toLowerCase()))
    );

    setResults(mesCategoria === "" ? datosPresupuesto : resultadosFiltrados);
  };

  const searcher = (e) => {
    setSearch(e.target.value);

    // Filtrar los resultados por término de búsqueda y mes seleccionado
    const resultadosFiltrados = datosPresupuesto.filter(
      (dato) =>
        (mesSeleccionado === "" ||
          new Date(dato.created_at).getUTCMonth() + 1 ===
            parseInt(mesSeleccionado)) &&
        (e.target.value === "" ||
          dato?.cliente?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          dato?.remito?.toLowerCase().includes(e.target.value.toLowerCase()))
    );

    setResults(resultadosFiltrados);
  };

  const respuesta = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      nombre: e.nombre,
      detalle: e.detalle,
      color: e.color,
      categoria: e.categoria,
      ancho: e.ancho,
      alto: e.alto,
      cliente: e.cliente,
      cantidad: e.cantidad,
    };
  });

  //crear factura
  const handlePedido = async () => {
    const res = await crearFacturaNueva({
      cliente: cliente,
      productos: { respuesta },
      detalle: detalle,
      fecha: fecha,
      remito: remito,
    });

    const presupuestoActualizado = [...datosPresupuesto, res.data];

    setDatosPresupuesto(presupuestoActualizado);

    setProductoSeleccionado([]);

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
  };

  //fin crear factura

  const addToProductos = (
    id,
    nombre,
    detalle,
    color,
    categoria,
    ancho,
    alto,
    cliente,
    cantidad
  ) => {
    const newProducto = {
      id,
      nombre,
      detalle,
      color,
      categoria,
      ancho,
      alto,
      cliente,
      cantidad,
    };

    const productoSeleccionadoItem = productoSeleccionado.find((item) => {
      return item.id === id;
    });

    if (productoSeleccionadoItem) {
      setTimeout(() => {
        setErrorProducto(false);
      }, 2000);
      setErrorProducto(true);
    } else {
      setProductoSeleccionado([...productoSeleccionado, newProducto]);
      setErrorProducto(false);
    }
  };

  const deleteProducto = (
    id,
    nombre,
    detalle,
    color,
    categoria,
    ancho,
    alto,
    cliente,
    cantidad
  ) => {
    const itemIndex = productoSeleccionado.findIndex(
      (item) =>
        item.id === id &&
        item.nombre === nombre &&
        item.detalle === detalle &&
        item.color === color &&
        item.categoria === categoria &&
        item.ancho === ancho &&
        item.alto === alto &&
        item.cliente === cliente &&
        item.cantidad === cantidad
    );

    if (itemIndex) {
      const newItem = [...productoSeleccionado];
      newItem.splice(itemIndex);
      setProductoSeleccionado(newItem);
    }
  };

  const deleteToResetProductos = () => {
    const newDato = [];
    setProductoSeleccionado(newDato);
  };

  const handleSeleccionarProducto = (id) => {
    setObtenerProductoId(id);
  };

  useEffect(() => {
    async function productoUnico() {
      const res = await obtenerUnicoPerfil(obtenerProductoId);
      setProductoUnico(res.data);
    }
    productoUnico();
  }, [obtenerProductoId]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await obtenerFacturas();

        setDatosPresupuesto(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  // const totalKg = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.totalKG);
  //   }, 0);
  // };

  // const totalBarras = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.barras);
  //   }, 0);
  // };

  // const totalPagar = () => {
  //   return productoSeleccionado.reduce((sum, b) => {
  //     return sum + Number(b.totalPrecioUnitario);
  //   }, 0);
  // };

  const obtenerDato = async (id) => {
    const { data } = await obtenerFactura(id);
    setUnicoPresupuesto(data);
  };

  //eliminar presupuesto
  const handleDeletePresupuesto = (id) => {
    deleteFactura(id);

    const presupuestoActualizado = datosPresupuesto.filter(
      (perfilState) => perfilState.id !== id
    );

    toast.error("¡Pedido eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setDatosPresupuesto(presupuestoActualizado);
  };

  return (
    <PedidoContext.Provider
      value={{
        results,
        obtenerDato,
        handleSeleccionarProducto,
        obtenerProductoId,
        productoUnicoState,
        addToProductos,
        productoSeleccionado,
        deleteToResetProductos,
        deleteProducto,
        errorProducto,
        datosPresupuesto,
        unicoPresupuesto,
        setUnicoPresupuesto,
        datosPresupuesto,
        setDatosPresupuesto,
        handleDeletePresupuesto,
        handlePedido,
        isOpen,
        openModal,
        closeModal,
        isOpenProductos,
        closeModalProductos,
        openModalProductos,
        setCliente,
        setDetalle,
        cliente,
        detalle,
        fecha,
        setFecha,
        setRemito,
        remito,
        searcher,
        resultadosFiltrados,
        handleMesChange,
        mesSeleccionado,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
