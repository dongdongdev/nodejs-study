using MvcService.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Models
{
    public class TestModel : BaseModel
    {
        public String Echo { get; set; }
        public Page PageInfo { get; set; }
        public IList<String> Infos { get; set; }

        public TestModel()
        {
            Infos = new List<string>();
        }
    }
}