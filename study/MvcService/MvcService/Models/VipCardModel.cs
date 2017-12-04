using MvcService.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Models
{
    public class VipCardModel : BaseModel
    {
        public TbVipCard Card { get; set; }

        public VipCardModel()
        {
            Card = new TbVipCard();
        }
    }
}