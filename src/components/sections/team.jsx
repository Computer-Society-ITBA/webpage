import React, { useEffect, useState } from "react";
import usePaging from "../../hooks/usePaging";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { motion } from "framer-motion";
// Translations
import i18n from "../../i18n/index.js";
//Imports from firebase
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
// Icons
import Icon from "@mdi/react";
import {
    mdiInstagram,
    mdiLinkedin,
    mdiWeb,
    mdiGithub,
    mdiChevronLeft,
    mdiChevronRight,
} from "@mdi/js";

// Components
const Section = React.lazy(() => import("../section"));

const cardWidth = 225;
const roles = [
    "team.roles.all",
    "team.roles.directors",
    "team.roles.it",
    "team.roles.media",
    "team.roles.fr",
    "team.roles.mentors",
];

const roles_director = [
    "",
    "",
    "team.roles.head_it",
    "team.roles.head_media",
    "team.roles.head_fr",
    "team.roles.head_mentors",
    "team.roles.codirector",
    "team.roles.codirectora",
];

async function getImage(member) {
    try {
        const response = await fetch(member.image.src);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = (read) => {
            member.image.src = read.target.result;
        };
        reader.readAsDataURL(blob);
    } catch (err) {
        console.error(err);
    }
}

var indexOfRole = 0;

