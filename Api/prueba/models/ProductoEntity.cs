using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;


namespace prueba.models
{
    public class ProductoEntity : TableEntity
    {
        public string Nombre { get; set; }

        public DateTime? HoraRevision { get; set; }

        public ProductoEntity()
        {
            this.PartitionKey = DateTime.Now.Year.ToString();
            this.RowKey = Guid.NewGuid().ToString();

        }


    }
}
