using MvcService.Dal.DAO;
using MvcService.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcService.Controllers
{
    public class TestController : Controller
    {
        public const string UPLOAD = "/upload/";
        public ActionResult File(TestModel m, HttpPostedFileBase file)
        {
            try
            {
                //确保文件夹存在
                if (!Directory.Exists(Server.MapPath("~" + UPLOAD)))
                {
                    Directory.CreateDirectory(Server.MapPath("~" + UPLOAD));
                }
                string ext = file.FileName.Substring(
                    file.FileName.LastIndexOf("."));
                string filename = UPLOAD + Guid.NewGuid().ToString() + ext;
                file.SaveAs(Server.MapPath("~" + filename));
                m.ServerMessage = filename;
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Index(TestModel m)
        {
            try
            {
                m.Success = true;
                m.ServerMessage = "<h1 class='text-center' onclick='alert(123)'>Echo:" + m.Echo + "</h1>";
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
