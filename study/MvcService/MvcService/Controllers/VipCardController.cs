using MvcService.Dal.DAO;
using MvcService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcService.Controllers
{
    public class VipCardController : Controller
    {
       
        public ActionResult Add(VipCardModel m)
        {
            try
            {
                //{}
                VipCardDAO.Add(m.Card);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

    }
}
