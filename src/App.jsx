import { useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   🍕 PIZZA BEMBA — Menú Digital PWA
   Rafaela, Santa Fe — Bv. H. Yrigoyen 252
   WhatsApp: 15 250 837
   ═══════════════════════════════════════════════════════════════ */

const WHATSAPP_NUMBER = "543492250837";

const PIZZAS = [
  { id:"p01", num:1, name:"Muzzarella", desc:"Salsa de tomate y muzzarella", prices:{grande:12000,gMedia:6000,chica:10000,cMedia:5000,individual:5000}},
  { id:"p02", num:2, name:"Especial", desc:"Salsa de tomate, muzzarella, jamón y aceitunas", prices:{grande:14000,gMedia:7000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p03", num:3, name:"Panceta Ahumada", desc:"Salsa de tomate, muzzarella, panceta y aceitunas", prices:{grande:18000,gMedia:9000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p04", num:4, name:"Morrones", desc:"Salsa de tomate, muzzarella, morrones y jamón", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p05", num:5, name:"Anchoas", desc:"Salsa de tomate, muzzarella y anchoas", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p06", num:6, name:"Pougle", desc:"Salsa de tomate, muzzarella, jamón, crema y pollo", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p07", num:7, name:"Fugazetta", desc:"Salsa de tomate, muzzarella y cebolla", prices:{grande:14000,gMedia:7000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p08", num:8, name:"Norteña", desc:"Salsa de tomate, muzzarella y humita", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p09", num:9, name:"Palmitos", desc:"Salsa de tomate, muzzarella, jamón y palmitos", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p10", num:10, name:"Hongos", desc:"Salsa de tomate, muzzarella, jamón y champignon", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p11", num:11, name:"Napoles", desc:"Salsa de tomate, muzzarella, rodajas de tomate y ajo", prices:{grande:14000,gMedia:7000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p12", num:12, name:"Cuatro Quesos", desc:"Muzzarella, provolone, roquefort y sardo", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p13", num:13, name:"Agridulce", desc:"Salsa de tomate, muzzarella, jamón, ananá y cerezas", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p14", num:14, name:"Carne a Cuchillo", desc:"Muzzarella, cebolla, choclo, carne y pimentón", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p15", num:15, name:"Bongo Bong", desc:"Muzzarella, panceta, morrones, carne y champignon", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p16", num:16, name:"Verdeo", desc:"Salsa de tomate, muzzarella, jamón y cebolla de verdeo", prices:{grande:16000,gMedia:8000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p17", num:17, name:"Vegetales al Oliva", desc:"Champignones, palmitos, aceitunas, morrones y aceite de oliva", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p18", num:18, name:"Calabresa", desc:"Salsa de tomate, muzzarella, salame y morrones", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p19", num:19, name:"Hongos al Oliva", desc:"Salsa de tomate, muzzarella, panceta y champignones", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p20", num:20, name:"Gambi", desc:"Muzzarella, ananá, palmitos, jamón, aceitunas y cerezas", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:8500,individual:9000}},
  { id:"p21", num:21, name:"Roquefort Especial", desc:"Salsa de tomate, muzzarella, jamón y roquefort", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p22", num:22, name:"Provenzal", desc:"Salsa de tomate, muzzarella, ajo y perejil", prices:{grande:12000,gMedia:6000,chica:10000,cMedia:5000,individual:5000}},
  { id:"p23", num:23, name:"Nueces al Roquefort", desc:"Muzzarella, rodajas de tomate, nueces y roquefort", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p24", num:24, name:"Sicilia", desc:"Muzzarella, tomates en rodajas, albahaca y aceitunas negras", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p25", num:25, name:"Rúcula", desc:"Salsa de tomate, muzzarella, jamón crudo y rúcula", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p26", num:26, name:"Jamón Crudo", desc:"Salsa de tomate, muzzarella, jamón crudo y aceitunas negras", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p27", num:27, name:"Fugazetta Especial", desc:"Salsa de tomate, muzzarella, cebolla y roquefort", prices:{grande:16000,gMedia:8000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p28", num:28, name:"Madjyd", desc:"Muzzarella, rodajas de tomate, morrones y huevo duro", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p29", num:29, name:"Palmitos Especial", desc:"Muzzarella, jamón, palmitos y salsa golf", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p30", num:30, name:"Mostaza", desc:"Muzzarella, salchichas de viena en rodajas y mostaza", prices:{grande:14000,gMedia:7000,chica:10000,cMedia:5000,individual:5000}},
  { id:"p31", num:31, name:"Atún", desc:"Salsa de tomate, muzzarella, atún y orégano", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p32", num:32, name:"Estaciones", desc:"Salsa de tomate, palmitos, morrones y especial", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p33", num:33, name:"Mediterránea", desc:"Muzzarella, rodajas de tomate, anchoas y ajo", prices:{grande:20000,gMedia:10000,chica:16000,cMedia:8000,individual:8000}},
  { id:"p34", num:34, name:"Espinaca", desc:"Muzzarella, espinaca, huevo duro y queso rallado", prices:{grande:16000,gMedia:8000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p35", num:35, name:"Roquefort y Apio", desc:"Muzzarella, roquefort, apio y nueces", prices:{grande:18000,gMedia:9000,chica:14000,cMedia:7000,individual:7000}},
  { id:"p36", num:36, name:"Marinera", desc:"Muzzarella, atún, anchoas, aceitunas verdes y negras", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p37", num:37, name:"Bismak", desc:"Muzzarella, pimientos, cebolla, ajo y sal", prices:{grande:16000,gMedia:8000,chica:12000,cMedia:6000,individual:6000}},
  { id:"p38", num:38, name:"Roca", desc:"Muzzarella, carne trozada y salsa cuatro quesos", prices:{grande:22000,gMedia:11000,chica:18000,cMedia:9000,individual:9000}},
  { id:"p39", num:39, name:"Come Ti Piace", desc:"¡Inventala a tu gusto! Muzzarella + 3 ingredientes", prices:{grande:24000,gMedia:12000,chica:20000,cMedia:10000,individual:10000}},
];

const PIZZAS_SIN_TACC = [
  { id:"pst1", name:"Muzza Sin TACC", desc:"Pizza de muzzarella apta celíacos", price:14000 },
  { id:"pst2", name:"Con Jamón Sin TACC", desc:"Pizza con jamón apta celíacos", price:16000 },
  { id:"pst3", name:"Vegetales Sin TACC", desc:"Pizza de vegetales apta celíacos", price:18000 },
];

const SIZE_LABELS = {
  grande:"Grande (12 porc.)", gMedia:"½ Grande", chica:"Chica (8 porc.)", cMedia:"½ Chica", individual:"Individual (4 porc.)",
};

const MENU = {
  tostados:[
    {id:"t1",name:"Tostado Simple",desc:"Jamón, queso y mayonesa",price:10000},
    {id:"t2",name:"Tostado Especial",desc:"Jamón, queso, mayonesa, tomate y huevo duro",price:11000},
  ],
  hamburguesas:[
    {id:"h1",name:"Hamburguesa Simple",desc:"Pan, carne y papas fritas",price:7000,egg:true},
    {id:"h2",name:"Hamburguesa Gratinada",desc:"Pan, carne 125g, jamón, queso tybo y papas fritas",price:9000,egg:true},
    {id:"h3",name:"Hamburguesa Completa",desc:"Pan, carne 125g, jamón, queso tybo, lechuga, tomate, huevo y papas fritas",price:11000,egg:true},
    {id:"h4",name:"Hamburguesa Bemba",desc:"Pan, carne 125g, queso tybo, panceta ahumada, cebolla y papas fritas",price:11000,egg:true},
  ],
  milanesas:[
    {id:"m1",name:"Milanesa Clásica",desc:"Milanesa de ternera y papas fritas",price:10000,egg:true},
    {id:"m2",name:"Milanesa Napolitana",desc:"Queso fundido, jamón cocido, tomate, orégano y papas fritas",price:14000,egg:true},
    {id:"m3",name:"Milanesa Fondue",desc:"Queso tybo, mozzarella, roquefort, provolone y papas fritas",price:14000,egg:true},
  ],
  sandwiches:[
    {id:"s1",name:"Sándwich Milanga Simple",desc:"Pan, milanesa y papas fritas",price:8000,egg:true},
    {id:"s2",name:"Sándwich Milanga Gratinado",desc:"Pan, milanesa, jamón, queso tybo y papas fritas",price:10000,egg:true},
    {id:"s3",name:"Sándwich Milanga Completo",desc:"Pan, milanesa, jamón, queso tybo, tomate, lechuga, huevo y papas fritas",price:11000,egg:true},
  ],
  lomos:[
    {id:"l1",name:"Lomo Simple",desc:"Bife de lomo de ternera, pan y papas fritas",price:9000,egg:true},
    {id:"l2",name:"Lomo Gratinado",desc:"Bife de lomo, pan, jamón, queso tybo y papas fritas",price:13000,egg:true},
    {id:"l3",name:"Lomo Completo",desc:"Bife de lomo, pan, jamón, queso tybo, tomate, lechuga, huevo y papas fritas",price:15000,egg:true},
  ],
  picadas:[
    {id:"pic1a",name:"Picada Clásica (2 pers.)",desc:"Milanesa, cazuela de queso, olivas, salchicha parrillera, fritas, pan y tostadas",price:24000},
    {id:"pic1b",name:"Picada Clásica (3 pers.)",desc:"Milanesa, cazuela de queso, olivas, salchicha parrillera, fritas, pan y tostadas",price:36000},
    {id:"pic1c",name:"Picada Clásica (4 pers.)",desc:"Milanesa, cazuela de queso, olivas, salchicha parrillera, fritas, pan y tostadas",price:48000},
    {id:"pic2a",name:"Picada Fiambre (2 pers.)",desc:"Mortadela, jamón, bondiola, salame, cazuela de queso, olivas, salchicha y pan",price:25000},
    {id:"pic2b",name:"Picada Fiambre (4 pers.)",desc:"Mortadela, jamón, bondiola, salame, cazuela de queso, olivas, salchicha y pan",price:48000},
  ],
  extras:[
    {id:"e1",name:"Papas Fritas",desc:"Porción de papas fritas",price:7000},
    {id:"e2",name:"Papas Noisettes",desc:"Porción de papas noisettes",price:9000},
    {id:"e3",name:"Cheddar o Salsa Roquefort",desc:"Porción de salsa",price:3000},
    {id:"e4",name:"Nuggets x8",desc:"8 unidades de nuggets",price:7000},
    {id:"e5",name:"Nuggets x16",desc:"16 unidades de nuggets",price:14000},
    {id:"e6",name:"Cazuela Salchicha Parrillera",desc:"Salchicha parrillera en salsa",price:8000},
    {id:"e7",name:"Cazuela de Queso",desc:"Cazuela de queso fundido",price:6000},
    {id:"e8",name:"Cazuela de Olivas",desc:"Olivas verdes o negras",price:5000},
  ],
  bebidas:[
    {id:"b1",name:"Pepsi 1.5L",desc:"",price:6000},
    {id:"b2",name:"Seven Up 1.5L",desc:"",price:6000},
    {id:"b3",name:"Mirinda 1.5L",desc:"",price:6000},
    {id:"b4",name:"Paso de los Toros 1.5L",desc:"",price:6000},
    {id:"b5",name:"Vino Latitud 33",desc:"",price:10000},
    {id:"b6",name:"Stella Artois 1L",desc:"Con envase",price:7500},
    {id:"b7",name:"Brahma 1L",desc:"Con envase",price:6000},
    {id:"b8",name:"Quilmes 1L",desc:"Con envase",price:6000},
    {id:"b9",name:"Lata Brahma",desc:"",price:3500},
    {id:"b10",name:"Lata Stella",desc:"",price:4500},
    {id:"b11",name:"Lata Quilmes Negra",desc:"",price:3500},
  ],
};

const PROMOS = [
  {id:"promo1",name:"Promo Muzza",desc:"2 Muzzarella Grandes + Pepsi 1.5L",price:28000,badge:"AHORRÁS $2000"},
  {id:"promo2",name:"Promo Bemba",desc:"1 Pizza Grande (1-12) + Bebida 1.5L",price:20000,badge:"IMPERDIBLE"},
  {id:"promo3",name:"Combo Milanga",desc:"2 Sándwich Milanga Completo + 2 Latas",price:27000,badge:"PARA DOS"},
];

const CATS = [
  {key:"promos",label:"Promos",icon:"🔥"},
  {key:"pizzas",label:"Pizzas",icon:"🍕"},
  {key:"tostados",label:"Tostados",icon:"🥪"},
  {key:"hamburguesas",label:"Burgers",icon:"🍔"},
  {key:"milanesas",label:"Milanesas",icon:"🥩"},
  {key:"sandwiches",label:"Sándwiches",icon:"🥖"},
  {key:"lomos",label:"Lomos",icon:"🥩"},
  {key:"picadas",label:"Picadas",icon:"🧀"},
  {key:"extras",label:"Extras",icon:"🍟"},
  {key:"bebidas",label:"Bebidas",icon:"🍺"},
];

const fmt = (n) => "$" + n.toLocaleString("es-AR");
const EGG = 1000;

/* ── Cross-sell / Upsell rules (Waitry methodology) ── */
const CROSS_SELL_RULES = [
  { trigger: ["pizzas"], suggest: { id: "b1", name: "Pepsi 1.5L", price: 6000 }, message: "¿Sumás una Pepsi 1.5L?" },
  { trigger: ["hamburguesas", "lomos", "sandwiches"], suggest: { id: "e2", name: "Papas Noisettes", price: 9000 }, message: "¿Upgrade a Noisettes?" },
  { trigger: ["picadas"], suggest: { id: "b6", name: "Stella Artois 1L", price: 7500 }, message: "¿Una Stella para la picada?" },
  { trigger: ["bebidas"], suggest: { id: "e4", name: "Nuggets x8", price: 7000 }, message: "¿Unos nuggets para picar?" },
  { trigger: ["milanesas"], suggest: { id: "e3", name: "Cheddar o Roquefort", price: 3000 }, message: "¿Salsa cheddar o roquefort?" },
];

const BEBIDA_IDS = new Set(MENU.bebidas.map(b => b.id));

function getItemCategory(id) {
  if (id.startsWith("p")) return "pizzas";
  if (id.startsWith("pst")) return "pizzas";
  if (id.startsWith("h")) return "hamburguesas";
  if (id.startsWith("m")) return "milanesas";
  if (id.startsWith("s")) return "sandwiches";
  if (id.startsWith("l")) return "lomos";
  if (id.startsWith("pic")) return "picadas";
  if (id.startsWith("e")) return "extras";
  if (id.startsWith("b")) return "bebidas";
  if (id.startsWith("t")) return "tostados";
  if (id.startsWith("promo")) return "promos";
  return null;
}

function getCrossSell(itemId) {
  const cat = getItemCategory(itemId);
  if (!cat) return null;
  return CROSS_SELL_RULES.find(r => r.trigger.includes(cat)) || null;
}

function cartHasBebida(cart) {
  return cart.some(c => BEBIDA_IDS.has(c.id.split("_")[0]));
}

function getCheckoutSuggestions(cart) {
  const suggestions = [];
  const ids = new Set(cart.map(c => c.id.split("_")[0]));
  const hasPizza = cart.some(c => getItemCategory(c.id) === "pizzas");
  const hasBurgerLomo = cart.some(c => ["hamburguesas","lomos","sandwiches","milanesas"].includes(getItemCategory(c.id)));
  const hasBebida = cartHasBebida(cart);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (hasPizza && !ids.has("e3")) suggestions.push({ id: "e3", name: "Cheddar o Roquefort", price: 3000 });
  if (hasPizza && !ids.has("e1")) suggestions.push({ id: "e1", name: "Papas Fritas", price: 7000 });
  if (hasBurgerLomo && !ids.has("e4")) suggestions.push({ id: "e4", name: "Nuggets x8", price: 7000 });
  if (!hasBebida) suggestions.push({ id: "b1", name: "Pepsi 1.5L", price: 6000 });
  if (total > 30000 && !ids.has("promo1")) suggestions.push({ id: "promo1", name: "Promo Muzza", price: 28000, badge: "AHORRÁS $2000" });

  return suggestions.slice(0, 3);
}

/* ── Quantity Stepper ── */
function QtyStepper({ qty, onPlus, onMinus }) {
  if (qty === 0) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
      <button onClick={onMinus} style={{width:"36px",height:"36px",borderRadius:"10px",background:"#252118",color:"white",border:"1px solid #3a3228",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"18px"}}>−</button>
      <span style={{color:"white",fontWeight:900,fontSize:"16px",width:"24px",textAlign:"center"}}>{qty}</span>
      <button onClick={onPlus} style={{width:"36px",height:"36px",borderRadius:"10px",background:"#D42027",color:"white",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"18px"}}>+</button>
    </div>
  );
}

function AddBtn({ onClick, price }) {
  return (
    <button onClick={onClick} style={{background:"#D42027",color:"white",fontWeight:900,padding:"10px 18px",borderRadius:"12px",fontSize:"13px",border:"none",cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.5px",whiteSpace:"nowrap"}}>
      Agregar {fmt(price)}
    </button>
  );
}

/* ── Cross-Sell Toast ── */
function CrossSellToast({ data, onAdd, onDismiss }) {
  if (!data) return null;
  return (
    <div style={{position:"fixed",top:"76px",left:"50%",transform:"translateX(-50%)",zIndex:200,width:"calc(100% - 32px)",maxWidth:"440px",
      background:"linear-gradient(135deg, #1a1714 0%, #252118 100%)",border:"1px solid rgba(212,32,39,0.4)",
      borderRadius:"14px",padding:"12px 14px",display:"flex",alignItems:"center",gap:"10px",
      boxShadow:"0 8px 32px rgba(0,0,0,0.5)",animation:"slideDown 0.3s ease-out"}}>
      <div style={{flex:1,minWidth:0}}>
        <p style={{color:"#FFD700",fontSize:"10px",fontWeight:900,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"2px"}}>RECOMENDADO</p>
        <p style={{color:"white",fontSize:"13px",fontWeight:700}}>{data.message}</p>
        <p style={{color:"#8a7b6b",fontSize:"11px"}}>{data.suggest.name} · {fmt(data.suggest.price)}</p>
      </div>
      <button onClick={() => onAdd({ id: data.suggest.id, name: data.suggest.name, detail: "", price: data.suggest.price })}
        style={{background:"#D42027",color:"white",fontWeight:900,padding:"8px 14px",borderRadius:"10px",fontSize:"12px",border:"none",cursor:"pointer",whiteSpace:"nowrap",textTransform:"uppercase"}}>
        Agregar
      </button>
      <button onClick={onDismiss} style={{color:"#5a4d3d",background:"none",border:"none",cursor:"pointer",fontSize:"16px",padding:"4px"}}>✕</button>
    </div>
  );
}

/* ── Pizza Card ── */
function PizzaCard({ pizza, cart, onAdd, onRemove }) {
  const [size, setSize] = useState("grande");
  const [open, setOpen] = useState(false);
  const [upsellShown, setUpsellShown] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const price = pizza.prices[size];
  const cid = pizza.id + "_" + size;
  const found = cart.find(c => c.id === cid);
  const qty = found ? found.qty : 0;

  const canUpsell = !upsellShown && (size === "chica" || size === "cMedia" || size === "individual");
  const upgradeDiff = canUpsell ? pizza.prices.grande - price : 0;

  const doAdd = () => {
    if (canUpsell) {
      setShowUpsell(true);
      setUpsellShown(true);
      return;
    }
    onAdd({ id: cid, name: pizza.name, detail: SIZE_LABELS[size], price });
  };
  const doAddConfirm = () => {
    onAdd({ id: cid, name: pizza.name, detail: SIZE_LABELS[size], price });
    setShowUpsell(false);
  };
  const doAddGrande = () => {
    const gid = pizza.id + "_grande";
    onAdd({ id: gid, name: pizza.name, detail: SIZE_LABELS.grande, price: pizza.prices.grande });
    setShowUpsell(false);
  };
  const doRemove = () => onRemove(cid);

  return (
    <div style={{background:"#1a1714",borderRadius:"16px",border:"1px solid #2a2520",padding:"16px"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"8px"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{background:"#D42027",color:"white",fontSize:"11px",fontWeight:900,padding:"2px 6px",borderRadius:"4px"}}>{pizza.num}</span>
            <span style={{fontWeight:900,color:"white",fontSize:"15px",textTransform:"uppercase",letterSpacing:"0.5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pizza.name}</span>
          </div>
          <p style={{color:"#8a7b6b",fontSize:"12px",marginTop:"4px",lineHeight:"1.4",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{pizza.desc}</p>
        </div>
      </div>

      <button onClick={() => setOpen(!open)} style={{color:"#D42027",fontSize:"12px",marginTop:"8px",display:"flex",alignItems:"center",gap:"4px",fontWeight:700,background:"none",border:"none",cursor:"pointer",padding:0}}>
        {SIZE_LABELS[size]}
        <svg style={{width:"12px",height:"12px",transition:"transform 0.2s",transform:open?"rotate(180deg)":"none"}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"8px"}}>
          {Object.entries(SIZE_LABELS).map(([k, label]) => (
            <button key={k} onClick={() => { setSize(k); setOpen(false); setShowUpsell(false); setUpsellShown(false); }}
              style={{fontSize:"11px",padding:"6px 8px",borderRadius:"8px",fontWeight:700,border:size===k?"none":"1px solid #3a3228",cursor:"pointer",
                background:size===k?"#D42027":"#252118",color:size===k?"white":"#8a7b6b"}}>
              {label} · {fmt(pizza.prices[k])}
            </button>
          ))}
        </div>
      )}

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px",gap:"12px"}}>
        <span style={{color:"#D42027",fontWeight:900,fontSize:"20px"}}>{fmt(price)}</span>
        {qty === 0 ? <AddBtn onClick={doAdd} price={price} /> : <QtyStepper qty={qty} onPlus={() => onAdd({ id: cid, name: pizza.name, detail: SIZE_LABELS[size], price })} onMinus={doRemove} />}
      </div>

      {showUpsell && (
        <div style={{marginTop:"10px",background:"linear-gradient(135deg, rgba(212,32,39,0.15) 0%, #252118 100%)",borderRadius:"10px",padding:"10px 12px",border:"1px solid rgba(212,32,39,0.3)",display:"flex",alignItems:"center",gap:"8px",animation:"fadeIn 0.3s ease-out"}}>
          <span style={{color:"#FFD700",fontSize:"14px"}}>⬆</span>
          <span style={{flex:1,color:"white",fontSize:"12px",fontWeight:500}}>Por <strong style={{color:"#FFD700"}}>{fmt(upgradeDiff)}</strong> más llevás la Grande</span>
          <button onClick={doAddGrande} style={{background:"#D42027",color:"white",fontWeight:900,padding:"6px 10px",borderRadius:"8px",fontSize:"11px",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>Sí, quiero!</button>
          <button onClick={doAddConfirm} style={{color:"#8a7b6b",fontSize:"11px",background:"none",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>No, así</button>
        </div>
      )}
    </div>
  );
}

/* ── Item Card ── */
function ItemCard({ item, cart, onAdd, onRemove }) {
  const [withEgg, setWithEgg] = useState(false);
  const fp = item.price + (withEgg && item.egg ? EGG : 0);
  const cid = item.id + (withEgg ? "_egg" : "");
  const found = cart.find(c => c.id === cid);
  const qty = found ? found.qty : 0;

  const doAdd = () => onAdd({ id: cid, name: item.name, detail: withEgg ? "Con huevo" : "", price: fp });
  const doRemove = () => onRemove(cid);

  return (
    <div style={{background:"#1a1714",borderRadius:"16px",border:"1px solid #2a2520",padding:"16px"}}>
      <span style={{fontWeight:900,color:"white",fontSize:"15px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{item.name}</span>
      {item.desc && <p style={{color:"#8a7b6b",fontSize:"12px",marginTop:"4px"}}>{item.desc}</p>}
      {item.egg && (
        <label style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px",cursor:"pointer"}}>
          <div onClick={() => setWithEgg(!withEgg)} style={{width:"20px",height:"20px",borderRadius:"4px",border:withEgg?"none":"2px solid #3a3228",background:withEgg?"#D42027":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {withEgg && <svg style={{width:"12px",height:"12px",color:"white"}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
          </div>
          <span style={{color:"#8a7b6b",fontSize:"12px"}}>+ Huevo (+{fmt(EGG)})</span>
        </label>
      )}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px",gap:"12px"}}>
        <span style={{color:"#D42027",fontWeight:900,fontSize:"20px"}}>{fmt(fp)}</span>
        {qty === 0 ? <AddBtn onClick={doAdd} price={fp} /> : <QtyStepper qty={qty} onPlus={doAdd} onMinus={doRemove} />}
      </div>
    </div>
  );
}

/* ── Promo Card ── */
function PromoCard({ promo, cart, onAdd, onRemove }) {
  const found = cart.find(c => c.id === promo.id);
  const qty = found ? found.qty : 0;
  const doAdd = () => onAdd({ id: promo.id, name: promo.name, detail: promo.desc, price: promo.price });
  const doRemove = () => onRemove(promo.id);

  return (
    <div style={{borderRadius:"16px",padding:"16px",border:"2px solid rgba(212,32,39,0.4)",position:"relative",overflow:"hidden",background:"linear-gradient(135deg, rgba(212,32,39,0.3) 0%, #1a1714 50%)"}}>
      {promo.badge && (
        <span style={{position:"absolute",top:"12px",right:"12px",background:"#FFD700",color:"#1a1714",fontSize:"10px",fontWeight:900,padding:"2px 8px",borderRadius:"99px",textTransform:"uppercase"}}>{promo.badge}</span>
      )}
      <span style={{fontWeight:900,color:"white",fontSize:"17px",textTransform:"uppercase",letterSpacing:"0.5px",paddingRight:"80px",display:"block"}}>{promo.name}</span>
      <p style={{color:"rgba(255,255,255,0.7)",fontSize:"13px",marginTop:"4px"}}>{promo.desc}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px"}}>
        <span style={{color:"#FFD700",fontWeight:900,fontSize:"22px"}}>{fmt(promo.price)}</span>
        {qty === 0 ? (
          <button onClick={doAdd} style={{background:"white",color:"#D42027",fontWeight:900,padding:"10px 18px",borderRadius:"12px",fontSize:"13px",border:"none",cursor:"pointer",textTransform:"uppercase"}}>Agregar</button>
        ) : <QtyStepper qty={qty} onPlus={doAdd} onMinus={doRemove} />}
      </div>
    </div>
  );
}

/* ── Cart Panel ── */
function CartPanel({ cart, onAdd, onRemove, onClose, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}} onClick={onClose} />
      <div style={{position:"relative",background:"#121010",borderRadius:"24px 24px 0 0",maxHeight:"85vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px",borderBottom:"1px solid #2a2520",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:"white",fontWeight:900,textTransform:"uppercase",letterSpacing:"1px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"26px"}}>Tu Pedido</span>
          <button onClick={onClose} style={{color:"#8a7b6b",background:"none",border:"none",cursor:"pointer",padding:"4px"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
          {/* Drink cross-sell banner */}
          {cart.length > 0 && !cartHasBebida(cart) && (
            <div style={{background:"linear-gradient(135deg, rgba(255,215,0,0.1) 0%, #1a1714 100%)",borderRadius:"12px",padding:"12px",marginBottom:"12px",border:"1px solid rgba(255,215,0,0.25)"}}>
              <p style={{color:"#FFD700",fontSize:"12px",fontWeight:900,textTransform:"uppercase",marginBottom:"8px"}}>🥤 ¡No te olvides la bebida!</p>
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                {[
                  { id:"b1", name:"Pepsi 1.5L", price:6000 },
                  { id:"b9", name:"Lata Brahma", price:3500 },
                ].map(b => (
                  <button key={b.id} onClick={() => onAdd({ id: b.id, name: b.name, detail: "", price: b.price })}
                    style={{background:"#252118",color:"white",fontSize:"11px",fontWeight:700,padding:"7px 10px",borderRadius:"8px",border:"1px solid #3a3228",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"}}>
                    {b.name} <span style={{color:"#D42027",fontWeight:900}}>{fmt(b.price)}</span>
                  </button>
                ))}
                <button onClick={onClose} style={{background:"none",color:"#D42027",fontSize:"11px",fontWeight:700,padding:"7px 8px",border:"none",cursor:"pointer"}}>Ver más →</button>
              </div>
            </div>
          )}
          {cart.length === 0 ? (
            <p style={{color:"#8a7b6b",textAlign:"center",padding:"32px 0"}}>Tu carrito está vacío</p>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {cart.map((item) => (
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:"12px",background:"#1a1714",borderRadius:"12px",padding:"12px"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:"white",fontWeight:700,fontSize:"14px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                    {item.detail && <p style={{color:"#8a7b6b",fontSize:"11px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.detail}</p>}
                  </div>
                  <QtyStepper qty={item.qty} onPlus={() => onAdd(item)} onMinus={() => onRemove(item.id)} />
                  <span style={{color:"#D42027",fontWeight:900,fontSize:"14px",width:"72px",textAlign:"right",flexShrink:0}}>{fmt(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div style={{padding:"16px",borderTop:"1px solid #2a2520"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
              <span style={{color:"#8a7b6b",fontSize:"18px"}}>Total</span>
              <span style={{color:"white",fontWeight:900,fontSize:"24px"}}>{fmt(total)}</span>
            </div>
            <button onClick={onCheckout} style={{width:"100%",background:"#D42027",color:"white",fontWeight:900,padding:"16px",borderRadius:"16px",fontSize:"16px",border:"none",cursor:"pointer",textTransform:"uppercase",letterSpacing:"1px"}}>
              Confirmar Pedido →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Checkout ── */
function Checkout({ cart, onBack, onClear, onAdd }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const suggestions = getCheckoutSuggestions(cart);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("efectivo");
  const [tipo, setTipo] = useState("delivery");
  const [nota, setNota] = useState("");

  const send = () => {
    let msg = `🍕 *Nuevo Pedido — Pizza Bemba*\n\n`;
    msg += `👤 *${nombre}*\n`;
    msg += tipo === "delivery" ? `📍 ${direccion}\n` : `🏪 *Retiro en local*\n`;
    msg += `💳 Pago: *${pago === "efectivo" ? "Efectivo" : pago === "transferencia" ? "Transferencia" : "Tarjeta"}*\n\n`;
    msg += `📋 *Detalle:*\n`;
    cart.forEach(i => {
      msg += `• ${i.qty}x ${i.name}`;
      if (i.detail) msg += ` (${i.detail})`;
      msg += ` — ${fmt(i.price * i.qty)}\n`;
    });
    if (nota) msg += `\n📝 Nota: ${nota}\n`;
    msg += `\n💰 *TOTAL: ${fmt(total)}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    onClear();
  };

  const ok = nombre.trim() && (tipo === "retiro" || direccion.trim());
  const inputStyle = {width:"100%",background:"#1a1714",border:"1px solid #2a2520",borderRadius:"12px",padding:"12px 16px",color:"#f5e6d3",fontSize:"14px",outline:"none",fontFamily:"inherit"};

  return (
    <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}} onClick={onBack} />
      <div style={{position:"relative",background:"#121010",borderRadius:"24px 24px 0 0",maxHeight:"90vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px",borderBottom:"1px solid #2a2520",display:"flex",alignItems:"center",gap:"12px"}}>
          <button onClick={onBack} style={{color:"#8a7b6b",background:"none",border:"none",cursor:"pointer"}}>←</button>
          <span style={{color:"white",fontWeight:900,fontSize:"26px",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"'Bebas Neue', sans-serif"}}>Tus Datos</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"16px"}}>
          <div>
            <label style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Nombre *</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
          </div>
          <div>
            <label style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Entrega</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {[["delivery","🛵 Delivery"],["retiro","🏪 Retiro"]].map(([k,l]) => (
                <button key={k} onClick={() => setTipo(k)}
                  style={{padding:"12px",borderRadius:"12px",fontWeight:900,fontSize:"13px",border:tipo===k?"none":"1px solid #2a2520",cursor:"pointer",textTransform:"uppercase",fontFamily:"inherit",
                    background:tipo===k?"#D42027":"#1a1714",color:tipo===k?"white":"#8a7b6b"}}>{l}</button>
              ))}
            </div>
          </div>
          {tipo === "delivery" && (
            <div>
              <label style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Dirección *</label>
              <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Ej: Mitre 123" style={inputStyle} />
            </div>
          )}
          <div>
            <label style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Método de pago</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
              {[["efectivo","💵 Efectivo"],["transferencia","📱 Transf."],["tarjeta","💳 Tarjeta"]].map(([k,l]) => (
                <button key={k} onClick={() => setPago(k)}
                  style={{padding:"12px",borderRadius:"12px",fontWeight:900,fontSize:"11px",border:pago===k?"none":"1px solid #2a2520",cursor:"pointer",textTransform:"uppercase",fontFamily:"inherit",
                    background:pago===k?"#D42027":"#1a1714",color:pago===k?"white":"#8a7b6b"}}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"6px"}}>Nota (opcional)</label>
            <textarea value={nota} onChange={e => setNota(e.target.value)} placeholder="Ej: Sin cebolla, timbre roto..." style={{...inputStyle,resize:"none",height:"72px"}} />
          </div>
          {/* Checkout cross-sell suggestions */}
          {suggestions.length > 0 && (
            <div style={{background:"linear-gradient(135deg, rgba(212,32,39,0.1) 0%, #1a1714 100%)",borderRadius:"12px",padding:"12px",border:"1px solid rgba(212,32,39,0.2)"}}>
              <p style={{color:"#FFD700",fontSize:"11px",fontWeight:900,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"8px"}}>🔥 Otros clientes también pidieron</p>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                {suggestions.map(s => (
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:"8px",background:"#252118",borderRadius:"8px",padding:"8px 10px"}}>
                    <span style={{flex:1,color:"white",fontSize:"13px",fontWeight:600}}>{s.name}</span>
                    <span style={{color:"#8a7b6b",fontSize:"12px",fontWeight:700}}>{fmt(s.price)}</span>
                    <button onClick={() => onAdd({ id: s.id, name: s.name, detail: "", price: s.price })}
                      style={{background:"#D42027",color:"white",width:"28px",height:"28px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:900,fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{background:"#1a1714",borderRadius:"12px",padding:"12px",border:"1px solid #2a2520"}}>
            <p style={{color:"#8a7b6b",fontSize:"11px",fontWeight:700,textTransform:"uppercase",marginBottom:"8px"}}>Resumen</p>
            {cart.map(item => (
              <div key={item.id} style={{display:"flex",justifyContent:"space-between",fontSize:"13px",padding:"2px 0"}}>
                <span style={{color:"#b0a090"}}>{item.qty}x {item.name}</span>
                <span style={{color:"white",fontWeight:700}}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:"20px",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #2a2520"}}>
              <span style={{color:"white"}}>Total</span>
              <span style={{color:"#D42027"}}>{fmt(total)}</span>
            </div>
          </div>
        </div>
        <div style={{padding:"16px",borderTop:"1px solid #2a2520"}}>
          <button onClick={send} disabled={!ok}
            style={{width:"100%",fontWeight:900,padding:"16px",borderRadius:"16px",fontSize:"16px",border:"none",cursor:ok?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"inherit",
              background:ok?"#25D366":"#252118",color:ok?"white":"#5a4d3d"}}>
            <svg style={{width:"22px",height:"22px"}} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.67-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.318-.73-6.002-1.965l-.42-.318-2.774.73.744-2.714-.347-.553A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [activeCat, setActiveCat] = useState("promos");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [crossSell, setCrossSell] = useState(null);
  const crossSellTimer = useRef(null);
  const sectionRefs = useRef({});

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const dismissCrossSell = useCallback(() => {
    setCrossSell(null);
    if (crossSellTimer.current) clearTimeout(crossSellTimer.current);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.id === item.id);
      if (idx >= 0) {
        const next = prev.map((c, i) => i === idx ? { ...c, qty: c.qty + 1 } : c);
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    // Cross-sell toast
    const rule = getCrossSell(item.id);
    if (rule) {
      setCrossSell(rule);
      if (crossSellTimer.current) clearTimeout(crossSellTimer.current);
      crossSellTimer.current = setTimeout(() => setCrossSell(null), 5000);
    } else {
      setToast(item.name);
      setTimeout(() => setToast(null), 1200);
    }
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx < 0) return prev;
      if (prev[idx].qty <= 1) return prev.filter((_, i) => i !== idx);
      return prev.map((c, i) => i === idx ? { ...c, qty: c.qty - 1 } : c);
    });
  }, []);

  const scrollTo = (key) => {
    setActiveCat(key);
    setSearch("");
    const el = sectionRefs.current[key];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const q = search.toLowerCase();
  const filt = (items) => !q ? items : items.filter(i => i.name.toLowerCase().includes(q) || (i.desc && i.desc.toLowerCase().includes(q)));
  const filtPizzas = !q ? PIZZAS : PIZZAS.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));

  return (
    <div style={{minHeight:"100vh",background:"#0e0c0a",color:"#f5e6d3",fontFamily:"'DM Sans', system-ui, sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Bebas+Neue&display=swap');
        @keyframes fadeToast { 0%{opacity:0;transform:translateY(20px)scale(.95)} 15%{opacity:1;transform:translateY(0)scale(1)} 75%{opacity:1} 100%{opacity:0;transform:translateY(-10px)} }
        @keyframes slideDown { 0%{opacity:0;transform:translateX(-50%) translateY(-20px)} 100%{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes fadeIn { 0%{opacity:0} 100%{opacity:1} }
        .toast-anim { animation: fadeToast 1.2s ease-out forwards; }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        body { margin: 0; padding: 0; background: #0e0c0a; }
        input::placeholder, textarea::placeholder { color: #5a4d3d; }
        input:focus, textarea:focus { border-color: #D42027 !important; }
      `}</style>

      {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(14,12,10,0.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid #1a1714"}}>
        <div style={{maxWidth:"480px",margin:"0 auto",padding:"14px 16px 10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:"8px"}}>
              <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"40px",color:"#D42027",lineHeight:1,letterSpacing:"3px"}}>BEMBA</span>
              <span style={{color:"#8a7b6b",fontSize:"11px",fontStyle:"italic"}}>a la Parrilla</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(37,211,102,0.15)",color:"#25D366",padding:"6px 12px",borderRadius:"99px"}}>
              <span style={{width:"7px",height:"7px",background:"#25D366",borderRadius:"50%"}} />
              <span style={{fontSize:"11px",fontWeight:700}}>Abierto</span>
            </div>
          </div>

          <div style={{position:"relative"}}>
            <svg style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#5a4d3d"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en el menú..."
              style={{width:"100%",background:"#1a1714",border:"1px solid #2a2520",borderRadius:"12px",padding:"11px 36px 11px 36px",color:"#f5e6d3",fontSize:"13px",outline:"none",fontFamily:"inherit"}} />
            {search && (
              <button onClick={() => setSearch("")} style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",color:"#5a4d3d",background:"none",border:"none",cursor:"pointer",fontSize:"16px"}}>✕</button>
            )}
          </div>

          {!search && (
            <nav style={{display:"flex",gap:"6px",marginTop:"10px",overflowX:"auto",marginLeft:"-16px",marginRight:"-16px",padding:"0 16px 2px",scrollbarWidth:"none"}}>
              {CATS.map(c => (
                <button key={c.key} onClick={() => scrollTo(c.key)}
                  style={{flexShrink:0,padding:"7px 12px",borderRadius:"10px",fontSize:"12px",fontWeight:700,whiteSpace:"nowrap",border:"none",cursor:"pointer",fontFamily:"inherit",
                    background:activeCat === c.key ? "#D42027" : "#1a1714",color:activeCat === c.key ? "white" : "#8a7b6b"}}>
                  {c.icon} {c.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* CONTENT */}
      <main style={{maxWidth:"480px",margin:"0 auto",padding:"16px 16px 120px"}}>

        {(!q || filt(PROMOS).length > 0) && (
          <section ref={el => sectionRefs.current.promos = el} style={{marginBottom:"28px",scrollMarginTop:"170px"}}>
            <h2 style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"26px",color:"white",letterSpacing:"1px",marginBottom:"10px"}}>🔥 PROMOS DEL DÍA</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {filt(PROMOS).map(p => <PromoCard key={p.id} promo={p} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />)}
            </div>
          </section>
        )}

        {(!q || filtPizzas.length > 0) && (
          <section ref={el => sectionRefs.current.pizzas = el} style={{marginBottom:"28px",scrollMarginTop:"170px"}}>
            <h2 style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"26px",color:"white",letterSpacing:"1px"}}>🍕 PIZZAS A LA PARRILLA</h2>
            <p style={{color:"#8a7b6b",fontSize:"12px",marginBottom:"10px"}}>39 variedades · Elegí tu tamaño</p>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {filtPizzas.map(p => <PizzaCard key={p.id} pizza={p} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />)}
            </div>
            {(!q || PIZZAS_SIN_TACC.some(i => i.name.toLowerCase().includes(q))) && (
              <div style={{marginTop:"20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
                  <span style={{background:"rgba(13,148,136,0.2)",color:"rgb(94,234,212)",fontSize:"11px",fontWeight:700,padding:"3px 8px",borderRadius:"99px"}}>SIN TACC</span>
                  <span style={{color:"white",fontWeight:900,fontSize:"14px",textTransform:"uppercase"}}>Pizzas para celíacos</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  {filt(PIZZAS_SIN_TACC).map(i => <ItemCard key={i.id} item={i} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />)}
                </div>
              </div>
            )}
          </section>
        )}

        {["tostados","hamburguesas","milanesas","sandwiches","lomos","picadas","extras","bebidas"].map(catKey => {
          const items = filt(MENU[catKey] || []);
          if (q && items.length === 0) return null;
          const cat = CATS.find(c => c.key === catKey);
          return (
            <section key={catKey} ref={el => sectionRefs.current[catKey] = el} style={{marginBottom:"28px",scrollMarginTop:"170px"}}>
              <h2 style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"26px",color:"white",letterSpacing:"1px",marginBottom:"4px"}}>{cat?.icon} {cat?.label?.toUpperCase()}</h2>
              {["hamburguesas","milanesas","sandwiches","lomos"].includes(catKey) && (
                <p style={{color:"#8a7b6b",fontSize:"12px",marginBottom:"10px"}}>Opcional: huevo +{fmt(EGG)}</p>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {items.map(item => <ItemCard key={item.id} item={item} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />)}
              </div>
            </section>
          );
        })}

        {q && filtPizzas.length === 0 && Object.values(MENU).every(items => filt(items).length === 0) && filt(PROMOS).length === 0 && (
          <div style={{textAlign:"center",padding:"64px 0"}}>
            <p style={{fontSize:"48px",marginBottom:"8px"}}>🔍</p>
            <p style={{color:"#8a7b6b",fontSize:"16px"}}>No encontramos "{search}"</p>
          </div>
        )}
      </main>

      {/* FLOATING CART */}
      {cartCount > 0 && view === "menu" && (
        <div style={{position:"fixed",bottom:"16px",left:"50%",transform:"translateX(-50%)",zIndex:40,width:"calc(100% - 32px)",maxWidth:"448px"}}>
          <button onClick={() => setView("cart")}
            style={{width:"100%",background:"#D42027",color:"white",padding:"14px 16px",borderRadius:"16px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",
              boxShadow:"0 8px 32px rgba(212,32,39,0.5)",fontFamily:"inherit",fontWeight:900,fontSize:"15px"}}>
            <span style={{background:"rgba(255,255,255,0.25)",width:"34px",height:"34px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"15px"}}>{cartCount}</span>
            <span style={{flex:1,textAlign:"left",textTransform:"uppercase",letterSpacing:"1px"}}>Ver pedido</span>
            <span style={{fontSize:"17px",fontWeight:900}}>{fmt(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* TOAST — simple confirmation */}
      {toast && !crossSell && (
        <div className="toast-anim" style={{position:"fixed",top:"76px",left:"50%",transform:"translateX(-50%)",zIndex:200,background:"#25D366",color:"white",padding:"8px 16px",borderRadius:"10px",fontWeight:700,fontSize:"13px",pointerEvents:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>
          ✓ {toast} agregado
        </div>
      )}

      {/* CROSS-SELL TOAST */}
      <CrossSellToast data={crossSell} onAdd={(item) => { addToCart(item); dismissCrossSell(); }} onDismiss={dismissCrossSell} />

      {view === "cart" && <CartPanel cart={cart} onAdd={addToCart} onRemove={removeFromCart} onClose={() => setView("menu")} onCheckout={() => setView("checkout")} />}
      {view === "checkout" && <Checkout cart={cart} onBack={() => setView("cart")} onClear={() => { setCart([]); setView("menu"); }} onAdd={addToCart} />}
    </div>
  );
}
