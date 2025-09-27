### Bài 6

Fork dự án **NodeJS-Authentication-System** từ link:

👉 [https://github.com/mrhuynhnam/NodeJS-Authentication-System](https://github.com/mrhuynhnam/NodeJS-Authentication-System) về repository của bạn.

**Yêu cầu:**

#### **a. Chỉnh sửa mã nguồn để hoàn thiện ứng dụng cho đúng. (Gợi ý: sử dụng một số hướng dẫn trong repository trên GitHub sau khi fork).**

1. **Tạo Captcha**

![1758905040772](public/image/captcha1.png)

Sau đó chọn Submit

![1758905064852](public/image/captcha2.png)

Google cấp

![1758908911564](public/image/captcha3.png)

2. **Tạo Mailtrap**

![1758910590476](public/image/mail-trap.png)

Chọn Node.js

![1758910590476](public/image/mail-trap1.png)

**3. Cấu hình Google OAuth:**

![1758964923515](public/image/oAuth1.png)

![1758964930325](public/image/oAuth2.png)

![1758964951368](public/image/oAuth3.png)

![1758964975628](public/image/oAuth4.png)

![1758964988918](public/image/oAuth5.png)

![1758965000647](public/image/oAuth6.png)

4. Tạo file .env:![env](public/image/env.png)

#### b. Hiển thị **mã số sinh viên** và **họ tên đầy đủ** của bạn trên tất cả các trang.

1. File app.js thêm ngay sau phần cấu hình middleware, để hiện thị mssv + ten
   ![1758904317010](public/image/showID_Name.png)
2. File layout.ejs thêm footer để hiện tên

![1758904317010](public/image/showID_Name1.png)

#### c. Kiểm thử tất cả các trang theo đúng chức năng của chúng.

1. **Trang Sign up (Đăng ký)**

   * Truy cập: `http://localhost:3000/user/signup`
   * Nhập thông tin user mới: email: "phuchandsome@gmail.com" ;  pasword: "12345"

   ![1758904605262](public/image/signUp.png)
2. **Trang Sign in (Đăng nhập)**

   * Truy cập: `http://localhost:3000/user/signin`
   * Login với tài khoản vừa tạo: email:  "phuchandsome@gmail.com" ;  pasword: "12345"

   ![1758908953898](public/image/signIn.png)
3. **Trang Homepage (Profile)**

   * Truy cập: `http://localhost:3000/user/homepage`

   ![1758909504917](public/image/homepage.png)
4. **Trang Sign out (Đăng xuất)**

   * Truy cập: `http://localhost:3000/user/signout`

   ![1758909537033](public/image/sign-out.png)
5. **Trang Forgot Password (Quên mật khẩu)**

   * Truy cập: `http://localhost:3000/user/forgot-password`
   * Nhập email → nếu có cấu hình Gmail thì check hộp thư (nếu không thì chỉ cần chụp màn hình báo thành công).

   Nhập email đã quên mật khẩu

   ![1758909972080](public/image/forgot-password.png)

   - Hệ thống gửi mail và mật khẩu mới, giả lập trên MailTrap

   ![1758909972080](public/image/forgot-password1.png)

   Mật khẩu được gửi giả lập vào Mail Train

   ![1758911037466](public/image/mail-trap2.png)

   Password Reset

   ![1758911065448](public/image/mail-trap3.png)
6. **Trang Change Password (Đổi mật khẩu)**

* Truy cập: `http://localhost:3000/user/change-password. Đổi mật khẩu ban đầu password="12345" -> "1234567"

  ![1758909323899](public/image/change-password.png)

**7. Login bằng Google (OAuth2)**

* Truy cập: `http://localhost:3000/auth/google`

  * B1. Sign in with Google

    ![1758965042320](public/image/sign-in-gg.png)
  * B2. Chọn tài khoản:

    ![1758965042320](public/image/sign-in-gg1.png)
  * B3. Chọn tiếp tục

    ![1758965042320](public/image/sign-in-gg2.png)

#### d. Chụp màn hình toàn bộ kết quả kiểm thử, đặt tên file theo chức năng kiểm thử.

1. Sign up: User created successfully
   ![1758904666833](public/results/signUp.png)

Database:

![1758904708643](public/results/signUpDB.png)

2. Sign In: email: "phuchandsome@gmail.com" ;  pasword: "12345"

![1758909043484](public/results/signIn.png)

Sign In thành công hiện trang HomePage

![1758909014499](public/results/signIn-successfull.png)

3. Change Password: password: "12345" - > "1234567"

![1758909649120](public/results/change-password-enter.png)

Database:

![1758904666833](public/results/change-password-DB.png)

4. Sign out: thành công hiện trang Sign In

![1758909798596](public/results/log-out.png)

5. Forgot Password: dùng MailTrap giả lập khi nhập email muốn lấy lại mật khẩu, tin nhắn MẬT KHẨU MỚI sẽ gửi lên mail trap

Nhập lại Email và Mật khẩu mới

![1758911123321](public/results/forgot-password.png)

Nhập mật khẩu

![1758909649120](public/results/forgot-password-email.png)

Đổi thành công:

![1758911157236](public/image/homepage.png)

Database

![1758909649120](public/results/forgot-passwordDB.png)

6. Sign In With Google

   ![1758965310416](public/image/sign-in-gg.png)

   Đăng nhập thành công. Hiển thị Homepage

   ![1758965129698](public/results/sign-in-gg1.png)

   ![1758909649120](public/results/sign-in-gg.png)
   Database:

![1758965184114](public/results/sign-in-gg-DB.png)

Sau đó, đặt tất cả hình ảnh vào thư mục  **public/results** .

e. Commit toàn bộ project lên repository của bạn
