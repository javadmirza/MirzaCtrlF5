// ایجاد منوی راست کلیک هنگام نصب اکستنشن
chrome.runtime.onInstalled.addListener(() => {
  console.log("اکستنشن نصب شد - ایجاد منوی راست کلیک");
  
  // حذف منوی قبلی اگر وجود دارد
  chrome.contextMenus.removeAll(() => {
    // ایجاد منوی جدید
    chrome.contextMenus.create({
      id: "ctrlF5Refresh",
      title: "تخلیه کش (Ctrl+F5)",
      contexts: ["selection", "page"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("خطا در ایجاد منو:", chrome.runtime.lastError);
      } else {
        console.log("منوی راست کلیک با موفقیت ایجاد شد");
      }
    });
  });
});

// مدیریت کلیک روی گزینه منو
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("کلیک روی منو:", info.menuItemId);
  
  if (info.menuItemId === "ctrlF5Refresh") {
    console.log("ارسال پیام تخلیه کش به تب:", tab.id);
    
    // ارسال پیام به content script برای اجرای Ctrl+F5
    chrome.tabs.sendMessage(tab.id, {
      action: "performCtrlF5"
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("خطا در ارسال پیام:", chrome.runtime.lastError);
        
        // اگر content script در دسترس نیست، مستقیماً reload کنیم
        console.log("تلاش برای reload مستقیم تب");
        chrome.tabs.reload(tab.id, { bypassCache: true });
      } else {
        console.log("پیام با موفقیت ارسال شد");
      }
    });
  }
});

console.log("Background script بارگذاری شد");
