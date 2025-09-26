import QWorkshops from "../components/sections/quantumjam/qworkshops";

const i18n_en = {
  welcome: {
    cs: "IEEE Computer Society",
    itba: "Instituto Tecnológico de Buenos Aires",
  },
  about_us: {
    we_are: "About us",
    we_are_text:
      "We are a technology-focused organization made up of students and alumni of ITBA, dedicated to inspiring and educating in various areas of technology related to software engineering and technology. We are an academic sub-branch of the IEEE Computer Society, one of the largest networks connecting professionals in the world.",
    we_do: "What we do",
    we_do_text:
      "We organize and deliver talks, workshops, courses, and games approached from a technological and modern perspective. We aim to bring knowledge in an educational and entertaining matter to today's students and anyone interested in learning.",
  },
  work_with_us: {
    button: "Contact us",
    work: "Are you interested in working with us?",
  },
  stats: {
    stat_events: {
      title: "Events held",
    },
    stat_participants: {
      title: "Participants in events",
    },
    stat_countries: {
      title: "Countries reached",
    },
  },
  our_events: {
    title: "Our main events",
    events: {
      hackit: {
        date_prompt: "Date:",
        date: "March 28-30, 2025",
        location_prompt: "Location:",
        location: "Parque Patricios, CABA",
        participants_prompt: "Open to:",
        participants: "Any university student",
        cta_prompt: "Sign up now!",
        logo_alt: "Hackitba logo",
      },
      gamejam: {
        date_prompt: "Date:",
        date: "October 18th, 2024",
        location_prompt: "Location:",
        location: "Virtual, with an in-person closing ceremony",
        participants_prompt: "Open to:",
        participants: "Any university student",
        cta_prompt: "Learn more",
        logo_alt: "Gamejam Society logo",
      },
    },
  },
  mision_vision: {
    mision: "Mission",
    vision: "Vision",
    mision_text:
      '"Spark interest and spread knowledge about technology-related topics."',
    vision_text:
      '"Complement academic training with the use of current tools and technologies as the way to train better professionals."',
  },
  upcoming_events: {
    title: "Upcoming Event",
    sign_up: "Learn More!",
    timer: "{days} days, {timer} left", // se puede cambiar en sections/upcoming_events.jsx
    timeOut: "The event has ended",
    events: {
      hackit: {
        title: "HackITBA!",
        date: "28/3/2025",
        description:
          "HackITBA is a programming competition, consisting of 36 hours of pure creativity and adrenaline. The competition aims to promote creative solutions to current problems in a challenging and cooperative environment.",
      },
          // (pasar este texto a la pagina del hackitba) "HackITBA is a programming competition, consisting of 36 hours of pure creativity and adrenaline. The competition aims to promote creative solutions to current problems in a challenging and cooperative environment.",
      quantum: {
        title: "Quantum Jam!",
        date: "01/11/2025",
        description:
          "Quantum Jam is a hackathon preceded by intensive workshops where students can learn the basics of quantum computing, culminating in a hackaton with exercises provided by IBM.",
      },
    },
  },
  past_events: {
    title: "Past Events",
    inscriptions: "+{{n}} enrolled",
    watch: "Watch on Youtube",
    button: "View All",
  },
  team: {
    title: "Our Team",
    roles: {
      all: "All",
      directors: "Directors",
      it: "Information Technology",
      media: "Media",
      fr: "Fundraising",
      mentors: "Mentors",
      pr: "Public Relations",
      codirector: "Co-director",
      codirectora: "Co-director",
      head_it: "Head of Information Technology",
      head_media: "Head of Media",
      head_fr: "Head of Fundraising",
      head_mentors: "Head of Mentors",
      head_pr: "Head of Public Relations",
      asesor_mentors: "Mentors Advisor",
      asesor_it: "Information Technology Advisor",
      cofounder: "Co-Founder",
      president: "President",
      council: "Council",
      vicepresident: "Vice President",
      logistics: "Logistics",
      pc: "Competitive Programming",
      fundraising: "Fundraising",
      grads: "Grads",
      director_media: "Director of Media",
      co_director_logistics: "Co-Director of Logistics",
      director_fundraising: "Director of Fundraising",
      director_grads: "Director of Grads",
    },
  },
  sponsors: {
    title: "Our Sponsors",
    subtitle: "Companies that work with us",
    logo: "{name} logo",
  },
  contact: {
    title: "Contact",
  },
  contact_us: {
    title: "Contact Us",
    email: "Send us an email",
    networks: "Our social profiles",
    form: {
      subject: "Subject",
      body: "Body",
      send: "Send",
    },
  },
  footer: {
    love_1: "Made with",
    love_2: "by IEEE Computer Society ITBA",
    nav: {
      about: "About",
      future_events: "Upcoming Events",
      numbers: "Numbers",
      past_events: "Past Events",
      team: "Team",
      sponsors: "Sponsors",
      contact: "Contact Us",
    },
  },
  credits: {
    title: "Credits",
    description:
      "The complete site was made possible by the fantastic effort of these members from the IEEE Computer Society ITBA team. Everything, from design to execution, was done by them:",
  },
  go_back: "Go back",
  loading: "Loading...",
  gamejam: {
    slogan: "Craft, Compete, Conquer.",
    description:
      "Join your peers in a race against the clock, to design and develop a game in 48 hours!",
    info: "The event is 100% free, with the opportunity to meet and interact with amazing speakers who are leaders in the game-dev sector in Argentina, as well as the chance to win incredible prizes from our sponsors. You don’t need to be a programming genius to sign-up, though we do recommend at least one person per group know how to code.",
    more_info:
      "Game Jam Society gives you the chance to collaborate with peers who share your passion, develop amazing games under tight deadlines, and gain hands-on experience in game design.",
    location: "Virtual, with an in-person closing ceremony",
    participants: "Groups of 4 participants, aged 18-25",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    roadmap: {
      title: "Roadmap - 2024 Edition",
      signups_open: {
        date: "09/12",
        description: "Sign-ups open",
      },
      signups_close: {
        date: "10/09",
        description: "Sign-ups close",
      },
      competition_starts: {
        date: "10/18",
        description: "Competition starts",
      },
      competition_ends: {
        date: "10/20",
        description: "Competition is over",
      },
      closing_ceremony: {
        date: "10/21",
        description: "In-person closing ceremony and winners announcement",
      },
    },
    cta: "Sign up now!",
    competition_ended: "Come back next year for more fun!",
    images: {
      gamejam1: "Participants looking at screen",
      gamejam2: "Participants laughing",
      gamejam3: "Participants group picture",
      gamejam4: "Participants group picture",
      gamejam5: "Winners picture",
      gamejam6: "Participants chatting",
      gamejam7: "Winner showing his project",
      gamejam8: "Winner showing her project",
      gamejam9: "Winners showing their project",
      gamejam10: "Participants clapping",
      gamejam11: "Winners showing their project",
      gamejam12: "Winners showing their prizes",
      gamejam13: "Participants group picture",
      gamejam14: "Organizers chatting",
      gamejam15: "Participants chatting",
    },
  },
  hackit: {
    slogan: "Design, Develop, Dominate.",
    description: "Transform your ideas into tangible solutions.",
    info: [
      "Get ready for an exciting 36-hour sprint to develop a game-changing MVP (Minimum Viable Product) that tackles real-world problems aligned with our competition theme.",
      "Work alongside industry experts, mentors, and successful business leaders who will guide and inspire you every step of the way.",
      "Collaborate with fellow students, solve meaningful challenges, and have a great time while pushing your creativity to the limit!",
    ],
    more_info: [
      "In past editions, the winning team earned a spot in an",
      "project acceleration program, where they received expert mentorship, valuable resources, and strategic support to help take their MVP to the next level.",
      "This is an incredible chance to refine your idea, connect with investors, and turn your project into a thriving business.",
    ],
    location: "ITBA SDT, Parque Patricios, CABA, Argentina",
    date: "March 28-30, 2025",
    participants: "Groups of 4 participants, aged 18-25",
    cta: "Read more!",
    images: {
      hackitd1_1: "Organizers doing sign-up",
      hackitd1_2: "Empty opening ceremony venue",
      hackitd1_3: "Participants signing-in",
      hackitd1_4: "Speakers at opening ceremony",
      hackitd1_5: "Participants at opening ceremony",
      hackitd1_6: "Speakers at opening ceremony",
      hackitd1_7: "Participants at opening ceremony",
      hackitd1_8: "Participants chatting at opening ceremony",
      hackitd1_9: "Participants chatting at opening ceremony",
      hackitd1_10: "Participants working on their projects",
      hackitd2_1: "Participants working on their projects",
      hackitd2_2: "Participants working on their projects",
      hackitd2_3: "Participant coding",
      hackitd2_4: "Participants working on their projects",
      hackitd2_5: "Participants working on their projects",
      hackitd2_6: "Mentors helping participants working on their projects",
      hackitd3_1: "Judges at the closing ceremony",
      hackitd3_2: "Participants showing their project at the closing ceremony",
      hackitd3_3: "Judges at the closing ceremony",
      hackitd3_4: "Participants showing their project at the closing ceremony",
      hackitd3_5: "Participants at the closing ceremony",
      hackitd3_6: "Participants with their prizes at the closing ceremony",
      hackitd3_7: "Participants and organizers group picture",
      hackitd3_8: "Organizers group picture",
      hackitd3_9: "Organizers group picture",
    },
    mentors: {
      title: "Featuring judges and mentors from",
      microsoft: "Microsoft logo",
      google: "Google logo",
      exxon: "Exxon logo",
      modo: "Modo logo",
    },
  },
  quantumJam: {
    qhero:{
    quantumJam: "QuantumJam",
    slogan: "Powered by IBM Quantum",
    description: "Learn about a technology that could change the world. In this event, you’ll get a simple introduction to quantum computing by solving fun, beginner-friendly problems. No prior experience is required — just bring your curiosity and explore what makes quantum different from classical computing.",
    register: "Register now!",
    },
    qabout:{
      title: "About QuantumJam",
      text: "This event is designed to introduce you to the fascinating world of quantum computing through four virtual workshops. Each session builds on the previous one, taking you step by step from the basics to more advanced ideas. The event will conclude with a friendly competition where participants can put their new quantum skills into practice by solving simple challenges.",
      date: "Date: November 1st, 2025",
      location: "Location: ITBA SDF, Perón 535, CABA, Argentina",
      participants: "Open to: University students",
    },
    countdown: "Time left until the QuantumJam!",
    qschedule: {
      title: "Roadmap - 2025",
      signups_open: {
        date: "25/9",
        description: "Sign-ups open",
      },
      signups_close: {
        date: "05/10",
        description: "Sign-ups close",
      },
      competition_starts: {
        date: "Every Monday",
        description: "asynchronous Workshops",
      },
      competition_ends: {
        date: "1/11",
        description: "QuantumJam at ITBA",
      },
    },
    qworkshops: {
      title: "Workshops Offered",
      speaker: "Speaker",
      workshops: [
        {
          title: "Fundamentals of Quantum Computing",
          description: "Get introduced to the key concepts behind quantum computing, including qubits, superposition, and entanglement, and see how they differ from classical computing.",
          speaker: "Santiago Feldman",
          image: "workshop1",
        },
        {
          title: "Quantum Circuits",
          description: "Learn how quantum gates and circuits work, and practice building simple circuits to understand how quantum computations are carried out.",
          speaker: "Santiago Feldman",
          image: "workshop2",
        },
        {
          title: "Quantum Algorithms & Communication (Part 1)",
          description: "Explore the foundations of quantum algorithms and quantum communication, focusing on simple but powerful examples like quantum teleportation.",
          speaker: "Santiago Feldman",
          image: "workshop3",
        },
        {
          title: "Quantum Algorithms & Communication (Part 2)",
          description: "Dive deeper into quantum algorithms and protocols, discovering how quantum computing can be applied to real-world challenges and secure communications.",
          speaker: "Santiago Feldman",
          image: "workshop4",
        },
      ]
    }
  }
};

export default i18n_en;
