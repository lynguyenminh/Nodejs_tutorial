# <center>Nodejs Basic Tutorial</center>

# 0. Cấu trúc cây thư mục

# 1. Start một ứng dụng cơ bản
## 1.1. Cài đặt framework "express"
Để cài đặt package bất kì trong dự án nodejs, syntax như sau: 

    npm install <package_name> --save
    or
    npm install <package_name> --save-dev

Nếu sử dụng --save thì package được lưu trong dependencies, tức là nó sẽ có tác dụng trong lúc phát triển dự án này và lúc triển khai dự án trong thực tế. Nếu sử dụng --save-dev thì ...

## 1.2. Code file chính của project app.js

    // Gọi framework express
    const express = require('express')

    // Khởi tạo một app từ express
    const app = express()

    // Định nghĩa port giao tiếp cho web
    const port = 5000


    // app.get như này gọi là routes. Nói rõ ở phía sau.
    app.get('/', function(req, res){
        res.send('Hello!!!')
    })

    // start server trên port đã định nghĩa
    app.listen(port)

## 1.3. Router là gì?

Một cách cơ bản thì route có chức năng điều hướng trong hệ thống của chúng ta. Cấu trúc chung của một routes như sau: 

    app.<method>('/path', function(req, res){
        ...
    })

method: Thường là post hay get, sẽ tìm hiểu kĩ phía sau.

req, res: khi giao tiếp với hệ thống, yêu cầu một request, hệ thống trả về một respone.

path: Giống như địa chỉ nhà vậy. Trình duyệt dùng path này để gọi hàm từ server. Ví dụ mình có routers như sau: 

    app.get('/daylapathnhebacon', function(req, res){
        ...
    })
Khi nhập vào thanh search của browser: https://localhost:5000/daylapathnhebacon thì hàm trong cái routers đó sẽ được thực hiện. Còn nếu nhập https://localhost:5000/caigicungdc, server kiểm tra xem có cái path nào tên '/caigicungdc' không, nếu có thì thực thi hàm của nó, không thì phát sinh lỗi.

Nguyên lý hoạt động của routes là khi path được gọi, thì hàm sẽ được thực hiện. Trong những phần sau, mình sẽ tách phần routes này ra thành nhiều file, để cho code dễ hiểu hơn nữa.
