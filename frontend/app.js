let sb;                 // the Supabase client
let lastDash = null;    // last dashboard data, so a language change can redraw it
let businessTypes = []; // list for the business dropdown
let loggedIn = false;

const TAB_SECTIONS = ['home', 'manage', 'assistant'];

function show(id) {
  document.querySelectorAll('section').forEach(s => { s.style.display = 'none'; });
  document.getElementById(id).style.display = 'block';
  document.getElementById('tabs').style.display = TAB_SECTIONS.includes(id) ? 'flex' : 'none';
  document.querySelectorAll('#tabs button').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === id);
  });
}
function say(text) { document.getElementById('msg').textContent = text || ''; }
const val = id => document.getElementById(id).value.trim();
function togglePw(visible) {
  ['s_pass', 's_pass2'].forEach(id => {
    document.getElementById(id).type = visible ? 'text' : 'password';
  });
}

// Escape text before putting it into HTML (names are typed by users)
const esc = s => String(s ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rupee = n => '\u20B9' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const monthName = m => new Date(m + '-01').toLocaleString(LOCALES[LANG] || 'en-IN',
  { month: 'short', year: 'numeric', timeZone: 'UTC' });
const unitName = u => { const k = 'unit_' + u; return t(k) === k ? u : t(k); };

async function api(path, method = 'GET', body) {
  const { data } = await sb.auth.getSession();
  const headers = { 'Content-Type': 'application/json' };
  if (data.session) headers['Authorization'] = 'Bearer ' + data.session.access_token;
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status >= 500) throw new Error('Server error. Check the uvicorn terminal.');
    throw new Error(typeof json.detail === 'string' ? json.detail : 'Please check the form');
  }
  return json;
}

// ---------- language ----------
function fillTypes() {
  const sel = document.getElementById('r_type');
  const current = sel.value;
  sel.innerHTML = businessTypes.map(b =>
    `<option value="${esc(b.key)}">${b.icon} ${esc(b.label[LANG] || b.label.en)}</option>`).join('');
  if (current) sel.value = current;
}

async function setLang(code, saveToServer = true) {
  LANG = code;
  try { localStorage.setItem('lang', code); } catch (e) {}
  applyLang();
  fillTypes();
  if (lastDash) renderDashboard(lastDash);
  if (loggedIn && saveToServer) {
    try { await api('/me/language', 'PUT', { language: code }); } catch (e) { /* not critical */ }
  }
}

// ---------- start ----------
async function init() {
  applyLang();
  show('signup');   // always show something, even if startup fails below
  if (typeof supabase === 'undefined') {
    return say('Supabase script did not load. Check that frontend/supabase.js exists and is the real file.');
  }
  try {
    const cfg = await (await fetch('/public-config')).json();
    sb = supabase.createClient(cfg.supabase_url, cfg.supabase_anon_key);

    businessTypes = await (await fetch('/business-types/')).json();
    fillTypes();

    const { data } = await sb.auth.getSession();
    if (data.session) await goHome();
  } catch (e) {
    console.error(e);
    say('Could not start: ' + e.message);
  }
}

// ---------- sign up: step 1 ----------
async function createAccount() {
  say('');
  const email = val('s_email');
  const pass = document.getElementById('s_pass').value;
  const pass2 = document.getElementById('s_pass2').value;

  if (!email.includes('@')) return say(t('err_email'));
  if (pass.length < 6) return say(t('err_pass_len'));
  if (pass !== pass2) return say(t('err_pass_match'));

  const { data, error } = await sb.auth.signUp({ email, password: pass });
  if (error) return say(error.message);
  if (!data.session) {
    return say('Account created, but Supabase wants email confirmation. Turn off "Confirm email" in Authentication > Providers > Email.');
  }
  show('setup');
}

// ---------- sign up: step 2 ----------
async function finishSetup() {
  say('');
  try {
    await api('/onboarding/profile', 'POST', {
      owner_name: val('r_owner'), shop_name: val('r_shop'),
      business_type: val('r_type'), language: LANG,
      phone: val('r_phone') || null
    });
    await goHome();
  } catch (e) { say(e.message); }
}