function Team() {
    const [dynamicTeam, setDynamicTeam] = useState([]);
    const [team, setTeam] = useState([]);
    useEffect(() => {
        async function getTeam() {
            const query = await getDocs(collection(db, "team_24_25"));
            const data = query.docs
                .map((doc) => doc.data())
                .sort((a, b) => {
                    let idxA = roles_director.indexOf(a.title);
                    let idxB = roles_director.indexOf(b.title);
                    if (idxA === -1 && idxB === -1) return 0;
                    if (idxA === -1) return 1;
                    if (idxB === -1) return -1;
                    return idxB - idxA;
                });

            data.forEach((member) => getImage(member));

            setTeam(data);
        }
        getTeam();
    }, []);
    useEffect(() => setDynamicTeam(team), [team]);
    const [page, handleLeftClick, handleRightClick, pageLimit] = usePaging(
        cardWidth,
        dynamicTeam,
        2
    );
    const { width } = useWindowDimensions();
    const [currentRole, setCurrentRole] = useState(0);

    function setTeamByRole(role) {
        indexOfRole = roles.indexOf(role);
        // const indexOfRole = roles.indexOf(role);
        if (role === "team.roles.all") {
            setDynamicTeam(team);
        } else if (role === "team.roles.directors") {
            setDynamicTeam(
                team.filter((member) => roles_director.includes(member.title))
            );
        } else {
            setDynamicTeam(
                team.filter(
                    (member) =>
                        member.title === role ||
                        roles_director[indexOfRole] === member.title
                )
            );
        }
        setCurrentRole(indexOfRole);
    }

    return (
        <Section
            id="our-team"
            bgColor="bg-white"
            textAlignment="center"
            className="h-full overflow-hidden"
        >
            <h2>{i18n.t("team.title")}</h2>
            <div className="flex justify-center w-100 mt-2 mb-2">
                <div
                    className={`hidden lg:flex items-center justify-between ${width > 810 ? "flex-1" : ""
                        } max-w-screen-xl `}
                >
                    {roles.map((role, i) => (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            key={i}
                        >
                            <h5
                                className={`${i === currentRole
                                    ? "bg-brand_secondary"
                                    : "bg-brand_primary"
                                    } p-3 rounded-xl cursor-pointer text-white`}
                                onClick={() => setTeamByRole(role)}
                            >
                                {i18n.t(role)}
                            </h5>
                        </motion.div>
                    ))}
                </div>
                <select
                    className="lg:hidden flex w-full max-w-xs mx-auto bg-brand_primary text-white py-3 px-6 text-xl focus:border-0"
                    name="roles"
                    id="roles"
                    value={roles[currentRole]}
                    onChange={(event) => setTeamByRole(event.target.value)}
                >
                    {roles.map((role, _) => (
                        <option value={role}>{i18n.t(role)}</option>
                    ))}
                </select>
            </div>

            <div
                className="flex mt-2 mb-2"
            >
                {/* Desktop View: Centered Carousel with Flexbox */}
                <div
                    className={`hidden lg:flex w-full ${dynamicTeam.length <= 6 ? "justify-center" : "justify-start"}`}
                    style={{ overflow: 'hidden' }}
                >
                    <motion.div
                        //   className="flex grid grid-rows-2 grid-flow-col w-10"
                        className="flex grid grid-rows-2 grid-flow-col"
                        animate={{ x: -1 * page * cardWidth }}
                        style={{ justifyContent: indexOfRole ? "center" : "start" }}
                    //   style={{flexDirection: 'column',}}
                    // drag="x"
                    // dragConstraints={{ left: limitLeft, right: 0 }}
                    // dragElastic={false}
                    // dragMomentum={false}
                    >
                        {dynamicTeam.map((person, index) => {
                            return (
                                <div key={index} className="flex flex-col h-auto team-card">
                                    <div className="flex flex-col rounded-xl items-center shadow-xl p-2 m-4 mb-6 h-full">
                                        <img
                                            className="rounded-full object-cover"
                                            src={person.image.src}
                                            alt={person.image.alt}
                                        />
                                        <h4>{person.name}</h4>
                                        <p className="font-light uppercase opacity-75 mb-2">
                                            {i18n.t(person.title)}
                                        </p>
                                        <div className="flex flex-row justify-center items-center w-full mt-auto">
                                            {person.social.map((item, index) => {
                                                let icon = undefined;
                                                let className =
                                                    "px-2 text-typography_primary transform duration-100 ";

                                                switch (item.logo) {
                                                    case "web":
                                                        icon = mdiWeb;
                                                        className += "hover:text-pink-700 hover:scale-125 focus:text-pink-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "linkedin":
                                                        icon = mdiLinkedin;
                                                        className += "hover:text-blue-700 hover:scale-125 focus:text-blue-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "github":
                                                        icon = mdiGithub;
                                                        className += "hover:text-green-700 hover:scale-125 focus:text-green-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "instagram":
                                                    default:
                                                        icon = mdiInstagram;
                                                        className += "hover:text-purple-700 hover:scale-125 focus:text-purple-700 focus:scale-125 focus:outline-none";
                                                }

                                                return (
                                                    <a
                                                        key={index}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={className}
                                                    >
                                                        <Icon
                                                            path={icon}
                                                            size={1}
                                                            className="focus:outline-none"
                                                        />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Mobile View: Horizontal Scrollable Carousel */}
                <div
                    className={`lg:hidden flex overflow-x-scroll grid grid-rows-2 grid-flow-col space-x-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
                >
                    {dynamicTeam.map((person, index) => (
                        <div key={index} className="flex flex-col h-auto team-card snap-start">
                            <div className="flex flex-col rounded-xl items-center shadow-xl p-2 m-4 mb-6 h-full">
                                <img
                                    className="rounded-full object-cover"
                                    src={person.image.src}
                                    alt={person.image.alt}
                                />
                                <h4>{person.name}</h4>
                                <p className="font-light uppercase opacity-75 mb-2">
                                    {i18n.t(person.title)}
                                </p>
                                <div className="flex flex-row justify-center items-center w-full mt-auto">
                                    {person.social.map((item, index) => {
                                        let icon;
                                        let className =
                                            "px-2 text-typography_primary transform duration-100";

                                        switch (item.logo) {
                                            case "web":
                                                icon = mdiWeb;
                                                className += " hover:text-pink-700 hover:scale-125";
                                                break;
                                            case "linkedin":
                                                icon = mdiLinkedin;
                                                className += " hover:text-blue-700 hover:scale-125";
                                                break;
                                            case "github":
                                                icon = mdiGithub;
                                                className += " hover:text-green-700 hover:scale-125";
                                                break;
                                            default:
                                                icon = mdiInstagram;
                                                className += " hover:text-purple-700 hover:scale-125";
                                        }

                                        return (
                                            <a
                                                key={index}
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={className}
                                            >
                                                <Icon path={icon} size={1} className="focus:outline-none" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="hidden lg:flex flex-row w-full items-center justify-center"
            >
                <button
                    disabled={page === 0}
                    onClick={handleLeftClick}
                    className={
                        "focus:outline-none mr-4 rounded-full bg-light " +
                        (page === 0
                            ? "opacity-50"
                            : "transition duration-150 hover:text-brand_primary")
                    }
                >
                    <Icon path={mdiChevronLeft} size={3} />
                </button>
                <button
                    disabled={page >= pageLimit}
                    onClick={handleRightClick}
                    className={
                        "focus:outline-none rounded-full bg-light " +
                        (page >= pageLimit
                            ? "opacity-50"
                            : "transition duration-150 hover:text-brand_primary")
                    }
                >
                    <Icon path={mdiChevronRight} size={3} />
                </button>
            </div>
        </Section>
    );
}

export default Team;
