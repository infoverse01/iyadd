// دالة لإظهار الـ nav عند تمرير الماوس على السهم أو على الـ nav نفسه
function showNav() {
    document.getElementById("navMenu").classList.add("show");
}

// دالة لإخفاء الـ nav عند إبعاد الماوس
function hideNav() {
    document.getElementById("navMenu").classList.remove("show");
}
// التحقق من صحة النموذج (مثل نموذج تسجيل الدخول)
function validateForm(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("يرجى تعبئة جميع الحقول.");
        event.preventDefault(); // منع إرسال النموذج إذا كانت الحقول فارغة
    }
}

// تفعيل التحقق عند إرسال نموذج تسجيل الدخول
document.querySelector("form").addEventListener("submit", validateForm);

// تمرير السلاسة إلى الأقسام عند النقر على الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // الانتقال إلى القسم بشكل سلس
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// تفاعل مع الأزرار عند التمرير عليها
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = "#0056b3"; // تغيير اللون عند المرور
    });
    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = "#007bff"; // العودة إلى اللون الأصلي عند الخروج
    });
});















