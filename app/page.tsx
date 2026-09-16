const products = [
  { name: 'Aloe Vera Gel', category: 'Nutrición', price: '$—', icon: '🌿' },
  { name: 'Forever Arctic Sea', category: 'Bienestar', price: '$—', icon: '🐟' },
  { name: 'Aloe Vera Gelly', category: 'Belleza', price: '$—', icon: '✨' },
];

export default function Home() {
  return (
    <main>
      <div style={{background:'var(--deep)',color:'white',padding:'9px',textAlign:'center',fontSize:13}}>Envíos disponibles en Ecuador · Atención personalizada por WhatsApp</div>
      <header style={{background:'white',borderBottom:'1px solid #e5e5e5',position:'sticky',top:0,zIndex:10}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 0'}}>
          <div><strong style={{fontSize:25,color:'var(--deep)',fontFamily:'Georgia'}}>Aloe & Bienestar</strong><div style={{fontSize:10,letterSpacing:2,color:'var(--green)'}}>NUTRICIÓN · BELLEZA · BIENESTAR</div></div>
          <nav style={{display:'flex',gap:25,fontSize:14}}><a href="#productos">Productos</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a><a href="#carrito">🛒 Carrito</a></nav>
        </div>
      </header>

      <section style={{background:'var(--pale)',padding:'78px 0'}}><div className="container" style={{display:'grid',gridTemplateColumns:'1.15fr .85fr',gap:50,alignItems:'center'}}>
        <div><div style={{color:'var(--green)',fontWeight:700,letterSpacing:2,fontSize:13}}>BIENESTAR QUE SE SIENTE</div><h1 style={{fontFamily:'Georgia',fontSize:'clamp(42px,6vw,70px)',lineHeight:1.03,color:'var(--deep)',margin:'15px 0'}}>Tu mejor versión empieza hoy.</h1><p style={{fontSize:18,lineHeight:1.7,maxWidth:600}}>Productos de nutrición, belleza y bienestar seleccionados para acompañarte en cada etapa.</p><div style={{display:'flex',gap:14,marginTop:28}}><a href="#productos" style={{background:'var(--deep)',color:'white',padding:'15px 25px',borderRadius:30,fontWeight:700}}>Ver productos</a><a href="#contacto" style={{border:'1px solid var(--green)',color:'var(--deep)',padding:'15px 25px',borderRadius:30,fontWeight:700}}>Quiero asesoría</a></div></div>
        <div style={{minHeight:340,borderRadius:35,background:'linear-gradient(145deg,#A8CDB8,#EAF5EE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:110}}>🌿</div>
      </div></section>

      <section className="container" style={{padding:'28px 0',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:15}}>{[['🚚','Envíos en Ecuador'],['🔒','Compra segura'],['💬','Asesoría personalizada']].map(([i,t])=><div key={t} style={{background:'white',padding:20,borderRadius:15,textAlign:'center'}}><div style={{fontSize:25}}>{i}</div><strong>{t}</strong></div>)}</section>

      <section id="productos" className="container" style={{padding:'65px 0'}}><div style={{textAlign:'center'}}><div style={{color:'var(--green)',fontWeight:700}}>SELECCIÓN PARA TI</div><h2 style={{fontFamily:'Georgia',fontSize:42,color:'var(--deep)',margin:'10px 0 35px'}}>Productos destacados</h2></div><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>{products.map(p=><article key={p.name} style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 8px 30px #0f513814'}}><div style={{height:230,background:'var(--pale)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:80}}>{p.icon}</div><div style={{padding:22}}><small style={{color:'var(--green)',fontWeight:700}}>{p.category}</small><h3 style={{fontSize:20}}>{p.name}</h3><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong style={{color:'var(--deep)',fontSize:20}}>{p.price}</strong><button style={{background:'var(--deep)',color:'white',border:0,borderRadius:25,padding:'10px 16px'}}>Agregar</button></div></div></article>)}</div></section>

      <section id="nosotros" style={{background:'var(--deep)',color:'white',padding:'65px 0'}}><div className="container" style={{textAlign:'center'}}><h2 style={{fontFamily:'Georgia',fontSize:40}}>Tu bienestar, nuestra prioridad.</h2><p style={{maxWidth:700,margin:'auto',lineHeight:1.8,opacity:.9}}>Queremos que comprar bienestar sea una experiencia sencilla, clara y confiable. Muy pronto podrás consultar el catálogo completo, comprar en línea y recibir confirmación de tu pedido.</p></div></section>
      <footer id="contacto" style={{background:'#092f22',color:'white',padding:'35px 0'}}><div className="container" style={{display:'flex',justifyContent:'space-between'}}><span>© {new Date().getFullYear()} Aloe & Bienestar</span><span>WhatsApp · Ecuador</span></div></footer>
    </main>
  );
}
