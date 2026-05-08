import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, X, ArrowRight, ShieldCheck, FileText, FolderOpen, Video, Map, PenTool, TrendingUp, Users, Download, Star, Quote, Send, Loader2 } from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';

const CAROUSEL_IMAGES = [
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=600&q=80"
];

const FEEDBACKS = [
  { name: "Mariana S.", role: "Arquiteta Recém-formada", comment: "Ajudou a definir meu valor e parar de cobrar barato. Fechei meu primeiro projeto de verdade!", gender: "women" },
  { name: "João Pedro Silva", role: "Estudante (9º Período)", comment: "Me deu o passo a passo para não travar na hora de estruturar um projeto do zero.", gender: "men" },
  { name: "Camila Borges", role: "Designer de Interiores", comment: "Finalmente entendi a diferença entre o render bonito e a planta executável que não dá dor de cabeça na obra.", gender: "women" },
  { name: "Carlos Eduardo", role: "Estudante", comment: "A técnica de apresentação fechou meu primeiro grande contrato, concorrendo com escritórios maiores.", gender: "men" },
  { name: "Fernanda Costa", role: "Arquiteta", comment: "Me deu a confiança que a faculdade de 5 anos não deu. O módulo sobre clientes é absurdo!", gender: "women" },
  { name: "Rafael Mendes", role: "Arquiteto Autônomo", comment: "A estrutura de portfólio bônus me ajudou a sair da inércia e criar vergonha na cara para me mostrar ao mercado.", gender: "men" },
  { name: "Beatriz N.", role: "Recém-formada", comment: "Eu mal dormia com medo do primeiro cliente. O guia me trouxe clareza absoluta dos processos.", gender: "women" },
  { name: "Lucas Almeida", role: "Arquiteto", comment: "Sempre tive dificuldade com fornecedores. A inteligência de materiais do Guia mudou meu jogo.", gender: "men" },
  { name: "Juliana Castro", role: "Designer & Arquiteta", comment: "Recomendo para todo mundo no último ano. É a ponte que falta para o mundo real.", gender: "women" },
  { name: "Tiago Freitas", role: "Estagiário", comment: "Tirei dúvidas práticas que os arquitetos seniores do meu estágio não tinham tempo de ensinar.", gender: "men" },
  { name: "Amanda Rocha", role: "Arquiteta Junior", comment: "Organização era o meu ponto fraco. A estrutura de pastas me livrou de perder arquivos!", gender: "women" },
  { name: "Fernando Lima", role: "Engenheiro & Arquiteto", comment: "A análise de terreno me fez identificar um erro crítico antes da fundação. Já pagou o guia.", gender: "men" },
  { name: "Sofia Martins", role: "Interiores", comment: "Estava cobrando por metro quadrado torto. A planilha salvou minha lucratividade.", gender: "women" },
  { name: "Diego O.", role: "Recém-formado", comment: "O checklist é meu braço direito. Nem ligo o AutoCAD/Revit antes de revisar com ele.", gender: "men" },
  { name: "Carolina Viana", role: "Estudante", comment: "É o tapa na cara que a gente precisa para parar de focar só no 3D e entender a profissão.", gender: "women" },
  { name: "Bruno C.", role: "Arquiteto", comment: "Foi a transição mais rápida de 'recém-formado perdido' para 'profissional focado'.", gender: "men" },
  { name: "Letícia R.", role: "Estudante", comment: "Pedi estorno no dia 6 por medo e desisti no dia 7 ao aplicar a técnica e dar certo.", gender: "women" },
  { name: "Gabriel S.", role: "Designer", comment: "Como explicar valor no primeiro contato tira todo o peso da palavra 'vender'.", gender: "men" },
  { name: "Natália Alves", role: "Autônoma", comment: "Comecei meu escritório com coragem, tudo graças às rotinas ensinadas.", gender: "women" },
  { name: "Thiago M.", role: "Arquiteto Executivo", comment: "Eu sabia modelar 3D, mas não sabia gerir clientes. Ensina a parte que dá lucro.", gender: "men" },
  { name: "Isabela T.", role: "Estudante (8º Período)", comment: "Já estou montando meu portfólio do jeito certo, sem erros amadores.", gender: "women" },
  { name: "Marcelo P.", role: "Arquiteto", comment: "Perfeito para quem sofre com insegurança técnica diante do cliente.", gender: "men" },
  { name: "Vanessa Moura", role: "Arquitetura & Interiores", comment: "Aprendi a justificar minhas escolhas de design. O cliente parou de pechinchar.", gender: "women" },
  { name: "André Farias", role: "Estudante", comment: "Linguagem claríssima, sem encheção de linguiça, direto e reto.", gender: "men" },
  { name: "Laura Azevedo", role: "Designer", comment: "Fechei minha primeira reforma seguindo a risca o modelo de contrato e proposta.", gender: "women" },
  { name: "Ricardo Gomes", role: "Recém-formado", comment: "Material de consulta de mesa. Não guardo no fundo do HD, uso toda semana.", gender: "men" },
  { name: "Monique B.", role: "Arquiteta", comment: "Quando empaco na criatividade ou no fluxo, abro a estrutura do guia.", gender: "women" },
  { name: "Paulo Henrique", role: "Recém-formado", comment: "Acabou meu pânico de fechar o primeiro valor.", gender: "men" },
  { name: "Clara Guedes", role: "Paisagista", comment: "Incrível! Muito focado na realidade e não em ilusões do Pinterest.", gender: "women" },
  { name: "Renan Dias", role: "Final de curso", comment: "Até meu TCC ficou mais enxuto porque ele ensina você ser direto!", gender: "men" },
];

