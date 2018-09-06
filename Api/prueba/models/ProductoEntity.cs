using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;


namespace prueba.models
{
    public class ProductoEntity : TableEntity
    {
        public string Nombre { get; set; }
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy HH:mm:ss}")]
        public DateTime? HoraRevision { get; set; }
        public int? Estado { get; set; }

        public ProductoEntity()
        {
          

        }


    }
}
