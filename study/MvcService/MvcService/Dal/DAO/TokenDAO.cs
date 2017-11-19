using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Dal.DAO
{
    public class TokenDAO
    {
        private static String GetNewToken()
        {
            //需要在数据库或者内存中管理Token数据
            return Guid.NewGuid().ToString();
        }

        public static bool CheckToken(String token)
        {
            if (String.IsNullOrWhiteSpace(token))
            {
                return true;
            }
            //需要通过数据库或内容管理校验token是否存在
            return false;
        }

        public static String GetToken(String old)
        {
            if (CheckToken(old)) //不存在就创建新的
            {
                return GetNewToken();
            }
            else
            {
                return old;
            }
        }
    }
}