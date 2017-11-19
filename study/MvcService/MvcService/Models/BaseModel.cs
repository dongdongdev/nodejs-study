using MvcService.Dal.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcService.Models
{
    //基础Model类
    public class BaseModel
    {
        //所有的model都包含的控制信息
        //服务器处理是否成功
        public bool Success { get; set; }
        //服务器返回编码
        public int ServerCode { get; set; }
        //服务器给客户端的消息
        public string ServerMessage { get; set; }
        private string token;
        //服务器携带的数据
        private IDictionary<String, Object> datas = new Dictionary<String, Object>();
        public IDictionary<String, Object> Datas
        {
            get { return datas; }
        }
        //客户端凭证
        public string SessionToken
        {
            get
            {
                token = TokenDAO.GetToken(token);
                return token;
            }
            set
            {
                token = value;
            }
        }

        public BaseModel()
        {
            Success = false; //默认是失败
            ServerMessage = "";//默认没有消息
            ServerCode = 200;//默认是正常应答
        }
        //设置错误结果
        public void Fail(string message)
        {
            Fail(500, message);
        }
        public void Fail(int code, string message)
        {
            Success = false;
            ServerCode = code;
            ServerMessage = message;
        }
        //错误重载版本
        public void Fail(Exception ex)
        {
            Fail(ex.Message);
        }
    }
}