@echo off
FOR /L %%i IN (0,1,20) DO (
    qr "%%i" > %%i.png
)