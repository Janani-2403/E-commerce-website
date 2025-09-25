/****************************************************************
 * Single-file e-commerce app (no external deps)
 * - Hash routing: #/ (home), #/product/:id, #/cart, #/checkout, #/confirmation
 * - Products stored in JS array (replace or fetch in real app)
 * - Cart persisted in localStorage as 'myshop_cart'
 ****************************************************************/

// ---------- SAMPLE PRODUCTS ----------
const PRODUCTS = [
  {
    id: 1,
    name: "HP 250 G9 8Y2Y9PA Laptop",
    price: 23900,
    category: "Electronics",
    img: ["hplap1.jpg", "hplap2.webp", "hplap3.jpg"],
    tags: ["laptop", "electronics"],
    desc: "Affordable and reliable laptop with a 15.6-inch display, Intel Celeron processor, and Windows 11 Pro."
  },
  {
    id: 2,
    name: "Sony WH-CH720N Noise Canceling Wireless headphones",
    price: 8728,
    category: "Electronics",
    img: ["headphone1.webp", "headphone2.webp","headphone3.webp"],
    tags: ["headphones", "audio"],
    desc: "Comfortable over-ear headphones with active noise cancelling."
  },
  {
    id: 3,
    name: "Samsung Galaxy A06 5g",
    price: 7549,
    category: "Electronics",
    img: ["sphone1.webp", "sphone2.webp","sphone3.webp"],
    tags: ["smartphone", "electronics"],
    desc: "Affordable 5G smartphone from Samsung with sleek design and smooth performance."
  },
  {
    id: 4,
    name: "Timex Analog Watch",
    price: 739,
    category: "Accessories",
    img: ["awatch1.webp", "awatch2.webp","awatch3.webp"],
    tags: ["watch", "accessories"],
    desc: "Classic analog watch from Timex with durable build and timeless design."
  },
  {
    id: 5,
    name: "Portronics SoundDrum 1",
    price: 1199,
    category: "Audio",
    img: ["bspeaker1.webp", "bspeaker2.webp","bspeaker3.webp"],
    tags: ["speaker", "audio"],
    desc: "Compact 10W portable Bluetooth speaker with TWS support and Bluetooth 5.0 connectivity."
  },
  { id: 6,
    name: "Zebronics Zeb-Jaguar Mouse", 
    price: 269,
    category: "Accessories",
    img:["wmouse1.webp","wmouse2.webp","wmouse3.webp"] , 
    tags:["mouse","accessories"] ,
    desc:"Ergonomic wireless mouse with adjustable DPI." 
  },
  { id: 7,
    name: " Colebrook Men's Cotton Shirt", 
    price: 449, 
    category: "Clothing", 
    img: ["pshirt1.webp","pshirt2.webp","pshirt3.webp"], 
    tags:["shirt","clothing"], 
    desc:"Comfortable solid cotton shirt with a relaxed fit, ideal for casual or semi-formal wear."
  },
  { id: 8, 
    name: "Men's Premium T-Shirt", 
    price: 449, 
    category: "Clothing", 
    img:[ "tshirt1.webp","tshirt2.webp"], 
    tags: ["t-shirt", "clothing"], 
    desc: "Stylish men's t-shirt featuring a navy blue base with red and white vertical stripes. Crafted from high-quality cotton for comfort and durability." 
  },
  { id: 9, 
    name: "Men's Casual Partywear Sneakers", 
    price: 799, 
    category: "Footwear", 
    img: ["sneaker1.jpg","sneaker2.jpg","sneaker3.jpg"], 
    tags: ["sneakers", "footwear"], 
    desc:"Trendy black sneakers designed for comfort and style, perfect for casual outings and partywear."
  },
  {
    id: 10,
    name: "Realme Buds Wireless 2 Neo",
    price: 1299,
    category: "Audio",
    img: ["buds1.webp", "buds2.webp", "buds3.webp"],
    tags: ["earphones", "audio"],
    desc: "Wireless neckband earphones with deep bass, Type-C fast charging, and up to 17 hours of playback."
  },
  {
    id: 11,
    name: "boAt Wave Call Smart Watch",
    price: 1499,
    category: "Electronics",
    img: ["swatch1.webp", "swatch2.webp"],
    tags: ["smartwatch", "electronics"],
    desc: "Stylish smartwatch with Bluetooth calling, fitness tracking, and 1.69-inch HD display."
  },
  {
    id: 12,
    name: "Wildcraft 44L Backpack",
    price: 999,
    category: "Bags",
    img: ["wildcraft1.webp", "wildcraft2.webp", "wildcraft3.webp"],
    tags: ["backpack", "bags"],
    desc: "Spacious and durable 44L backpack with multiple compartments and padded straps for everyday use."
  },
  {
    id: 13,
    name: "Fastrack Reflex Beat+ Fitness Band",
    price: 1199,
    category: "Fitness",
    img: ["fastrack1.webp", "fastrack2.webp","fastrack3.webp"],
    tags: ["fitness band", "fitness"],
    desc: "Affordable fitness band with heart rate monitor, step counter, and sleep tracking."
  },
  {
    id: 14,
    name: "Dell KB216 Wired Keyboard",
    price: 599,
    category: "Accessories",
    img: ["dellkb2.webp"],
    tags: ["keyboard", "accessories"],
    desc: "Reliable full-size wired keyboard with chiclet keys and comfortable typing experience."
  },
  {
    id: 15,
    name: "American Tourister Duffel Bag",
    price: 1399,
    category: "Bags",
    img: ["duffel1.webp", "duffel2.webp"],
    tags: ["duffel bag", "bags"],
    desc: "Lightweight and durable duffel bag perfect for travel and gym use."
  },
  {
    id: 16,
    name: "Fire-Boltt Phoenix Smart Watch",
    price: 1799,
    category: "Electronics",
    img: ["fireboltt1.webp", "fireboltt2.webp"],
    tags: ["smartwatch", "electronics"],
    desc: "Smartwatch with Bluetooth calling, multiple sports modes, and sleek metal body."
  },
  {
    id: 17,
    name: "Lenovo IdeaPad Slim 3",
    price: 32999,
    category: "Electronics",
    img: ["lenovo1.webp", "lenovo2.webp"],
    tags: ["laptop", "electronics"],
    desc: "Lightweight laptop with AMD Ryzen 5 processor, 8GB RAM, and 512GB SSD storage."
  },
  {
    id: 18,
    name: "Canon EOS 1500D DSLR Camera",
    price: 31999,
    category: "Electronics",
    img: ["canon1.webp", "canon2.webp","canon3.webp","canon4.webp"],
    tags: ["camera", "electronics"],
    desc: "DSLR camera with 24.1MP sensor, WiFi, and full HD video recording support."
  },
  {
    id: 19,
    name: "Nike Air Zoom Running Shoes",
    price: 2999,
    category: "Footwear",
    img: ["nike1.webp", "nike2.webp","nike3.webp"],
    tags: ["shoes", "footwear"],
    desc: "Comfortable and lightweight running shoes designed for daily workouts."
  },
  {
    id: 20,
    name: "Adidas Men's Track Pants",
    price: 1099,
    category: "Clothing",
    img: ["adidaspants1.webp", "adidaspants2.webp"],
    tags: ["track pants", "clothing"],
    desc: "Stylish and stretchable track pants perfect for workouts and casual wear."
  },
  {
    id: 21,
    name: "JBL Flip 6 Bluetooth Speaker",
    price: 8999,
    category: "Audio",
    img: ["jbl1.webp", "jbl2.webp"],
    tags: ["speaker", "audio"],
    desc: "Powerful portable speaker with deep bass, IP67 waterproof rating, and 12 hours of playtime."
  },
  {
    id: 22,
    name: "Puma Sports Backpack",
    price: 1299,
    category: "Bags",
    img: ["pumabp1.webp", "pumabp2.webp"],
    tags: ["backpack", "bags"],
    desc: "Durable and stylish sports backpack with multiple compartments and padded straps."
  },
  {
    id: 23,
    name: "Apple AirPods Pro (2nd Gen)",
    price: 24999,
    category: "Audio",
    img: ["airpods1.webp", "airpods2.webp","airpods3.webp"],
    tags: ["earbuds", "audio"],
    desc: "Premium wireless earbuds with active noise cancellation and adaptive transparency mode."
  },
  {
    id: 24,
    name: "HRX Men's Polo T-Shirt",
    price: 549,
    category: "Clothing",
    img: ["hrx1.webp", "hrx2.webp"],
    tags: ["t-shirt", "clothing"],
    desc: "Casual polo t-shirt made with breathable cotton fabric for all-day comfort."
  },
  {
    id: 25,
    name: "Mi Smart Band 6",
    price: 2999,
    category: "Fitness",
    img: ["miband1.webp", "miband2.webp"],
    tags: ["fitness band", "fitness"],
    desc: "Smart fitness band with AMOLED display, SpO2 monitoring, and 30 workout modes."
  },
  {
    id: 26,
    name: "Ray-Ban Aviator Sunglasses",
    price: 4599,
    category: "Accessories",
    img: ["rayban1.webp", "rayban2.webp"],
    tags: ["sunglasses", "accessories"],
    desc: "Classic Ray-Ban aviator sunglasses with UV protection and stylish metal frame."
  },
{
  id: 27,
  name: "Levi's Men's Slim Fit Jeans",
  price: 1799,
  category: "Fashion",
  img: ["levis1.webp", "levis2.webp"],
  tags: ["jeans", "fashion"],
  desc: "Classic slim-fit denim jeans from Levi's, made with durable cotton blend."
},
{
  id: 28,
  name: "Allen Solly Women's Handbag",
  price: 2499,
  category: "Fashion",
  img: ["allensolly1.webp", "allensolly2.webp","allensolly3.webp"],
  tags: ["handbag", "fashion"],
  desc: "Trendy women's handbag with spacious compartments and premium faux leather finish."
},
{
  id: 29,
  name: "Nike Men's Sports Jacket",
  price: 3199,
  category: "Fashion",
  img: ["nikejacket1.webp", "nikejacket2.webp"],
  tags: ["jacket", "fashion"],
  desc: "Lightweight sports jacket with quick-dry fabric, perfect for workouts and casual wear."
},
{
  id: 30,
  name: "Skybags School Backpack",
  price: 1499,
  category: "School Products",
  img: ["skybags1.webp", "skybags2.webp","skybags3.webp"],
  tags: ["school bag", "bags"],
  desc: "Durable 3-compartment school backpack with padded straps and bottle holder."
},
{
  id: 31,
  name: "Classmate Spiral Notebook (Pack of 4)",
  price: 249,
  category: "School Products",
  img: ["notebook1.webp", "notebook2.webp"],
  tags: ["notebook", "stationery"],
  desc: "Set of 4 spiral notebooks with 200 pages each, high-quality paper for smooth writing."
},
{
  id: 32,
  name: "Doms Geometry Box",
  price: 89,
  category: "School Products",
  img: ["geometry1.jpg", "geometry2.jpg"],
  tags: ["geometry box", "stationery"],
  desc: "Durable geometry box with compass, ruler, protractor, and eraser."
},
{
  id: 33,
  name: "Faber-Castell Oil Pastels (Pack of 50)",
  price: 299,
  category: "School Products",
  img: ["pastel1.jpg", "pastel2.webp"],
  tags: ["crayons", "art supplies"],
  desc: "Vibrant oil pastels with smooth texture, perfect for school art projects."
},
{
  id: 34,
  name: "Prestige Non-Stick Frying Pan",
  price: 749,
  category: "Home & Kitchen",
  img: ["pan1.webp"],
  tags: ["kitchen", "cookware"],
  desc: "Durable non-stick frying pan with strong handle and even heat distribution."
},
{
  id: 35,
  name: "Milton Thermosteel Water Bottle (1L)",
  price: 899,
  category: "Home & Kitchen",
  img: ["bottle1.webp", "bottle2.webp"],
  tags: ["water bottle", "kitchen"],
  desc: "Stainless steel insulated water bottle that keeps drinks hot or cold for 24 hours."
},
{
  id: 36,
  name: "Philips 9W LED Bulb (Pack of 3)",
  price: 299,
  category: "Home & Kitchen",
  img: ["bulb1.webp"],
  tags: ["led bulb", "lighting"],
  desc: "Energy-efficient LED bulbs with bright light and long lifespan."
},
{
  id: 37,
  name: "Woodland Men's Casual Shoes",
  price: 2499,
  category: "Footwear",
  img: ["woodland1.jpg", "woodland2.webp"],
  tags: ["shoes", "footwear"],
  desc: "Stylish leather casual shoes from Woodland, perfect for outdoor and casual wear."
},
{
  id: 38,
  name: "Campus Women's Running Shoes",
  price: 1299,
  category: "Footwear",
  img: ["campus1.webp", "campus2.webp","campus3.webp"],
  tags: ["running shoes", "footwear"],
  desc: "Lightweight running shoes designed for women with cushioned sole and breathable mesh."
},
{
  id: 39,
  name: "Safari Polyester Trolley Bag (Cabin Size)",
  price: 2999,
  category: "Bags",
  img: ["safari1.webp", "safari2.webp"],
  tags: ["trolley bag", "bags"],
  desc: "Durable and lightweight cabin trolley bag with smooth wheels and lock system."
},
{
  id: 40,
  name: "Wild Stone Code Perfume Spray",
  price: 249,
  category: "Fashion",
  img: ["perfume1.webp", "perfume2.webp"],
  tags: ["perfume", "fashion"],
  desc: "Long-lasting body spray with refreshing fragrance, suitable for daily use."
},
{
  id: 41,
  name: "Lakmé 9 to 5 Primer + Matte Lipstick",
  price: 399,
  category: "Fashion",
  img: ["lipstick2.webp"],
  tags: ["lipstick", "makeup"],
  desc: "Matte finish lipstick with primer, long-lasting and smooth application."
},
{
  id: 42,
  name: "Colgate Strong Teeth Toothpaste (500g)",
  price: 199,
  category: "Home & Kitchen",
  img: ["toothpaste1.webp", "toothpaste2.webp"],
  tags: ["toothpaste", "personal care"],
  desc: "Strengthens teeth enamel and provides cavity protection for the whole family."
},
{
  id: 43,
  name: "Dettol Handwash Refill (750ml)",
  price: 139,
  category: "Home & Kitchen",
  img: ["handwash1.jpg"],
  tags: ["handwash", "personal care"],
  desc: "Antibacterial handwash that kills 99.9% of germs and keeps hands soft."
},
{
  id: 44,
  name: "Philips Beard Trimmer BT3102",
  price: 1349,
  category: "Electronics",
  img: ["trimmer1.webp"],
  tags: ["trimmer", "electronics"],
  desc: "Cordless rechargeable beard trimmer with 20 length settings and long battery life."
},
{
  id: 45,
  name: "LG 32-inch HD Ready Smart LED TV",
  price: 13999,
  category: "Electronics",
  img: ["lgtv1.webp", "lgtv2.webp","lgtv3.webp","lgtv4.webp"],
  tags: ["tv", "electronics"],
  desc: "Smart LED TV with HD resolution, built-in WiFi, and multiple HDMI/USB ports."
},
{
  id: 46,
  name: "Asus ROG Strix Gaming Laptop",
  price: 89999,
  category: "Electronics",
  img: ["asusrog1.webp", "asusrog2.webp"],
  tags: ["gaming laptop", "electronics"],
  desc: "High-performance gaming laptop with AMD Ryzen 7, RTX 3060, and 16GB RAM."
},
{
  id: 47,
  name: "Samsung Galaxy Tab A8",
  price: 15999,
  category: "Electronics",
  img: ["tab1.webp", "tab2.webp"],
  tags: ["tablet", "electronics"],
  desc: "Affordable Android tablet with 10.5-inch display, 4GB RAM, and 64GB storage."
},
{
  id: 48,
  name: "Boat Airdopes 141",
  price: 1299,
  category: "Audio",
  img: ["airdopes1.webp"],
  tags: ["earbuds", "audio"],
  desc: "Wireless earbuds with 42 hours playback, ASAP charge, and IPX4 water resistance."
},
{
  id: 49,
  name: "Samsung 253L Frost Free Refrigerator",
  price: 25999,
  category: "Home & Kitchen",
  img: ["fridge1.webp", "fridge2.webp","fridge3.webp"],
  tags: ["refrigerator", "appliances"],
  desc: "Double-door refrigerator with digital inverter compressor and energy efficiency."
},
{
  id: 50,
  name: "Bajaj Rex 500W Mixer Grinder",
  price: 2199,
  category: "Home & Kitchen",
  img: ["mixer1.webp", "mixer2.webp","mixer3.webp"],
  tags: ["mixer", "kitchen appliances"],
  desc: "Durable mixer grinder with 3 jars, stainless steel blades, and 3-speed control."
},
{
  id: 51,
  name: "OnePlus Nord CE 3 Lite 5G",
  price: 19999,
  category: "Electronics",
  img: ["oneplus1.webp", "oneplus2.webp","oneplus3"],
  tags: ["smartphone", "electronics"],
  desc: "Mid-range 5G smartphone with 108MP camera, Snapdragon 695, and 67W fast charging."
},
{
  id: 52,
  name: "Apple MacBook Air M2",
  price: 114999,
  category: "Electronics",
  img: ["mba1.webp", "mba2.webp"],
  tags: ["laptop", "electronics"],
  desc: "Powerful yet portable laptop with Apple M2 chip, 13.6-inch Retina display, and long battery life."
},
{
  id: 53,
  name: "ASICS Men's Running Shoes",
  price: 4499,
  category: "Footwear",
  img: ["asics1.webp", "asics2.webp"],
  tags: ["running shoes", "footwear"],
  desc: "Lightweight running shoes with excellent cushioning and support for long runs."
},
{
  id: 54,
  name: "Philips Hair Dryer",
  price: 999,
  category: "Home & Kitchen",
  img: ["dryer1.webp", "dryer2.webp"],
  tags: ["hair dryer", "appliances"],
  desc: "Compact 1200W hair dryer with multiple heat settings and foldable handle."
},
{
  id: 55,
  name: "Casio Digital Watch",
  price: 1999,
  category: "Accessories",
  img: ["casio1.webp", "casio2.webp"],
  tags: ["watch", "accessories"],
  desc: "Classic digital watch with alarm, stopwatch, and LED backlight."
},
{
  id: 56,
  name: "Nike Dri-FIT Training T-Shirt",
  price: 1699,
  category: "Clothing",
  img: ["niketee1.webp", "niketee2.webp"],
  tags: ["t-shirt", "clothing"],
  desc: "Moisture-wicking training t-shirt designed for comfort during workouts."
},
{
  id: 57,
  name: "Samsung 7kg Fully Automatic Washing Machine",
  price: 18999,
  category: "Home & Kitchen",
  img: ["wmachine1.webp", "wmachine2.webp","wmachine3.webp","wmachine4.webp"],
  tags: ["washing machine", "appliances"],
  desc: "Front-load washing machine with digital inverter motor and 12 wash programs."
},
{
  id: 58,
  name: "HP DeskJet 2331 All-in-One Printer",
  price: 4799,
  category: "Electronics",
  img: ["printer1.webp", "printer2.webp","printer3.webp"],
  tags: ["printer", "electronics"],
  desc: "Compact all-in-one printer for printing, scanning, and copying at home."
},
{
  id: 59,
  name: "Woodland Leather Wallet",
  price: 1299,
  category: "Fashion",
  img: ["wallet1.webp"],
  tags: ["wallet", "fashion"],
  desc: "Durable leather wallet with multiple compartments and slim design."
},
  {
    id: 60,
    name: "Prestige Electric Kettle (1.5L)",
    price: 1299,
    category: "Home & Kitchen",
    img: ["kettle1.webp", "kettle2.webp","kettle3.webp"],
    tags: ["kettle", "kitchen appliances"],
    desc: "Stainless steel electric kettle with automatic shut-off and 1500W fast boiling."
  }
];


