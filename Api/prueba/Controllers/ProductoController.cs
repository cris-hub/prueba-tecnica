using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using prueba.models;
using prueba.services;

namespace prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private ProductService _productService;
        public ProductoController()
        {
            _productService = new ProductService();
        }

        [HttpGet("GetList")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                return Ok(await _productService.ListaProductos());
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string partitionKey, string rowKey)
        {
            try
            {
                var result = await _productService.ObtenerProducto(partitionKey, rowKey);
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductoEntity producto)
        {
            try
            {
                var productResult = await _productService.CrearProducto(producto.Nombre, producto.HoraRevision);
                return Ok(productResult);
            }
            catch (Exception)
            {

                return BadRequest();

            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ProductoEntity Producto)
        {
            try
            {
                return Ok(await _productService.ActualizarProducto(Producto));
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete()]
        public async Task<IActionResult> Delete(string partitionKey, string rowKey)
        {
            try
            {
                return Ok(await _productService.EliminarProducto(partitionKey, rowKey));
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
