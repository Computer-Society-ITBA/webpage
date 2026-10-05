import React, {useState} from 'react';
import i18n from '../i18n/index.js';
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const inputClass = "px-4 py-3 my-1 rounded-lg text-black placeholder-grey-400 w-full"

function ContactForm () {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [email, setEmail] = useState("");
    const [contactType, setContactType] = useState("");
    const [submitStatus, setSubmitStatus] = useState("");

  
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (submitStatus === "sending") {
            return;
        }

        if (!subject.trim() || !body.trim()) {
            setSubmitStatus("invalid");
            return;
        }
        setSubmitStatus("sending");
        try {
        await addDoc(collection(db, "contactMessages"), {
            email: email.trim(),
            contactType: contactType,
            subject: subject.trim(),
            body: body.trim(),
            createdAt: serverTimestamp(),
        });

            setSubject("");
            setBody("");
            setEmail("");
            setContactType("");
            setSubmitStatus("success");

        } catch (error) {
            console.error("Failed to save contact message:", error);
            setSubmitStatus("error");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
        
        <fieldset
            disabled={submitStatus === "sending"}
            className="w-full flex flex-col items-center"
        >

            <label htmlFor="contactType" className="self-start text-white">
                {i18n.t('contact_us.form.contact_type')}
            </label>

            <select
                id="contactType"
                name="contactType"
                required
                value={contactType}
                onChange={e => setContactType(e.target.value)}
                className={inputClass}
            >
                <option value="" disabled>
                    {i18n.t('contact_us.form.choose_type')}
                </option>
                <option value="sponsor">
                    {i18n.t('contact_us.form.sponsor')}
                </option>
                <option value="other">
                    {i18n.t('contact_us.form.other')}
                </option>
            </select>



                <label htmlFor="email" className="sr-only">
                    {i18n.t('contact_us.form.email')}
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={email}
                    placeholder={i18n.t('contact_us.form.email')}
                    onChange={e => setEmail(e.target.value)}
                    className={inputClass}
                />
                
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={120}
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
                    maxLength={3000}
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
                        {i18n.t(submitStatus === "sending"
                                        ? 'contact_us.form.sending'
                                        : 'contact_us.form.send')}
                </button>
        </fieldset>
            {submitStatus && (
                        <p role="status" className="mt-3 text-white">
                            {i18n.t(`contact_us.form.${submitStatus}`)}
                        </p>
                    )}
        </form>
    )
}



export default ContactForm; 