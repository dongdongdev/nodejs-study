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
                //{"Card.Cardno":12345678,"Card.Phone":"12345123451","Card.Username":"哈哈哈","Card.Balance":100}
                VipCardDAO.Add(m.Card);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Query(VipCardModel m)
        {
            try
            {
                //Object a = new int();
                m.Datas.Add("list", VipCardDAO.Query());
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
