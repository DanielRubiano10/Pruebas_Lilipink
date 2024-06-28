import axios from "axios";
import Swal from "sweetalert2";

export function show_alerta(mensaje, icono, foco = "") {
  if (foco !== "") {
    document.getElementById(foco).focus();
  }
  Swal.fire({
    title: mensaje,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoomIn" },
    buttonsStyling: false,
  });
}

export function AceptarEliminacion() {
  Swal.fire({
    icon: "success",
    title: "Producto eliminado",
    text: "El producto ha sido eliminado correctamente.",
    showConfirmButton: false,
    timer: 2000, // Cerrar después de 2 segundos
  });
}


export function AceptarActualizacion() {
    Swal.fire({
      icon: "success",
      title: "Producto Actualizado",
      text: "El producto ha sido actualizado correctamente.",
      showConfirmButton: false,
      timer: 2000, // Cerrar automáticamente después de 2 segundos
    });
  }


export function AceptarIngreso() {
    Swal.fire({
      icon: "success",
      title: "Producto Registrado",
      text: "El producto ha sido registrado correctamente.",
      showConfirmButton: false,
      timer: 2000, // Cerrar automáticamente después de 2 segundos
    });
  }

export function confirmar(id, name, eliminarCallback) {
  const SwalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  SwalWithBootstrapButtons.fire({
    title: `¿Seguro desea eliminar el producto ${name}?`,
    text: "Se perderá la información del producto",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
    cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarCallback(id); // Llama a la función de eliminación con el ID del producto
    } else {
      show_alerta("Operación cancelada", "info");
    }
  });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  axios({ method: metodo, url: url, data: parametros })
    .then(function (respuesta) {
      var status = respuesta.data[0]["status"];
      if (status === "success") {
        show_alerta(mensaje, status);
        window.setTimeout(function () {
          window.location.href = "/";
        }, 1000);
      } else {
        var listado = "";
        var errores = respuesta.data[1]["errors"];
        Object.keys(errores).forEach(
          (key) => (listado += errores[key][0] + ".")
        );
        show_alerta(listado, "error");
      }
    })
    .catch(function () {
      show_alerta("error en la solicitud", "error");
    });
}
