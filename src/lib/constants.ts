export const SITE_CONFIG = {
  name: "Dra. Flávia Argolo",
  title: "Dra. Flávia Argolo | Advogada de Família em Aracaju",
  description:
    "Advogada especialista em Direito de Família com 24 anos de experiência em Aracaju/SE. Divórcio, pensão alimentícia, guarda de filhos e inventário com atendimento humanizado.",
  url: "https://draflaviaargolo.adv.br",
  ogImage: "/og-image.jpg",
} as const;

export const CONTACT = {
  phone: "79999985695",
  phoneFormatted: "(79) 99998-5695",
  email: "fhargolo@yahoo.com.br",
  instagram: "@flaviaargolo_adv",
  instagramUrl: "https://instagram.com/flaviaargolo_adv",
  address: {
    street: "Rua Nino Porto, 61",
    neighborhood: "Bairro São José",
    city: "Aracaju",
    state: "SE",
    full: "Rua Nino Porto, 61 - Bairro São José - Aracaju/SE",
  },
  hours: {
    weekdays: "Segunda a Sexta: 8:30 - 18:00",
    weekend: "Fins de semana: Atendimento de urgências",
  },
  consultationPrice: "R$ 250,00",
} as const;

export const LAWYER_INFO = {
  name: "Flávia Argolo",
  oab: {
    primary: "OAB/SE 3458",
    secondary: "OAB/RS",
  },
  experience: "24 anos",
  specialization: "Direito de Família",
  education: {
    graduation: "Universidade Federal de Sergipe (UFS)",
    postGraduation: "Pós-graduação em Direito Processual Civil",
    specialization: "Especialização em Direito de Família",
  },
} as const;

export const SERVICES = [
  {
    id: "pensao-alimenticia",
    title: "Pensão Alimentícia",
    description: "Execução de pensão atrasada, revisão de valores e exoneração.",
    icon: "Scale",
    href: "/pensao-alimenticia-urgente",
    priority: 1,
  },
  {
    id: "divorcio-consensual",
    title: "Divórcio Consensual",
    description: "Processo rápido e amigável para encerrar o casamento com paz.",
    icon: "Heart",
    href: "/divorcio-rapido-aracaju",
    priority: 2,
  },
  {
    id: "divorcio-litigioso",
    title: "Divórcio Litigioso",
    description: "Quando há disputas, protegemos seus direitos com firmeza.",
    icon: "Shield",
    href: "/divorcio-litigioso-aracaju",
    priority: 3,
  },
  {
    id: "guarda-filhos",
    title: "Guarda de Filhos",
    description: "Guarda compartilhada ou unilateral, sempre priorizando a criança.",
    icon: "Users",
    href: "/guarda-filhos-aracaju",
    priority: 4,
  },
  {
    id: "inventario",
    title: "Inventário",
    description: "Partilha de bens com transparência, rapidez e respeito.",
    icon: "FileText",
    href: "/inventario-partilha-bens",
    priority: 5,
  },
  {
    id: "revisao-pensao",
    title: "Revisão de Pensão",
    description: "Readequação de valores quando sua situação muda.",
    icon: "RefreshCw",
    href: "/revisao-pensao-alimenticia",
    priority: 6,
  },
] as const;

export const WHATSAPP_MESSAGES = {
  default:
    "Olá Dra. Flávia! Vim do seu site e gostaria de agendar uma consulta. Meu nome é: ",
  pensaoAlimenticia:
    "Olá Dra. Flávia! Vim do seu site sobre *pensão alimentícia* e preciso de orientação urgente. Meu nome é: ",
  divorcioConensual:
    "Olá Dra. Flávia! Vim do seu site sobre *divórcio consensual* e gostaria de entender como você pode me ajudar. Meu nome é: ",
  divorcioLitigioso:
    "Olá Dra. Flávia! Vim do seu site sobre *divórcio litigioso* e preciso de ajuda. Meu nome é: ",
  revisaoPensao:
    "Olá Dra. Flávia! Vim do seu site sobre *revisão de pensão alimentícia* e gostaria de orientação. Meu nome é: ",
  guardaFilhos:
    "Olá Dra. Flávia! Vim do seu site sobre *guarda de filhos* e preciso de ajuda. Meu nome é: ",
  inventario:
    "Olá Dra. Flávia! Vim do seu site sobre *inventário* e gostaria de agendar uma conversa. Meu nome é: ",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
] as const;

export const DIFFERENTIALS = [
  {
    title: "24 Anos de Experiência",
    description: "Mais de duas décadas dedicadas exclusivamente ao Direito de Família.",
    icon: "Award",
  },
  {
    title: "Atendimento Humanizado",
    description: "Você não é apenas um processo. Aqui, você é tratado como família.",
    icon: "Heart",
  },
  {
    title: "Especialização Completa",
    description: "Pós-graduação e especialização focadas em Direito de Família.",
    icon: "GraduationCap",
  },
  {
    title: "Pagamento Facilitado",
    description: "Parcelamento e condições que cabem no seu bolso.",
    icon: "CreditCard",
  },
  {
    title: "Atendimento de Urgência",
    description: "Disponível em fins de semana para casos urgentes.",
    icon: "Clock",
  },
  {
    title: "Comunicação Clara",
    description: "Sem juridiquês. Explicamos tudo de forma simples e direta.",
    icon: "MessageCircle",
  },
] as const;
