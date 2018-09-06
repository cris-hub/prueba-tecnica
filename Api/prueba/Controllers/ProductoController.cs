using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using prueba.helppers;
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
        public async Task<IActionResult> GetList([FromQuery] Paginacion paginacion)
        {
            try
            {

                var productos = await _productService.ListaProductos();
                var resul = new { productos = productos.ToList().Skip(paginacion.RegistrosOmitir()).Take(paginacion.CantidadRegistrosMostrar), totalRegistrosBD = productos.Count()};
                return Ok(resul);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("Get")]
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

        [HttpPost("Create")]
        public async Task<IActionResult> Post([FromBody] ProductoEntity producto)
        {
            try
            {
                var productResult = await _productService.CrearProducto(producto);
                return Ok(productResult);
            }
            catch (Exception)
            {

                return BadRequest();

            }
        }

        [HttpPut("Update")]
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

        [HttpDelete("Delete")]
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
