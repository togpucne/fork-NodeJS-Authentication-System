### Bài 6

Fork dự án **NodeJS-Authentication-System** từ link:

👉 [https://github.com/mrhuynhnam/NodeJS-Authentication-System](https://github.com/mrhuynhnam/NodeJS-Authentication-System) về repository của bạn.

**Yêu cầu:**

#### **a. Chỉnh sửa mã nguồn để hoàn thiện ứng dụng cho đúng. (Gợi ý: sử dụng một số hướng dẫn trong repository trên GitHub sau khi fork).**

1. **Tạo Captcha**

![1758905040772](image/READMEcopy/1758905040772.png)

Sau đó chọn Submit

![1758905064852](image/READMEcopy/1758905064852.png)

Google cấp

![1758908911564](image/READMEcopy/1758908911564.png)

2. **Tạo Mailtrap**

![1758910590476](image/READMEcopy/1758910590476.png)

Chọn Node.js

![1758910647833](image/READMEcopy/1758910647833.png)


**3.Tạo file .env**

![1758911195065](image/READMEcopy/1758911195065.png)

#### b. Hiển thị **mã số sinh viên** và **họ tên đầy đủ** của bạn trên tất cả các trang.

1. File app.js thêm ngay sau phần cấu hình middleware, để hiện thị mssv + ten

![1758904276666](image/READMEcopy/1758904276666.png)

2. File layout.ejs thêm footer để hiện tên

![1758904317010](image/READMEcopy/1758904317010.png)

#### c. Kiểm thử tất cả các trang theo đúng chức năng của chúng.

1. **Trang Sign up (Đăng ký)**

   * Truy cập: `http://localhost:3000/user/signup`
   * Nhập thông tin user mới: email: "phuchandsome@gmail.com" ;  pasword: "12345"

   ![1758904605262](image/READMEcopy/1758904605262.png)
2. **Trang Sign in (Đăng nhập)**

   * Truy cập: `http://localhost:3000/user/signin`
   * Login với tài khoản vừa tạo: email:  "phuchandsome@gmail.com" ;  pasword: "12345"

   ![1758908953898](image/READMEcopy/1758908953898.png)
3. **Trang Homepage (Profile)**

   * Truy cập: `http://localhost:3000/user/homepage`

     ![1758909504917](image/READMEcopy/1758909504917.png)
4. **Trang Sign out (Đăng xuất)**

   * Truy cập: `http://localhost:3000/user/signout`

     ![1758909537033](image/READMEcopy/1758909537033.png)
5. **Trang Forgot Password (Quên mật khẩu)**

   * Truy cập: `http://localhost:3000/user/forgot-password`
   * Nhập email → nếu có cấu hình Gmail thì check hộp thư (nếu không thì chỉ cần chụp màn hình báo thành công).

   Nhập email đã quên mật khẩu

   ![1758909972080](https://file+.vscode-resource.vscode-cdn.net/d%3A/%5B3%5D%20N%C4%83m%204_1/%5B3%5D%20LapTrinhHDV/%5B1%5D%20ThucHanh/lab6/src/src/NodeJS-Authentication-System/image/READMEcopy/1758909972080.png)

   - Hệ thống gửi mail và mật khẩu mới, giả lập trên MailTrap

   ![1758910974978](https://file+.vscode-resource.vscode-cdn.net/d%3A/%5B3%5D%20N%C4%83m%204_1/%5B3%5D%20LapTrinhHDV/%5B1%5D%20ThucHanh/lab6/src/src/NodeJS-Authentication-System/image/READMEcopy/1758910974978.png)

   Mật khẩu được gửi giả lập vào Mail Train

   ![1758911037466](image/READMEcopy/1758911037466.png)

   Password Reset

   ![1758911065448](image/READMEcopy/1758911065448.png)


Nhập lại Email và Mật khẩu mới

![1758911123321](image/READMEcopy/1758911123321.png)



6. **Trang Change Password (Đổi mật khẩu)**

* Truy cập: `http://localhost:3000/user/change-password

  Đổi mật khẩu ban đầu password="12345" -> "1234567"

  ![1758909323899](image/READMEcopy/1758909323899.png)


**7. Login bằng Google (OAuth2)**

* Truy cập: `http://localhost:3000/auth/google`
* Chọn tài khoản Google → thành công → redirect về `CLIENT_URL` (ví dụ `/auth/login/success`).
* Nếu từ chối → redirect về `/login/failed`.





#### d. Chụp màn hình toàn bộ kết quả kiểm thử, đặt tên file theo chức năng kiểm thử.

1. Sign up: User created successfully

![1758904666833](image/READMEcopy/1758904666833.png)

Database:

![1758904708643](image/READMEcopy/1758904708643.png)

2. Sign In: email: "phuchandsome@gmail.com" ;  pasword: "12345"

![1758909043484](image/READMEcopy/1758909043484.png)

Sign In thành công hiện trang HomePage

![1758909014499](image/READMEcopy/1758909014499.png)

3. Change Password: password: "12345" - > "1234567"

![1758909649120](image/READMEcopy/1758909649120.png)

Password changed succefully

![1758909387975](image/READMEcopy/1758909387975.png)

Database:

![1758909434830](image/READMEcopy/1758909434830.png)

4. Sign out: thành công hiện trang Sign In

![1758909798596](image/READMEcopy/1758909798596.png)

5. Forgot Password: dùng MailTrap giả lập khi nhập email muốn lấy lại mật khẩu, tin nhắn MẬT KHẨU MỚI sẽ gửi lên mail trap

Nhập lại Email và Mật khẩu mới

![1758911123321](image/READMEcopy/1758911123321.png)

Đổi thành công:

![1758911157236](image/READMEcopy/1758911157236.png)

Database

![1758911142625](image/READMEcopy/1758911142625.png)


Ví dụ:

* `login.png`
* `logout.jpg`

Sau đó, đặt tất cả hình ảnh vào thư mục  **public/results** .

e. Commit toàn bộ project lên repository của bạn