async function login() {
  say('');
  const { error } = await sb.auth.signInWithPassword({
    email: val('l_email'), password: document.getElementById('l_pass').value
  });
  if (error) return say(error.message);
  await goHome();
}

async function goHome() {
  try {
    const me = await api('/me');
    if (!me.profile) {   // logged in, but step 2 never finished
      show('setup');
      return say(t('almost_done'));
    }
    loggedIn = true;
    // the language saved on the account wins after login
    if (me.profile.language && me.profile.language !== LANG && I18N[me.profile.language]) {
      await setLang(me.profile.language, false);
    }
    await openTab('home');
  } catch (e) { say(e.message); show('login'); }
}

async function openTab(name) {
  say('');
  if (name === 'home') {
    try {
      lastDash = await api('/dashboard/');
      renderDashboard(lastDash);
    } catch (e) { say(e.message); }
  }
  show(name);
}

function renderDashboard(d) {
  const maxMonth = Math.max(1, ...d.monthly.map(m => m.total));
  const bizLabel = d.business.label[LANG] || d.business.label.en;

  const stockCard = d.business.uses_stock
    ? `<div class="card ${d.low_stock_count ? 'warn' : ''}">
         <div class="label">${t('low_stock')}</div>
         <div class="big">${d.low_stock_count}</div>
         <div class="sub">${t('items_reorder')}</div></div>`
    : `<div class="card"><div class="label">${t('stock_word')}</div>
         <div class="sub">${t('stock_off')}</div></div>`;

  const owingRows = d.top_owing.length
    ? d.top_owing.map(c => `<div class="row"><span>${esc(c.name)}</span><b>${rupee(c.outstanding)}</b></div>`).join('')
    : `<p class="muted">${t('nobody_owes')}</p>`;

  const stockList = (d.business.uses_stock && d.low_stock.length)
    ? `<h3>${t('running_low')}</h3><div class="card">` +
      d.low_stock.map(p => {
        const nm = (p.names && (p.names[LANG] || p.names.en)) || p.name;
        return `<div class="row"><span>${esc(nm)}</span>
          <span>${p.stock_qty} ${esc(unitName(p.unit))} ${t('left')}
          <span class="muted">(${t('reorder_at')} ${p.reorder_level})</span></span></div>`;
      }).join('') + `</div>`
    : '';

  const bars = d.monthly.length
    ? d.monthly.map(m => `<div class="bar-row"><span class="m">${esc(monthName(m.month))}</span>
        <div class="bar" style="width:${Math.round(m.total / maxMonth * 55)}%"></div>
        <span class="v">${rupee(m.total)}</span></div>`).join('')
    : `<p class="muted">${t('no_sales')}</p>`;

  document.getElementById('dash').innerHTML = `
    <div class="hello">
      <div><h2>${esc(d.shop.shop_name)}</h2>
        <small>${d.business.icon} ${esc(bizLabel)} \u00B7 ${t('hello')}, ${esc(d.shop.name)}</small></div>
      <button class="light" onclick="logout()">${t('logout')}</button>
    </div>

    <div class="grid">
      <div class="card"><div class="label">${t('today_sales')}</div>
        <div class="big">${rupee(d.today)}</div></div>
      <div class="card"><div class="label">${t('last30')}</div>
        <div class="big">${rupee(d.last_30)}</div>
        <div class="sub">${d.bills_30} ${t('bills')}</div></div>
      <div class="card warn"><div class="label">${t('owe_you')}</div>
        <div class="big">${rupee(d.total_outstanding)}</div>
        <div class="sub">${d.customers_owing} ${t('customers_word')}</div></div>
      ${stockCard}
    </div>

    <h3>${t('who_owes')}</h3>
    <div class="card">${owingRows}</div>
    ${stockList}
    <h3>${t('sales_by_month')}</h3>
    <div class="card">${bars}</div>`;
}

async function logout() {
  await sb.auth.signOut();
  loggedIn = false;
  lastDash = null;
  say('');
  show('login');
}

init();