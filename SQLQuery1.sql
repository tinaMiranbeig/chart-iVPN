﻿CREATE TABLE DRUG( -- دارو
D# INT NOT NULL,
Name NVARCHAR(50) NOT NULL,
Price DECIMAL(18,5) ,
IsPrivate BIT NOT NULL
);
CREATE TABLE STORE( -- داروخانه
S# INT NOT NULL,
Name NVARCHAR(50) NOT NULL,
Address NVARCHAR(50) NOT NULL
);
CREATE TABLE DRUG_STORE( -- جدول واسط دارو و دارخانه
D# INT NOT NULL,
S# INT NOT NULL
);
CREATE TABLE PRESCRIPTION( -- نسخه
P# INT NOT NULL,
U# INT NOT NULL,
[DATE] DATETIME NOT NULL
);
CREATE TABLE PRESCRIPTION_DRUG( -- جدول واسط نسخه و دارو
P# INT NOT NULL,
D# INT NOT NULL,
[COUNT] INT NOT NULL
);
CREATE TABLE COMPANY( -- شرکت
C# INT NOT NULL,
Name NVARCHAR(50) NOT NULL,
NATIONALID INT NOT NULL
);
CREATE TABLE FACTOR( -- فاکتور
F# INT NOT NULL,
P# INT NOT NULL,
PRICE DECIMAL(18,5) NOT NULL
);
CREATE TABLE user1( -- کاربر
U# INT NOT NULL,
FName NVARCHAR(50) NOT NULL,
LName NVARCHAR(50) NOT NULL,
NATIONALID INT NOT NULL,
InsName NVARCHAR(50)
);
CREATE TABLE USER_TURN( -- نوبت
U# INT NOT NULL,
TURN INT NOT NULL
);