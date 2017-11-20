use master
go
if(DB_ID('MvcService') is not null)
	drop database MvcService
go
create database MvcService
go
use MvcService
go
/*״̬��*/
create table TbStatus
(
	sid int identity(1000,1) primary key not null,
	/*״̬����*/
	scode varchar(50) unique not null,
	/*״̬����*/
	sname nvarchar(50) not null
)
go
/*״̬Ĭ������*/
/*��Ƭ״̬*/
insert into TbStatus(scode,sname) values('1-001','����')
insert into TbStatus(scode,sname) values('1-002','����')
insert into TbStatus(scode,sname) values('1-003','��ʧ')
/*���׷���*/
insert into TbStatus(scode,sname) values('2-001','��ֵ')
insert into TbStatus(scode,sname) values('2-002','����')
insert into TbStatus(scode,sname) values('2-003','����')
/*��ֵ��ʽ*/
insert into TbStatus(scode,sname) values('3-001','�ֽ�')
insert into TbStatus(scode,sname) values('3-002','΢��֧��')
insert into TbStatus(scode,sname) values('3-003','֧����')
insert into TbStatus(scode,sname) values('3-004','���п�')
insert into TbStatus(scode,sname) values('3-005','������֧��')
insert into TbStatus(scode,sname) values('3-006','�ۿ�')
go

select * from TbStatus
go

/*��Ա�ȼ���ֵ�Ż���Ϣ*/
create table TbVipLevel
(
	vlid int identity primary key not null,
	/*�ȼ�����*/
	lname nvarchar(50) unique not null,
	/*�ȼ����*/
	amount decimal(10,2) check(amount>0) not null,
	/*��ֵ�Żݰٷֱ�*/
	apercent int check(apercent>=0) not null
)
go

/*��Ա�ȼ�Ĭ������*/
insert into TbVipLevel(lname,amount,apercent) values('��ͭ',100,0)
insert into TbVipLevel(lname,amount,apercent) values('����',200,10)
insert into TbVipLevel(lname,amount,apercent) values('�ƽ�',500,20)
insert into TbVipLevel(lname,amount,apercent) values('�׽�',1000,50)
insert into TbVipLevel(lname,amount,apercent) values('��ʯ',5000,70)
go

select * from TbVipLevel
go 

/*��Ƭ��Ϣ*/
create table TbVipCard
(
	vcid int identity primary key not null,
	/*����*/
	cardno varchar(50) unique not null,
	/*�绰*/
	phone varchar(50) unique not null,
	/*����*/
	username nvarchar(50),
	/*��Ƭ״̬*/
	cstatus int foreign key references TbStatus(sid) not null,
	/*��������*/
	created datetime default getdate() not null	
)
go

select * from TbVipCard
go

/*��Ա�����׼�¼*/
create table TbVipCardRecord
(
	vcrid int identity primary key not null,
	/*����*/
	vcid int foreign key references TbVipCard(vcid) not null,
	/*��������*/
	rstatus int foreign key references TbStatus(sid) not null,
	/*������Դ*/
	rtstatus int foreign key references TbStatus(sid) not null,
	/*����ģʽ,1Ϊ���ӣ�-1Ϊ����*/
	rmode int check(rmode in(-1,1)) not null,
	/*���׽��*/
	ramount decimal(10,2) check(ramount>0) not null,
	/*����˵��*/
	rinfo nvarchar(500) not null,
	/*����ʱ��*/
	created datetime default getdate() not null
)
go

select * from TbVipCardRecord
go