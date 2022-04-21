# <center>Nodejs Basic Tutorial</center>

# 0. Cấu trúc cây thư mục
# Setup lại môi trường thông qua file json.
# 1. Start một ứng dụng cơ bản
## 1.1. Cài đặt framework "express"
Để cài đặt package bất kì trong dự án nodejs, syntax như sau: 

    npm install --save <package_name> 
    or
    npm install --save-dev <package_name> 

Nếu sử dụng --save thì package được lưu trong dependencies, tức là nó sẽ có tác dụng trong lúc phát triển dự án này và lúc triển khai dự án trong thực tế. Nếu sử dụng --save-dev thì package được lưu trong "devDependencies" nên nó có tác dụng trong lúc phát triển dự án, chứ khi triển khai thực tế thì nó không có tác dụng. Những gói hỗ trợ debug, refresh code thì nên dùng --save-dev.
Tìm hiểu thêm: https://viblo.asia/p/tong-quan-ve-npm-4P856dy3ZY3aa

"express" là framework theo ta xuyên suốt dự án nodejs, nên cài --save

    npm install --save express

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

# 2. Các package hỗ trợ refresh, debug cho dự án
## 2.1. Restart server mỗi khi code thay đổi bằng nodemon
Mỗi lần sửa code thì code đó không cập nhật, nên cần phải restart lại server để xem sự thay đổi từ code mới. Ai rảnh đâu restart lại hoài, nên có package hỗ trợ việc cập nhật này là "nodemon".
### 2.1.1. Cài đặt
Vì hỗ trợ restart trong lúc sửa code, nên không cần xuất hiện trong dự án thực. Do đó mạnh dạng chọn --save-dev để cài.

    npm install --save-dev nodemon

Giờ để sử dụng nodemon thì chạy lệnh sau: 

    npx nodemon src/app.js
để ngắn gọn hơn, ta tạo script trong file package.json như sau: đến phần script trong file và paste đoạn này vào: 

    "start":"nodemon src/app.js",
sau đó ra terminal và chạy: npm start
## 2.2. Trả về trạng thái trang web khi refresh trang bằng morgan

Docs: https://www.npmjs.com/package/morgan

Mỗi lần trang web của ta được refresh thì morgan sẽ trả về những thông số liên quan đến quá trình load trang. Có thể dùng để debug khi cần thiết. Do đó ta cài với mode --save-dev.
### 2.2.1. Cài đặt morgan

    npm install --save-dev morgan

Thêm 2 dòng sau vào file app.js của chúng ta nhé!

    // gọi package morgan
    var morgan = require('morgan')
 
    // Sử dụng morgan với "combined"
    app.use(morgan('combined'))


**Chú ý:**
Thông thường khi import package thì nên để trước dòng `const app = express()`, nếu không thì đa phần các package sau khi import không có tác dụng. Trong tường hợp morgan sẽ là: 

    const morgan = require('morgan')
    const app = express()
    app.use(morgan('combined'))

# 3. Render giao diện bằng express-handlebars
## 3.1. Cài express-handlebars

    npm install --save express-handlebars

## 3.2. Cấu trúc thư mục khi sử dụng express-handlebars 
Cần chú ý kĩ cấu trúc thư mục của views, đây là thư mục mặc định của express-handlebars.

    views
    ├── home.handlebars
    ├── news.handlebars
    └── layouts
        └── main.handlebars
    └── partials
        ├── header.handlebars
        ├── footer.handlebars

    
Trong cấu trúc này:
* main.handlebars là file bố cục của toàn bộ trang web. Nó quy định header, body, footer đặt ở đâu trong trang web.
* header, footer.handlebars là code riêng cho từng phần, từng chức năng, sẽ được gọi lại trong main.handlebars.
* home, news.handlebars là nội dung chính trong từng file.

main.handlebars

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            // gọi lại file header
            {{> header}}

            // phần thân của web, trong file này thì ghi body, lúc render thì gọi file home hay news.handlebars
            {{{ body }}}

            // gọi lại file footer
            {{> footer}}
        </body>
    </html>


## 3.3. Code trong file app.js

    // gọi package
    const {engine} = require('express-handlebars');

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');

    // xác định thu mục views cho handlebars
    app.set('views', './src/views');

    // Render ra html để hiển thị cho người dùng. Nó sẽ render ra file main.handlebars, thay chỗ {{{body}}} thành file truyền trong hàm render.
    app.get('/home', function(req, res){
        res.render('home')
    })
    app.get('/tin_tuc', function(req, res){
        res.render('news')
    })