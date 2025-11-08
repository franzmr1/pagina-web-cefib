'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Clock, X, ChevronRight, ChevronLeft, CheckCircle, Target, Users, TrendingUp, BookOpen, Heart, Monitor, Briefcase, Flame, GraduationCap, ArrowUp, Sun, Moon, Facebook, Instagram, MapPin, ChevronDown, FileText, Award, Lightbulb } from 'lucide-react';

// Datos de profesionales
const PROFESIONALES = [
  {
    id: 1,
    nombre: 'Yuleisi Macalupu',
    especialidad: 'Especialista Gestión de Seguridad',
    descripcion: 'Ingeniera ambiental, experiencia en la implementación y auditoría de sistemas de gestión bajo normas ISO (9001, 14001, 45001, entre otras). Actualmente cursa una Maestría en Gerencia Empresarial en la Universidad Nacional de Piura. Ha trabajado como Consultor Senior, Auditor Líder y Jefe de Seguridad y Medio Ambiente en Perú y México, liderando proyectos de certificación y gestionando riesgos laborales en diversas industrias. Además, es docente y asesora en sistemas de gestión y seguridad industrial, destacándose por su capacidad para formar profesionales y mejorar procesos organizacionales.',
    foto: '/profesionales/yuleisi.jpg'
  },
  {
    id: 2,
    nombre: 'Dennis Paredes',
    especialidad: 'Especialista Gestión Pública',
    descripcion: 'Ingeniero de sistemas colegiado con más de 15 años de experiencia en sectores público y privado. Posee una maestría y un doctorado en Gestión Pública y Gobernabilidad. Ha trabajado en diversas instituciones como municipalidades, unidades de gestión educativa, y gerencias regionales de educación, además de universidades y empresas de capacitación. Es especialista en gestión de programas y presupuesto por resultados, gestión por procesos e inteligencia de negocios, especialmente en el sector educativo y gubernamental. Actualmente, es Coordinador Regional de Compromisos de Gestión en el MINEDU y el FED MIDIS, y se desempeña como docente investigador universitario en cursos relacionados con gestión, innovación tecnológica y programación por resultados. Además, es miembro del Comité Científico de la Conferencia Internacional sobre Información de 2024-2025.',
    foto: '/profesionales/dennis.jpg'
  },
  {
    id: 3,
    nombre: 'Liliana Perez',
    especialidad: 'Especialista Gestión Pedagógica',
    descripcion: 'Se desenvolvió como Especialista Pedagógico Regional Dirección de Formación Docente en Servicio (DIFODS – MINEDU), capacitador docente en Temas de Gestión Escolar y Liderazgo Pedagógico, Evaluación Formativa en El CNEB en la UNT, capacitador en la UGEL Virú en temas de Refuerzo Escolar - Gestión Escolar, Dversificación Curricular con Enfoque Intercultural; así mismo se desempeñó acompañante pedagógico primaria polidocente completa en la UGEL N° 01 El Porvenir,UGEL Virú, es Docente Nombrada con más de 25 años de experiencia en aula, actualmente se desempeña como docente en el nivel primaria e integrante del Equipo técnico nivel primaria polidocente UGEL Virú.',
    foto: '/profesionales/liliana.jpg'
  },
  {
    id: 4,
    nombre: 'Daniel Alva',
    especialidad: 'Especialista en Investigación',
    descripcion: 'Ingeniero de Sistemas, docente y analista de datos con experiencia en análisis de datos para el banco de la nacion, MEF, Servir y Migraciones y ademas en el desarrollo de software web (full stack) y escritorio ,así como de soluciones tecnológicas.He participado en los proyectos de desarrollo tecnológico para el Minedu y la Onpe ,Hermes , Southern Peru,San Fernando.',
    foto: '/profesionales/daniel.jpg'
  },
  {
    id: 5,
    nombre: 'Edith Pérez',
    especialidad: 'Especialista Gestión Pública',
    descripcion: 'Profesional altamente capacitada y experimentada en los campos de la gestión pública, la educación y la salud comunitaria. Su liderazgo y habilidades interpersonales la posicionan como un valioso activo para cualquier organización dedicada al desarrollo social y educativo.',
    foto: '/profesionales/edith.jpg'
  },
  {
    id: 6,
    nombre: 'Juan Uceda',
    especialidad: 'Especialista Metodología de la Investigación',
    descripcion: 'Con 15 años de experiencia en Educación Básica Regular y Universitaria, he trabajado en prestigiosas instituciones públicas y privadas, impartiendo cursos de Didáctica de la Matemática, Didáctica de las Ciencias Sociales y Metodología de la Investigación. Me formé en el Instituto Superior Pedagógico Público Indoamérica de Trujillo y la Universidad Privada Antenor Orrego. Actualmente, laboro en la Universidad César Vallejo en Acreditación y Licenciamiento, garantizando la calidad educativa y liderando procesos de mejora continua en la Escuela de Medicina. Además, como capacitador en herramientas virtuales, diseño y dicto talleres sobre la integración tecnológica en el aula.',
    foto: '/profesionales/juan.jpg'
  }
];

