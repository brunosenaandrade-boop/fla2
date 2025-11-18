export interface LandingPageData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  hero: {
    badge: string
    headline: string
    highlightedText: string
    subheadline: string
    whatsappMessage: string
  }
  painPoints: {
    title: string
    items: string[]
  }
  howItWorks: {
    title: string
    steps: {
      number: string
      title: string
      description: string
    }[]
  }
  benefits: {
    title: string
    items: {
      title: string
      description: string
    }[]
  }
  faq: {
    question: string
    answer: string
  }[]
  cta: {
    title: string
    description: string
  }
}

export const LANDING_PAGES: Record<string, LandingPageData> = {
  'divorcio-rapido-aracaju': {
    slug: 'divorcio-rapido-aracaju',
    title: 'Divórcio Consensual',
    metaTitle: 'Divórcio Consensual em Aracaju | Rápido e Amigável | Dra. Flávia Argolo',
    metaDescription: 'Divórcio consensual em Aracaju com advogada especialista. Processo rápido, humanizado e respeitoso. 24 anos de experiência em Direito de Família.',
    hero: {
      badge: 'Divórcio Consensual',
      headline: 'Termine Esse Ciclo Com',
      highlightedText: 'Dignidade',
      subheadline: 'Rápido, amigável e respeitoso. Comece um novo capítulo da sua vida com paz e segurança jurídica.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *divórcio consensual* e gostaria de entender como você pode me ajudar. Meu nome é: '
    },
    painPoints: {
      title: 'Você está passando por isso?',
      items: [
        'Vocês já decidiram se separar mas não sabem por onde começar?',
        'Têm medo do processo ser longo, caro ou desgastante?',
        'Querem resolver tudo de forma rápida e civilizada?',
        'Precisam dividir bens ou definir guarda dos filhos?',
        'Não querem que a separação vire uma briga?'
      ]
    },
    howItWorks: {
      title: 'Como funciona o Divórcio Consensual?',
      steps: [
        {
          number: '01',
          title: 'Consulta Inicial',
          description: 'Conversamos sobre sua situação, documentos necessários e definimos a melhor estratégia para seu caso.'
        },
        {
          number: '02',
          title: 'Elaboração do Acordo',
          description: 'Preparamos toda a documentação e o acordo de divórcio, incluindo partilha de bens e guarda (se houver filhos).'
        },
        {
          number: '03',
          title: 'Finalização',
          description: 'O processo pode ser feito em cartório (mais rápido) ou judicial. Você recebe sua certidão de divórcio.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Processo Simplificado',
          description: 'Cuidamos de toda a burocracia para você focar no seu recomeço.'
        },
        {
          title: 'Rapidez',
          description: 'Divórcio consensual pode ser finalizado em poucas semanas.'
        },
        {
          title: 'Economia',
          description: 'Processo amigável custa menos que um divórcio litigioso.'
        },
        {
          title: 'Sigilo Total',
          description: 'Sua privacidade é preservada do início ao fim.'
        }
      ]
    },
    faq: [
      {
        question: 'Quanto tempo demora um divórcio consensual?',
        answer: 'Quando feito em cartório, pode ser finalizado em 1-2 semanas. Via judicial, geralmente 30-60 dias. Tudo depende da organização dos documentos e da agenda do cartório/vara.'
      },
      {
        question: 'Preciso ir ao fórum?',
        answer: 'Não necessariamente! Se não houver filhos menores ou incapazes, o divórcio pode ser feito diretamente em cartório, sem necessidade de processo judicial.'
      },
      {
        question: 'E se tivermos filhos?',
        answer: 'O divórcio consensual também é possível com filhos. Basta que vocês concordem sobre guarda, visitação e pensão. Incluímos tudo no acordo.'
      },
      {
        question: 'Quanto custa?',
        answer: 'O valor varia conforme a complexidade (bens a dividir, filhos, etc). Na consulta inicial damos um orçamento detalhado e transparente, com opções de parcelamento.'
      },
      {
        question: 'Posso me divorciar sem o outro concordar?',
        answer: 'Se não houver acordo, o processo se torna litigioso. Mas mesmo assim podemos ajudar - temos experiência em ambos os tipos de divórcio.'
      }
    ],
    cta: {
      title: 'Pronto para começar seu novo capítulo?',
      description: 'Agende uma consulta e vamos resolver isso da forma mais tranquila possível. Você merece paz.'
    }
  },

  'divorcio-litigioso-aracaju': {
    slug: 'divorcio-litigioso-aracaju',
    title: 'Divórcio Litigioso',
    metaTitle: 'Divórcio Litigioso em Aracaju | Proteção dos Seus Direitos | Dra. Flávia Argolo',
    metaDescription: 'Divórcio litigioso em Aracaju com advogada especialista. Quando não há acordo, protegemos seus direitos com firmeza. 24 anos de experiência.',
    hero: {
      badge: 'Divórcio Litigioso',
      headline: 'Quando o Acordo Não É Possível,',
      highlightedText: 'Proteja Seus Direitos',
      subheadline: 'Divórcio complicado? Você precisa de quem saiba lutar por você com estratégia e experiência.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *divórcio litigioso* e preciso de ajuda. Meu nome é: '
    },
    painPoints: {
      title: 'Sua situação é assim?',
      items: [
        'Seu cônjuge não quer o divórcio ou dificulta o processo?',
        'Não conseguem chegar a um acordo sobre bens ou filhos?',
        'Você se sente prejudicado(a) nas negociações?',
        'Há situações de abandono, traição ou outros conflitos?',
        'Precisa proteger seu patrimônio e seus direitos?'
      ]
    },
    howItWorks: {
      title: 'Como funciona o Divórcio Litigioso?',
      steps: [
        {
          number: '01',
          title: 'Análise do Caso',
          description: 'Avaliamos toda a situação, provas e documentos para montar a melhor estratégia jurídica.'
        },
        {
          number: '02',
          title: 'Ação Judicial',
          description: 'Entramos com o processo e defendemos seus interesses em todas as etapas, incluindo audiências.'
        },
        {
          number: '03',
          title: 'Sentença',
          description: 'O juiz decide sobre a divisão de bens, guarda e pensão. Acompanhamos até a averbação final.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Experiência em Litígios',
          description: '24 anos atuando em casos complexos de família.'
        },
        {
          title: 'Estratégia Personalizada',
          description: 'Cada caso é único e tratado com atenção individual.'
        },
        {
          title: 'Defesa Firme',
          description: 'Protegemos seus direitos com técnica e determinação.'
        },
        {
          title: 'Acompanhamento Próximo',
          description: 'Você sempre sabe o que está acontecendo no seu processo.'
        }
      ]
    },
    faq: [
      {
        question: 'Quanto tempo demora um divórcio litigioso?',
        answer: 'Depende da complexidade e da vara. Pode variar de 6 meses a 2 anos. Trabalhamos para acelerar ao máximo dentro do legal.'
      },
      {
        question: 'Vou precisar ir a audiências?',
        answer: 'Provavelmente sim. Mas não se preocupe - preparamos você para cada audiência e estamos sempre ao seu lado.'
      },
      {
        question: 'E se ele/ela esconder bens?',
        answer: 'Podemos solicitar medidas judiciais para localizar e proteger o patrimônio do casal, incluindo bloqueio de contas se necessário.'
      },
      {
        question: 'Posso pedir pensão para mim?',
        answer: 'Sim, existe a pensão alimentícia entre cônjuges em alguns casos. Analisamos se você tem esse direito na consulta.'
      },
      {
        question: 'E os filhos?',
        answer: 'A guarda, visitação e pensão dos filhos são definidas pelo juiz pensando sempre no melhor interesse da criança.'
      }
    ],
    cta: {
      title: 'Não deixe seus direitos desprotegidos',
      description: 'Em um divórcio litigioso, ter uma advogada experiente faz toda a diferença. Vamos conversar sobre seu caso.'
    }
  },

  'pensao-alimenticia-urgente': {
    slug: 'pensao-alimenticia-urgente',
    title: 'Pensão Alimentícia',
    metaTitle: 'Pensão Alimentícia Urgente em Aracaju | Execução e Cobrança | Dra. Flávia Argolo',
    metaDescription: 'Pensão alimentícia atrasada? Cobrança e execução com advogada especialista em Aracaju. Garanta os direitos dos seus filhos. 24 anos de experiência.',
    hero: {
      badge: 'Pensão Alimentícia',
      headline: 'Pensão Atrasada? Seus Filhos',
      highlightedText: 'Têm Direito',
      subheadline: 'Especialista há 24 anos. Atendimento humanizado. Garanta os direitos de quem você ama.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *pensão alimentícia* e preciso de orientação urgente. Meu nome é: '
    },
    painPoints: {
      title: 'Você está vivendo isso?',
      items: [
        'A pensão está atrasada há meses e você não sabe o que fazer?',
        'O pai/mãe dos seus filhos simplesmente parou de pagar?',
        'Você precisa do dinheiro para despesas básicas das crianças?',
        'Já tentou cobrar mas não teve resultado?',
        'Tem medo de entrar na justiça e não resolver?'
      ]
    },
    howItWorks: {
      title: 'Como funciona a cobrança de pensão?',
      steps: [
        {
          number: '01',
          title: 'Análise da Situação',
          description: 'Verificamos quanto está atrasado, se há acordo/sentença anterior e qual a melhor estratégia.'
        },
        {
          number: '02',
          title: 'Execução de Alimentos',
          description: 'Entramos com ação para cobrar os valores atrasados, podendo pedir prisão, penhora ou desconto em folha.'
        },
        {
          number: '03',
          title: 'Recebimento',
          description: 'Acompanhamos até você receber todo o valor devido, com correção e juros.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Urgência Real',
          description: 'Entendemos que você precisa do dinheiro agora. Agimos rápido.'
        },
        {
          title: 'Todas as Medidas',
          description: 'Prisão civil, penhora, desconto em folha - usamos o que funcionar.'
        },
        {
          title: 'Experiência Comprovada',
          description: '24 anos cobrando pensões atrasadas com sucesso.'
        },
        {
          title: 'Parcelamento',
          description: 'Condições de pagamento que cabem no seu bolso.'
        }
      ]
    },
    faq: [
      {
        question: 'O devedor pode ser preso?',
        answer: 'Sim! A prisão civil por dívida de alimentos é permitida pela lei. É uma medida eficaz que usamos quando necessário.'
      },
      {
        question: 'E se ele não tiver dinheiro na conta?',
        answer: 'Podemos penhorar bens (carro, imóvel), pedir desconto direto no salário ou usar outras medidas de cobrança.'
      },
      {
        question: 'Quanto tempo demora para receber?',
        answer: 'Depende do caso. Com desconto em folha ou penhora de conta, pode ser bem rápido. Com outras medidas, alguns meses.'
      },
      {
        question: 'E se não houver sentença definindo a pensão?',
        answer: 'Primeiro precisamos de uma ação de alimentos para fixar o valor. Depois podemos cobrar se atrasar.'
      },
      {
        question: 'Posso cobrar pensão atrasada de anos?',
        answer: 'Sim! Você pode cobrar os últimos 2 anos de pensão atrasada. Não deixe esse direito prescrever.'
      }
    ],
    cta: {
      title: 'Seus filhos não podem esperar',
      description: 'Cada dia de atraso é um dia a menos para cobrar. Vamos agir agora para garantir esse direito.'
    }
  },

  'revisao-pensao-alimenticia': {
    slug: 'revisao-pensao-alimenticia',
    title: 'Revisão de Pensão',
    metaTitle: 'Revisão de Pensão Alimentícia em Aracaju | Aumento ou Redução | Dra. Flávia Argolo',
    metaDescription: 'Revisão de pensão alimentícia em Aracaju. Sua situação mudou? Aumento ou redução do valor com advogada especialista. 24 anos de experiência.',
    hero: {
      badge: 'Revisão de Pensão',
      headline: 'Sua Situação Mudou?',
      highlightedText: 'Readequar É Seu Direito',
      subheadline: 'Revisão de pensão com justiça e transparência. Seja para aumentar ou reduzir, você precisa de orientação especializada.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *revisão de pensão alimentícia* e gostaria de orientação. Meu nome é: '
    },
    painPoints: {
      title: 'Você se identifica?',
      items: [
        'Perdeu o emprego ou teve redução de renda e não consegue pagar?',
        'O valor da pensão não cobre mais as necessidades do filho?',
        'Quem paga melhorou de vida mas a pensão continua a mesma?',
        'Teve mais filhos e precisa redistribuir a pensão?',
        'A criança está mais velha e os gastos aumentaram?'
      ]
    },
    howItWorks: {
      title: 'Como funciona a Revisão?',
      steps: [
        {
          number: '01',
          title: 'Análise da Mudança',
          description: 'Verificamos o que mudou (renda, necessidades, gastos) e se há base para revisão.'
        },
        {
          number: '02',
          title: 'Tentativa de Acordo',
          description: 'Se possível, tentamos um acordo extrajudicial, mais rápido e econômico.'
        },
        {
          number: '03',
          title: 'Ação Revisional',
          description: 'Se não houver acordo, entramos com ação pedindo ao juiz para readequar o valor.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Análise Imparcial',
          description: 'Avaliamos se você realmente tem direito à revisão antes de iniciar.'
        },
        {
          title: 'Negociação',
          description: 'Buscamos acordo primeiro para resolver mais rápido.'
        },
        {
          title: 'Provas Técnicas',
          description: 'Montamos o caso com documentos que comprovam a mudança.'
        },
        {
          title: 'Experiência',
          description: '24 anos em ações de alimentos, sabemos o que funciona.'
        }
      ]
    },
    faq: [
      {
        question: 'Posso pedir redução se perdi o emprego?',
        answer: 'Sim! Mudança na capacidade de pagamento é motivo para revisão. Mas precisa comprovar a situação.'
      },
      {
        question: 'E se quem paga ganhou mais dinheiro?',
        answer: 'Você pode pedir aumento proporcional. A pensão deve acompanhar a melhora de vida do alimentante.'
      },
      {
        question: 'Preciso de advogado para fazer acordo?',
        answer: 'Recomendamos fortemente. Mesmo em acordo, precisa ser homologado judicialmente para ter validade.'
      },
      {
        question: 'Quanto tempo demora?',
        answer: 'Acordo pode ser rápido (semanas). Ação judicial varia de 3 a 12 meses dependendo da vara.'
      },
      {
        question: 'O novo valor vale desde quando?',
        answer: 'Geralmente vale desde a citação do processo. Por isso é importante entrar logo se precisar de redução.'
      }
    ],
    cta: {
      title: 'A pensão precisa refletir a realidade',
      description: 'Seja para aumentar ou diminuir, vamos analisar seu caso e encontrar a solução mais justa.'
    }
  },

  'guarda-filhos-aracaju': {
    slug: 'guarda-filhos-aracaju',
    title: 'Guarda de Filhos',
    metaTitle: 'Guarda de Filhos em Aracaju | Compartilhada ou Unilateral | Dra. Flávia Argolo',
    metaDescription: 'Guarda de filhos em Aracaju com advogada especialista. Guarda compartilhada, unilateral e regulamentação de visitas. 24 anos de experiência.',
    hero: {
      badge: 'Guarda de Filhos',
      headline: 'O Amor Não Se Divide,',
      highlightedText: 'Se Multiplica',
      subheadline: 'Proteja o direito de convivência. Cada criança merece a presença e o amor de ambos os pais.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *guarda de filhos* e preciso de ajuda. Meu nome é: '
    },
    painPoints: {
      title: 'Você está enfrentando isso?',
      items: [
        'Separou e não sabe como ficará a guarda dos filhos?',
        'O outro genitor está dificultando seu contato com a criança?',
        'Precisa definir dias e horários de visita?',
        'Quer guarda compartilhada mas o outro não aceita?',
        'A criança está em situação de risco com o outro genitor?'
      ]
    },
    howItWorks: {
      title: 'Como funciona o processo de Guarda?',
      steps: [
        {
          number: '01',
          title: 'Entendimento da Situação',
          description: 'Analisamos o que é melhor para a criança e qual tipo de guarda se aplica ao caso.'
        },
        {
          number: '02',
          title: 'Busca por Acordo',
          description: 'Tentamos resolver de forma consensual, definindo guarda, visitas e responsabilidades.'
        },
        {
          number: '03',
          title: 'Ação Judicial',
          description: 'Se necessário, entramos na justiça. O juiz decide sempre priorizando o bem-estar da criança.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Foco na Criança',
          description: 'O interesse do seu filho sempre vem em primeiro lugar.'
        },
        {
          title: 'Mediação',
          description: 'Buscamos soluções que preservem a relação entre todos.'
        },
        {
          title: 'Experiência',
          description: '24 anos resolvendo disputas de guarda em Aracaju.'
        },
        {
          title: 'Urgências',
          description: 'Casos de risco são tratados com prioridade máxima.'
        }
      ]
    },
    faq: [
      {
        question: 'O que é guarda compartilhada?',
        answer: 'É quando ambos os pais dividem as decisões sobre educação, saúde e criação do filho, mesmo morando em casas diferentes.'
      },
      {
        question: 'A criança pode escolher com quem quer morar?',
        answer: 'A opinião da criança é ouvida (especialmente após 12 anos), mas a decisão é do juiz com base no melhor interesse dela.'
      },
      {
        question: 'E se um dos pais mora em outra cidade?',
        answer: 'A guarda compartilhada ainda é possível, com adaptações. Definimos um regime de convivência que funcione.'
      },
      {
        question: 'Posso impedir as visitas se a pensão atrasar?',
        answer: 'Não. Pensão e visitas são direitos independentes. A criança tem direito à convivência mesmo que a pensão atrase.'
      },
      {
        question: 'E em casos de violência?',
        answer: 'Podemos pedir medidas protetivas urgentes e guarda unilateral para proteger a criança.'
      }
    ],
    cta: {
      title: 'Seu filho merece ter os dois pais presentes',
      description: 'Vamos encontrar a melhor solução para sua família. Agende uma consulta e proteja esse direito.'
    }
  },

  'inventario-partilha-bens': {
    slug: 'inventario-partilha-bens',
    title: 'Inventário e Partilha',
    metaTitle: 'Inventário e Partilha de Bens em Aracaju | Judicial e Extrajudicial | Dra. Flávia Argolo',
    metaDescription: 'Inventário e partilha de bens em Aracaju com advogada especialista. Processo judicial ou em cartório. Resolva com transparência. 24 anos de experiência.',
    hero: {
      badge: 'Inventário',
      headline: 'Inventário Sem Brigas:',
      highlightedText: 'Resolva Com Transparência',
      subheadline: 'Partilha de bens com rapidez, justiça e respeito. Momento difícil merece tratamento cuidadoso.',
      whatsappMessage: 'Olá Dra. Flávia! Vim do seu site sobre *inventário* e gostaria de agendar uma conversa. Meu nome é: '
    },
    painPoints: {
      title: 'Você está passando por isso?',
      items: [
        'Perdeu um familiar e não sabe como dividir os bens?',
        'Os herdeiros não estão se entendendo sobre a partilha?',
        'Tem medo do inventário ser caro e demorado?',
        'Precisa regularizar imóveis que estão no nome do falecido?',
        'Não sabe se deve fazer em cartório ou na justiça?'
      ]
    },
    howItWorks: {
      title: 'Como funciona o Inventário?',
      steps: [
        {
          number: '01',
          title: 'Levantamento',
          description: 'Identificamos todos os bens, dívidas e herdeiros. Definimos se será judicial ou extrajudicial.'
        },
        {
          number: '02',
          title: 'Partilha',
          description: 'Elaboramos o plano de partilha buscando acordo entre todos os herdeiros.'
        },
        {
          number: '03',
          title: 'Formalização',
          description: 'Finalizamos o processo e transferimos os bens para o nome de cada herdeiro.'
        }
      ]
    },
    benefits: {
      title: 'Por que escolher a Dra. Flávia?',
      items: [
        {
          title: 'Agilidade',
          description: 'Inventário em cartório pode sair em semanas quando todos concordam.'
        },
        {
          title: 'Mediação Familiar',
          description: 'Ajudamos a resolver conflitos entre herdeiros.'
        },
        {
          title: 'Transparência',
          description: 'Todos os custos explicados desde o início.'
        },
        {
          title: 'Experiência',
          description: '24 anos fazendo inventários em Aracaju.'
        }
      ]
    },
    faq: [
      {
        question: 'Qual o prazo para abrir inventário?',
        answer: 'O ideal é abrir em até 60 dias após o falecimento para evitar multa no ITCMD. Mas pode ser feito depois, apenas pagando a multa.'
      },
      {
        question: 'Posso fazer em cartório?',
        answer: 'Sim, se todos os herdeiros forem maiores, capazes e concordarem com a partilha. É mais rápido e geralmente mais barato.'
      },
      {
        question: 'E se um herdeiro não concordar?',
        answer: 'Aí precisa ser judicial. O juiz decide a partilha se não houver acordo.'
      },
      {
        question: 'Quanto custa um inventário?',
        answer: 'Depende do valor dos bens e se será judicial ou cartório. Inclui honorários, taxas e impostos. Damos orçamento detalhado na consulta.'
      },
      {
        question: 'E as dívidas do falecido?',
        answer: 'As dívidas são pagas com os bens do espólio. Herdeiros não herdam dívidas além do que receberam.'
      }
    ],
    cta: {
      title: 'Resolva o inventário com paz',
      description: 'Esse momento já é difícil. Deixe a burocracia conosco. Vamos cuidar de tudo com respeito e eficiência.'
    }
  }
}

export function getLandingPageData(slug: string): LandingPageData | undefined {
  return LANDING_PAGES[slug]
}

export function getAllLandingPageSlugs(): string[] {
  return Object.keys(LANDING_PAGES)
}
