using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Dal.Entity
{
    public class TbVipLevel
    {
        public int Vlid { get; set; }
        public string Lname { get; set; }
        public Decimal Amount { get; set; }
        public int Apercent { get; set; }
    }
}