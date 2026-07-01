import React, { useState } from 'react'
import { ContactPanel } from '../components/ContactPanel.jsx'
import { Link } from '../components/Link.jsx'
import { ParallaxHero } from '../components/ParallaxHero.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { bookingEnquiryRecipients, images } from '../data/siteData.js'
import { pageMeta } from '../seo/pageMeta.js'

const EVENT_TYPES = ['Birthday', 'Company drinks', 'Sports team', 'Watch party', 'Casual table', 'Other event']

function BookingForm() {
  const [form, setForm] = useState({ name: '', date: '', groupSize: '', eventType: '', phone: '', notes: '' })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setSubmitted(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim() || !form.date || !String(form.groupSize).trim() || !form.eventType || !form.phone.trim()) {
      setError('Please fill in your name, preferred date, group size, event type, and phone or WeChat ID.')
      setSubmitted(false)
      return
    }

    setError('')

    const subject = 'ATOC Booking Enquiry'
    const body = [
      `Name: ${form.name}`,
      `Preferred date: ${form.date}`,
      `Group size: ${form.groupSize}`,
      `Event type: ${form.eventType}`,
      `Phone / WeChat: ${form.phone}`,
      `Notes: ${form.notes}`,
    ].join('\n')

    const mailto = `mailto:${bookingEnquiryRecipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <div className="booking-form-shell">
      <h2>please fill in the form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="booking-name">
          Name
          <input id="booking-name" type="text" placeholder="Your name" value={form.name} onChange={update('name')} />
        </label>
        <label htmlFor="booking-date">
          Preferred date
          <input id="booking-date" type="date" value={form.date} onChange={update('date')} />
        </label>
        <label htmlFor="booking-size">
          Group size
          <input id="booking-size" type="number" min="1" placeholder="Number of guests" value={form.groupSize} onChange={update('groupSize')} />
        </label>
        <label htmlFor="booking-type">
          Event type
          <select id="booking-type" value={form.eventType} onChange={update('eventType')}>
            <option value="">Select an event type</option>
            {EVENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label htmlFor="booking-phone">
          Phone / WeChat
          <input id="booking-phone" type="text" placeholder="Phone or WeChat ID" value={form.phone} onChange={update('phone')} />
        </label>
        <label htmlFor="booking-notes">
          Notes
          <textarea id="booking-notes" placeholder="Tell us what you need" rows={3} value={form.notes} onChange={update('notes')} />
        </label>

        {error && <p className="booking-form-error" role="alert">{error}</p>}
        {submitted && !error && <p className="booking-form-success" role="status">Thanks — your booking enquiry is ready to send.</p>}

        <button type="submit" className="booking-form-submit">Send booking enquiry</button>
      </form>
    </div>
  )
}

export function Bookings() {
  return (
    <>
      <ParallaxHero
        compact
        className="hero-darken"
        eyebrow="Private events / bookings"
        title={pageMeta['/bookings'].h1}
        text="Plan private parties, group drinks, sports watch parties, birthdays, company nights, and casual tables at ATOC in Guangzhou."
        image={images.bar}
        actions={[{ label: 'Start a Booking', href: '/contact' }, { label: 'Book a Sports Watch Party', href: '/sports' }, { label: 'View the Venue', href: '/gallery' }]}
      />
      <ScrollReveal className="section split-feature">
        <div>
          <SectionTitle eyebrow="Booking types" title="Book your birthday or other event with us">
            ATOC can support parties, birthdays, company drinks, sport teams, and casual table bookings. Contact us for reservations.
          </SectionTitle>
          <div className="booking-types">
            {['Sports watch party', 'Birthday drinks', 'Team night', 'Dragon boat group', 'Company drinks', 'Casual table'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="social-row">
            <Link href="/menus">Browse drinks before booking</Link>
            <Link href="/gallery">View the space before booking</Link>
          </div>
        </div>
        <BookingForm />
      </ScrollReveal>
      <ScrollReveal className="section">
        <ContactPanel />
      </ScrollReveal>
    </>
  )
}
