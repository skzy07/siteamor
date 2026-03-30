/* ============================================================
   STARFIELD
   ============================================================ */
const sf = document.getElementById('starfield');
if (sf) {
  for(let i=0;i<120;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*2.5+.5;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;
      --d:${2+Math.random()*5}s;--o:${.2+Math.random()*.7};animation-delay:${Math.random()*5}s`;
    sf.appendChild(s);
  }
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function navBtn(id){ return document.querySelector(`[data-page="${id}"]`); }

function goTo(id, btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const page = document.getElementById(id);
  if(page) page.classList.add('active');
  if(btn) btn.classList.add('active');
  page.scrollTop = 0;
  // Trigger timeline observer
  if(id==='p-timeline') observeTimeline();
  if(id==='p-raspadinha') {
    setTimeout(() => {
      if(!window.scratchInitDone) {
        initScratch();
        window.scratchInitDone = true;
      }
    }, 150);
  }
}

/* ============================================================
   COUNTER
   ============================================================ */
const START = new Date('2024-10-31T00:00:00');
const TARGET_5_MONTHS = new Date('2025-03-31T00:00:00');
const LOAD_TIME = Date.now();
function tick(){
  const diff = (TARGET_5_MONTHS.getTime() - START.getTime()) + (Date.now() - LOAD_TIME);
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  const cDays = document.getElementById('c-days');
  if (cDays) cDays.textContent = d;
  const cHours = document.getElementById('c-hours');
  if (cHours) cHours.textContent = h;
  const cMins = document.getElementById('c-mins');
  if (cMins) cMins.textContent = m;
  const cSecs = document.getElementById('c-secs');
  if (cSecs) cSecs.textContent = s;
}
setInterval(tick,1000);

document.addEventListener("DOMContentLoaded", () => {
    tick(); // run right away after DOM load
});

/* ============================================================
   MUSIC
   ============================================================ */
const audio = document.getElementById('bg-music');
const bars  = document.getElementById('music-bars');
let playing = false;
if (audio) audio.volume = 0.4;

function toggleMusic(){
  if(playing){ audio.pause(); bars.classList.add('paused'); document.getElementById('music-btn').textContent='♪'; }
  else { audio.play().catch(()=>{}); bars.classList.remove('paused'); document.getElementById('music-btn').textContent='⏸'; }
  playing = !playing;
}

function setVolume(val) {
  if (audio) audio.volume = val;
}

/* ============================================================
   TIMELINE DATA
   ============================================================ */
const moments = [
  {date:'24 Out 2024',emoji:'🍂',title:'O Primeiro Encontro',desc:'Era outono e o coração já sabia o que a cabeça ainda não queria admitir. O primeiro encontro que mudou tudo — sem saber que ia mudar tudo.',color:'linear-gradient(135deg,#ff9966,#ff5e62)',tag:'onde tudo começou'},
  {date:'31 Out 2024',emoji:'🎃',title:'O Início de Nós',desc:'Dia de Halloween. Mas o susto verdadeiro foi perceber que queríamos ser um "nós". O melhor susto da vida.',color:'linear-gradient(135deg,#f7971e,#ffd200)',tag:'o nosso dia'},
  {date:'15 Nov 2024',emoji:'🌈',title:'Neonia — O Museu das Cores',desc:'Uma tarde cheia de cores, luzes e muito sorriso. O Neonia foi tão bonito como estava a sentir por dentro.',color:'linear-gradient(135deg,#11998e,#38ef7d)',tag:'15 de novembro'},
  {date:'19 Nov 2024',emoji:'🎄',title:'Luzes de Natal',desc:'Luzes por todo o lado... mas a mais bonita eras tu. Natal chegou cedo este ano.',color:'linear-gradient(135deg,#2d6a4f,#c0392b)',tag:'magia de natal'},
  {date:'4 Dez 2024',emoji:'🎂',title:'O Aniversário Dela ✨',desc:'O dia mais especial do ano ficou ainda mais especial. Feliz aniversário para a pessoa que tornou os meus dias melhores.',color:'linear-gradient(135deg,#a18cd1,#fbc2eb)',tag:'o teu dia'},
  {date:'31 Dez 2024',emoji:'🎆',title:'Ano Novo Juntos',desc:'Virar o ano com a mão certa na mão. 2025 chegou e a única coisa que queríamos era ficar assim.',color:'linear-gradient(135deg,#232526,#ffd700)',tag:'o melhor início de ano'},
  {date:'31 Jan 2025',emoji:'🧱',title:'Exposição de LEGO',desc:'Mundos construídos peça a peça... como nós. Prova que as coisas mais bonitas demoram a construir-se.',color:'linear-gradient(135deg,#f7971e,#ffd200)',tag:'31 de janeiro'},
  {date:'14 Fev 2025',emoji:'💝',title:'Dia dos Namorados',desc:'O dia que foi inventado para nós. Ou melhor — para toda a gente, mas que aproveitámos na perfeição.',color:'linear-gradient(135deg,#e96c6c,#f4a0b0)',tag:'o dia mais clichê e mais bonito'},
  {date:'21 Fev 2025',emoji:'🌊',title:'Ida à Praia',desc:'O mar, a areia e a melhor companhia do mundo. A praia no inverno tem uma magia diferente — com a pessoa certa, ainda mais.',color:'linear-gradient(135deg,#56ccf2,#f7c59f)',tag:'21 de fevereiro'},
  {date:'28 Fev 2025',emoji:'🎭',title:'Museu dos 5 Sentidos',desc:'Ver, ouvir, sentir, cheirar, provar... e ainda assim o sentido favorito foi estar contigo. Cinco sentidos não chegam.',color:'linear-gradient(135deg,#8e44ad,#3498db)',tag:'28 de fevereiro'},
  {date:'28 Mar 2025',emoji:'⚓',title:'Pulseiras Permanentes',desc:'Um laço que não se tira. Como nós: permanente e para sempre.',color:'linear-gradient(135deg,#c44d63,#d4a853)',tag:'permanente 💕'},
  {date:'28 Mar 2025',emoji:'🌅',title:'Tarde na Foz',desc:'O Atlântico à nossa frente e o mundo inteiro atrás. A melhor tarde de março.',color:'linear-gradient(135deg,#2980b9,#6dd5fa,#fff)',tag:'a nossa foz'},
];

document.addEventListener("DOMContentLoaded", () => {
    const tlContainer = document.getElementById('tl-items');
    if (tlContainer) {
        moments.forEach((m,i)=>{
          const isEven = i%2===1;
          const el = document.createElement('div');
          el.className = 'tl-item';
          const card = `<div class="tl-card">
            <p class="tl-date">${m.date}</p>
            <h3 class="tl-title">${m.title}</h3>
            <p class="tl-desc">${m.desc}</p>
            <div class="tl-photo" style="background:${m.color}">${m.emoji}<div class="tl-photo-tag">${m.tag}</div></div>
          </div>`;
          el.innerHTML = isEven
            ? `<div class="tl-spacer"></div><div class="tl-node"><div class="tl-dot">${m.emoji}</div></div>${card}`
            : `${card}<div class="tl-node"><div class="tl-dot">${m.emoji}</div></div><div class="tl-spacer"></div>`;
          tlContainer.appendChild(el);
        });
    }

    const pTimeline = document.getElementById('p-timeline');
    if (pTimeline) {
        pTimeline.addEventListener('scroll', ()=>{
          observeTimeline();
        }, {once:true});
    }
});

function observeTimeline(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('vis'); });
  },{threshold:.12,root:document.getElementById('p-timeline')});
  document.querySelectorAll('.tl-item').forEach(el=>obs.observe(el));
}

/* ============================================================
   150 MOTIVOS
   ============================================================ */
const motivos = [
  // ROMÂNTICOS
  {cat:'Romântico',text:'Porque o teu sorriso de manhã é a melhor notificação do dia.'},
  {cat:'Romântico',text:'Porque consigo ficar horas a falar contigo e nunca me farta.'},
  {cat:'Romântico',text:'Porque o teu abraço é o meu sítio favorito no mundo inteiro.'},
  {cat:'Romântico',text:'Porque me fazes querer ser uma versão melhor de mim.'},
  {cat:'Romântico',text:'Porque quando estou triste, pensar em ti já é metade da solução.'},
  {cat:'Romântico',text:'Porque os teus olhos têm uma conversa paralela com os meus.'},
  {cat:'Romântico',text:'Porque cada viagem contigo parece uma aventura mesmo que seja ao supermercado.'},
  {cat:'Romântico',text:'Porque o teu riso é tão contagiante que não consigo não rir também.'},
  {cat:'Romântico',text:'Porque me escolheste, e isso ainda me surpreende da melhor forma.'},
  {cat:'Romântico',text:'Porque cada mensagem tua alegra-me o dia, seja às 9h ou à meia-noite.'},
  {cat:'Romântico',text:'Porque fazes com que os silêncios sejam confortáveis, não estranhos.'},
  {cat:'Romântico',text:'Porque o teu toque é uma linguagem que o meu coração percebe logo.'},
  {cat:'Romântico',text:'Porque és a primeira pessoa em quem penso quando acontece algo bom.'},
  {cat:'Romântico',text:'Porque a melhor parte dos nossos planos és sempre tu.'},
  {cat:'Romântico',text:'Porque te importas com as pequenas coisas que fazem toda a diferença.'},
  {cat:'Romântico',text:'Porque a tua voz é a minha música favorita.'},
  {cat:'Romântico',text:'Porque mesmo nas discussões, sei que estamos do mesmo lado.'},
  {cat:'Romântico',text:'Porque me fazes sentir em casa onde quer que estejamos.'},
  {cat:'Romântico',text:'Porque tens uma forma de olhar para mim que me faz sentir especial.'},
  {cat:'Romântico',text:'Porque escolheste ficar, e isso diz tudo.'},
  {cat:'Romântico',text:'Porque a nossa história é a minha preferida de todas.'},
  {cat:'Romântico',text:'Porque quando estamos juntos o tempo passa rápido demais — e eu quero mais.'},
  {cat:'Romântico',text:'Porque a pulseira que pusemos juntos é o símbolo perfeito de nós.'},
  {cat:'Romântico',text:'Porque és a razão de eu sorrir sem motivo aparente.'},
  {cat:'Romântico',text:'Porque a nossa cumplicidade não precisa de palavras para existir.'},
  // DIVERTIDOS
  {cat:'Divertido 😂',text:'Porque és a única pessoa com quem consigo ser completamente ridículo.'},
  {cat:'Divertido 😂',text:'Porque as tuas piadas são más o suficiente para serem boas.'},
  {cat:'Divertido 😂',text:'Porque quando estamos juntos, qualquer coisa se torna uma aventura épica.'},
  {cat:'Divertido 😂',text:'Porque tens uma capacidade impressionante de fazer drama do nada... e adoro isso.'},
  {cat:'Divertido 😂',text:'Porque podes transformar uma ida às compras num reality show.'},
  {cat:'Divertido 😂',text:'Porque o teu caos organizado é fascinante de observar.'},
  {cat:'Divertido 😂',text:'Porque tens opiniões muito fortes sobre coisas que não importam nada, e é hilariante.'},
  {cat:'Divertido 😂',text:'Porque fazes as melhores caras de escândalo do mundo.'},
  {cat:'Divertido 😂',text:'Porque a nossa energia combinada deveria ser estudada pela ciência.'},
  {cat:'Divertido 😂',text:'Porque consegues arrastar-me para qualquer ideia com 3 palavras.'},
  {cat:'Divertido 😂',text:'Porque es capaz de fazer qualquer situação estranha parecer normal.'},
  {cat:'Divertido 😂',text:'Porque o teu nível de entusiasmo para coisas aleatórias é inspirador.'},
  {cat:'Divertido 😂',text:'Porque te rias das minhas piadas mesmo quando são horríveis.'},
  {cat:'Divertido 😂',text:'Porque és o tipo de pessoa que torna qualquer fila de espera divertida.'},
  {cat:'Divertido 😂',text:'Porque o teu processo de tomada de decisão é um espetáculo que vale muito.'},
  // MEMÓRIAS
  {cat:'Memória 💫',text:'Porque a primeira vez que te vi, soube que ia ser diferente.'},
  {cat:'Memória 💫',text:'Porque o Neonia foi mais bonito por causa de ti ao meu lado.'},
  {cat:'Memória 💫',text:'Porque a praia em fevereiro provou que contigo até o frio é bom.'},
  {cat:'Memória 💫',text:'Porque as luzes de natal ficaram mais brilhantes com os teus olhos a refletir.'},
  {cat:'Memória 💫',text:'Porque a exposição de LEGO foi a prova de que contigo tudo é interessante.'},
  {cat:'Memória 💫',text:'Porque o teu aniversário foi o dia que mais queria acertar em tudo.'},
  {cat:'Memória 💫',text:'Porque o Museu dos 5 Sentidos foi mais sensorial com os meus sentidos todos em ti.'},
  {cat:'Memória 💫',text:'Porque a tarde na Foz com o Atlântico à frente foi uma das mais bonitas da minha vida.'},
  {cat:'Memória 💫',text:'Porque as pulseiras permanentes são o símbolo certo para o que sinto.'},
  {cat:'Memória 💫',text:'Porque o Dia dos Namorados contigo foi o primeiro que realmente fez sentido.'},
  {cat:'Memória 💫',text:'Porque o primeiro dia de namoro, o 31 de outubro, ficou gravado para sempre.'},
  {cat:'Memória 💫',text:'Porque o nosso ano novo foi o melhor ponto de partida possível para 2025.'},
  {cat:'Memória 💫',text:'Porque cada aventura contigo vira automaticamente uma memória favorita.'},
  {cat:'Memória 💫',text:'Porque o primeiro encontro, dia 24 de outubro, foi o dia que tudo mudou.'},
  {cat:'Memória 💫',text:'Porque cada sítio que visitámos juntos ficou melhor na memória do que na realidade.'},
  // QUALIDADES
  {cat:'És Especial ⭐',text:'Porque tens uma empatia que faz toda a gente à tua volta sentir-se bem.'},
  {cat:'És Especial ⭐',text:'Porque a tua inteligência é uma das coisas que mais me atrai em ti.'},
  {cat:'És Especial ⭐',text:'Porque és autêntica de uma forma que é rara e preciosa.'},
  {cat:'És Especial ⭐',text:'Porque o teu coração é grande o suficiente para toda a gente que amas.'},
  {cat:'És Especial ⭐',text:'Porque tens uma force tranquila que me inspira todos os dias.'},
  {cat:'És Especial ⭐',text:'Porque a forma como te importas com as pessoas à tua volta diz muito de ti.'},
  {cat:'És Especial ⭐',text:'Porque és bonita de uma forma que não precisa de confirmação.'},
  {cat:'És Especial ⭐',text:'Porque tens valores que admiro genuinamente.'},
  {cat:'És Especial ⭐',text:'Porque a tua curiosidade pelo mundo é contagiante.'},
  {cat:'És Especial ⭐',text:'Porque és a pessoa mais interessante que conheço.'},
  {cat:'És Especial ⭐',text:'Porque tens uma elegância natural em tudo o que fazes.'},
  {cat:'És Especial ⭐',text:'Porque és forte quando precisas ser e terna quando importa.'},
  {cat:'És Especial ⭐',text:'Porque a tua criatividade em coisas simples é extraordinária.'},
  {cat:'És Especial ⭐',text:'Porque não tens medo de ser exatamente quem és.'},
  {cat:'És Especial ⭐',text:'Porque tens uma luz que não se apaga mesmo nos dias difíceis.'},
  // DETALHES DO DIA A DIA
  {cat:'Detalhes 🌸',text:'Porque me envias coisas aleatórias que sabes que eu vou gostar.'},
  {cat:'Detalhes 🌸',text:'Porque te lembras das pequenas coisas que mencionei sem pensar.'},
  {cat:'Detalhes 🌸',text:'Porque a forma como dizes o meu nome é diferente de todas as outras.'},
  {cat:'Detalhes 🌸',text:'Porque quando estás bem, irradias uma energia que contagia tudo ao redor.'},
  {cat:'Detalhes 🌸',text:'Porque o teu cheiro é o meu perfume favorito do mundo, sem contestação.'},
  {cat:'Detalhes 🌸',text:'Porque quando dormes és a coisa mais bonita que já vi.'},
  {cat:'Detalhes 🌸',text:'Porque o barulho que fazes quando estás contente por dentro é adorável.'},
  {cat:'Detalhes 🌸',text:'Porque fazes de propósito caras para me fazer rir.'},
  {cat:'Detalhes 🌸',text:'Porque os teus gestos são sempre genuínos, nunca calculados.'},
  {cat:'Detalhes 🌸',text:'Porque quando acreditas em algo, acreditas com tudo.'},
  {cat:'Detalhes 🌸',text:'Porque a tua dedicação ao que amas é uma das coisas mais lindas em ti.'},
  {cat:'Detalhes 🌸',text:'Porque tens uma risada que preenche qualquer espaço do bom jeito.'},
  {cat:'Detalhes 🌸',text:'Porque és a única pessoa cuja opinião me interessa de verdade.'},
  {cat:'Detalhes 🌸',text:'Porque quando estás animada é impossível não ficar animado também.'},
  {cat:'Detalhes 🌸',text:'Porque a forma como cuidas das pessoas que amas é inspiradora.'},
  // FUTURO
  {cat:'Futuro 🌙',text:'Porque quero fazer mais aventuras contigo — muitas mais.'},
  {cat:'Futuro 🌙',text:'Porque cada mês contigo faz-me querer o próximo ainda mais.'},
  {cat:'Futuro 🌙',text:'Porque pensar no futuro contigo não dá ansiedade, dá vontade.'},
  {cat:'Futuro 🌙',text:'Porque a nossa bucket list é o projeto de que mais gosto.'},
  {cat:'Futuro 🌙',text:'Porque há lugares que só fazem sentido ver contigo.'},
  {cat:'Futuro 🌙',text:'Porque a ideia de novos aniversários contigo é uma das melhores que tenho.'},
  {cat:'Futuro 🌙',text:'Porque contigo o futuro parece uma promessa e não uma incógnita.'},
  {cat:'Futuro 🌙',text:'Porque cada fase da vida parece melhor se for contigo.'},
  {cat:'Futuro 🌙',text:'Porque ainda temos tantos "primeiros" para viver juntos.'},
  {cat:'Futuro 🌙',text:'Porque o melhor capítulo da nossa história ainda não foi escrito.'},
  // MIX EXTRAS
  {cat:'Romântico',text:'Porque nunca me sinto tão eu mesmo quanto quando estou contigo.'},
  {cat:'Romântico',text:'Porque sou claramente melhor pessoa por te ter na minha vida.'},
  {cat:'Romântico',text:'Porque o amor que sinto por ti ainda me surpreende pela intensidade.'},
  {cat:'Romântico',text:'Porque serias a primeira pessoa que escolhia para uma ilha deserta.'},
  {cat:'Romântico',text:'Porque és o tipo de pessoa que aparece uma vez na vida, se tiver sorte.'},
  {cat:'Romântico',text:'Porque me fazes feliz de formas que não sabia que existiam.'},
  {cat:'Romântico',text:'Porque o coração acelera sempre que apareces — cinco meses depois e continua igual.'},
  {cat:'Divertido 😂',text:'Porque a nossa câmara fotográfica tem mais fotos nossas ridículas do que bonitas. E prefiro assim.'},
  {cat:'Divertido 😂',text:'Porque somos a definição de "caos organizado" e funciona na perfeição.'},
  {cat:'Divertido 😂',text:'Porque as nossas discussões sobre coisas sem importância são entretenimento de qualidade.'},
  {cat:'Divertido 😂',text:'Porque consegues convencer-me de qualquer coisa com aquele olhar específico.'},
  {cat:'Divertido 😂',text:'Porque quando estamos juntos, os planos são apenas sugestões.'},
  {cat:'Divertido 😂',text:'Porque tens talentos completamente inúteis que me fascinam imenso.'},
  {cat:'És Especial ⭐',text:'Porque cada vez que conto a alguém como és, fico surpreendido de novo por te ter.'},
  {cat:'És Especial ⭐',text:'Porque tens a qualidade rara de fazer toda a gente sentir bem-vinda.'},
  {cat:'És Especial ⭐',text:'Porque a tua honestidade, mesmo quando dói um bocadinho, é um regalo.'},
  {cat:'És Especial ⭐',text:'Porque cresceste de formas que admiro sem nunca perderes quem és.'},
  {cat:'Detalhes 🌸',text:'Porque a forma como dizes "boa noite" é a melhor forma de acabar o dia.'},
  {cat:'Detalhes 🌸',text:'Porque quando partilhas algo contigo é porque confias, e eu honro isso.'},
  {cat:'Detalhes 🌸',text:'Porque a tua energia muda o ambiente de qualquer divisão onde entras.'},
  {cat:'Detalhes 🌸',text:'Porque és a primeira pessoa com quem quero partilhar qualquer novidade.'},
  {cat:'Memória 💫',text:'Porque cada sítio que visitámos juntos ficou marcado com a nossa memória.'},
  {cat:'Memória 💫',text:'Porque o teu riso durante as nossas aventuras é a trilha sonora que escolhia.'},
  {cat:'Futuro 🌙',text:'Porque já estou ansioso pelas memórias que ainda não criámos.'},
  {cat:'Futuro 🌙',text:'Porque quando imagino daqui a anos, estás sempre no meio da imagem.'},
  {cat:'Futuro 🌙',text:'Porque quero conhecer todas as versões de ti que ainda estão por vir.'},
  {cat:'Romântico',text:'Porque quando estou contigo até o banal se torna especial.'},
  {cat:'Romântico',text:'Porque me ensinaste que o amor é confortável, não difícil.'},
  {cat:'Romântico',text:'Porque passado cinco meses, sinto-me cada vez mais feliz por termos começado.'},
  {cat:'Romântico',text:'Porque és a minha resposta favorita para a pergunta "o que é que te faz feliz?".'},
  {cat:'Romântico',text:'Porque amo-te de um jeito que não existia antes de te conhecer.'},
  {cat:'Romântico',text:'Porque és, simplesmente, a minha pessoa favorita no mundo. E isso diz tudo. 💕'},
  {cat:'Detalhes 🌸',text:'Porque o jeito como inclinas a cabeça quando pensas é irresistível.'},
  {cat:'Divertido 😂',text:'Porque as tuas reações a spoilers são sempre cinematográficas.'},
  {cat:'Romântico',text:'Porque ficas mais bonita quanto mais te conheço.'},
  {cat:'Detalhes 🌸',text:'Porque os teus textos de manhã são o meu café preferido.'},
  {cat:'Memória 💫',text:'Porque quando estava frio na praia e ficámos assim mesmo, foi perfeito.'},
  {cat:'Romântico',text:'Porque a tua imperfeição é parte do que te torna perfeita para mim.'},
  {cat:'Futuro 🌙',text:'Porque há músicas que ainda não ouvimos juntos e já estou ansioso.'},
  {cat:'Divertido 😂',text:'Porque consegis tornar qualquer espera numa conversa épica.'},
  {cat:'És Especial ⭐',text:'Porque tens uma coragem discreta que só os que te conhecem bem conseguem ver.'},
  {cat:'Romântico',text:'Porque cada vez que estou mal e precisas, estás. E isso vale o mundo.'},
  {cat:'Detalhes 🌸',text:'Porque o teu entusiasmo por coisas que amas é belo de testemunhar.'},
  {cat:'Memória 💫',text:'Porque o Museu dos 5 Sentidos ficou com 6 — o sexto eras tu.'},
  {cat:'Romântico',text:'Porque mesmo nos dias normais, tornas tudo memorável.'},
  {cat:'Futuro 🌙',text:'Porque ainda há tantos concertos, exposições e aventuras para vivermos juntos.'},
  {cat:'Romântico',text:'Porque o amor que sinto por ti é o tipo que faz as pessoas escreverem músicas.'},
  {cat:'Divertido 😂',text:'Porque as tuas análises de filmes são sempre melhores que os filmes.'},
  {cat:'Romântico',text:'Porque és o motivo pelo qual acredito que as histórias de amor existem mesmo.'},
  {cat:'Romântico',text:'Porque te escolhia todos os dias, de novo, sem hesitar.'},
];

while(motivos.length < 150){
  motivos.push({cat:'Romântico',text:`Motivo #${motivos.length+1}: porque existes e isso já é suficiente. 💕`});
}

let mIdx = -1;
document.addEventListener("DOMContentLoaded", () => {
    const mTotal = document.getElementById('m-total');
    if (mTotal) mTotal.textContent = motivos.length;
});

function nextMotivo(){
  mIdx = (mIdx+1) % motivos.length;
  showMotivo(mIdx);
}
function shuffleMotivo(){
  mIdx = Math.floor(Math.random()*motivos.length);
  showMotivo(mIdx);
}
function showMotivo(i){
  const m = motivos[i];
  const el = document.getElementById('m-text');
  el.style.opacity='0';
  setTimeout(()=>{
    el.textContent = m.text;
    el.style.opacity='1';
    el.classList.remove('motivo-fade-in');
    void el.offsetWidth;
    el.classList.add('motivo-fade-in');
    document.getElementById('m-cat').textContent = m.cat;
    document.getElementById('m-num').textContent = '#'+(i+1);
    document.getElementById('m-cur').textContent = i+1;
    document.getElementById('m-fill').style.width = ((i+1)/motivos.length*100)+'%';
  },150);
}

/* ============================================================
   RASPADINHA
   ============================================================ */
const coupons = [
  {icon:'💆',text:'Vale uma massagem de 20 minutos',sub:'quando quiseres!'},
  {icon:'🍕',text:'Vale uma pizza especial feita por mim',sub:'com ingredientes à tua escolha'},
  {icon:'🎬',text:'Vale uma noite de cinema em casa',sub:'tu escolhes o filme, eu faço a pipoca'},
  {icon:'🚗',text:'Vale uma road trip surpresa',sub:'destino secreto escolhido por mim'},
  {icon:'🌹',text:'Vale um jantar romântico surpresa',sub:'eu trato de tudo, tu apareces bonita'},
  {icon:'📸',text:'Vale uma sessão fotográfica',sub:'só nós dois, num sítio bonito'},
  {icon:'🎵',text:'Vale uma playlist personalizada',sub:'só com músicas que me lembram ti'},
  {icon:'☕',text:'Vale pequeno-almoço na cama',sub:'da tua escolha, servido por mim'},
];

let scratchCoupons = [...coupons];
let currentCoupon = null;
let isScratchDone = false;
window.scratchInitDone = false; // ensure we know when it initialized

function initScratch(){
  const canvas = document.getElementById('scratch-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=300, H=160;

  const idx = Math.floor(Math.random()*scratchCoupons.length);
  currentCoupon = scratchCoupons[idx];
  isScratchDone = false;
  document.getElementById('rasp-text').style.display='none';

  const under = document.getElementById('scratch-under');
  under.innerHTML = `<span style="font-size:3rem;display:block;margin-bottom:8px;">${currentCoupon.icon}</span><span style="font-family:'Playfair Display',serif;font-weight:700;font-style:italic;color:var(--rose-l);text-align:center;">${currentCoupon.text}</span>`;

  // Draw hidden reward underneath
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0,0,W,H);

  // Silver overlay
  ctx.save();
  ctx.fillStyle = '#b0b8c8';
  ctx.roundRect(0,0,W,H,12);
  ctx.fill();

  // Silver texture
  for(let i=0;i<W;i+=4){
    ctx.fillStyle = `rgba(${180+Math.random()*30},${185+Math.random()*30},${200+Math.random()*30},0.4)`;
    ctx.fillRect(i,0,2,H);
  }

  // Scratch text on silver
  ctx.fillStyle = 'rgba(90,100,120,0.6)';
  ctx.font = 'bold 16px Lato, sans-serif';
  ctx.textAlign='center';
  ctx.fillText('✦ RASPA AQUI ✦', W/2, H/2-6);
  ctx.font='12px Lato';
  ctx.fillText('🎫 Cupão de Amor 🎫', W/2, H/2+14);
  ctx.restore();

  // Destination image on separate canvas layer (drawn below)
  canvas.dataset.prize = JSON.stringify(currentCoupon);

  let painting = false;

  function getPos(e){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width/rect.width;
    const scaleY = canvas.height/rect.height;
    if(e.touches){
      return {x:(e.touches[0].clientX-rect.left)*scaleX, y:(e.touches[0].clientY-rect.top)*scaleY};
    }
    return {x:(e.clientX-rect.left)*scaleX, y:(e.clientY-rect.top)*scaleY};
  }

  // Handle old events if re-initializing
  canvas.onmousedown = e=>{ painting=true; };
  canvas.onmousemove = scratch;
  canvas.onmouseup = ()=>painting=false;
  canvas.onmouseleave = ()=>painting=false;
  canvas.ontouchstart = e=>{ painting=true; };
  canvas.ontouchmove = scratch;
  canvas.ontouchend = ()=>painting=false;

  function scratch(e){
    if(!painting) return;
    if(e.cancelable) e.preventDefault();
    const pos = getPos(e);
    ctx.globalCompositeOperation='destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 22, 0, Math.PI*2);
    ctx.fill();

    // check % revealed
    const data = ctx.getImageData(0,0,W,H).data;
    let transparent=0;
    for(let i=3;i<data.length;i+=4){ if(data[i]<128) transparent++; }
    const pct = transparent/(W*H);
    if(pct>0.55 && !isScratchDone){
      isScratchDone = true;
      ctx.clearRect(0,0,W,H);
      showScratchReward(currentCoupon);
    }
  }
}

function showScratchReward(c){
  const canvas = document.getElementById('scratch-canvas');
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation='source-over';
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const rt = document.getElementById('rasp-text');
  rt.textContent = `${c.icon} ${c.text}`;
  rt.style.display='block';

  // Draw standard text over canvas as well
  ctx.fillStyle='#1a0a12';
  ctx.fillRect(0,0,300,160);
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--rose-l')||'#f4a0b0';
  ctx.font='bold 14px Dancing Script, cursive';
  ctx.textAlign='center';
  ctx.fillText('🎫 Vai à lista de cupões! 🎫',150,80);

  // Add to list
  addCoupon(c);
  launchConfetti();
  toast('🎉 Cupão ganho! Vai à lista de cupões!');
}

function resetScratch(){
  initScratch();
  document.getElementById('rasp-text').style.display='none';
}

function addCoupon(c){
  const list = document.getElementById('coupon-list');
  const el = document.createElement('div');
  el.className='coupon-item';
  el.innerHTML=`<span class="coupon-icon">${c.icon}</span><div class="coupon-text">${c.text}<small>${c.sub}</small></div>`;
  el.onclick=()=>{ el.classList.toggle('used'); };
  list.appendChild(el);
}

function buildCouponList(){
  const list = document.getElementById('coupon-list');
  if(!list) return;
  // show initial coupons in list as locked
  coupons.slice(0,3).forEach(c=>{
    const el = document.createElement('div');
    el.className='coupon-item';
    el.style.opacity='.3';
    el.innerHTML=`<span class="coupon-icon">🔒</span><div class="coupon-text">Raspa para desbloquear este cupão<small>volta à raspadinha!</small></div>`;
    list.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
    buildCouponList();
});

/* ============================================================
   MAPA
   ============================================================ */
const places = [
  {emoji:'🍂',name:'Primeiro Encontro',date:'24 Out 2024',desc:'O primeiro encontro que mudou tudo. Aconteceu em outubro e o resto da história conheces.',color:'#ff7043',badge:'O início', imgSrc:'img/mapa_01_primeiro_encontro.jpg'},
  {emoji:'🎃',name:'Início do Namoro',date:'31 Out 2024',desc:'O dia em que dissemos "sim" a ser um nós. O melhor Halloween de sempre.',color:'#ffa000',badge:'O nosso dia', imgSrc:'img/mapa_02_inicio_namoro.jpg'},
  {emoji:'🌈',name:'Museu Neonia',date:'15 Nov 2024',desc:'Uma tarde cheia de néon, cores e muito sorriso. O museu mais instagramável com a pessoa mais bonita.',color:'#00897b', imgSrc:'img/mapa_03_neonia.jpg'},
  {emoji:'🎄',name:'Luzes de Natal',date:'19 Nov 2024',desc:'O Natal chegou cedo este ano, iluminado pela melhor companhia do mundo.',color:'#c62828', imgSrc:'img/mapa_04_luzes_natal.jpg'},
  {emoji:'🎂',name:'Aniversário',date:'4 Dez 2024',desc:'O teu aniversário — o dia em que o mundo ganhou a sua pessoa mais especial.',color:'#7b1fa2',badge:'⭐ especial', imgSrc:'img/mapa_05_aniversario.jpg'},
  {emoji:'🎆',name:'Ano Novo',date:'31 Dez 2024',desc:'2025 começou da melhor forma possível: contigo do meu lado.',color:'#1565c0', imgSrc:'img/mapa_06_ano_novo.jpg'},
  {emoji:'🧱',name:'Expo LEGO',date:'31 Jan 2025',desc:'Mundos construídos peça a peça — exatamente como nós.',color:'#f57f17', imgSrc:'img/mapa_07_expo_lego.jpg'},
  {emoji:'💝',name:'Dia dos Namorados',date:'14 Fev 2025',desc:'O dia mais clichê do ano e ainda assim o mais especial. Porque era contigo.',color:'#c62828',badge:'💕', imgSrc:'img/mapa_08_dia_namorados.jpg'},
  {emoji:'🌊',name:'Praia',date:'21 Fev 2025',desc:'O mar em fevereiro, o frio, e a melhor companhia. Não precisávamos de mais nada.',color:'#0277bd', imgSrc:'img/mapa_09_praia.jpg'},
  {emoji:'🎭',name:'Museu 5 Sentidos',date:'28 Fev 2025',desc:'Cinco sentidos não chegaram para descrever o que sinto. O sexto és tu.',color:'#6a1b9a', imgSrc:'img/mapa_10_5_sentidos.jpg'},
  {emoji:'⚓',name:'Pulseiras Permanentes',date:'28 Mar 2025',desc:'Um laço que não se tira. Como nós.',color:'#c0435a',badge:'permanente 💕', imgSrc:'img/mapa_11_pulseiras.jpg'},
  {emoji:'🌅',name:'Tarde na Foz',date:'28 Mar 2025',desc:'O Atlântico à nossa frente e tudo o que importa ao meu lado.',color:'#1976d2', imgSrc:'img/mapa_12_tarde_foz.jpg'},
];

document.addEventListener("DOMContentLoaded", () => {
    const mapaGrid = document.getElementById('mapa-grid');
    if (mapaGrid) {
        places.forEach((p,i)=>{
          const el = document.createElement('div');
          el.className='place-card';
          el.style.setProperty('--c',p.color);
          el.innerHTML=`
            ${p.badge?`<div class="place-badge">${p.badge}</div>`:''}
            <span class="place-emoji">${p.emoji}</span>
            <div class="place-name">${p.name}</div>
            <div class="place-date">${p.date}</div>
          `;
          el.onclick=()=>openModal(p);
          mapaGrid.appendChild(el);
        });
    }
});

function openModal(p){
  document.getElementById('pm-emoji').textContent=p.emoji;
  document.getElementById('pm-name').textContent=p.name;
  document.getElementById('pm-date').textContent=p.date;
  document.getElementById('pm-desc').textContent=p.desc;
  
  const imgEL = document.getElementById('pm-img');
  if (p.imgSrc) {
    imgEL.src = p.imgSrc;
    imgEL.style.display = 'block';
  } else {
    imgEL.style.display = 'none';
  }

  document.getElementById('place-modal').classList.add('open');
}
function closeModal(e){
  if(!e || e.target===document.getElementById('place-modal')){
    document.getElementById('place-modal').classList.remove('open');
  }
}

/* ============================================================
   COFRE
   ============================================================ */
const COFRE_PASSWORD = 'ESTAÇÃO DE GAIA';
function openCofre(){
  const val = document.getElementById('cofre-input').value.trim().toUpperCase();
  const err = document.getElementById('cofre-error');
  const letter = document.getElementById('cofre-letter');
  if(val===COFRE_PASSWORD){
    err.style.display='none';
    document.getElementById('cofre-icon').textContent='💌';
    letter.style.display='block';
    letter.scrollIntoView({behavior:'smooth',block:'center'});
    launchConfetti();
  } else {
    err.style.display='block';
    err.style.animation='none';
    setTimeout(()=>err.style.animation='shake .4s ease',10);
    document.getElementById('cofre-icon').textContent='🔒';
  }
}

/* ============================================================
   POLAROIDS
   ============================================================ */
const polaroidData = [
  {emoji:'🍂',bg:'linear-gradient(135deg,#ff9966,#ff5e62)',caption:'O dia que começou tudo — 24 out',r:-3},
  {emoji:'🎃',bg:'linear-gradient(135deg,#f7971e,#ffd200)',caption:'Halloween & nós 🎃 31 out',r:2},
  {emoji:'🌈',bg:'linear-gradient(135deg,#11998e,#38ef7d)',caption:'Neonia 💚 15 nov',r:-1.5},
  {emoji:'🎄',bg:'linear-gradient(135deg,#2d6a4f,#c0392b)',caption:'Luzes de Natal ✨ 19 nov',r:3},
  {emoji:'🎂',bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)',caption:'O teu aniversário 🎂 4 dez',r:-2},
  {emoji:'🎆',bg:'linear-gradient(135deg,#232526,#ffd700)',caption:'Ano Novo 💫 31 dez',r:1.5},
  {emoji:'🧱',bg:'linear-gradient(135deg,#f7971e,#ffd200)',caption:'Expo LEGO 🧱 31 jan',r:-3.5},
  {emoji:'💝',bg:'linear-gradient(135deg,#e96c6c,#f4a0b0)',caption:'Dia dos Namorados 💝 14 fev',r:2.5},
  {emoji:'🌊',bg:'linear-gradient(135deg,#56ccf2,#f7c59f)',caption:'Praia de inverno 🌊 21 fev',r:-1},
  {emoji:'🎭',bg:'linear-gradient(135deg,#8e44ad,#3498db)',caption:'5 Sentidos 🎭 28 fev',r:3.5},
  {emoji:'⚓',bg:'linear-gradient(135deg,#c44d63,#d4a853)',caption:'Pulseiras permanentes ⚓ 28 mar',r:-2.5},
  {emoji:'🌅',bg:'linear-gradient(135deg,#2980b9,#6dd5fa)',caption:'Tarde na Foz 🌅 28 mar',r:1},
];

document.addEventListener("DOMContentLoaded", () => {
    const polGrid = document.getElementById('polaroids-grid');
    if (polGrid) {
        polaroidData.forEach(p=>{
          const el = document.createElement('div');
          el.className='polaroid';
          el.style.setProperty('--r',p.r+'deg');
          el.innerHTML=`<div class="polaroid-img" style="background:${p.bg}">${p.emoji}</div><p class="polaroid-caption">${p.caption}</p>`;
          polGrid.appendChild(el);
        });
    }
});

/* ============================================================
   BUCKET LIST
   ============================================================ */
const bucketData = [
  {cat:'🌍 Viagens',items:[
    {done:false,emoji:'✈️',text:'Viajar para fora de Portugal juntos'},
    {done:false,emoji:'🏔️',text:'Ver neve juntos'},
    {done:false,emoji:'🌅',text:'Ver o nascer do sol num lugar especial'},
    {done:false,emoji:'🚂',text:'Fazer uma viagem de comboio longa'},
    {done:false,emoji:'🏝️',text:'Ir a uma ilha portuguesa'},
  ]},
  {cat:'🎭 Experiências',items:[
    {done:false,emoji:'🎵',text:'Ir a um concerto juntos'},
    {done:false,emoji:'🎠',text:'Ir a um parque de diversões'},
    {done:false,emoji:'🎭',text:'Ver uma peça de teatro ou musical'},
    {done:false,emoji:'🎪',text:'Ir a um festival de música'},
    {done:true,emoji:'🌈',text:'Visitar um museu interativo (Neonia ✓)'},
    {done:true,emoji:'🧱',text:'Ver uma exposição especial (LEGO ✓)'},
  ]},
  {cat:'🍽️ Gastronomia',items:[
    {done:false,emoji:'🍱',text:'Ir a um restaurante japonês autêntico'},
    {done:false,emoji:'🍷',text:'Fazer um jantar romântico especial'},
    {done:false,emoji:'🥐',text:'Ir a um brunch num café bonito'},
    {done:false,emoji:'🍦',text:'Descobrir a melhor gelada do Porto'},
  ]},
  {cat:'💕 Nós',items:[
    {done:true,emoji:'⚓',text:'Pulseiras permanentes (feito! 28/3 ✓)'},
    {done:false,emoji:'📷',text:'Fazer uma sessão fotográfica juntos'},
    {done:false,emoji:'🌙',text:'Passar uma noite numa casa diferente'},
    {done:false,emoji:'⭐',text:'Escrever uma carta um ao outro para abrir daqui a 1 ano'},
    {done:false,emoji:'🎁',text:'Fazer uma surpresa épica um ao outro'},
  ]},
];

let bDone=0, bTotal=0;

document.addEventListener("DOMContentLoaded", () => {
    const bucketList = document.getElementById('bucket-list');
    if (bucketList) {
        bucketData.forEach(cat=>{
          const section = document.createElement('div');
          section.className='bucket-category';
          section.innerHTML=`<div class="bucket-cat-title">${cat.cat}</div>`;
          cat.items.forEach((item,i)=>{
            bTotal++;
            if(item.done) bDone++;
            const el = document.createElement('div');
            el.className='bucket-item'+(item.done?' done':'');
            el.innerHTML=`<div class="bucket-checkbox">${item.done?'✓':''}</div><span class="bucket-emoji">${item.emoji}</span><span class="bucket-text">${item.text}</span>`;
            el.onclick=()=>toggleBucket(el);
            section.appendChild(el);
          });
          bucketList.appendChild(section);
        });

        const bDoneEl = document.getElementById('b-done');
        if (bDoneEl) bDoneEl.textContent=bDone;
        const bTotalEl = document.getElementById('b-total');
        if (bTotalEl) bTotalEl.textContent=bTotal;
        const bPctEl = document.getElementById('b-pct');
        if (bPctEl) bPctEl.textContent=Math.round(bDone/bTotal*100)+'%';
    }
});

function updateBucketStats(){
  const items = document.querySelectorAll('.bucket-item');
  let done=0;
  items.forEach(el=>{ if(el.classList.contains('done')) done++; });
  document.getElementById('b-done').textContent=done;
  document.getElementById('b-total').textContent=items.length;
  document.getElementById('b-pct').textContent=Math.round(done/items.length*100)+'%';
}
function toggleBucket(el){
  el.classList.toggle('done');
  const cb = el.querySelector('.bucket-checkbox');
  cb.textContent = el.classList.contains('done')?'✓':'';
  updateBucketStats();
  if(el.classList.contains('done')) toast('✅ Item concluído! 🎉');
}


/* ============================================================
   PUZZLE
   ============================================================ */
const correctSeq = [
  'Primeiro Encontro', 'Início do Namoro', 'Museu Neonia', 'Luzes de Natal', 
  'Aniversário', 'Ano Novo', 'Expo LEGO', 'Dia dos Namorados', 
  'Ida à Praia', 'Museu 5 Sentidos', 'Pulseiras Permanentes', 'Tarde na Foz'
];
let currentSeq = [...correctSeq];
let selIdx = null;
const PUZZLE_KEY = 'PISTA';

function renderPuzzle(){
  const grid = document.getElementById('puzzle-grid');
  grid.innerHTML='';
  currentSeq.forEach((txt,i)=>{
    const el = document.createElement('div');
    el.className='piece';
    if(txt===correctSeq[i]) el.classList.add('ok');
    if(selIdx===i) el.classList.add('sel');
    el.innerHTML=`${txt} <span class="piece-idx">${i+1}</span>`;
    el.addEventListener('click',()=>selectPiece(i));
    grid.appendChild(el);
  });
  updatePuzzleProgress();
}

function selectPiece(i){
  if(selIdx===null){ selIdx=i; }
  else {
    if(selIdx!==i){[currentSeq[selIdx],currentSeq[i]]=[currentSeq[i],currentSeq[selIdx]];}
    selIdx=null;
  }
  renderPuzzle();
}

function updatePuzzleProgress(){
  let ok=0;
  currentSeq.forEach((e,i)=>{ if(e===correctSeq[i]) ok++; });
  const pct=Math.round(ok/correctSeq.length*100);
  document.getElementById('puzzle-status').textContent=`${ok} de ${correctSeq.length} peças corretas`;
  document.getElementById('prog-fill').style.width=pct+'%';
}

function shufflePuzzle(){
  for(let i=currentSeq.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [currentSeq[i],currentSeq[j]]=[currentSeq[j],currentSeq[i]];
  }
  selIdx=null; renderPuzzle();
}

function checkPuzzle(){
  let ok=0;
  currentSeq.forEach((e,i)=>{ if(e===correctSeq[i]) ok++; });
  if(ok===correctSeq.length){
    launchConfetti();
    document.getElementById('puzzle-status').textContent='🎉 Puzzle completo! A chave é: '+PUZZLE_KEY;
    alert(`🎉 Parabéns, amor!\n\nCompletaste o puzzle!\n\nA chave para o baú é:\n\n✨ ${PUZZLE_KEY} ✨\n\nVai ao baú aqui em baixo! 🗝️`);
  } else {
    alert(`Quase! Tens ${ok} de ${correctSeq.length} peças certas. Continua! 💪`);
  }
}

function openBau(){
  const val=document.getElementById('bau-input').value.trim().toUpperCase();
  const err=document.getElementById('bau-error');
  const reward=document.getElementById('bau-reward');
  if(val===PUZZLE_KEY){
    err.style.display='none';
    document.getElementById('bau-icon').textContent='🎁';
    reward.style.display='block';
    reward.scrollIntoView({behavior:'smooth',block:'center'});
    launchConfetti();
  } else {
    err.style.display='block';
    err.style.animation='none';
    setTimeout(()=>err.style.animation='shake .4s ease',10);
  }
}

// Init puzzle on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    shufflePuzzle();
});

/* ============================================================
   CONFETTI
   ============================================================ */
function launchConfetti(){
  const colors=['#e8637a','#d4a853','#7ecfc0','#b09de0','#fbc2eb','#ffd700','#fff'];
  for(let i=0;i<70;i++){
    setTimeout(()=>{
      const el=document.createElement('div');
      el.className='conf';
      const sz=6+Math.random()*10;
      el.style.cssText=`left:${Math.random()*100}vw;top:-20px;width:${sz}px;height:${sz}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --d:${2+Math.random()*2}s;animation-delay:0s;
        transform:rotate(${Math.random()*360}deg);border-radius:${Math.random()>0.5?'50%':'2px'};`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),4000);
    },i*45);
  }
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer;
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
}
