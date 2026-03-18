import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

type ActiveScreen = null | "appointment" | "diagnosis" | "prescription"

interface AppointmentScreenProps {
  onClose: () => void
}

interface DiagnosisScreenProps {
  onClose: () => void
  onGoToAppointment: () => void
}

interface PrescriptionScreenProps {
  onClose: () => void
}

function AppointmentScreen({ onClose }: AppointmentScreenProps) {
  const [form, setForm] = useState({ name: "", phone: "", doctor: "", date: "" })
  const [submitted, setSubmitted] = useState(false)

  const doctors = [
    "Терапевт",
    "Кардиолог",
    "Невролог",
    "Эндокринолог",
    "Офтальмолог",
    "Ортопед",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>

          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-4">Запись к врачу</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
            Выберите врача
            <span className="italic block">и удобное время</span>
          </h2>

          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} className="text-sage" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">Запись подтверждена!</h3>
              <p className="text-muted-foreground text-lg">Мы свяжемся с вами для подтверждения времени.</p>
              <button
                onClick={onClose}
                className="mt-10 px-8 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
              >
                На главную
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                  placeholder="Иван Иванович"
                  required
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Специалист
                </label>
                <select
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-lg text-foreground focus:border-sage focus:outline-none transition-colors cursor-pointer"
                  required
                >
                  <option value="" disabled>Выберите врача</option>
                  {doctors.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Удобная дата
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-4 text-lg text-foreground focus:border-sage focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500 mt-4"
              >
                Записаться
                <Icon name="ArrowRight" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function DiagnosisScreen({ onClose, onGoToAppointment }: DiagnosisScreenProps) {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const diagnoses: Record<string, { diagnosis: string; recommendation: string }> = {
    default: {
      diagnosis: "На основе описанных симптомов возможны несколько состояний. Рекомендуется консультация терапевта для точного диагноза.",
      recommendation: "Рекомендуем записаться к терапевту для детального обследования.",
    },
    голова: {
      diagnosis: "Головная боль может быть связана с повышенным давлением, мигренью или напряжением мышц шеи. Требует наблюдения.",
      recommendation: "Рекомендуем измерить давление и записаться к неврологу или терапевту.",
    },
    сердце: {
      diagnosis: "Боли в области сердца или груди могут быть признаком сердечно-сосудистых заболеваний. Необходима консультация кардиолога.",
      recommendation: "Рекомендуем срочно обратиться к кардиологу и сделать ЭКГ.",
    },
    давление: {
      diagnosis: "Повышенное или пониженное артериальное давление — распространённое состояние, требующее регулярного контроля и подбора терапии.",
      recommendation: "Рекомендуем записаться к кардиологу или терапевту для подбора лечения.",
    },
    сустав: {
      diagnosis: "Боли в суставах могут указывать на артрит, артроз или воспалительный процесс. Важна своевременная диагностика.",
      recommendation: "Рекомендуем консультацию ортопеда или ревматолога.",
    },
    температура: {
      diagnosis: "Повышенная температура тела — признак воспалительного или инфекционного процесса в организме.",
      recommendation: "Рекомендуем обратиться к терапевту и не заниматься самолечением.",
    },
  }

  const getDiagnosis = () => {
    setLoading(true)
    setTimeout(() => {
      const lower = symptoms.toLowerCase()
      let found = diagnoses.default
      for (const key of Object.keys(diagnoses)) {
        if (lower.includes(key)) {
          found = diagnoses[key]
          break
        }
      }
      setResult(JSON.stringify(found))
      setLoading(false)
    }, 1800)
  }

  const parsed = result ? JSON.parse(result) : null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>

          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-4">Диагностика</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Опишите
            <span className="italic block">ваши симптомы</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Расскажите подробнее — что беспокоит, как давно, где болит.
          </p>

          {!parsed ? (
            <div className="space-y-6">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={6}
                className="w-full bg-sand/50 border border-border p-5 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors resize-none"
                placeholder="Например: болит голова с утра, давление 140/90, кружится голова при резких движениях..."
              />
              <button
                onClick={getDiagnosis}
                disabled={!symptoms.trim() || loading}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Icon name="Loader" size={16} className="animate-spin" />
                    Анализируем...
                  </>
                ) : (
                  <>
                    Получить результат
                    <Icon name="ArrowRight" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-sand/60 p-8 border-l-4 border-sage">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Предварительный анализ</p>
                <p className="text-foreground text-lg leading-relaxed">{parsed.diagnosis}</p>
              </div>

              <div className="bg-terracotta/10 p-6">
                <p className="text-xs tracking-widest uppercase text-terracotta mb-3">Рекомендация</p>
                <p className="text-foreground leading-relaxed">{parsed.recommendation}</p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                * Данный анализ носит информационный характер и не является медицинским диагнозом.
                Для точного диагноза обратитесь к врачу.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGoToAppointment}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500"
                >
                  <Icon name="Calendar" size={16} />
                  Узнать подробнее у специалиста
                </button>
                <button
                  onClick={() => { setResult(null); setSymptoms("") }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-5 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground border border-border transition-colors duration-500"
                >
                  Новый запрос
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PrescriptionScreen({ onClose }: PrescriptionScreenProps) {
  const [diagnosis, setDiagnosis] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const medications: Record<string, { drugs: Array<{ name: string; description: string }>; warning: string }> = {
    давление: {
      drugs: [
        { name: "Лизиноприл", description: "Снижает артериальное давление. Принимается 1 раз в день утром." },
        { name: "Амлодипин", description: "Расширяет сосуды, нормализует давление. Обычно 1 раз в сутки." },
        { name: "Бисопролол", description: "Уменьшает частоту сердечных сокращений и снижает давление." },
      ],
      warning: "Дозировку подбирает только врач. Самостоятельная отмена препаратов опасна.",
    },
    головная: {
      drugs: [
        { name: "Парацетамол", description: "Обезболивающее. При головной боли 500–1000 мг, не более 4 раз в день." },
        { name: "Ибупрофен", description: "Противовоспалительное и обезболивающее. 200–400 мг за приём." },
        { name: "Цитрамон", description: "Комбинированный препарат при головной боли и мигрени." },
      ],
      warning: "При частых головных болях необходимо обследование у невролога.",
    },
    сустав: {
      drugs: [
        { name: "Диклофенак", description: "Снимает воспаление и боль в суставах. Мазь или таблетки по назначению врача." },
        { name: "Мелоксикам", description: "Противовоспалительное средство. Щадящее воздействие на желудок." },
        { name: "Хондроитин", description: "Хондропротектор — восстанавливает хрящевую ткань при длительном приёме." },
      ],
      warning: "Длительный приём НПВС без врачебного контроля может навредить желудку.",
    },
    сердце: {
      drugs: [
        { name: "Аспирин кардио", description: "Разжижает кровь, снижает риск тромбоза. 100 мг в день по назначению врача." },
        { name: "Нитроглицерин", description: "Экстренная помощь при приступе стенокардии. Под язык." },
        { name: "Коронал", description: "Бета-блокатор для лечения сердечной недостаточности и стенокардии." },
      ],
      warning: "Сердечные препараты назначаются строго врачом. Не занимайтесь самолечением!",
    },
    default: {
      drugs: [
        { name: "Витамин D3", description: "Важен для пожилых людей — укрепляет кости и иммунитет. 1000–2000 МЕ в день." },
        { name: "Магний B6", description: "Снижает усталость, поддерживает сердце и нервную систему." },
        { name: "Омега-3", description: "Поддерживает работу сердца и сосудов, снижает воспаление." },
      ],
      warning: "Для подбора конкретных препаратов обратитесь к вашему лечащему врачу.",
    },
  }

  const getMeds = () => {
    setLoading(true)
    setTimeout(() => {
      const lower = diagnosis.toLowerCase()
      let found = medications.default
      for (const key of Object.keys(medications)) {
        if (lower.includes(key)) {
          found = medications[key]
          break
        }
      }
      setResult(JSON.stringify(found))
      setLoading(false)
    }, 1600)
  }

  const parsed = result ? JSON.parse(result) : null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>

          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-4">Рецепт</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Препараты
            <span className="italic block">при вашем диагнозе</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Введите ваш диагноз или основной симптом, чтобы узнать о возможных препаратах.
          </p>

          {!parsed ? (
            <div className="space-y-6">
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full bg-transparent border-b border-border py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                placeholder="Например: повышенное давление, головная боль, суставы..."
              />
              <button
                onClick={getMeds}
                disabled={!diagnosis.trim() || loading}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Icon name="Loader" size={16} className="animate-spin" />
                    Подбираем препараты...
                  </>
                ) : (
                  <>
                    Найти препараты
                    <Icon name="ArrowRight" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Рекомендованные препараты</p>
              <div className="space-y-4">
                {parsed.drugs.map((drug: { name: string; description: string }, i: number) => (
                  <div key={i} className="bg-sand/60 p-6 border-l-4 border-sage">
                    <p className="font-serif text-xl text-foreground mb-2">{drug.name}</p>
                    <p className="text-muted-foreground leading-relaxed">{drug.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-terracotta/10 p-5 flex gap-3">
                <Icon name="AlertTriangle" size={18} className="text-terracotta flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{parsed.warning}</p>
              </div>

              <button
                onClick={() => { setResult(null); setDiagnosis("") }}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground border border-border transition-colors duration-500"
              >
                Новый запрос
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const services = [
  {
    id: "appointment" as const,
    title: "Запись к врачу",
    description: "Выберите специалиста и удобное время — мы запишем вас и напомним о приёме.",
    icon: "Calendar",
    color: "text-sage",
  },
  {
    id: "diagnosis" as const,
    title: "Диагностика",
    description: "Опишите симптомы — искусственный интеллект поможет разобраться и направит к нужному врачу.",
    icon: "Stethoscope",
    color: "text-terracotta",
  },
  {
    id: "prescription" as const,
    title: "Рецепт",
    description: "Узнайте о препаратах при вашем диагнозе: что принимать, как и в какой дозировке.",
    icon: "Pill",
    color: "text-indigo",
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="services" className="py-32 lg:py-40 px-6 lg:px-12 bg-sand/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p
              className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Возможности приложения
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Три функции для вашего здоровья
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveScreen(service.id)}
                className={`group bg-background p-10 lg:p-14 text-left transition-all duration-1000 hover:bg-card w-full ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className={`${service.color} mb-6 transition-transform duration-500 group-hover:scale-110`}>
                  <Icon name={service.icon} size={40} fallback="Circle" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  Открыть
                  <Icon name="ArrowRight" size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeScreen === "appointment" && (
        <AppointmentScreen onClose={() => setActiveScreen(null)} />
      )}
      {activeScreen === "diagnosis" && (
        <DiagnosisScreen
          onClose={() => setActiveScreen(null)}
          onGoToAppointment={() => setActiveScreen("appointment")}
        />
      )}
      {activeScreen === "prescription" && (
        <PrescriptionScreen onClose={() => setActiveScreen(null)} />
      )}
    </>
  )
}