// ---------- Utilities ----------
const $ = id => document.getElementById(id);
const saveCart = cart => localStorage.setItem('myshop_cart', JSON.stringify(cart));
const loadCart = () => JSON.parse(localStorage.getItem('myshop_cart') || '[]');
const format = n => Number(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

// ---------- App State ----------
let CART = loadCart();
let DETAIL_QTY = 1;

// Wishlist state
let WISHLIST = JSON.parse(localStorage.getItem('myshop_wishlist') || '[]');
function saveWishlist() {
  localStorage.setItem('myshop_wishlist', JSON.stringify(WISHLIST));
}

// Initialize UI
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Populate category filters ----------
(function populateCategories() {
  const cats = ['all', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const desktopSel = $('categoryFilter');
  const mobileSel = $('categoryFilterMobile');

  cats.forEach(c => {
    const opt1 = document.createElement('option');
    opt1.value = c;
    opt1.textContent = c === 'all' ? 'All categories' : c;
    desktopSel.appendChild(opt1);

    const opt2 = opt1.cloneNode(true);
    mobileSel.appendChild(opt2);
  });
})();

// ---------- Render products listing ----------
function renderProducts() {
  const grid = $('productsGrid');
  let isMobile = window.innerWidth <= 640;

  let query = isMobile
    ? $('searchInputMobile').value.trim().toLowerCase()
    : $('searchInput').value.trim().toLowerCase();

  let cat = isMobile
    ? $('categoryFilterMobile').value
    : $('categoryFilter').value;
  if (!cat) cat = 'all';

  let sort = isMobile
    ? $('sortSelectMobile').value
    : $('sortSelect').value;

  // keep desktop & mobile in sync
  $('searchInput').value = query;
  $('searchInputMobile').value = query;
  $('categoryFilter').value = cat;
  $('categoryFilterMobile').value = cat;
  $('sortSelect').value = sort;
  $('sortSelectMobile').value = sort;

  let items = PRODUCTS.filter(p => {
    const matchesQuery = !query ||
      p.name.toLowerCase().includes(query) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)));
    const matchesCat = cat === 'all' || p.category === cat;
    return matchesQuery && matchesCat;
  });

  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);

  grid.innerHTML = '';
  $('resultsText').textContent = items.length
    ? `${items.length} result${items.length > 1 ? 's' : ''}`
    : 'No results';

  items.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    const imgSrc = Array.isArray(p.img) ? p.img[0] : p.img;

    const inWishlist = WISHLIST.includes(p.id);

    card.innerHTML = `
      <div class="thumb" style="background:#f8fafc; padding:8px; border-radius:8px; width:250px; height:200px; overflow:hidden;">
        <img src="${imgSrc}" alt="${escapeHtml(p.name)}" style="width:250px; height:200px; object-fit:cover; border-radius:8px;">
      </div>
      <div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="meta">${escapeHtml(p.category)}</div>
        <div class="price">₹${format(p.price)}</div>
        <div style="height:8px"></div>
        <div class="card-actions">
          <button class="btn" onclick="goToProduct(${p.id})">View</button>
          <button class="btn secondary" onclick="addToCart(${p.id},1)">Add</button>
          <button class="btn secondary" onclick="addToWishlist(${p.id})">${inWishlist ? "❤️" : "♡"} Wishlist</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---------- helpers ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Product details ----------
function goToProduct(id) {
  location.hash = '#/product/' + id;
}

function renderProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return navigateTo('#/');

  const mainImg = $('detailMainImg');
  const mainImgSrc = Array.isArray(p.img) ? p.img[0] : p.img;
  mainImg.src = mainImgSrc;

  $('detailName').textContent = p.name;
  $('detailPrice').textContent = '₹' + format(p.price);
  $('detailDesc').textContent = p.desc;
  $('detailCategory').textContent = p.category;
  $('detailQty').value = 1;
  DETAIL_QTY = 1;

  const thumbs = $('detailThumbs');
  thumbs.innerHTML = '';
  const images = Array.isArray(p.img) ? p.img : [p.img];
  images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = p.name;
    if (index === 0) img.classList.add('active');
    img.onclick = () => {
      mainImg.src = imgSrc;
      Array.from(thumbs.children).forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    };
    thumbs.appendChild(img);
  });

  $('addToCartBtn').onclick = () => {
    addToCart(p.id, Number($('detailQty').value || 1));
    showToast(`${p.name} added to cart`);
  };
}

function changeDetailQty(n) {
  const el = $('detailQty');
  let v = Number(el.value || 1) + n;
  if (v < 1) v = 1;
  el.value = v;
  DETAIL_QTY = v;
}

// ---------- Cart ----------
function addToCart(id, qty = 1) {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  let found = CART.find(i => i.id === id);
  if (found) {
    found.qty += qty;
  } else {
    CART.push({ id: prod.id, name: prod.name, price: prod.price, img: Array.isArray(prod.img) ? prod.img[0] : prod.img, qty });
  }
  saveCart(CART);
  updateCartUI();
  showToast("Added to cart 🛒");
}
function removeFromCart(id) {
  CART = CART.filter(i => i.id !== id);
  saveCart(CART);
  updateCartUI();
}
function changeQty(id, delta) {
  const it = CART.find(i => i.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) removeFromCart(id);
  else {
    saveCart(CART);
    updateCartUI();
  }
}
function clearCart() {
  if (!confirm('Clear the cart?')) return;
  CART = [];
  saveCart(CART);
  updateCartUI();
  showToast('Cart cleared');
}
function updateCartUI() {
  const totalCount = CART.reduce((s, i) => s + i.qty, 0);
  $('cartCount').textContent = totalCount;
  $('cartCountMobile').textContent = totalCount;

  if (currentView === 'cart') {
    const list = $('cartList');
    list.innerHTML = '';
    if (CART.length === 0) {
      list.innerHTML = `<div class="card">Your cart is empty. <button class="btn" onclick="navigateTo('#/')">Shop now</button></div>`;
    } else {
      CART.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
          <img class="ci-thumb" src="${item.img}" alt="${escapeHtml(item.name)}">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <strong>${escapeHtml(item.name)}</strong>
              <div class="muted" style="margin-left:auto">₹${format(item.price)}</div>
            </div>
            <div class="muted" style="font-size:13px;margin-top:6px">Subtotal: ₹${format(item.price * item.qty)}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <div>
              <button onclick="changeQty(${item.id}, -1)">−</button>
              <span style="padding:8px 10px">${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="btn secondary" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        `;
        list.appendChild(el);
      });
    }
    $('summaryItems').textContent = CART.reduce((s, i) => s + i.qty, 0);
    $('summaryTotal').textContent = '₹' + format(CART.reduce((s, i) => s + i.price * i.qty, 0));
  }

  if (currentView === 'checkout') {
    const cList = $('checkoutItemsList');
    cList.innerHTML = '';
    let t = 0;
    CART.forEach(it => {
      t += it.price * it.qty;
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.innerHTML = `<div class="muted">${escapeHtml(it.name)} x ${it.qty}</div><div>₹${format(it.price * it.qty)}</div>`;
      cList.appendChild(row);
    });
    $('checkoutTotal').textContent = '₹' + format(t);
  }
}

