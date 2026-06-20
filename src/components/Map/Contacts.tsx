import { useState } from "react";
import ContactImage from "../../assets/images/contact.jpg";
import DirectorImage from "../../assets/Person.jpg";
import "./Contacts.scss";

// ── Contact Form ──────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Пожалуйста, введите ваше имя");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    if (!value.trim()) {
      setPhoneError("Пожалуйста, введите номер телефона");
      return false;
    }
    if (!phoneRegex.test(value.trim())) {
      setPhoneError("Введите корректный номер телефона");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) setNameError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value.trim()) setPhoneError("");
  };

  const sendToTelegram = async (name: string, phone: string) => {
    const BOT_TOKEN = "8703348503:AAEvLayIrZ5oMVAvKirEHdMBwlS5M56zMp0";
    const CHAT_ID = "630353326";
    
    const message = `
📞 <b>Новое сообщение с сайта Tintera</b>
━━━━━━━━━━━━━━━━━━━━━━

📄 <b>Страница:</b> Контакты
👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
━━━━━━━━━━━━━━━━━━━━━━
💡 <i>Скоро свяжемся с вами!</i>
    `;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      });
      return response.ok;
    } catch (error) {
      console.error("Telegram send error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    
    if (!isNameValid || !isPhoneValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      const sent = await sendToTelegram(name, phone);
      if (sent) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setNameError("");
        setPhoneError("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'contact-form__error-global';
        errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
        const form = document.querySelector('.contact-form');
        if (form) form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
      }
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'contact-form__error-global';
      errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
      const form = document.querySelector('.contact-form');
      if (form) form.prepend(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__head">
        <span className="contact-form__badge">
          <i className="ti ti-send" />
          Обратная связь
        </span>
        <h3 className="contact-form__title">Свяжитесь с нами</h3>
        <p className="contact-form__sub">
          Заполните форму и мы свяжемся с вами в ближайшее время
        </p>
      </div>

      <div className="contact-form__body">
        <div className={`contact-form__group ${nameError ? "contact-form__group--error" : ""}`}>
          <label htmlFor="contact-name">Ваше имя</label>
          <div className="contact-form__input-wrap">
            <input
              id="contact-name"
              type="text"
              placeholder="Иван Иванов"
              value={name}
              onChange={handleNameChange}
              onBlur={() => validateName(name)}
              required
            />
            <i className="ti ti-user" />
          </div>
          {nameError && <span className="contact-form__error">{nameError}</span>}
        </div>

        <div className={`contact-form__group ${phoneError ? "contact-form__group--error" : ""}`}>
          <label htmlFor="contact-phone">Номер телефона</label>
          <div className="contact-form__input-wrap">
            <input
              id="contact-phone"
              type="tel"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => validatePhone(phone)}
              required
            />
            <i className="ti ti-phone" />
          </div>
          {phoneError && <span className="contact-form__error">{phoneError}</span>}
        </div>

        <button type="submit" className="contact-form__btn" disabled={loading}>
          {loading ? (
            <>
              <span className="contact-form__spinner">
                <span className="contact-form__spinner-dot" />
                <span className="contact-form__spinner-dot" />
                <span className="contact-form__spinner-dot" />
              </span>
              <span>Отправка...</span>
            </>
          ) : (
            <>
              <span>Отправить</span>
              <i className="ti ti-arrow-right" />
            </>
          )}
        </button>

        {submitted && (
          <div className="contact-form__success">
            <i className="ti ti-circle-check" />
            <div>
              <span className="contact-form__success-title">Успешно отправлено!</span>
              <span className="contact-form__success-desc">Мы свяжемся с вами в ближайшее время</span>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

// ── Asosiy sahifa ──
function Contacts() {
  return (
    <>
      {/* ── Contact + Image Section ── */}
      <section className="contact-section">
        <div className="contact-deco" aria-hidden="true">
          <span className="contact-deco__blob contact-deco__blob--1" />
          <span className="contact-deco__blob contact-deco__blob--2" />
          <span className="contact-deco__ring contact-deco__ring--1" />
          <span className="contact-deco__ring contact-deco__ring--2" />
        </div>

        <div className="container">
          {/* ── Sarlavha ── */}
          <div className="contact-head">
            <span className="contact-eyebrow">
              Наша команда
            </span>
            <h2 className="contact-title">
              Люди, которые <br />
              <span className="contact-accent">создают уют</span>
            </h2>
            <p className="contact-sub">
              Профессионалы своего дела, готовые помочь вам создать идеальный интерьер
            </p>
          </div>

          <div className="contact-grid">
            {/* ── CHAP TOMON: Rasm ── */}
            <div className="contact-image">
              <div className="contact-image__wrapper">
                <img 
                  src={ContactImage} 
                  alt="Contact us" 
                />
                <div className="contact-image__overlay">
                  {/* Direktor ma'lumoti - rasm bilan */}
                  <div className="contact-image__director">
                    <div className="contact-image__director-avatar">
                      <img src={DirectorImage} alt="Беҳруз Азизович" />
                    </div>
                    <div className="contact-image__director-info">
                      <span className="contact-image__director-label">Руководитель</span>
                      <h4 className="contact-image__director-name">Behruz Azizovich</h4>
                      <span className="contact-image__director-role">Основатель &amp; Директор</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Rasm tashqarisida: Ijtimoiy tarmoqlar (yangi dizayn) ── */}
              <div className="contact-image__socials">
                <a href="tel:+998901234567" className="contact-image__social contact-image__social--phone" aria-label="Phone">
                  <i className="ti ti-phone" />
                  <span>Телефон</span>
                </a>
                <a href="#" className="contact-image__social contact-image__social--instagram" aria-label="Instagram">
                  <i className="ti ti-brand-instagram" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="contact-image__social contact-image__social--telegram" aria-label="Telegram">
                  <i className="ti ti-brand-telegram" />
                  <span>Telegram</span>
                </a>
                <a href="#" className="contact-image__social contact-image__social--facebook" aria-label="Facebook">
                  <i className="ti ti-brand-facebook" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* ── O'NG TOMON: Forma ── */}
            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;