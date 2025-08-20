// گوش دادن به پیام‌های background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "performCtrlF5") {
    console.log("دریافت درخواست تخلیه کش");
    performHardRefresh();
  }
});

// تابع اجرای تخلیه کش کامل
function performHardRefresh() {
  console.log("شروع عملیات تخلیه کش");
  
  // روش 1: استفاده از location.reload(true) - بهترین روش
  try {
    console.log("تلاش برای reload(true)");
    window.location.reload(true);
  } catch (error) {
    console.log("خطا در reload(true):", error);
    
    // روش 2: استفاده از window.location.href
    try {
      console.log("تلاش برای تغییر window.location.href");
      const currentUrl = window.location.href;
      window.location.href = currentUrl;
    } catch (error2) {
      console.log("خطا در تغییر href:", error2);
      
      // روش 3: استفاده از window.location.replace
      try {
        console.log("تلاش برای window.location.replace");
        window.location.replace(window.location.href);
      } catch (error3) {
        console.log("خطا در replace:", error3);
        
        // روش 4: استفاده از document.location
        try {
          console.log("تلاش برای document.location.reload");
          document.location.reload(true);
        } catch (error4) {
          console.log("خطا در document.location.reload:", error4);
          
          // روش 5: استفاده از history API
          try {
            console.log("تلاش برای history.go(0)");
            window.history.go(0);
          } catch (error5) {
            console.log("خطا در history.go:", error5);
            
            // روش آخر: استفاده از setTimeout
            console.log("تلاش برای setTimeout");
            setTimeout(() => {
              window.location.reload(true);
            }, 100);
          }
        }
      }
    }
  }
}

// اضافه کردن event listener برای کلیدهای واقعی Ctrl+F5
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'F5') {
    console.log("کلیدهای Ctrl+F5 فشرده شدند");
    event.preventDefault();
    event.stopPropagation();
    performHardRefresh();
  }
});

// اضافه کردن event listener برای کلیدهای Ctrl+Shift+R
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === 'R') {
    console.log("کلیدهای Ctrl+Shift+R فشرده شدند");
    event.preventDefault();
    event.stopPropagation();
    performHardRefresh();
  }
});

console.log("Content script بارگذاری شد");
