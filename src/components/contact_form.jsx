import React, {useState} from 'react';
import i18n from '../i18n/index.js';

const inputClass = "font-semibold px-4 py-3 my-1 rounded-lg text-black placeholder-orange-500 w-full"

function ContactForm () {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        window.location.href = `mailto:computersociety@itba.edu.ar?subject=${subject}&body=${body}`
        setSubject("")
        setBody("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
                id="subject"
                name="subject"
                type="text"
                autoComplete="off"
                value={subject}
                placeholder={i18n.t('contact_us.form.subject')}
                onChange={e => setSubject(e.target.value)}
                className={inputClass}
            />
            <textarea 
                cols="30" 
                rows="7"
                name="body"
                id="body"
                autoComplete="off"
                style={{resize: 'none'}}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder={i18n.t('contact_us.form.body')}
                className={inputClass}
            />
            <button 
                type="submit" 
                className="font-semibold rounded-lg mt-5 p-2 cursor-pointer bg-brand_primary text-white border-2 border-white w-full transition duration-300 hover:text-white hover:bg-brand_tertiary focus:text-white focus:bg-brand_tertiary focus:outline-none"
                >
                    {i18n.t('contact_us.form.send')}
            </button>
        </form>
    )
}



export default ContactForm; 