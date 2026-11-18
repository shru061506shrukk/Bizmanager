// All screen text lives here. To add a language: add a block with the same keys.
const I18N = {
  en: {
    nav_home: "Home", nav_manage: "Manage", nav_assistant: "Assistant",
    soon_manage: "Add and edit customers, stock and payments here. Coming in the next step.",
    soon_assistant: "Talk or type to the assistant here. Coming soon.",
    step1: "Step 1 of 2", step2: "Step 2 of 2",
    create_account_title: "Create your account",
    email: "Email", password: "Password", confirm_password: "Confirm password",
    ph_pass_min: "At least 6 characters", ph_pass_again: "Type it again",
    show_password: "Show password", create_btn: "Create account",
    have_account: "Already have an account?", login: "Log in",
    new_here: "New here?", create_link: "Create an account",
    welcome_back: "Welcome back!", tell_us: "Tell us about your business",
    owner_name: "Owner name", ph_owner: "Your name",
    business_name: "Business name", ph_shop: "Shop name",
    business_type: "Type of business",
    phone_opt: "Phone (optional)", ph_phone: "10-digit mobile number",
    finish: "Finish",
    err_email: "Please enter a valid email.",
    err_pass_len: "Password must be at least 6 characters.",
    err_pass_match: "The two passwords do not match.",
    almost_done: "Almost done! Please tell us about your business.",
    hello: "Hello", logout: "Log out",
    today_sales: "Today's sales", last30: "Last 30 days", bills: "bills",
    owe_you: "Customers owe you", customers_word: "customers",
    low_stock: "Low stock", items_reorder: "items to reorder",
    stock_off: "Stock tracking is off for this business type", stock_word: "Stock",
    who_owes: "Who owes the most", nobody_owes: "Nobody owes you money.",
    running_low: "Running low", left: "left", reorder_at: "reorder at",
    sales_by_month: "Sales by month", no_sales: "No sales yet.",
    unit_piece: "piece", unit_metre: "metre", unit_kg: "kg", unit_litre: "litre",
    unit_packet: "packet", unit_service: "service", unit_plate: "plate", unit_cup: "cup"
  },
  kn: {
    nav_home: "ಮುಖಪುಟ", nav_manage: "ನಿರ್ವಹಣೆ", nav_assistant: "ಸಹಾಯಕ",
    soon_manage: "ಇಲ್ಲಿ ಗ್ರಾಹಕರು, ಸ್ಟಾಕ್ ಮತ್ತು ಪಾವತಿಗಳನ್ನು ಸೇರಿಸಿ, ಬದಲಿಸಿ. ಮುಂದಿನ ಹಂತದಲ್ಲಿ ಬರಲಿದೆ.",
    soon_assistant: "ಇಲ್ಲಿ ಸಹಾಯಕನೊಂದಿಗೆ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ. ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.",
    step1: "ಹಂತ 1 / 2", step2: "ಹಂತ 2 / 2",
    create_account_title: "ನಿಮ್ಮ ಖಾತೆ ತೆರೆಯಿರಿ",
    email: "ಇಮೇಲ್", password: "ಪಾಸ್ವರ್ಡ್", confirm_password: "ಪಾಸ್ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ",
    ph_pass_min: "ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು", ph_pass_again: "ಮತ್ತೊಮ್ಮೆ ಟೈಪ್ ಮಾಡಿ",
    show_password: "ಪಾಸ್ವರ್ಡ್ ತೋರಿಸಿ", create_btn: "ಖಾತೆ ತೆರೆಯಿರಿ",
    have_account: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?", login: "ಲಾಗಿನ್",
    new_here: "ಹೊಸಬರೇ?", create_link: "ಖಾತೆ ತೆರೆಯಿರಿ",
    welcome_back: "ಮರಳಿ ಸ್ವಾಗತ!", tell_us: "ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಬಗ್ಗೆ ತಿಳಿಸಿ",
    owner_name: "ಮಾಲೀಕರ ಹೆಸರು", ph_owner: "ನಿಮ್ಮ ಹೆಸರು",
    business_name: "ವ್ಯಾಪಾರದ ಹೆಸರು", ph_shop: "ಅಂಗಡಿಯ ಹೆಸರು",
    business_type: "ವ್ಯಾಪಾರದ ವಿಧ",
    phone_opt: "ಫೋನ್ (ಐಚ್ಛಿಕ)", ph_phone: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    finish: "ಮುಗಿಸಿ",
    err_email: "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ನಮೂದಿಸಿ.",
    err_pass_len: "ಪಾಸ್ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳಿರಬೇಕು.",
    err_pass_match: "ಎರಡೂ ಪಾಸ್ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
    almost_done: "ಬಹುತೇಕ ಮುಗಿಯಿತು! ದಯವಿಟ್ಟು ನಿಮ್ಮ ವ್ಯಾಪಾರದ ವಿವರ ನೀಡಿ.",
    hello: "ನಮಸ್ಕಾರ", logout: "ಲಾಗ್ ಔಟ್",
    today_sales: "ಇಂದಿನ ಮಾರಾಟ", last30: "ಕಳೆದ 30 ದಿನ", bills: "ಬಿಲ್‌ಗಳು",
    owe_you: "ಗ್ರಾಹಕರು ನಿಮಗೆ ಕೊಡಬೇಕಾದ ಹಣ", customers_word: "ಗ್ರಾಹಕರು",
    low_stock: "ಕಡಿಮೆ ಸ್ಟಾಕ್", items_reorder: "ಮತ್ತೆ ತರಿಸಬೇಕಾದ ವಸ್ತುಗಳು",
    stock_off: "ಈ ವ್ಯಾಪಾರ ವಿಧಕ್ಕೆ ಸ್ಟಾಕ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಆಫ್ ಆಗಿದೆ", stock_word: "ಸ್ಟಾಕ್",
    who_owes: "ಹೆಚ್ಚು ಬಾಕಿ ಇರುವವರು", nobody_owes: "ಯಾರೂ ನಿಮಗೆ ಬಾಕಿ ಇಲ್ಲ.",
    running_low: "ಮುಗಿಯುತ್ತಿರುವ ವಸ್ತುಗಳು", left: "ಉಳಿದಿದೆ", reorder_at: "ಮತ್ತೆ ತರಿಸಿ",
    sales_by_month: "ತಿಂಗಳ ಮಾರಾಟ", no_sales: "ಇನ್ನೂ ಮಾರಾಟ ಇಲ್ಲ.",
    unit_piece: "ಪೀಸ್", unit_metre: "ಮೀಟರ್", unit_kg: "ಕೆ.ಜಿ", unit_litre: "ಲೀಟರ್",
    unit_packet: "ಪ್ಯಾಕೆಟ್", unit_service: "ಸೇವೆ", unit_plate: "ಪ್ಲೇಟ್", unit_cup: "ಕಪ್"
  },
  hi: {
    nav_home: "होम", nav_manage: "प्रबंधन", nav_assistant: "सहायक",
    soon_manage: "यहाँ ग्राहक, स्टॉक और भुगतान जोड़ें और बदलें। अगले चरण में आ रहा है।",
    soon_assistant: "यहाँ सहायक से बोलें या लिखें। जल्द आ रहा है।",
    step1: "चरण 1 / 2", step2: "चरण 2 / 2",
    create_account_title: "अपना खाता बनाएँ",
    email: "ईमेल", password: "पासवर्ड", confirm_password: "पासवर्ड की पुष्टि करें",
    ph_pass_min: "कम से कम 6 अक्षर", ph_pass_again: "फिर से लिखें",
    show_password: "पासवर्ड दिखाएँ", create_btn: "खाता बनाएँ",
    have_account: "पहले से खाता है?", login: "लॉग इन",
    new_here: "नए हैं?", create_link: "खाता बनाएँ",
    welcome_back: "वापसी पर स्वागत है!", tell_us: "अपने व्यवसाय के बारे में बताएँ",
    owner_name: "मालिक का नाम", ph_owner: "आपका नाम",
    business_name: "व्यवसाय का नाम", ph_shop: "दुकान का नाम",
    business_type: "व्यवसाय का प्रकार",
    phone_opt: "फ़ोन (वैकल्पिक)", ph_phone: "10 अंकों का मोबाइल नंबर",
    finish: "पूरा करें",
    err_email: "कृपया सही ईमेल दर्ज करें।",
    err_pass_len: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
    err_pass_match: "दोनों पासवर्ड मेल नहीं खाते।",
    almost_done: "लगभग पूरा! कृपया अपने व्यवसाय की जानकारी दें।",
    hello: "नमस्ते", logout: "लॉग आउट",
    today_sales: "आज की बिक्री", last30: "पिछले 30 दिन", bills: "बिल",
    owe_you: "ग्राहकों से बकाया", customers_word: "ग्राहक",
    low_stock: "कम स्टॉक", items_reorder: "दोबारा मँगाने की वस्तुएँ",
    stock_off: "इस व्यवसाय के लिए स्टॉक ट्रैकिंग बंद है", stock_word: "स्टॉक",
    who_owes: "सबसे ज़्यादा बकाया", nobody_owes: "किसी का बकाया नहीं है।",
    running_low: "कम हो रहा सामान", left: "बचा है", reorder_at: "दोबारा मँगाएँ",
    sales_by_month: "महीने की बिक्री", no_sales: "अभी तक कोई बिक्री नहीं।",
    unit_piece: "पीस", unit_metre: "मीटर", unit_kg: "किलो", unit_litre: "लीटर",
    unit_packet: "पैकेट", unit_service: "सेवा", unit_plate: "प्लेट", unit_cup: "कप"
  }
};

const LOCALES = { en: 'en-IN', kn: 'kn-IN', hi: 'hi-IN' };
let LANG = 'en';
try { LANG = localStorage.getItem('lang') || 'en'; } catch (e) {}
if (!I18N[LANG]) LANG = 'en';

// t('key') -> text in the current language (falls back to English, then to the key)
function t(key) { return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key; }

// Fill every element that has data-i18n (text) or data-i18n-ph (placeholder)
function applyLang() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('.langbar button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === LANG);
  });
}