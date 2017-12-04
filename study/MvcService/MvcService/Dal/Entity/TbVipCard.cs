using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Dal.Entity
{
    public class TbVipCard : TbStatus
    {
        public int Vcid { get; set; }
        public string Cardno { get; set; }
        public string Phone { get; set; }
        public string Username { get; set; }
        public int Cstatus { get; set; }
        public DateTime Created { get; set; }
        public Decimal Balance { get; set; }
    }
}