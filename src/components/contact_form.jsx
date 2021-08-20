import React, {useState} from 'react';
import i18n from '../i18n/index.js';

const inputClass = "p-2 my-1 rounded-md bg-brand_secondary text-black border-2 border-black focus:outline-none focus:border-gray-300 focus:border-2 placeholder-gray-600"

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
        <form onSubmit={handleSubmit} className="flex flex-col">
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
                className="rounded-md mt-1 p-2 cursor-pointer bg-brand_primary text-typography_primary border-2 border-typography_primary transition duration-300 hover:text-white hover:bg-typography_primary focus:text-white focus:bg-typography_primary focus:outline-none"
                >
                    {i18n.t('contact_us.form.send')}
            </button>
        </form>
    )
}



export default ContactForm; 