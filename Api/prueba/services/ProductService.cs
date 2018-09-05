using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using prueba.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prueba.services
{
    public class ProductService : IProductService
    {
        private CloudStorageAccount _acount;
        private CloudTableClient _client;
        private CloudTable _table;
        public ProductService()
        {
            _acount = CloudStorageAccount.Parse(@"DefaultEndpointsProtocol=https;AccountName=123459876;AccountKey=X9XmzmV0xX6AG/WYCXSA8BrrrCF0M4j3X4zFDgJZ5g9hRwPafsIjAWk2kgjLZmj6YSxJGIikJDsLmvxgEfGWTQ==;EndpointSuffix=core.windows.net");
            _client = _acount.CreateCloudTableClient();
            _table = _client.GetTableReference("product");
        }

        public async Task<ProductoEntity> ActualizarProducto(ProductoEntity producto)
        {
            try
            {
                ProductoEntity productoResult = await ObtenerProducto(producto.PartitionKey, producto.RowKey);
                if (productoResult != null)
                {
                    TableOperation operation = TableOperation.Merge(producto);
                    await _table.ExecuteAsync(operation);

                }
                else
                {
                    throw new Exception("El producto no exite");

                }
                return await ObtenerProducto(producto.PartitionKey, producto.RowKey);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ProductoEntity> CrearProducto(string nombre, DateTime? horaRevision)
        {

            try
            {

                await _table.CreateIfNotExistsAsync();
                var product = new ProductoEntity() { Nombre = nombre, HoraRevision = horaRevision };
                TableOperation operation = TableOperation.Insert(product);
                await _table.ExecuteAsync(operation);
                return product;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> EliminarProducto(string partitionKey, string rowKey)
        {
            try
            {

                ProductoEntity product = await ObtenerProducto(partitionKey, rowKey);
                if (product != null)
                {
                    TableOperation delteOeration = TableOperation.Delete(product);
                    var delete = await _table.ExecuteAsync(delteOeration);
                    return delete.Result != null;

                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IEnumerable<ProductoEntity>> ListaProductos()
        {
            try
            {
                TableQuery<ProductoEntity> query = new TableQuery<ProductoEntity>();
                TableContinuationToken toke = new TableContinuationToken();

                return await _table.ExecuteQuerySegmentedAsync(query, toke);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ProductoEntity> ObtenerProducto(string partitionKey, string rowKey)
        {
            try
            {
                TableOperation operation = TableOperation.Retrieve<ProductoEntity>(partitionKey, rowKey);
                TableResult result = await _table.ExecuteAsync(operation);
                var product = result.Result;
                return product as ProductoEntity;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
