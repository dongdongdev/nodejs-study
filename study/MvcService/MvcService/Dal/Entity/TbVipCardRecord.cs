using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Dal.Entity
{
    public class TbVipCardRecord
    {
        public int Vcrid { get; set; }
        public int Vcid { get; set; }
        public int Rstatus { get; set; }
        public int Rtstatus { get; set; }
        public int Rmode { get; set; }
        public Decimal Ramount { get; set; }
        public string Rinfo { get; set; }
        public DateTime created { get; set; }
    }
}