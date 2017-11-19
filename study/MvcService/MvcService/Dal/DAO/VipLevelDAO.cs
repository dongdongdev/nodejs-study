using MvcService.Dal.Entity;
using MvcService.Dal.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcService.Dal.DAO
{
    public class VipLevelDAO
    {
        public static IList<TbVipLevel> QueryAll()
        {
            SqlConnection conn = DBConn.GetConn();
            SqlTransaction tran = conn.BeginTransaction();
            try
            {
                IList<TbVipLevel> data = DBHelper.QueryRows(
                    new TbVipLevel(), tran, "select * from TbVipLevel");
                tran.Commit();
                return data;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }
    }
}