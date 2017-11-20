use master
go
if(DB_ID('MvcService') is not null)
	drop database MvcService
go
create database MvcService
go
use MvcService
go
/*状态表*/
create table TbStatus
(
	sid int identity(1000,1) primary key not null,
	/*状态编码*/
	scode varchar(50) unique not null,
	/*状态名称*/
	sname nvarchar(50) not null
)
go
/*状态默认数据*/
/*卡片状态*/
insert into TbStatus(scode,sname) values('1-001','启用')
insert into TbStatus(scode,sname) values('1-002','冻结')
insert into TbStatus(scode,sname) values('1-003','挂失')
/*交易分类*/
insert into TbStatus(scode,sname) values('2-001','充值')
insert into TbStatus(scode,sname) values('2-002','消费')
insert into TbStatus(scode,sname) values('2-003','其它')
/*充值方式*/
insert into TbStatus(scode,sname) values('3-001','现金')
insert into TbStatus(scode,sname) values('3-002','微信支付')
insert into TbStatus(scode,sname) values('3-003','支付宝')
insert into TbStatus(scode,sname) values('3-004','银行卡')
insert into TbStatus(scode,sname) values('3-005','第三方支付')
insert into TbStatus(scode,sname) values('3-006','扣款')
go

select * from TbStatus
go

/*会员等级充值优惠信息*/
create table TbVipLevel
(
	vlid int identity primary key not null,
	/*等级名称*/
	lname nvarchar(50) unique not null,
	/*等级金额*/
	amount decimal(10,2) check(amount>0) not null,
	/*充值优惠百分比*/
	apercent int check(apercent>=0) not null
)
go

/*会员等级默认数据*/
insert into TbVipLevel(lname,amount,apercent) values('青铜',100,0)
insert into TbVipLevel(lname,amount,apercent) values('白银',200,10)
insert into TbVipLevel(lname,amount,apercent) values('黄金',500,20)
insert into TbVipLevel(lname,amount,apercent) values('白金',1000,50)
insert into TbVipLevel(lname,amount,apercent) values('钻石',5000,70)
go

select * from TbVipLevel
go 

/*卡片信息*/
create table TbVipCard
(
	vcid int identity primary key not null,
	/*卡号*/
	cardno varchar(50) unique not null,
	/*电话*/
	phone varchar(50) unique not null,
	/*姓名*/
	username nvarchar(50),
	/*卡片状态*/
	cstatus int foreign key references TbStatus(sid) not null,
	/*开卡日期*/
	created datetime default getdate() not null	
)
go

select * from TbVipCard
go

/*会员卡交易记录*/
create table TbVipCardRecord
(
	vcrid int identity primary key not null,
	/*卡号*/
	vcid int foreign key references TbVipCard(vcid) not null,
	/*交易类型*/
	rstatus int foreign key references TbStatus(sid) not null,
	/*交易来源*/
	rtstatus int foreign key references TbStatus(sid) not null,
	/*交易模式,1为增加，-1为减少*/
	rmode int check(rmode in(-1,1)) not null,
	/*交易金额*/
	ramount decimal(10,2) check(ramount>0) not null,
	/*交易说明*/
	rinfo nvarchar(500) not null,
	/*交易时间*/
	created datetime default getdate() not null
)
go

select * from TbVipCardRecord
go