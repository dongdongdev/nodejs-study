using MvcService.Dal.Entity;
using MvcService.Dal.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcService.Dal.DAO
{
    public class StatusDAO
    {
        public static IList<TbStatus> QueryByType(string type)
        {
            SqlConnection conn = DBConn.GetConn();
            SqlTransaction tran = conn.BeginTransaction();
            try
            {
                IList<TbStatus> data = DBHelper.QueryRows(
                    new TbStatus(), tran, "select * from TbStatus where scode like @p0", type + "-%");
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