const DraggableCarousel = ({ children, reverse = false, speed = 1 }: { children: React.ReactNode; reverse?: boolean; speed?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const isPaused = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationId: number;
    
    // Ensure starting position for reverse
    if (reverse && container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 2;
    }
    
    const scroll = () => {
      if (!isDragging.current && !isPaused.current) {
        container.scrollLeft += reverse ? -speed : speed;
        
        const halfWidth = container.scrollWidth / 2;
        
        if (!reverse && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (reverse && container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [reverse, speed]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - containerRef.current!.offsetLeft;
    scrollLeft.current = containerRef.current!.scrollLeft;
  };

  const onMouseUp = () => { 
    isDragging.current = false; 
    if (!hasDragged.current) {
      isPaused.current = false;
    } else {
      isPaused.current = true;
    }
  };
  
  const onMouseLeave = () => { 
    isDragging.current = false; 
    if (hasDragged.current) {
      isPaused.current = true;
    }
  };
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    hasDragged.current = true;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current!.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.touches[0].pageX - containerRef.current!.offsetLeft;
    scrollLeft.current = containerRef.current!.scrollLeft;
  };
  
  const onTouchEnd = () => { 
    isDragging.current = false; 
    if (!hasDragged.current) {
      isPaused.current = false;
    } else {
      isPaused.current = true;
    }
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    hasDragged.current = true;
    const x = e.touches[0].pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current!.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto select-none cursor-grab active:cursor-grabbing w-full"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      {children}
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call for lead capture
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Lead captured:", formData);
    setIsSubmitting(false);
    setIsModalOpen(false);
    
    // Redirecting to checkout after capture
    window.location.href = "https://checkout.exemplo.com.br/guia-pratico"; 
  };

  const BuyButton = ({ label = 'Quero me tornar arquiteto de verdade' }) => (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B] shadow-[0_0_20px_rgba(212,175,55,0.4)] px-8 py-5 sm:px-10 sm:py-6 rounded-full text-base sm:text-lg w-full md:w-auto flex items-center justify-center gap-3 mx-auto mt-8 font-black cursor-pointer text-[#111]"
      onClick={() => setIsModalOpen(true)}
    >
      <Download size={24} className="text-[#111]" />
      {label}
      <ArrowRight size={24} className="text-[#111]" />
    </motion.button>
  );

  return (
    <div ref={containerRef} className="bg-grid min-h-screen relative font-sans text-[#E0E0E0] selection:bg-[#D4AF37] selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505]"></div>
          <div className="absolute inset-0 flex justify-center items-center opacity-20">
          <svg width="800" height="800" viewBox="0 0 100 100" className="w-[120vw] max-w-none md:w-[80vw] mx-auto text-[#D4AF37] stroke-current fill-transparent opacity-30" strokeWidth="0.2">
            <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
            <path d="M50 10 L50 90" />
            <path d="M10 30 L90 70" />
            <path d="M10 70 L90 30" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.1" strokeDasharray="1 1"/>
          </svg>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-0" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F0F0F]/80 text-[#D4AF37] font-semibold text-sm mb-8 border border-[#D4AF37]/30 backdrop-blur-sm shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold drop-shadow-md">A ponte entre teoria e prática</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] gold-text">
              Você não foi preparado para a <br/> <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">vida real</span> da arquitetura.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-3xl mx-auto mb-12 leading-relaxed">
              Descubra o método prático que transforma estudantes perdidos em arquitetos preparados para projetos reais.
            </p>

            <BuyButton />
            <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto mt-8"></div>
          </motion.div>
        </div>
      </section>

      {/* --- CARROSSEL INFINITO --- */}
      <section className="py-8 md:py-12 bg-[#000000] border-b border-[#D4AF37]/10 overflow-hidden relative z-10">
        <p className="text-[#D4AF37] font-mono text-[8px] md:text-[10px] text-center uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-6 md:mb-8 px-4">Aplicável a qualquer escala e tipo de projeto arquitetônico</p>
        <div className="flex overflow-hidden w-full relative">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#000] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#000] to-transparent z-20 pointer-events-none"></div>
          <DraggableCarousel speed={1}>
            <div className="flex w-max shrink-0">
               {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((src, i) => (
                 <div key={i} className="w-48 h-32 md:w-80 md:h-56 shrink-0 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/5 relative group mr-4 md:mr-6">
                    <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
                    <img src={src} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" alt="Projeto referência" />
                 </div>
               ))}
            </div>
          </DraggableCarousel>
        </div>
      </section>

      {/* --- DOR / IDENTIFICAÇÃO --- */}
      <section className="py-24 px-4 relative z-10 bg-[#050505]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-text">Se você se identificou com isso, você não está sozinho:</h2>
                <p className="text-gray-300 text-lg">Milhares de estudantes e recém-formados passam pelas exatas mesmas frustrações todos os dias.</p>
              </div>

              <div className="panel-3d p-8 md:p-10">
                <ul className="space-y-6">
                  {[
                    "Não sabe por onde começar um projeto real do zero",
                    "Nunca lidou diretamente com um cliente exigente",
                    "Não entende profundamente sobre custos de obra e orçamentos",
                    "Sabe fazer projetos bonitos na tela, mas tem dúvidas se são funcionais ou executáveis",
                    "Se sente totalmente inseguro para entrar ou competir no mercado de trabalho"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="mt-1 bg-red-900/30 p-1.5 rounded-full shrink-0 border border-red-500/30">
                        <X size={20} className="text-red-500" />
                      </div>
                      <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative h-[600px] hidden lg:block rounded-3xl overflow-hidden panel-3d p-2">
              <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay z-10 pointer-events-none"></div>
              <img 
                src="https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" 
                alt="Arquiteto trabalhando em planta baixa" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- QUEBRA DE CRENÇA --- */}
      <section className="py-24 bg-[#0F0F0F] border-y border-white/5 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none rounded-full"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight gold-text">
            A verdade é simples: <br/>
            <span className="text-[#F4D03F]/80">A faculdade te ensina a apresentar projetos... Mas não te ensina a executar no mundo real.</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            E é exatamente por isso que criamos O Guia Prático do Arquiteto.
          </p>
        </div>
      </section>

      {/* --- APRESENTAÇÃO DO PRODUTO & BENEFÍCIOS --- */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-4 block">A Solução Definitiva</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 gold-text">O Guia Prático do Arquiteto</h2>
            <p className="text-xl text-gray-300 mb-12">
              Um método direto e prático que ensina você a pensar, projetar e agir como um arquiteto profissional — mesmo sem ter experiência prévia.
            </p>
            
            <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden panel-3d p-2 mx-auto mb-16">
              <img 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80" 
                alt="Ambiente arquitetônico moderno" 
                className="w-full h-full object-cover rounded-2xl opacity-70 hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none rounded-2xl"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Map, title: "Análise de Terreno", desc: "Aprenda a analisar terrenos como um profissional, prevendo problemas antes mesmos de projetar." },
              { icon: PenTool, title: "Espaços Funcionais", desc: "Entenda como criar espaços que funcionam na vida das pessoas (não apenas fiquem bonitos na maquete 3D)." },
              { icon: Check, title: "Projetos Executáveis", desc: "Transforme grandes ideias criativas em projetos que podem realmente ser construídos dentro do orçamento." },
              { icon: FileText, title: "Inteligência de Materiais", desc: "Escolha materiais com inteligência, unindo estética, custo-benefício e durabilidade." },
              { icon: FolderOpen, title: "Portfólio que Vende", desc: "Monte um portfólio estratégico que atrai a atenção dos clientes e escritórios certos." },
              { icon: Users, title: "Gestão de Clientes", desc: "Entenda como prospectar clientes, conduzir reuniões e cobrar corretamente pelo seu trabalho." }
            ].map((item, idx) => (
              <div key={idx} className="panel-3d p-8 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-[#111] mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_10px_rgba(212,175,55,0.3)]">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSFORMAÇÃO --- */}
      <section className="py-24 bg-black border-y border-[#D4AF37]/10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-16 gold-text">Onde você está hoje <span className="text-gray-600 font-light">vs</span> <span className="text-white">Onde você vai chegar</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="panel-3d pt-10 pb-8 px-8 md:pt-14 md:pb-12 md:px-12 relative border border-white/5 opacity-90 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"></div>
              <div className="flex justify-center mb-8 relative z-10">
                <div className="inline-block bg-gray-800 text-gray-300 font-bold uppercase tracking-widest text-[10px] px-6 py-2 rounded-full border border-white/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)]">Antes do Guia</div>
              </div>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-center gap-4"><X className="text-gray-500" /> <span className="text-xl text-gray-300">Totalmente Perdido</span></li>
                <li className="flex items-center gap-4"><X className="text-gray-500" /> <span className="text-xl text-gray-300">Inseguro para iniciar</span></li>
                <li className="flex items-center gap-4"><X className="text-gray-500" /> <span className="text-xl text-gray-300">Preso só na teoria</span></li>
                <li className="flex items-center gap-4"><X className="text-gray-500" /> <span className="text-xl text-gray-300">Sem clientes no radar</span></li>
              </ul>
            </div>

            <div className="panel-3d pt-10 pb-8 px-8 md:pt-14 md:pb-12 md:px-12 relative border border-[#D4AF37]/30 bg-gradient-to-b from-[#0F0F0F] to-[#050505] shadow-[0_0_30px_rgba(212,175,55,0.1)] overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"></div>
              <div className="flex justify-center mb-8 relative z-10">
                <div className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111] font-black uppercase tracking-widest text-[10px] px-6 py-2 rounded-full shadow-[0_4px_10px_rgba(212,175,55,0.4)]">Com o Guia</div>
              </div>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-center gap-4"><Check className="text-[#D4AF37]" strokeWidth={3} /> <span className="text-xl font-bold text-white">Confiante nos processos</span></li>
                <li className="flex items-center gap-4"><Check className="text-[#D4AF37]" strokeWidth={3} /> <span className="text-xl font-bold text-white">Extremamente Prático</span></li>
                <li className="flex items-center gap-4"><Check className="text-[#D4AF37]" strokeWidth={3} /> <span className="text-xl font-bold text-white">Preparado para a obra</span></li>
                <li className="flex items-center gap-4"><Check className="text-[#D4AF37]" strokeWidth={3} /> <span className="text-xl font-bold text-white">Procurado pelo mercado</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- VOZES RESSURRENTES (FEEDBACK) --- */}
      <section className="py-20 md:py-24 bg-[#050505] px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">Eles Já Estão no Mercado Real</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 gold-text">Aprovado por quem está na linha de frente</h2>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 relative w-full overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>
            <DraggableCarousel speed={1}>
              <div className="flex w-max shrink-0 items-stretch">
                {[...FEEDBACKS.slice(0, 15), ...FEEDBACKS.slice(0, 15)].map((fb, idx) => (
                  <div key={idx} className="w-[260px] sm:w-[300px] md:w-[400px] shrink-0 panel-3d p-4 md:p-6 relative border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between mr-4 md:mr-6">
                    <Quote className="absolute top-3 md:top-4 right-3 md:right-4 text-[#D4AF37]/20" size={24} md:size={32} />
                    <div className="flex gap-1 mb-3 md:mb-4 text-[#D4AF37]">
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm italic mb-4 md:mb-6 leading-relaxed relative z-10">
                      "{fb.comment}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 border-2 border-[#D4AF37]/30 flex justify-center items-center overflow-hidden shrink-0">
                        <img src={`https://randomuser.me/api/portraits/${fb.gender}/${(idx % 15) + 12}.jpg`} alt={fb.name} className="w-full h-full object-cover pointer-events-none" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs md:text-sm">{fb.name}</h4>
                        <p className="text-[8px] md:text-[10px] uppercase text-[#D4AF37]/80 tracking-wider font-mono">{fb.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DraggableCarousel>

            <DraggableCarousel speed={1} reverse>
              <div className="flex w-max shrink-0 items-stretch">
                {[...FEEDBACKS.slice(15, 30), ...FEEDBACKS.slice(15, 30)].map((fb, idx) => (
                  <div key={idx} className="w-[260px] sm:w-[300px] md:w-[400px] shrink-0 panel-3d p-4 md:p-6 relative border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between mr-4 md:mr-6">
                    <Quote className="absolute top-3 md:top-4 right-3 md:right-4 text-[#D4AF37]/20" size={24} md:size={32} />
                    <div className="flex gap-1 mb-3 md:mb-4 text-[#D4AF37]">
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                      <Star fill="currentColor" size={10} md:size={12} />
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm italic mb-4 md:mb-6 leading-relaxed relative z-10">
                      "{fb.comment}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 border-2 border-[#D4AF37]/30 flex justify-center items-center overflow-hidden shrink-0">
                        <img src={`https://randomuser.me/api/portraits/${fb.gender}/${(idx % 15) + 30}.jpg`} alt={fb.name} className="w-full h-full object-cover pointer-events-none" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs md:text-sm">{fb.name}</h4>
                        <p className="text-[8px] md:text-[10px] uppercase text-[#D4AF37]/80 tracking-wider font-mono">{fb.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DraggableCarousel>
          </div>

          <div className="w-full flex justify-center mt-10 md:mt-12 bg-gradient-to-t from-[#050505] to-transparent pt-12 md:pt-20 relative z-20">
             <BuyButton label="Quero fazer parte disso" />
          </div>
        </div>
      </section>

      {/* --- BÔNUS --- */}
      <section className="py-24 px-4 relative z-10 bg-[#0F0F0F] border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 gold-text">Garantindo hoje, você leva bônus extras:</h2>
            <p className="text-gray-300 text-lg">Ferramentas essenciais exclusivas para acelerar ainda mais os seus resultados.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="panel-3d p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold flex items-center justify-center mb-4 bg-black/50 shadow-[inset_0_0_10px_rgba(212,175,55,0.2)]">1</div>
              <h3 className="font-bold text-lg mb-2 text-white">Checklist de Projeto</h3>
              <p className="text-gray-500 text-sm">Nunca mais esqueça uma etapa crítica do projeto arquitetônico.</p>
            </div>
            <div className="panel-3d p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold flex items-center justify-center mb-4 bg-black/50 shadow-[inset_0_0_10px_rgba(212,175,55,0.2)]">2</div>
              <h3 className="font-bold text-lg mb-2 text-white">Estrutura de Portfólio</h3>
              <p className="text-gray-500 text-sm">Modelos organizados de estruturas validadas prontas para você preencher.</p>
            </div>
            <div className="panel-3d p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold flex items-center justify-center mb-4 bg-black/50 shadow-[inset_0_0_10px_rgba(212,175,55,0.2)]">3</div>
              <h3 className="font-bold text-lg mb-2 text-white">Organização do Acervo</h3>
              <p className="text-gray-500 text-sm">O método profissional para gerenciar pastas e arquivos sem perder sua cabeça.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OFERTA, GARANTIA E URGÊNCIA --- */}
      <section className="py-24 px-4 bg-black/50 backdrop-blur-sm relative border-t border-[#D4AF37]/10">
        <div className="container mx-auto max-w-3xl">
          <div className="panel-3d p-8 md:p-12 text-center relative overflow-hidden border border-[#D4AF37]/40">
             
             {/* Badge */}
             <div className="absolute top-6 -right-12 bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-12 py-2 rotate-45 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                OFERTA ÚNICA
             </div>

             <h2 className="text-3xl md:text-5xl font-black mb-2 text-white">Não perca o acesso</h2>
             <p className="text-[#D4AF37]/80 mb-8 font-mono text-sm uppercase tracking-widest">Atenção: Oferta esgotando em breve</p>

             <div className="mb-8">
               <p className="text-gray-600 line-through text-xl font-medium mb-1">De: R$ 175,98</p>
               <div className="text-6xl md:text-7xl font-mono font-black text-gold-gradient tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                 R$ 29,90
               </div>
               <div className="inline-block border border-green-500/30 bg-green-900/20 text-green-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                 Desconto aplicado de 83%
               </div>
             </div>

             <CountdownTimer />

             <BuyButton />

             <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-left bg-black/40 p-6 rounded-2xl border border-white/5">
               <ShieldCheck size={48} className="text-[#D4AF37] shrink-0" />
               <div>
                 <h4 className="font-bold text-white mb-1">Garantia Incondicional de 7 Dias</h4>
                 <p className="text-sm text-gray-300 leading-relaxed">Confio tanto no método que, se não gostar, devolvemos 100% do seu dinheiro. Zero dor de cabeça.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-[#050505] border-t border-[#0F0F0F] text-center">
        <div className="container mx-auto px-6">
          <div className="text-2xl font-black mb-4 tracking-tighter text-white gold-text">
            GUIA PRÁTICO DO <span className="text-[#D4AF37]">ARQUITETO</span>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto text-[10px] uppercase tracking-widest mb-8">
            Este site não é afiliado ao Facebook. A responsabilidade é exclusiva do produtor.
          </p>
          <p className="text-gray-700 text-xs font-mono">
            &copy; 2026 Guia Prático do Arquiteto. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* --- LEAD CAPTURE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0F0F0F] border border-[#D4AF37]/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B]" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-black mb-3 gold-text">Quase lá!</h3>
                <p className="text-gray-400">Preencha seus dados para garantir seu Guia Prático com 83% de desconto.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Seu nome aqui..."
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">E-mail para Acesso</label>
                  <input 
                    required
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">WhatsApp</label>
                  <input 
                    required
                    type="tel" 
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#111] font-black py-5 rounded-xl mt-4 flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin text-[#111]" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="text-[#111]" />
                      GARANTIR MEU ACESSO AGORA
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <ShieldCheck size={16} className="text-[#D4AF37]" />
                Seus dados estão 100% seguros
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
