import React, { useState, FormEvent } from 'react';
import { useForm } from '@formspree/react';
import { Mail, MessageSquare, Send, User } from 'lucide-react';

export default function Contact() {
  const [state, handleSubmit] = useForm("meoqbqap");
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: '',
    email: '',
    message: ''
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
    if (state.succeeded) {
      setPopupVisible(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Get in Touch</h2>
        <div className="max-w-3xl mx-auto mt-12">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="input-label">
                <User className="w-5 h-5 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="input-label">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="input-label">
                <MessageSquare className="w-5 h-5 mr-2" />
                  Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center" disabled={state.submitting}>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto text-center">
            <h2 className="text-lg font-semibold text-gray-900">Thanks!</h2>
            <p className="text-gray-600">The Message was submitted successfully.</p>
            <button 
              onClick={() => setPopupVisible(false)} 
              className="btn-primary w-1/2 flex items-center justify-center"
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </section>
  );
}