import { usePedidoContext } from "../../../context/PedidosMensualesProvider";
import { useEffect, useState } from "react";
import { Search } from "../../../components/ui/Search";
import { TablePedidosRealizados } from "../../../components/pedidos/TablePedidosRealizados";
import { DescargarPedidoCompletoJefeFabrica } from "../../../components/pedidos/DescargarPedidoIncompletoJefeFabrica";
import { PDFDownloadLink } from "@react-pdf/renderer";
import client from "../../../api/axios";
import "moment/locale/es";
import * as XLSX from "xlsx";

export const PedidosRealizados = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [dataNew, setDatos] = useState([]);

  const [loading, setLoading] = useState(false);

  const obtenerIngresoRangoFechas = async (fechaInicio, fechaFin) => {
    try {
      // Setea el estado de loading a true para mostrar el spinner
      setLoading(true);

      // Validación de fechas
      if (!fechaInicio || !fechaFin) {
        console.error("Fechas no proporcionadas");
        return;
      }

      // Verifica y formatea las fechas
      fechaInicio = new Date(fechaInicio).toISOString().split("T")[0];
      fechaFin = new Date(fechaFin).toISOString().split("T")[0];

      const response = await client.post("/pedido/rango-fechas", {
        fechaInicio,
        fechaFin,
      });

      setDatos(response.data); // Maneja la respuesta según tus necesidades
    } catch (error) {
      console.error("Error al obtener ingresos:", error);
      // Maneja el error según tus necesidades
    } finally {
      // Independientemente de si la solicitud es exitosa o falla, establece el estado de loading a false
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const buscarIngresosPorFecha = () => {
    obtenerIngresoRangoFechas(fechaInicio, fechaFin);
  };

  const datos = dataNew?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidad)
  );

  const datosTwo = dataNew?.map((c) =>
    c.productos.respuesta.map((c) => c.cantidadFaltante)
  );

  let data = datos?.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  let dataTwo = datosTwo.map((c) =>
    c?.reduce((sum, b) => {
      return sum + Number(b);
    }, 0)
  );

  const resultado = data?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  const resultadoTwo = dataTwo?.reduce((sum, b) => {
    return sum + Number(b);
  }, 0);

  let fechaActualNew = new Date();

  let nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let indiceMes = fechaActualNew.getMonth();

  let nombreMes = nombresMeses[indiceMes];

  console.log(dataNew);

  function agruparPorDetalle(datos) {
    const resultado = [];

    datos.forEach((pedido) => {
      const existente = resultado.find(
        (grupo) => grupo.detalle === pedido.detalle
      );

      if (existente) {
        pedido.productos.respuesta.forEach((producto) => {
          const existenteProducto = existente.productos.find(
            (p) =>
              p.categoria === producto.categoria &&
              p.ancho === producto.ancho &&
              p.alto === producto.alto &&
              p.color === producto.color &&
              p.detalle === producto.detalle
          );

          if (existenteProducto) {
            existenteProducto.cantidad_total += parseInt(producto.cantidad);
          } else {
            existente.productos.push({
              categoria: producto.categoria,
              ancho: producto.ancho,
              alto: producto.alto,
              color: producto.color,
              detalle: producto.detalle,
              cantidad_total: parseInt(producto.cantidad),
            });
          }
        });
      } else {
        const nuevoGrupo = {
          detalle: pedido.detalle,
          productos: [],
        };

        pedido.productos.respuesta.forEach((producto) => {
          nuevoGrupo.productos.push({
            categoria: producto.categoria,
            ancho: producto.ancho,
            alto: producto.alto,
            color: producto.color,
            detalle: producto.detalle,
            cantidad_total: parseInt(producto.cantidad),
          });
        });

        resultado.push(nuevoGrupo);
      }
    });

    return resultado;
  }

  const datosAgrupados = agruparPorDetalle(dataNew);

  const descargarExcel = () => {
    const wsData = datosAgrupados.flatMap((grupo) =>
      grupo.productos.map((producto) => ({
        DETALLE: producto.detalle.toUpperCase(),
        ANCHO: producto.ancho,
        ALTO: producto.alto,
        CATEGORIA: producto.categoria.toUpperCase(),
        COLOR: producto.color.toUpperCase(),
        CANTIDAD: producto.cantidad_total,
      }))
    );

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosAgrupados");
    XLSX.writeFile(wb, "datos_agrupados.xlsx");
  };

  const [search, setSearch] = useState("");
  const [resultadoFiltrados, setResultadosFiltrados] = useState([]);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Filtrar los resultados por término de búsqueda y mes seleccionado
    const filteredResults = dataNew.filter((dato) =>
      dato?.cliente?.toLowerCase().includes(searchTerm)
    );

    setResultadosFiltrados(searchTerm === "" ? dataNew : filteredResults);
  };

  // Use useEffect to update filtered results when the search term changes
  useEffect(() => {
    setResultadosFiltrados(search === "" ? dataNew : resultadoFiltrados);
  }, [dataNew, search]);

  return (
    <section className="max-md:py-4 w-full py-20 px-14 max-md:pb-32 max-md:px-2">
      <div className="max-md:border-none max-md:shadow-none border-[1px] border-slate-300 shadow-black/10 shadow py-10 px-12 max-md:px-4 max-md:py-6 w-full rounded-xl">
        <div className="flex">
          <p className="font-normal text-lg border-b-[3px] border-indigo-500 text-slate-700 max-md:text-sm uppercase">
            Filtrar o buscar pedidos realizados
          </p>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-5 max-md:flex-col max-md:grid-cols-1">
          <article class="flex flex-col gap-4 rounded-xl max-md:p-3 max-md:shadow border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {dataNew.length}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500 max-md:text-xs">
                {" "}
                Pedidos generados{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900 max-md:text-base">
                  {" "}
                  {dataNew.length}{" "}
                </span>

                <span class="text-xs text-gray-500">
                  {" "}
                  {"Ultimo creado el día"}{" "}
                </span>
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-xl max-md:p-3 max-md:shadow border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium">{nombreMes}</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500 max-md:text-xs">
                {" "}
                Mes Actual{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900 max-md:text-base">
                  {" "}
                  {nombreMes}{" "}
                </span>
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-xl max-md:p-3 max-md:shadow border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {resultado}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500">
                {" "}
                Total aberturas generadas{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900 max-md:text-base">
                  {" "}
                  {resultado}{" "}
                </span>
                {/* 
                <span class="text-xs text-gray-500">
                  {resultado} {"Ultimo creado el día"}{" "}
                </span> */}
              </p>
            </div>
          </article>

          <article class="flex flex-col gap-4 rounded-xl max-md:p-3 max-md:shadow border border-slate-200 bg-white p-5">
            <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span class="text-xs font-medium"> {resultadoTwo}%</span>
            </div>

            <div>
              <strong class="block text-sm font-medium text-gray-500 max-md:text-xs">
                {" "}
                Total aberturas realizadas{" "}
              </strong>

              <p>
                <span class="text-2xl font-medium text-gray-900 max-md:text-base">
                  {" "}
                  {resultadoTwo}{" "}
                </span>
                {/* 
                <span class="text-xs text-gray-500">
                  {resultado} {"Ultimo creado el día"}{" "}
                </span> */}
              </p>
            </div>
          </article>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div className="mt-10 max-md:mt-2">
            <div className="flex gap-6 items-center max-md:flex-col max-md:items-start max-md:gap-2">
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500 max-md:uppercase">
                  Fecha de inicio
                </label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-sm text-indigo-500 max-md:uppercase">
                  Fecha de fin
                </label>
                <input
                  className="text-sm bg-slate-100/10 py-1 px-2 rounded-lg shadow border-slate-300 border-[1px] cursor-pointer text-slate-700 outline-none"
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>

              <button
                onClick={buscarIngresosPorFecha}
                className="bg-indigo-500/10 text-sm border-[1px] border-indigo-500 text-indigo-700 px-5 py-1 rounded-xl shadow flex items-center gap-2"
              >
                Buscar Ingresos
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-3 w-full items-center max-md:flex-col max-md:items-start">
          <div className="w-1/3 max-md:w-full">
            <Search variable="w-full" search={search} searcher={searcher} />
          </div>
          <PDFDownloadLink
            fileName="Pedido Completo Fabrica Aberturas"
            className=" bg-indigo-500 px-6 py-2 text-sm rounded-xl shadow text-white uppercase"
            document={<DescargarPedidoCompletoJefeFabrica datos={dataNew} />}
          >
            Descargar pedido completo PDF
          </PDFDownloadLink>
        </div>

        <div className="mt-5 md:h-[500px] md:overflow-y-scroll w-full">
          <TablePedidosRealizados
            resultadoFiltrados={resultadoFiltrados}
            loading={loading}
            dataNew={dataNew}
          />
        </div>
      </div>

      <div className="px-4 mt-12 font-semibold text-base text-slate-600 flex">
        <h3 className="border-b-[3px] border-slate-600 uppercase text-sm">
          Aberturas total realizadas.
        </h3>
      </div>

      <div className="w-full mt-5 rounded-xl h-[50vh] overflow-y-scroll px-3">
        <div className="border-[1px] border-slate-300 rounded-xl shadow w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-2 max-md:text-xs font-bold uppercase text-indigo-500 text-sm">
                  Detalle
                </th>
                <th className="py-3 px-2 max-md:text-xs font-bold uppercase text-indigo-500 text-sm">
                  Categoria
                </th>
                <th className="py-3 px-2 max-md:text-xs font-bold uppercase text-indigo-500 text-sm">
                  Color
                </th>
                <th className="py-3 px-2 max-md:text-xs font-bold uppercase text-indigo-500 text-sm">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {datosAgrupados.map((c) =>
                c.productos.map((c, index) => (
                  <tr key={index}>
                    <th className="border-[1px] border-gray-300 p-2 max-md:text-xs text-sm font-normal uppercase">
                      {c.detalle}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 max-md:text-xs text-sm font-normal uppercase">
                      {c.categoria}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 max-md:text-xs text-sm font-normal uppercase">
                      {c.color}
                    </th>
                    <th className="border-[1px] border-gray-300 p-2 max-md:text-xs text-sm font-bold">
                      {c.cantidad_total}
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 w-full">
        <button
          className="bg-black rounded-xl max-md:text-xs text-white py-2 px-6 shadow uppercase text-sm"
          type="button"
          onClick={descargarExcel}
        >
          Descargar excel aberturas entregadas
        </button>
      </div>
    </section>
  );
};
