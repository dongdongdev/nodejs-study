using MvcService.Dal.Entity;
using MvcService.Dal.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcService.Dal.DAO
{
    public class VipCardDAO
    {
        //开卡的动作
        public static TbVipCard Add(TbVipCard card)
        {
            SqlConnection conn = DBConn.GetConn();
            //开启事务处理
            SqlTransaction tran = conn.BeginTransaction();
            try
            {
                //添加基本信息
                //card.Cstatus是1000，表示卡的状态为启用
                int r = DBHelper.Update(tran
, @"insert into TbVipCard(cardno,phone,username,cstatus)
  values(@p0,@p1,@p2,@p3)"
, card.Cardno, card.Phone, card.Username, 1000);
                //获取添加主键列值
                int id = int.Parse(DBHelper.QueryOne(tran,
                        @"select @@IDENTITY").ToString());
                card.Vcid = id;
                //查询充值金额的打折额度
                TbVipLevel level
= DBHelper.QueryOneRow(new TbVipLevel(), tran,
@"select top 1 * from TbVipLevel 
 where amount<=@p0
 order by amount desc", card.Balance);
                if (level == null)
                {
                    throw new Exception("没有达到最低充值标准.");
                }
                //开始充值
                r = DBHelper.Update(tran,
@"insert into TbVipCardRecord(vcid,rstatus,rtstatus,rmode,ramount,rinfo)
  values(@p0,@p1,@p2,@p3,@p4,@p5)"
, card.Vcid, 1003, 1008, 1, card.Balance, "测试开卡");
                //计算是否有充值奖励
                if (level.Apercent > 0)
                {
                    Decimal cost = card.Balance * level.Apercent / 100;
                    //写入记录
                    r = DBHelper.Update(tran,
                              @"insert into TbVipCardRecord(vcid,rstatus,rtstatus,rmode,ramount,rinfo)
  values(@p0,@p1,@p2,@p3,@p4,@p5)"
                              , card.Vcid, 1005, 1011, 1, cost, "充值奖励");
                }
                //更新用户余额信息
                card.Balance = (Decimal)DBHelper.QueryOne(tran,
@"select SUM(ramount*rmode) from TbVipCardRecord
 where vcid=@p0", card.Vcid);
                tran.Commit();
                return card;
            }
            catch (Exception)
            {
                tran.Rollback();
                throw;
            }
            finally
            {
                conn.Close();
            }



        }

        public const string QUERY = @"select a.*,l.lname from
 (
 select vc.vcid,vc.cardno,vc.phone,vc.username,vc.cstatus,s.sname
 ,(
	select SUM(vcr.rmode*vcr.ramount) from TbVipCardRecord vcr
	where vcr.vcid=vc.vcid
  ) 'balance',
  (
	select top 1 vlid from TbVipLevel
	where amount<=
	(
		select sum(vcr.ramount) from TbVipCardRecord vcr
		where vcr.vcid=vc.vcid and vcr.rstatus=1003
	) 
	order by amount desc
 ) 'level'
 from TbVipCard vc
 inner join TbStatus s on vc.cstatus=s.sid
 ) a 
 inner join TbVipLevel l on a.level=l.vlid";

        public static IList<TbVipCard> Query()
        {
            SqlConnection conn = DBConn.GetConn();
            SqlTransaction tran = conn.BeginTransaction();
            try
            {
                IList<TbVipCard> list = DBHelper.QueryRows(
new TbVipCard(), tran, QUERY);
                tran.Commit();
                return list;
            }
            catch (Exception)
            {
                tran.Rollback();
                throw;
            }
            finally
            {
                conn.Close();
            }

        }

    }
}