// Datos completos de temarios por servicio
const TEMARIOS_SERVICIOS = {
  1: [
    'Gestión de proyectos con énfasis en resultados',
    'ABC de los planes y planificación estratégica, con enfoque aplicativo',
    'Documentos de gestión con énfasis a resultados',
    'La nueva gestión de documentos de gestión',
    'Redacción de documentos administrativos en la GP',
    'Trámite documentario y gestión de archivos',
    'Formulación y evaluación de proyectos de impacto',
    'Gestión y administración de proyectos',
    'Introducción a la formulación de proyectos de innovación y desarrollo',
    'Gestión y dirección de proyectos en el PMBOK',
    'Formulación de proyectos de IA con énfasis a resultados',
    'Formulación, preparación y evaluación de proyectos con impacto a resultados',
    'Tesis de pre grado, como documento de gestión que aporta valor',
    'Tesis de post grado, como documento de gestión que aporta valor',
    'Normas de citación (APA, Harvard, ISO 9000, Vancouver)',
    'Redacción de tesis y trabajos de investigación',
    'Estadística aplicada a la tesis de investigación',
    'Estadística con SPSS para proyecto de tesis con énfasis a resultados',
    'Estadística para la investigación'
  ],
  2: [
    'Gestión pública en la salud',
    'Medicina física y rehabilitación post quirúrgica neuro traumatología y pediátrica',
    'Emergencias neonatales y pediátricas',
    'Terapéutica médica',
    'Emergencia toxicológica y reacciones adversas medicamentosas',
    'Primeros auxilios e inyectables',
    'Emergencias y trauma shock',
    'Medicina interna e infectología',
    'Farmacología clínica aplicada',
    'Atención de calidad en los servicios médicos',
    'Salud ocupacional y bioseguridad en establecimiento de salud',
    'Laboratorio clínico en la práctica médica',
    'Auditoría médica',
    'Emergencias obstétricas y pediátricas',
    'Enfermedades infecciosas a través de transfusión sanguínea',
    'Interpretación y diagnóstico por imágenes en emergencia',
    'Cuidados intensivos neonatales',
    'Estimulación e intervención temprana',
    'Emergencias respiratoria - atención del paciente crítico',
    'Ecografía especializada en obstetricia',
    'El adulto mayor en sala de emergencia',
    'Calidad y seguridad del paciente',
    'Fortalecimiento competencias básicas para médicos del primer nivel de atención',
    'Nutrición clínica aplicada',
    'Medicina complementaria centrada en la persona y basada en evidencia',
    'Inteligencia artificial aplicada a la práctica clínica',
    'Principios de la salud digital para profesionales sanitarios',
    'Introducción a la metodología de investigación para profesionales sanitarios',
    'Principios generales de la calidad asistencial',
    'Riesgos biológicos en el entorno hospitalario',
    'Principios de la investigación en ciencias de la salud',
    'Humanización del cuidado en el entorno hospitalario',
    'Introducción a la gestión sanitaria',
    'Principios de la humanización de la asistencia sanitaria',
    'Acoso laboral en el entorno sanitario',
    'Actualización en urgencias pediátricas para enfermería',
    'Implementación del proceso de seguridad y salud en el trabajo en las entidades públicas',
    'Alimentación saludable durante el tratamiento de radioterapia'
  ],
  3: [
    'La Nueva Gestión Pública en el contexto de la Modernización del estado',
    'Gerencia Estratégica en la administración pública',
    'Gobierno Electrónico y Gestión Digital',
    'Gobierno y gestión de la tecnología de la información',
    'Innovación y Desarrollo en la Gestión Pública',
    'Comunicación Estratégica para el Sector Público',
    'Habilidades Directivas en el Sector público',
    'Calidad de atención al Ciudadano en el Sector Público',
    'Prevención y resolución de conflictos',
    'Gestión de Recursos Humanos y la Ley del Servicio Civil',
    'Planeamiento Estratégico en la Gestión Pública',
    'Gestión por Procesos',
    'Gestión de Presupuesto Público por Resultados',
    'Gestión de Contrataciones del Estado por Resultados',
    'Gestión de la Inversión Pública bajo INVIERTE.PE',
    'SIAF (Presupuestal, Administrativo, Tesorería, Contable)',
    'SIGA (Implementación, Patrimonial, Abastecimiento)',
    'SEACE (Contrataciones del Estado)',
    'Sistema Nacional de Control y la Ética Pública',
    'Control Gubernamental y Enfoque Anticorrupción'
  ],
  4: [
    'Competencias digitales: IA aplicado a la educación',
    'Ofimática para educación orientada a resultados',
    'Capacitación de nombramiento docente con impacto educativo',
    'Capacitación de ascenso de escala magisterial',
    'Aplicación de los desempeños en los instrumentos de evaluación',
    'Acompañamiento y monitoreo pedagógico',
    'Proyectos de innovación educativa',
    'Gestión de la planificación curricular',
    'Gestión escolar con liderazgo pedagógico',
    'Estadística orientada a la investigación educativa',
    'Convivencia escolar y aprendizaje socioemocional',
    'Comunicación afectiva en aula',
    'Manejo de la salud mental en el trabajo tutorial',
    'Desarrollo de competencias socioemocionales',
    'Educación financiera e innovación',
    'Enfoque por competencias en la EBR, EBE, EBA',
    'Gestión y dirección de instituciones educativas',
    'Didáctica del idioma inglés, quechua',
    'Gestión de la educación inicial',
    'Gestión de la educación primaria',
    'Gestión de la educación secundaria',
    'Gestión de la educación física',
    'Proceso de enseñanza aprendizaje en la educación técnica sincrónica y asincrónica',
    'Evaluación de los aprendizajes desde un enfoque formativo en la educación básica',
    'Neurociencia para el futuro y liderazgo del docente',
    'Metodologías activas para el aprendizaje en la "nueva escuela"',
    'Coaching ontológico educativo como impacto en aula',
    'Administración de la educación',
    'Desarrollo de competencias gerenciales educativas',
    'La psicomotricidad y el desarrollo integral del niño',
    'Fundamentos de la gestión curricular',
    'Estrategias para el desarrollo del pensamiento crítico y creativo',
    'Entornos virtuales de aprendizaje, en la formación inicial docente',
    'Actualización docente en la educación superior pedagógica y tecnológica',
    'Actualización de educación básica especial e inclusiva',
    'Gestión de procesos pedagógicos y su aplicación',
    'Habilidades directivas y gestión del talento educativo',
    'Actualización para auxiliares de nivel inicial',
    'Estratégica didáctica de apoyo al rol de auxiliares',
    'Atención a la diversidad y educación inclusiva',
    'Planificación - implementación de proyectos de aprendizaje para alcanzar las competencias',
    'Mediación, animación y promoción de la lectura'
  ],
  5: [
    'Competencias digitales: IA aplicado a soluciones tecnológicas',
    'Programación web front end y back end orientado a resultados',
    'Ethical hacking y ciberseguridad',
    'Desarrollo de aplicaciones empresariales',
    'Aplicaciones móviles para Android e iOS',
    'Fundamentos de bases de datos',
    'CSS gestión de contenidos de alto impacto',
    'Gestión y auditoría de sistemas de la información',
    'JavaScript lenguaje ágil y dinámico',
    'Fundamento de Python orientado a inteligencia artificial',
    'Tecnología de las comunicaciones TICs',
    'Probabilidad y estadística soporte de gestión de documentos informáticos',
    'Software diseño gráfico digital con IA',
    'Marketing digital',
    'Negocios digitales como impacto en la gestión de proyectos informáticos',
    'Power BI - análisis de impacto de datos',
    'Gestión ágil de proyectos innovadores',
    'Administración de servidores',
    'Big data como eje transformador de la información',
    'Informática y desarrollo de aplicaciones web',
    'Excel financiero para la gestión de proyectos',
    'Dashboards en Excel',
    'Power Point: presentaciones efectivas de impacto',
    'WordPress para no desarrolladores',
    'Excel para emprendedores de gestión de datos',
    'Gestión de base de datos con SQL',
    'Machine learning con enfoque a resultados',
    'Transformación digital en entorno de gestión',
    'Gestión de la innovación',
    'Transformación de la cultura organizacional y digital mindset',
    'Ofimática operativa con énfasis a resultados de gestión',
    'Asistente en tecnología de la información para gerencia',
    'Gerencia de proyectos de tecnologías de información',
    'Taller de PETI planificación estratégica de TI',
    'Tecnologías de la información y la comunicación en la gestión pública',
    'Networking - CCNA con impacto en resultados',
    'Competencia en habilidades en administración de la información',
    'Datos e inteligencia artificial para líderes gerenciales de TICs',
    'Diseño e implementación de base de datos con Microsoft SQL Server'
  ],
  6: [
    'Gestión estratégica minera',
    'Gestión de operaciones mineras',
    'Gestión ambiental en minería',
    'Gestión en seguridad minera',
    'Habilidades blandas y control de conflictos en minería',
    'Derecho minero',
    'Perisología ambiental y gestión de estudios ambientales para proyectos en los subsectores minería',
    'Geometalurgia aplicada a minerales de oro y plata',
    'Hidrogeología minera avanzada',
    'Procesamiento de minerales y balance de aguas en minería',
    'Logística minera',
    'Gestión de mantenimiento minero',
    'Geomecánica minera avanzada',
    'Geología económica',
    'Valorización económica de yacimientos y empresas',
    'Geoestadística aplicada a la estimación y evaluación de yacimientos mineros',
    'Geomecánica para minera subterránea',
    'Modelización y análisis de estabilidad de taludes',
    'Modelización numérica con Plaxis 3D',
    'Aplicaciones hidrológicas con QGIS',
    'ArcGIS aplicado a la exploración geológica',
    'AutoCAD 2024 en geología y minería',
    'Costos y presupuestos para minería',
    'Perforación y voladura en minería subterránea',
    'Perforación y voladura en minería superficial',
    'Planificación y diseño de minas',
    'Ventilación minera'
  ]
};

