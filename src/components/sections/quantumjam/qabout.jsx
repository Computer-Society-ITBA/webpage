
import React from "react";
import '../../../styles/quantumjamFont.css';
import quantumjamColors from '../../../styles/quantumjamColors';
import i18n from '../../../i18n';

const QAbout = () => (
    <section
        className="quantumjam-font"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            width: '100%',
        }}
    >
        <div
            style={{
                background: '#140012',
                border: `2px solid ${quantumjamColors.secondary1}`,
                boxShadow: 'none',
                borderRadius: '22px',
                padding: '2.5rem 2rem 3.5rem 2rem',
                maxWidth: 900,
                width: '100%',
                color: quantumjamColors.white,
                textAlign: 'center',
            }}
        >
            <h2 style={{
                color: quantumjamColors.primary1,
                fontWeight: 700,
                fontSize: '2.2rem',
                marginBottom: 18,
                letterSpacing: 1.5,
            }}>{i18n.t('quantumJam.qabout.title')}</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
                {i18n.t('quantumJam.qabout.text')}
            </p>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '2.5rem 0 0 0',
                textAlign: 'left',
                maxWidth: 520,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ color: quantumjamColors.primary1, fontSize: '1.2em', marginRight: 10 }}>📅</span>
                    <span style={{ color: quantumjamColors.white }}>{i18n.t('quantumJam.qabout.date')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ color: quantumjamColors.primary3, fontSize: '1.2em', marginRight: 10 }}>📍</span>
                    <span style={{ color: quantumjamColors.white }}>{i18n.t('quantumJam.qabout.location')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: quantumjamColors.primary2, fontSize: '1.2em', marginRight: 10 }}>👥</span>
                    <span style={{ color: quantumjamColors.white }}>{i18n.t('quantumJam.qabout.participants')}</span>
                </li>
            </ul>
        </div>
    </section>
);

export default QAbout;