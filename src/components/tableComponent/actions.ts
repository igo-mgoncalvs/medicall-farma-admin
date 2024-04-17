import BASE_URL from "@/lib/axios";
import { toast } from "react-toastify";

export function HandleDeleteProduct ({ id } : { id: string }) {
  toast.info('Aguarde um instante', {
    position: "top-right",
    pauseOnHover: false,
    autoClose: false,
  });

  BASE_URL.delete(`/remove-product/${id}`)
    .then(() => {
      toast.dismiss()
      toast.success('Produto excluido com sucesso!', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });
    })
    .catch(() => {
      toast.dismiss()
      toast.error('Erro ao excluir o produto', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });
    })
}