// Hook para detectar cuando un elemento es visible
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isVisible] as const;
}

// Hook para detectar dispositivo móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Componente para animar números
interface AnimatedNumberProps {
  end: string;
  duration?: number;
  isVisible: boolean;
}

function AnimatedNumber({ end, duration = 2000, isVisible }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const startValue = 0;
    const endValue = parseInt(end);

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * (endValue - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span>{count}{end.includes('+') ? '+' : ''}{end.includes('K') ? 'K' : ''}</span>;
}

export default function CEFIBWebsite() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [emailSubscribe, setEmailSubscribe] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [expandedProfesional, setExpandedProfesional] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const itemsPerPage = 10;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '51973594951';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const emailLink = 'mailto:informes@cefib.pe,educacion@cefib.pe';

  const heroSlides = [
    {
      title: 'IMPULSAMOS TU',
      subtitle: 'CARRERA PROFESIONAL',
      items: ['DIPLOMADOS Y ESPECIALIZACIONES', 'CURSOS A MEDIDA', 'IN HOUSE', 'PLANES Y PROYECTOS']
    }
  ];

  const serviciosDetallados = [
    {
      id: 1,
      titulo: 'Proyectos Y Planes',
      descripcion: 'Un plan está constituido por un conjunto de programas. Proyecto: Es un conjunto de actividades...',
      descripcionCompleta: 'Un plan está constituido por un conjunto de programas integrados que buscan alcanzar objetivos estratégicos. Un proyecto es un conjunto de actividades temporales, planificadas y coordinadas que se realizan para alcanzar un objetivo específico.',
      icon: <Briefcase className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      titulo: 'Salud',
      descripcion: 'En el preámbulo de la Constitución de la OMS se define el concepto de salud: «La salud es un estado...',
      descripcionCompleta: 'La salud es un estado de completo bienestar físico, mental y social, no solamente la ausencia de enfermedad. Nuestros programas especializados abarcan gestión hospitalaria, emergencias médicas, salud ocupacional y más.',
      icon: <Heart className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 3,
      titulo: 'Gestión Pública',
      descripcion: 'La Gestión Pública hace referencia a un campo en el que los líderes sirven a las comunidades para...',
      descripcionCompleta: 'La Gestión Pública se enfoca en el desarrollo de competencias para liderar y transformar instituciones del Estado. Incluye modernización del Estado, políticas públicas, presupuesto y más.',
      icon: <CheckCircle className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 4,
      titulo: 'Educación',
      descripcion: 'La educación es un derecho básico de todos los niños, niñas y adolescentes, que les proporciona...',
      descripcionCompleta: 'La educación es la base del desarrollo humano y social. Nuestros programas incluyen pedagogía moderna, diseño curricular, evaluación por competencias, neuroeducación y liderazgo pedagógico.',
      icon: <GraduationCap className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 5,
      titulo: 'Tecnología',
      descripcion: 'La tecnología es el conjunto de nociones y conocimientos científicos que el ser humano utiliza para...',
      descripcionCompleta: 'La tecnología impulsa la innovación y transformación digital. Nuestros programas abarcan transformación digital, ciberseguridad, cloud computing, inteligencia artificial y desarrollo de software.',
      icon: <Monitor className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 6,
      titulo: 'Energía Y Minería',
      descripcion: 'La minería es una actividad económica del sector primario cuando nos referimos a la extracción de...',
      descripcionCompleta: 'El sector energético y minero es fundamental para el desarrollo económico. Nuestros programas incluyen gestión minera sostenible, seguridad y salud ocupacional, gestión ambiental y operaciones mineras.',
      icon: <Flame className="w-12 h-12" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '368', label: 'Proyectos de éxito', icon: <Target className="w-8 h-8" /> },
    { number: '180', label: 'Actividades de medios', icon: <BookOpen className="w-8 h-8" /> },
    { number: '12', label: 'Staff Profesional', icon: <TrendingUp className="w-8 h-8" /> },
    { number: '26K', label: 'Clientes Satisfechos', icon: <Users className="w-8 h-8" /> }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = emailLink;
  };

  const handleSubscribeClick = () => {
    if (!emailSubscribe || emailSubscribe.trim() === '') {
      alert('Por favor ingresa un email válido.');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      alert('¡Gracias por suscribirte! Te mantendremos informado.');
      setEmailSubscribe('');
      setIsSubscribing(false);
    }, 600);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNextServicio = () => {
    if (selectedServicio && selectedServicio < 6) {
      setSelectedServicio(selectedServicio + 1);
      setCurrentPage(1);
    }
  };

  const handlePrevServicio = () => {
    if (selectedServicio && selectedServicio > 1) {
      setSelectedServicio(selectedServicio - 1);
      setCurrentPage(1);
    }
  };

  const toggleProfesional = (id: number) => {
    setExpandedProfesional(expandedProfesional === id ? null : id);
  };

  // Refs para animaciones
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [statsRef, statsVisible] = useIntersectionObserver();
  const [missionRef, missionVisible] = useIntersectionObserver();
  const [visionRef, visionVisible] = useIntersectionObserver();
  const [objectivesRef, objectivesVisible] = useIntersectionObserver();
  const [ctaRef, ctaVisible] = useIntersectionObserver();
  const [asesoramientoRef, asesoramientoVisible] = useIntersectionObserver();
  const [metodologiaRef, metodologiaVisible] = useIntersectionObserver();
  const [staffRef, staffVisible] = useIntersectionObserver();
  const [ubicacionRef, ubicacionVisible] = useIntersectionObserver();

  // Colores dinámicos
  const bgPrimary = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const bgSecondary = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const headerBg = isDarkMode ? 'bg-gray-900' : 'bg-white';

  // Paginación de temarios
  const getCurrentTemario = () => {
    if (!selectedServicio) return [];
    const temario = TEMARIOS_SERVICIOS[selectedServicio as keyof typeof TEMARIOS_SERVICIOS] || [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return temario.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = selectedServicio ? Math.ceil(TEMARIOS_SERVICIOS[selectedServicio as keyof typeof TEMARIOS_SERVICIOS].length / itemsPerPage) : 0;

  return (
    <div className={`min-h-screen ${bgPrimary} overflow-x-hidden transition-colors duration-300`}>
      {/* Top Bar Roja */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
              <span>973594951</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
              <span>962294240</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
              <span>informes@cefib.pe</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Horario: 08:00 am - 20:00 pm</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`${headerBg} shadow-md sticky top-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'py-2' : 'py-4'}`}>
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 transform hover:scale-105 transition-transform">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>CEFIB</div>
              <div className="text-xs text-red-500 font-semibold">TRAIN WIN LEADERS</div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Inicio', 'Servicios', 'Asesoramiento', 'Nosotros', 'Contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-all duration-300 relative group ${
                    activeSection === item.toLowerCase()
                      ? 'text-red-500'
                      : `${textPrimary} hover:text-red-500`
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left transition-transform duration-300 ${
                    activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'} hover:scale-110 transition-all`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-xl transform hover:scale-105"
              >
                CONTÁCTANOS
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
<section 
  id="inicio" 
  className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 overflow-hidden"
>
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
  </div>
  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center text-white">
      <h1 className="text-6xl font-bold mb-8 animate-fade-in-up">
        {heroSlides[0].title} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
          {heroSlides[0].subtitle}
        </span>
      </h1>
      <div className="max-w-2xl mx-auto space-y-3">
        {heroSlides[0].items.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center gap-3 text-lg"
          >
            <CheckCircle className="w-6 h-6 text-orange-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 inline-block">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-green-400 animate-pulse" />
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-700">973594951 / 962294240</div>
              <div className="text-sm text-gray-700">informes@cefib.pe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section ref={servicesRef} id="servicios" className={`py-20 ${bgSecondary}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${servicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-red-500 font-semibold mb-4">NUESTROS SERVICIOS</div>
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>PROGRAMAS DE CAPACITACIÓN</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosDetallados.map((servicio, index) => (
              <div
                key={servicio.id}
                className={`${cardBg} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform ${
                  servicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${servicio.color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform`}>
                    {servicio.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-4`}>{servicio.titulo}</h3>
                  <p className={`${textSecondary} mb-6`}>{servicio.descripcion}</p>
                  <button 
                    onClick={() => {
                      setSelectedServicio(servicio.id);
                      setCurrentPage(1);
                    }}
                    className="flex items-center gap-2 text-red-500 font-semibold hover:gap-4 transition-all"
                  >
                    Leer Más... <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Servicio con Temarios */}
      {selectedServicio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setSelectedServicio(null)}></div>
          <div className={`${cardBg} rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative z-10 animate-scale-in`}>
            <button
              onClick={() => setSelectedServicio(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              {/* Encabezado */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${serviciosDetallados.find(s => s.id === selectedServicio)?.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                  {serviciosDetallados.find(s => s.id === selectedServicio)?.icon}
                </div>
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-2`}>
                    {serviciosDetallados.find(s => s.id === selectedServicio)?.titulo}
                  </h2>
                  <p className={`${textSecondary} leading-relaxed`}>
                    {serviciosDetallados.find(s => s.id === selectedServicio)?.descripcionCompleta}
                  </p>
                </div>
              </div>

              {/* Temario de Servicios */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-2xl p-6 mb-6`}>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-4 flex items-center gap-2`}>
                  <CheckCircle className="w-6 h-6 text-red-500" />
                  Temario de Servicios
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {getCurrentTemario().map((tema, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className={`${textSecondary} text-sm`}>{tema}</span>
                    </div>
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'} transition-all`}
                    >
                      Anterior
                    </button>
                    <span className={textPrimary}>Página {currentPage} de {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'} transition-all`}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>

              {/* Navegación entre servicios */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevServicio}
                  disabled={selectedServicio === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full ${
                    selectedServicio === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  } transition-all transform hover:scale-105`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Consultar Ahora
                </button>

                <button
                  onClick={handleNextServicio}
                  disabled={selectedServicio === 6}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full ${
                    selectedServicio === 6
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  } transition-all transform hover:scale-105`}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Banner */}
      <section ref={ctaRef} className="py-16 bg-gradient-to-r from-red-500 to-pink-500">
        <div className={`container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 transform transition-all duration-1000 ${ctaVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-3xl font-bold text-white">
            Reta tu futuro potenciando tu presente, Gestiona, Lidera e Impacta
          </h2>
          <button
            onClick={handleWhatsAppClick}
            className="bg-white text-red-500 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-110"
          >
            Contáctanos
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`text-center transform transition-all duration-1000 hover:scale-110 ${
                  statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedNumber end={stat.number} isVisible={statsVisible} />+
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nueva Sección: Asesoramiento de Investigación */}
      <section ref={asesoramientoRef} id="asesoramiento" className={`py-20 ${bgPrimary}`}>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${asesoramientoVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white">
                <FileText className="w-10 h-10" />
              </div>
            </div>
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-4`}>
              Asesoramiento de Investigación
            </h2>
            <p className={`${textSecondary} text-lg max-w-3xl mx-auto`}>
              Somos consultores académicos líderes en el campo del asesoramiento de documentos de investigación, con un alto grado de responsabilidad y profesionalismo.
            </p>
          </div>

          {/* Servicios de Asesoramiento */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'} rounded-3xl p-8 md:p-12 mb-12 transform transition-all duration-1000 ${asesoramientoVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-8 text-center`}>
              Servicios de Asesoramiento
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', text: 'Planes y Proyectos' },
                { num: '02', text: 'Monografías' },
                { num: '03', text: 'Ensayos' },
                { num: '04', text: 'Tesis de Pre Grado' },
                { num: '05', text: 'Tesis de Maestría' },
                { num: '06', text: 'Tesis Doctoral' },
                { num: '07', text: 'Resolución de Similitud' },
                { num: '08', text: 'Publicación de Artículos Científicos' }
              ].map((servicio, idx) => (
                <div
                  key={idx}
                  className={`${cardBg} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${isDarkMode ? 'border-gray-700' : 'border-orange-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {servicio.num}
                    </div>
                    <p className={`${textPrimary} font-semibold`}>{servicio.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metodología y Staff de Asesores */}
          <div ref={metodologiaRef} className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Metodología */}
            <div className={`${cardBg} rounded-2xl p-8 shadow-xl transform transition-all duration-1000 hover:scale-105 ${metodologiaVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${textPrimary}`}>Metodología</h3>
              </div>
              <p className={`${textSecondary} leading-relaxed`}>
                Ayudamos a nuestros clientes a desarrollar metodologías de investigación sólidas y apropiadas para sus proyectos, garantizando la claridad, coherencia y precisión del trabajo académico.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
              >
                Consultar Metodología
              </button>
            </div>

            {/* Staff de Asesores */}
            <div className={`${cardBg} rounded-2xl p-8 shadow-xl transform transition-all duration-1000 hover:scale-105 ${metodologiaVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${textPrimary}`}>Staff de Asesores</h3>
              </div>
              <p className={`${textSecondary} leading-relaxed`}>
                Nuestro equipo de asesores de investigación está compuesto por profesionales de alto nivel académico con amplia experiencia en asesoramiento de documentos de investigación.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Solicitar Asesoría
              </button>
            </div>
          </div>

          {/* Staff de Profesionales */}
          <div ref={staffRef} className={`transform transition-all duration-1000 ${staffVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-4`}>
                Staff de Profesionales
              </h2>
              <p className={`${textSecondary} text-lg max-w-3xl mx-auto`}>
                CEFIB se dedica a la capacitación y formación profesional de individuos y organizaciones, ofreciendo programas de alta calidad y un equipo de expertos comprometidos con el desarrollo profesional de nuestros clientes.
              </p>
            </div>

            <div className="space-y-4">
              {PROFESIONALES.map((profesional, idx) => (
                <div
                  key={profesional.id}
                  className={`${cardBg} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <button
                    onClick={() => toggleProfesional(profesional.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-opacity-90 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                        {profesional.id}
                      </div>
                      <div className="text-left">
                        <h3 className={`text-2xl font-bold ${textPrimary} mb-1`}>
                          {profesional.nombre}
                        </h3>
                        <p className="text-orange-500 font-semibold">
                          {profesional.especialidad}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 ${textPrimary} transition-transform duration-300 ${
                        expandedProfesional === profesional.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedProfesional === profesional.id && (
                    <div className={`px-6 pb-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} animate-fade-in`}>
                      <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {/* Foto del profesional */}
                        <div className="md:col-span-1">
                          <div className="w-full h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl shadow-lg flex items-center justify-center">
                            <Users className="w-24 h-24 text-white opacity-50" />
                          </div>
                        </div>
                        {/* Descripción */}
                        <div className="md:col-span-2">
                          <p className={`${textSecondary} leading-relaxed text-justify`}>
                            {profesional.descripcion}
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className={`py-20 ${bgSecondary}`}>
        <div className="container mx-auto px-6 space-y-20">
          <div className="text-center mb-12">
            <div className="text-red-500 font-semibold mb-4">CEFIB TRAIN WIN LEADERS</div>
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>QUIÉNES SOMOS</h2>
          </div>

          {/* Misión */}
          <div ref={missionRef} className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${missionVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h3 className="text-3xl font-bold text-red-500 mb-4">Misión</h3>
              <div className={`text-xl font-semibold ${textPrimary} mb-4`}>CEFIB Train Win Leaders</div>
              <p className={`${textSecondary} leading-relaxed`}>
                Fortalecer el rendimiento de las personas, organizaciones e instituciones mediante el conocimiento, aprendizaje y desarrollo de habilidades efectivas.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all"
              >
                Contáctenos
        </button>
      </div>
      <div className={`transform transition-all duration-1000 ${missionVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
        <div className="w-full h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl shadow-lg"></div>
      </div>
    </div>

    {/* Visión */}
    <div ref={visionRef} className="grid md:grid-cols-2 gap-12 items-center">
      <div className={`transform transition-all duration-1000 ${visionVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
        <div className="w-full h-80 bg-gradient-to-br from-pink-200 to-red-200 rounded-2xl shadow-lg"></div>
      </div>
      <div className={`transform transition-all duration-1000 ${visionVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
        <h3 className="text-3xl font-bold text-red-500 mb-4">Visión</h3>
        <div className={`text-xl font-semibold ${textPrimary} mb-4`}>Líderes del futuro</div>
        <p className={`${textSecondary} leading-relaxed`}>
          Ser líderes en el desarrollo y formación competitiva de personas y organizaciones, manteniendo el ritmo de la evolución y liderando en un mundo competitivo y en constante cambio.
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all"
        >
          Conoce Más
        </button>
      </div>
    </div>

    {/* Objetivos Estratégicos */}
    <div ref={objectivesRef} className={`${cardBg} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${objectivesVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 text-center">
        <h3 className="text-4xl font-bold text-white mb-2">Objetivos Estratégicos</h3>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto mt-4"></div>
      </div>
      <div className="p-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h4 className={`text-xl font-bold ${textPrimary} mb-2`}>Programas de Alta Calidad</h4>
                <p className={textSecondary}>
                  Desarrollar e implementar programas de alta calidad y competitividad, donde el cliente valore y ejecute eficientemente contenidos actualizados, prácticos y con un enfoque aplicativo a resultados.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h4 className={`text-xl font-bold ${textPrimary} mb-2`}>Equipos Multidisciplinarios</h4>
                <p className={textSecondary}>
                  Consolidar equipos multidisciplinarios inteligentes y talentosos que desarrollen capacidades y competencias aplicables en sus actividades y tareas para el logro de sus metas.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Únete a Nuestra Visión
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Sección de Ubicación */}
<section ref={ubicacionRef} id="ubicacion" className={`py-20 ${bgPrimary}`}>
  <div className="container mx-auto px-6">
    <div className={`text-center mb-12 transform transition-all duration-1000 ${ubicacionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white">
          <MapPin className="w-10 h-10" />
        </div>
      </div>
      <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'} mb-4`}>
        ¿Cómo Llegar?
      </h2>
      <p className={`${textSecondary} text-lg`}>
        Visítanos en nuestra oficina principal
      </p>
    </div>

    <div className={`grid md:grid-cols-2 gap-8 transform transition-all duration-1000 ${ubicacionVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      {/* Información de Ubicación */}
      <div className={`${cardBg} rounded-2xl p-8 shadow-xl`}>
        <h3 className={`text-2xl font-bold ${textPrimary} mb-6`}>Nuestra Dirección</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className={`${textPrimary} font-semibold`}>Dirección</p>
              <p className={textSecondary}>MZA. S LOTE. 9 URB. COVICORTI</p>
              <p className={textSecondary}>Trujillo, Perú</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className={`${textPrimary} font-semibold`}>Teléfonos</p>
              <p className={textSecondary}>973594951 / 962294240</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className={`${textPrimary} font-semibold`}>Email</p>
              <p className={textSecondary}>informes@cefib.pe</p>
              <p className={textSecondary}>educacion@cefib.pe</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <p className={`${textPrimary} font-semibold`}>Horario de Atención</p>
              <p className={textSecondary}>Lunes a Viernes</p>
              <p className={textSecondary}>08:00 am - 20:00 pm</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleWhatsAppClick}
          className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          Contáctanos Ahora
        </button>
      </div>

      {/* Mapa de Google */}
      <div className={`${cardBg} rounded-2xl overflow-hidden shadow-xl`}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d718.7153312853152!2d-79.04387278993265!3d-8.109010717247466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sS%2C%20Trujillo%2013011!5e0!3m2!1ses-419!2spe!4v1761276110256!5m2!1ses-419!2spe" 
          width="100%" 
          height="100%" 
          style={{ border: 0, minHeight: '450px' }}
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</section>

{/* Newsletter */}
<section className="py-20 bg-gradient-to-r from-red-400 via-orange-400 to-red-500">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h2 className="text-4xl font-bold mb-4">SUSCRÍBETE</h2>
      <h3 className="text-2xl mb-8">Para Mantenerte Informado</h3>
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
        <input
          type="email"
          value={emailSubscribe}
          onChange={(e) => setEmailSubscribe(e.target.value)}
          placeholder="Ingresa tu email..."
          className="flex-1 px-6 py-4 rounded-full text-gray-900 border-4 border-white focus:outline-none focus:border-white focus:ring-2 focus:ring-black transition-all"
        />
        <button
          onClick={handleSubscribeClick}
          className={`bg-white text-red-500 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all ${
            isSubscribing ? 'animate-wiggle' : ''
          }`}
        >
          Suscribirme
        </button>
      </div>
      
      {/* Redes Sociales */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-6">Síguenos en:</h4>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/cefib.sac"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full transition-all transform hover:scale-110"
          >
            <Facebook className="w-8 h-8" />
          </a>
          <a
            href="https://www.instagram.com/cefibsac"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full transition-all transform hover:scale-110"
          >
            <Instagram className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Footer */}
<footer id="contacto" className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      <div>
        <h4 className="text-xl font-bold mb-4">CEFIB</h4>
        <p className="text-gray-400">Centro de Formación Profesional de Excelencia</p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Contacto</h4>
        <div className="space-y-2 text-gray-400">
          <p>📞 973594951 / 962294240</p>
          <p>📧 informes@cefib.pe</p>
          <p>📧 educacion@cefib.pe</p>
          <p>📍 MZA. S LOTE. 9 URB. COVICORTI - Trujillo</p>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Horario</h4>
        <p className="text-gray-400">Lunes a Viernes<br/>08:00 am - 20:00 pm</p>
      </div>
    </div>
    <div className="text-center border-t border-gray-700 pt-6">
      <p className="text-gray-400">© 2025 CEFIB. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

{/* Botón Flotante Izquierda - Scroll Top (Desactivado en móvil) */}
{showScrollTop && !isMobile && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 left-6 bg-blue-900 text-white p-4 rounded-full shadow-xl hover:bg-blue-800 z-50 animate-fade-in transform hover:scale-110 transition-all"
    aria-label="Volver arriba"
  >
    <ArrowUp className="w-6 h-6" />
  </button>
)}

{/* Botones Flotantes Derecha */}
<div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
  <button
    onClick={handleEmailClick}
    className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all transform hover:scale-110 animate-bounce-slow"
    aria-label="Enviar Email"
  >
    <Mail className="w-6 h-6" />
  </button>
  <button
    onClick={handleWhatsAppClick}
    className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 animate-bounce-slow"
    aria-label="Contactar por WhatsApp"
    style={{ animationDelay: '0.3s' }}
  >
    <Phone className="w-6 h-6" />
  </button>
</div>
</div>
  );
}