// ---------- Wishlist ----------
function addToWishlist(id) {
  if (!WISHLIST.includes(id)) {
    WISHLIST.push(id);
    saveWishlist();
    showToast("Added to wishlist ❤️");
  } else {
    showToast("Already in wishlist ❤️");
  }
  updateWishlistUI();
}
function removeFromWishlist(id) {
  WISHLIST = WISHLIST.filter(itemId => itemId !== id);
  saveWishlist();
  updateWishlistUI();
  showToast("Removed from wishlist ❌");
}
function updateWishlistUI() {
  const count = WISHLIST.length;
  if ($('wishlistCount')) $('wishlistCount').textContent = count;
  if ($('wishlistCountMobile')) $('wishlistCountMobile').textContent = count;

  if (currentView === 'wishlist') renderWishlist();
}
function renderWishlist() {
  const grid = $('wishlistGrid');
  grid.innerHTML = '';
  if (WISHLIST.length === 0) {
    grid.innerHTML = `<p>No items in wishlist yet.</p>`;
    return;
  }
  WISHLIST.forEach(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (p) {
      const card = document.createElement('article');
      card.className = 'card';
      const imgSrc = Array.isArray(p.img) ? p.img[0] : p.img;
      card.innerHTML = `
        <div class="thumb">
          <img src="${imgSrc}" alt="${escapeHtml(p.name)}">
        </div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="price">₹${format(p.price)}</div>
        <div class="wishlist-actions">
          <button class="btn" onclick="goToProduct(${p.id})">View</button>
          <button class="btn secondary" onclick="addToCart(${p.id},1)">Add to Cart</button>
          <button class="btn danger" onclick="removeFromWishlist(${p.id})">Remove</button>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

// ---------- Checkout ----------
function placeOrder(e) {
  e.preventDefault();
  if (CART.length === 0) {
    alert('Cart is empty');
    return;
  }
  const name = $('cname').value.trim();
  const email = $('cemail').value.trim();
  const address = $('caddress').value.trim();
  if (!name || !email || !address) {
    alert('Please fill in required fields');
    return;
  }
  const orderId = 'ORD' + Date.now().toString(36).toUpperCase().slice(-8);
  sessionStorage.setItem('last_order_id', orderId);
  CART = [];
  saveCart(CART);
  updateCartUI();
  navigateTo('#/confirmation');
  $('orderIdDisplay').textContent = orderId;
}

// ---------- Routing ----------
let currentView = 'home';
function navigateTo(hash) { location.hash = hash; }
function showView(id) {
  ['view-home','view-product','view-cart','view-checkout','view-confirmation','view-wishlist'].forEach(v=>{
    if($(v)) $(v).classList.add('hidden');
  });
  $(id).classList.remove('hidden');
}
function router() {
  const hash = location.hash || '#/';
  window.scrollTo(0,0);
  if (hash === '#/' || hash === '') {
    currentView='home'; showView('view-home'); renderProducts();
  } else if (hash.startsWith('#/product/')) {
    const id = Number(hash.split('/')[2]||0);
    currentView='product'; showView('view-product'); renderProductDetail(id);
  } else if (hash === '#/cart') {
    currentView='cart'; showView('view-cart'); updateCartUI();
  } else if (hash === '#/checkout') {
    currentView='checkout'; showView('view-checkout'); updateCartUI();
  } else if (hash === '#/wishlist') {
    currentView='wishlist'; showView('view-wishlist'); renderWishlist();
  } else if (hash === '#/confirmation') {
    currentView='confirmation'; showView('view-confirmation');
    $('orderIdDisplay').textContent=sessionStorage.getItem('last_order_id')||'N/A';
  } else navigateTo('#/');
}

// ---------- Small UI helpers ----------
function showToast(msg, ms=1500){
  const t=document.createElement('div');
  t.textContent=msg;
  t.style.position='fixed';t.style.bottom='20px';t.style.left='50%';t.style.transform='translateX(-50%)';
  t.style.background='rgba(15,23,42,0.9)';t.style.color='white';t.style.padding='10px 14px';
  t.style.borderRadius='8px';t.style.zIndex=9999;
  document.body.appendChild(t);
  setTimeout(()=>t.style.opacity='0.0', ms-250);
  setTimeout(()=>t.remove(), ms);
}

// ---------- Events ----------
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', ()=>{
  $('searchInput').addEventListener('input', debounce(renderProducts,220));
  $('categoryFilter').addEventListener('change', renderProducts);
  $('sortSelect').addEventListener('change', renderProducts);
  $('searchInputMobile').addEventListener('input', debounce(renderProducts,220));
  $('categoryFilterMobile').addEventListener('change', renderProducts);
  $('sortSelectMobile').addEventListener('change', renderProducts);
  $('checkoutForm')?.addEventListener('submit', placeOrder);
  router();
  updateCartUI();
  updateWishlistUI();
});
function debounce(fn,wait=200){let t;return function(...args){clearTimeout(t);t=setTimeout(()=>fn.apply(this,args),wait)}}

// expose
window.addToCart=addToCart;
window.goToProduct=goToProduct;
window.changeQty=changeQty;
window.removeFromCart=removeFromCart;
window.clearCart=clearCart;
window.navigateTo=navigateTo;
window.changeDetailQty=changeDetailQty;
window.addToWishlist=addToWishlist;
window.removeFromWishlist=removeFromWishlist;
