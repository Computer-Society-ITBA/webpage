import React from "react";
import i18n from "../../../i18n";

import workshop1Img from '../../../images/quantumjam_images/workshop1.jpg';
import workshop2Img from '../../../images/quantumjam_images/workshop2.jpg';
import workshop3Img from '../../../images/quantumjam_images/workshop3.jpg';
import workshop4Img from '../../../images/quantumjam_images/workshop4.jpg';

const images = {
    workshop1: workshop1Img,
    workshop2: workshop2Img,
    workshop3: workshop3Img,
    workshop4: workshop4Img,
}


const QWorkshops = () => {
    const workshops = i18n.t("quantumJam.qworkshops.workshops", { returnObjects: true });
    return (
        <div className="mx-[10%] my-[8rem]">
        <h2 className="text-4xl md:text-5xl font-quantumjam-JetBrains-Mono tracking-wider font-bold text-quantum-primary1 mb-12 text-center">
            {i18n.t("quantumJam.qworkshops.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {workshops.map((workshop, idx) => (
            <div
                key={idx}
                className="bg-quantum-dark border-2 border-quantum-secondary1 rounded-2xl p-6 grid grid-rows-2 items-center text-center transition-transform transform hover:scale-105"
            >
                <div>
                    {workshop.image && (
                    <img
                        src={images[workshop.image]}
                        alt={workshop.title}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    )}
                </div>
                <div className="flex flex-col justify-between gap-4 h-full">
                    <h3 className="font-quantumjam-JetBrains-Mono tracking-wider text-xl font-bold text-quantum-primary3 mb-2">
                    {workshop.title}
                    </h3>
                    <p className="text-quantum-white text-base mb-2">{workshop.description}</p>
                    <p className="text-quantum-primary1 font-semibold">{i18n.t("quantumJam.qworkshops.speaker")}: {workshop.speaker}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default QWorkshops;
