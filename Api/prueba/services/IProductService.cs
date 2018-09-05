using prueba.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prueba.services
{
    public interface IProductService
    {
        Task<ProductoEntity> CrearProducto(string nombre, DateTime? horaRevision);
        Task<ProductoEntity> ActualizarProducto(ProductoEntity producto);
        Task<ProductoEntity> ObtenerProducto(string partitionKey, string rowKey);
        Task<bool> EliminarProducto(string partitionKey, string rowKey);
        Task<IEnumerable<ProductoEntity>> ListaProductos();

    }
}
