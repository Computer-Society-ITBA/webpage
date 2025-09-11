
import React from 'react';
import quantumjamColors from '../../../styles/quantumjamColors';
import i18n from '../../../i18n';

const QHero = () => (
    <section
        style={{
            color: quantumjamColors.white,
            padding: '80px 20px',
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        <h1
            style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                letterSpacing: '2px',
                background: `linear-gradient(135deg, ${quantumjamColors.primary1}, ${quantumjamColors.primary2})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
            }}
        >
            {i18n.t('quantumJam.qhero.quantumJam')} 2025
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '400', marginBottom: '30px', color: quantumjamColors.primary3 }}>
            {i18n.t('quantumJam.qhero.slogan')}
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6, color: quantumjamColors.white }}>
            {i18n.t('quantumJam.qhero.description')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <a
                href="#register"
                style={{
                    display: 'inline-block',
                    background: quantumjamColors.primary2,
                    color: quantumjamColors.white,
                    padding: '8px 24px',
                    borderRadius: '24px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    maxWidth: '320px',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                {i18n.t('quantumJam.qhero.register')}
            </a>
        </div>
    </section>
);

export default QHero;