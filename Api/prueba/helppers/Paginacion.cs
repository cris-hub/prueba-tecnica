using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace prueba.helppers
{
    public class Paginacion
    {
        public int CantidadRegistrosMostrar { get; set; }
        public int PaginaActual { get; set; }
        public int RegistrosOmitir() => (PaginaActual - 1) * CantidadRegistrosMostrar;
    }
}
