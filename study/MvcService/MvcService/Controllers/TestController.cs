using MvcService.Dal.DAO;
using MvcService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcService.Controllers
{
    public class TestController : Controller
    {
        public ActionResult Index(TestModel m)
        {
            try
            {
                m.Success = true;
                m.ServerMessage = "Echo:" + m.Echo;
                m.Datas.Add("VipLevels", VipLevelDAO.QueryAll());
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m, JsonRequestBehavior.AllowGet);

        }
    }
}
