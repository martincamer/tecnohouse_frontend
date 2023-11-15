import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../../fonts/Poppins-Bold.ttf";
import poppinsSemiBold from "../../fonts/Poppins-SemiBold.ttf";
import poppinsRegular from "../../fonts/Poppins-Regular.ttf";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: poppinsRegular,
    },
    {
      src: poppinsSemiBold,
      fontWeight: "semibold",
    },
    {
      src: poppinsBold,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  table: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "95%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "0.5px solid #000",
    borderBottom: "0.5px solid #000",
    width: "100%",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "0.5px solid #000",
    width: "100%",
  },
  content_row: {
    border: "0.7px solid #000",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingHorizontal: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
    borderRadius: 3,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "6%",
    borderRight: "0.5px solid #000",
    borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },
  row2: {
    width: "20%",
    borderRight: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
  },
  row3: {
    width: "20%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
    borderRight: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  row4: {
    width: "20%",
    fontSize: "8px",
    fontFamily: "Poppins",
    fontWeight: "semibold",
    paddingTop: 8,
    borderRight: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  contentFactura: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  content_uno: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    border: "0.8px solid #000",
    padding: "10px",
    borderRadius: "3px",
  },
  contentFinal: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    gap: "20px",
    height: "100%",
    width: "100%",
  },
  content_page: {
    height: "100%",
    width: "100%",
    border: "1px solid black",
    borderRadius: "4px",
  },
  content_footer: {
    width: "98%",
    margin: "0 auto",
    padding: "20px",
    border: "0.6px solid #000",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    borderRadius: 2,
  },
});

export const FacturaViewPresupuesto = ({
  datosFacturar,
  getRandomInt,
  unicoPresupuesto,
}) => {
  // console.log(unicoPresupuesto?.clientes);
  return (
    <Document style={styles.content}>
      <Page style={styles.content}>
        <View style={styles.contentFactura}>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textTransform: "capitalize",
              }}
            >
              {datosFacturar[0].nombre}
            </Text>
            <Text
              style={{
                fontSize: "8px",
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: "semibold",
                textTransform: "capitalize",
              }}
            >
              {datosFacturar[0].detalle}
            </Text>
            <View
              style={{
                fontSize: "8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              {/* <Image
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />{" "} */}
              <Text>{datosFacturar[0].telefono}</Text>
            </View>
            <View
              style={{
                fontSize: "8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              {/* <Image
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />{" "} */}
              <Text>{datosFacturar[0].email}</Text>
            </View>
            <View
              style={{
                fontSize: "8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <View
                style={{
                  fontSize: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                {/* <Image
                    style={{
                      width: "13px",
                      height: "13px",
                    }}
                  />{" "} */}
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                  }}
                >
                  {datosFacturar[0].direccion}
                </Text>
              </View>
              <View
                style={{
                  fontSize: "8px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                  }}
                >
                  {datosFacturar[0].localidad}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.content_uno}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                fontFamily: "Poppins",
              }}
            >
              Presupuesto
            </Text>
            <View
              style={{
                fontSize: "10px",
                marginBottom: "6px",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: "8px",
                }}
              >
                Número de presupuesto: P-{unicoPresupuesto?.id}
              </Text>
            </View>
            <View
              style={{
                fontSize: "10px",
                textAlign: "center",
                border: "0.6px solid #000",
                borderRadius: "3px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    width: "80px",
                    padding: "10px",
                    fontFamily: "Poppins",
                    fontWeight: "semibold",
                    fontSize: "8px",
                  }}
                >
                  {new Date().toLocaleDateString("arg")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.content_row}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Poppins",
                  fontWeight: "semibold",
                }}
              >
                Señor/es:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Poppins",
                  textTransform: "capitalize",
                }}
              >
                {unicoPresupuesto?.clientes?.nombre}{" "}
                {unicoPresupuesto?.clientes?.apellido}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Poppins",
                  fontWeight: "semibold",
                  textTransform: "capitalize",
                }}
              >
                Localidad
              </Text>{" "}
              <Text
                style={{
                  fontSize: "8px",
                  textTransform: "capitalize",
                  fontFamily: "Poppins",
                }}
              >
                {unicoPresupuesto?.clientes?.localidad}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "3px",
              }}
            >
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Poppins",
                  fontWeight: "semibold",
                  textTransform: "capitalize",
                }}
              >
                Provincia:
              </Text>{" "}
              <Text
                style={{
                  fontSize: "8px",
                  textTransform: "capitalize",
                  fontFamily: "Poppins",
                }}
              >
                {unicoPresupuesto?.clientes?.provincia}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.row1}>Cant.</Text>
            <Text style={styles.row2}>Cod.</Text>
            <Text style={styles.row3}>kg</Text>
            <Text style={styles.row4}>Cat.</Text>
            <Text style={styles.row4}>Color</Text>
            <Text style={styles.row4}>Detalle</Text>
          </View>

          {unicoPresupuesto?.productos?.respuesta.map((p) => (
            <View key={p.nobmre} style={styles.rowTwo}>
              <Text style={styles.row1}>{p.barras}</Text>
              <Text style={styles.row2}>{p.nombre}</Text>
              <Text style={styles.row3}>
                {p.totalKG.toLocaleString("arg", {
                  minimumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.row4}>{p.categoria}</Text>
              <Text style={styles.row4}>{p.color}</Text>
              <Text style={styles.row4}>{p.detalle}</Text>
            </View>
          ))}
        </View>

        <View style={styles.content_footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              Total de kg:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_kg?.toLocaleString("arg", {
                minimumFractionDigits: 2,
              })}{" "}
              kg
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              Total de barras:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_barras}
              kg
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
                fontWeight: "semibold",
              }}
            >
              Total a pagar:
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontFamily: "Poppins",
              }}
            >
              {unicoPresupuesto?.estadistica?.total_pagar?.toLocaleString(
                "es-ar",
                {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                }
              )}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
