import QuantumJam from "../components/pages/quantum_jam";
import QAbout from "../components/sections/quantumjam/qabout";

const i18n_es = {
  welcome: {
    cs: "IEEE Computer Society",
    itba: "Instituto Tecnológico de Buenos Aires",
  },
  about_us: {
    we_are: "Quiénes somos",
    we_are_text:
      "Somos una sociedad técnica formada por alumnos y exalumnos del ITBA, dedicada a inspirar y educar en diversas áreas de tecnología, mayormente relacionadas con la informática. Formamos una sub-rama académica de IEEE Computer Society, una de las redes más grandes que conectan profesionales en todo el mundo.",
    we_do: "Qué hacemos",
    we_do_text:
      "Organizamos y dictamos charlas, workshops, cursos y juegos abordados desde una mirada tecnológica y actualizada. Nuestro fin es acercar toda esa información y conocimiento de forma didáctica y entretenida a los estudiantes de hoy y a cualquier interesado en aprender.",
  },
  work_with_us: {
    button: "Contáctanos",
    work: "¿Te interesa trabajar con nosotros?",
  },
  stats: {
    stat_events: {
      title: "Eventos realizados",
    },
    stat_participants: {
      title: "Participantes en eventos",
    },
    stat_countries: {
      title: "Países alcanzados",
    },
  },
  our_events: {
    title: "Nuestros eventos principales",
    events: {
      hackit: {
        date_prompt: "Fecha:",
        date: "28-30 de Marzo de 2025",
        location_prompt: "Ubicación:",
        location: "Location: ITBA SDF, Perón 535, CABA, Argentina",
        participants_prompt: "Abierto a:",
        participants: "Estudiantes universitarios",
        cta_prompt: "¡Inscribite hoy!",
        logo_alt: "Logo de HackITBA",
      },
      gamejam: {
        date_prompt: "Fecha:",
        date: "18 de octubre de 2024",
        location_prompt: "Ubicación:",
        location: "Virtual, con una ceremonia de cierre presencial",
        participants_prompt: "Abierto a:",
        participants: "Estudiantes universitarios",
        cta_prompt: "Leer más",
        logo_alt: "Logo de GameJam Society",
      },
    },
  },
  mision_vision: {
    mision: "Misión",
    vision: "Visión",
    mision_text:
      '"Fomentar el interés y difundir conocimientos sobre tecnología"',
    vision_text:
      '"Complementar la formación académica con el uso de herramientas y tecnologías actuales como el camino para formar mejores profesionales"',
  },
  upcoming_events: {
    title: "Próximo Evento",
    sign_up: "¡Inscribite hoy!",
    timer: "Quedan {days} días, {timer}",
    timeOut: "El evento ha finalizado",
    events: {
      hackit: {
        title: "HackITBA!",
        date: "28-30 de Marzo de 2025",
        description:
          "HackITBA es una hackathon organizada por y para estudiantes, donde, en grupos de 4 personas, deben generar un MVP en 36 horas de competencia intensiva. La competencia tiene como meta promover soluciones creativas a problemas actuales en un ambiente desafiante y cooperativo.",
          // (pasar este texto a la pagina del hackitba) HackITBA es una hackathon organizada por y para estudiantes, donde, en grupos de 4 personas, deben generar un MVP en 36 horas de competencia intensiva. La competencia tiene como meta promover soluciones creativas a problemas actuales en un ambiente desafiante y cooperativo."
      },
      quantum: {
        title: "Quantum Jam!",
        date: "01 de Noviembre de 2025",
        description:
          "La Quantum Jam es una hackaton precedida por workshops intencivos en la que los estudiantes podran aprender las bases sobre la computación cuantica terminando con una hackaton con ejercicios traidos por IBM",
          // (pasar este texto a la pagina del hackitba) HackITBA es una hackathon organizada por y para estudiantes, donde, en grupos de 4 personas, deben generar un MVP en 36 horas de competencia intensiva. La competencia tiene como meta promover soluciones creativas a problemas actuales en un ambiente desafiante y cooperativo."
      },
    },
  },
  past_events: {
    title: "Eventos Pasados",
    inscriptions: "+{{n}} inscriptos",
    watch: "Ver en YouTube",
    button: "Ver Todos",
  },
  team: {
    title: "Nuestro Equipo",
    roles: {
      all: "Todos",
      directors: "Directivos",
      it: "Tecnología de la Información",
      media: "Medios",
      fr: "Recaudación de Fondos",
      mentors: "Mentores",
      pr: "Relaciones Públicas",
      codirector: "Co-director",
      codirectora: "Co-directora",
      head_it: "Head de Tecnología de la Información",
      head_media: "Head de Medios",
      head_fr: "Head de Recaudación de Fondos",
      head_mentors: "Head de Mentores",
      head_pr: "Head de Relaciones Públicas",
      asesor_mentors: "Asesor de Mentores",
      asesor_it: "Asesor de Tecnología de la Información",
      cofounder: "Cofundador",
      president: "Presidente",
      council: "Consejo",
      vicepresident: "Vicepresidente",
      logistics: "Logística",
      fundraising: "Fundraising",
      pc: "Programación Competitiva",
      grads: "Grads",
      director_media: "Director de Medios",
      co_director_logistics: "Co-Director de Logística",
      director_fundraising: "Director de Fundraising",
      director_grads: "Director de Grads",
    },
  },
  sponsors: {
    title: "Nuestros Sponsors",
    subtitle: "Empresas que colaboran con nosotros",
    logo: "Logo de {name}",
  },
  contact: {
    title: "Contacto",
  },
  contact_us: {
    title: "Contáctanos",
    email: "Mándanos un email",
    networks: "Nuestros perfiles sociales",
    form: {
      subject: "Asunto",
      body: "Cuerpo",
      send: "Enviar",
    },
  },
  footer: {
    love_1: "Hecho con",
    love_2: "por IEEE Computer Society ITBA",
    nav: {
      about: "Nosotros",
      future_events: "Próximos Eventos",
      numbers: "Estadísticas",
      past_events: "Eventos Pasados",
      team: "Equipo",
      sponsors: "Sponsors",
      contact: "Contáctanos",
    },
  },
  credits: {
    title: "Créditos",
    description:
      "El sitio completo fue posible gracias al fantástico esfuerzo de estos miembros del equipo ITBA de IEEE Computer Society. Todo, desde el diseño hasta la ejecución, fue hecho por ellos:",
  },
  go_back: "Volver",
  loading: "Cargando...",
  gamejam: {
    slogan: "Crear, Competir, Conquistar.",
    description:
      "¡Unite a tus compañeros en una carrera contra el tiempo para diseñar y desarrollar un juego en 48 horas!",
    info: "El evento es 100% gratuito, con la oportunidad de conocer e interactuar con oradores y líderes en el sector del desarrollo de videojuegos en Argentina, además de la oportunidad de ganar premios increíbles de nuestros sponsors. No hace falta ser un genio de la programación para inscribirte, aunque recomendamos que al menos una persona por grupo sepa programar.",
    more_info:
      "Game Jam Society te brinda la oportunidad de colaborar con compañeros que comparten tu pasión, desarrollar juegos increíbles bajo presión y adquirir experiencia práctica en el diseño de juegos.",
    location: "Virtual, con una ceremonia de cierre presencial",
    participants: "Grupos de 4 participantes, entre 18-25 años",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    roadmap: {
      title: "Roadmap - Edición 2024",
      signups_open: {
        date: "12/09",
        description: "Abren las inscripciones",
      },
      signups_close: {
        date: "09/10",
        description: "Cierran las inscripciones",
      },
      competition_starts: {
        date: "18/10",
        description: "Comienza la competencia",
      },
      competition_ends: {
        date: "20/10",
        description: "Termina la competencia",
      },
      closing_ceremony: {
        date: "21/10",
        description: "Ceremonia de cierre presencial y anuncio de ganadores",
      },
    },
    cta: "¡Regístrate ahora!",
    competition_ended: "¡Regresa el año que viene para participar!",
    images: {
      gamejam1: "Participantes mirando la pantalla",
      gamejam2: "Participantes riendo",
      gamejam3: "Foto grupal de los participantes",
      gamejam4: "Foto grupal de los participantes",
      gamejam5: "Foto de los ganadores",
      gamejam6: "Participantes charlando",
      gamejam7: "Ganador mostrando su proyecto",
      gamejam8: "Ganadora mostrando su proyecto",
      gamejam9: "Ganadores mostrando su proyecto",
      gamejam10: "Participantes aplaudiendo",
      gamejam11: "Ganadores mostrando su proyecto",
      gamejam12: "Ganadores mostrando sus premios",
      gamejam13: "Foto grupal de los participantes",
      gamejam14: "Organizadores charlando",
      gamejam15: "Participantes charlando",
    },
  },
  hackit: {
    slogan: "Diseñá, Desarrollá, Dominá.",
    description: "Transformá tus ideas en soluciones reales.",
    info: [
      "Prepárate para un emocionante sprint de 36 horas para desarrollar un MVP innovador que aborde problemáticas del mundo real, alineadas con el tema de nuestra competencia.",
      "Trabajá junto a expertos de la industria, mentores y líderes del mercado que te guiarán e inspirarán en cada paso del camino.",
      "¡Colaborá con compañeros, resolvé enormes desafíos y divertite mientras empujás tu creatividad al límite!",
    ],
    more_info: [
      "En ediciones pasadas, el equipo ganador recibió un lugar en el programa de aceleración de proyectos de",
      "donde recibió mentoría experta, recursos valiosos y apoyo estratégico para llevar a su MVP al siguiente nivel.",
      "Esta es una oportunidad increíble para perfeccionar tu idea, conectar con inversores y convertir tu proyecto en un negocio exitoso.",
    ],
    location: "ITBA SDT, Parque Patricios, CABA, Argentina",
    date: "28-30 de Marzo de 2025",
    participants: "Grupos de 4 participantes, entre 18-25 años",
    cta: "¡Leé más!",
    images: {
      hackitd1_1: "Organizadores realizando inscripciones",
      hackitd1_2: "Escenario de la ceremonia de apertura",
      hackitd1_3: "Participantes registrándose",
      hackitd1_4: "Oradores en la ceremonia de apertura",
      hackitd1_5: "Participantes en la ceremonia de apertura",
      hackitd1_6: "Oradores en la ceremonia de apertura",
      hackitd1_7: "Participantes en la ceremonia de apertura",
      hackitd1_8: "Participantes charlando en la ceremonia de apertura",
      hackitd1_9: "Participantes charlando en la ceremonia de apertura",
      hackitd1_10: "Participantes trabajando en sus proyectos",
      hackitd2_1: "Participantes trabajando en sus proyectos",
      hackitd2_2: "Participantes trabajando en sus proyectos",
      hackitd2_3: "Participante programando",
      hackitd2_4: "Participantes trabajando en sus proyectos",
      hackitd2_5: "Participantes trabajando en sus proyectos",
      hackitd2_6: "Mentores ayudando a los participantes en sus proyectos",
      hackitd3_1: "Jurado en la ceremonia de clausura",
      hackitd3_2:
        "Participantes mostrando su proyecto en la ceremonia de clausura",
      hackitd3_3: "Jurado en la ceremonia de clausura",
      hackitd3_4:
        "Participantes mostrando su proyecto en la ceremonia de clausura",
      hackitd3_5: "Participantes en la ceremonia de clausura",
      hackitd3_6: "Participantes con sus premios en la ceremonia de clausura",
      hackitd3_7: "Foto grupal de participantes y organizadores",
      hackitd3_8: "Foto grupal de organizadores",
      hackitd3_9: "Foto grupal de organizadores",
    },
    mentors: {
      title: "Jurado y mentores de",
      microsoft: "Logo de Microsoft",
      google: "Logo de Google",
      exxon: "Logo de Exxon",
      modo: "Logo de Modo",
    },
  },
  quantumJam: {
  qhero: {
    quantumJam: "QuantumJam",
    slogan: "Impulsado por IBM Quantum",
    description: "Aprendé sobre una tecnología que podría cambiar el mundo. En este evento tendrás una introducción sencilla a la computación cuántica resolviendo problemas divertidos y para principiantes. No se requiere experiencia previa: solo traé tu curiosidad y descubrí qué hace que lo cuántico sea diferente de lo clásico.",
    register: "¡Registrate ahora!",
  },
  qabout: {
    title: "Sobre QuantumJam",
    text: "Este evento está diseñado para introducirte al fascinante mundo de la computación cuántica a través de cuatro workshops virtuales. Cada sesión se apoya en la anterior, llevándote paso a paso desde lo básico hasta ideas más avanzadas. El evento concluirá con una competencia amistosa donde los participantes podrán poner en práctica sus nuevas habilidades cuánticas resolviendo desafíos sencillos.",
    date: "Fecha: 1 de noviembre de 2025",
    location: "Lugar: ITBA, Parque Patricios, CABA, Argentina",
    participants: "Abierto a: Estudiantes universitarios",
  },
  countdown: "¡Tiempo restante hasta el QuantumJam!",
  qschedule: {
    title: "Hoja de ruta - 2025",
    signups_open: {
      date: "25/9",
      description: "Apertura de inscripciones",
    },
    signups_close: {
      date: "05/10",
      description: "Cierre de inscripciones",
    },
    competition_starts: {
      date: "Todos los lunes",
      description: "Workshops asíncronos",
    },
    competition_ends: {
      date: "1/11",
      description: "QuantumJam en el ITBA",
    },
  },
  qworkshops: {
    title: "Workshops disponibles",
    speaker: "Orador",
    workshops: [
      {
        title: "Fundamentos de la Computación Cuántica",
        description: "Conocé los conceptos clave de la computación cuántica, incluyendo qubits, superposición y entrelazamiento, y descubrí cómo se diferencian de la computación clásica.",
        speaker: "Santiago Feldman",
        image: "workshop1",
      },
      {
        title: "Circuitos Cuánticos",
        description: "Aprendé cómo funcionan las compuertas y los circuitos cuánticos, y practicá construyendo circuitos simples para entender cómo se realizan los cálculos cuánticos.",
        speaker: "Santiago Feldman",
        image: "workshop2",
      },
      {
        title: "Algoritmos y Comunicación Cuántica (Parte 1)",
        description: "Explorá las bases de los algoritmos y la comunicación cuántica, enfocándote en ejemplos simples pero poderosos como la teleportación cuántica.",
        speaker: "Santiago Feldman",
        image: "workshop3",
      },
      {
        title: "Algoritmos y Comunicación Cuántica (Parte 2)",
        description: "Profundizá en algoritmos y protocolos cuánticos, descubriendo cómo la computación cuántica puede aplicarse a desafíos del mundo real y a comunicaciones seguras.",
        speaker: "Santiago Feldman",
        image: "workshop4",
      },
    ]
  }
}

};

export default i18n_es;
