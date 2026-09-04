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
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
const Section = React.lazy(() => import("../section"));

const cardWidth = 270;
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
            const query = await getDocs(collection(db, "team_26_27"));
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
        2,
        3
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
                                    ? "text-typography_primary border-brand_secondary"
                                    : "text-brand_tertiary border-transparent"
                                    } px-1 py-3 border-b-4 cursor-pointer font-semibold`}
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
                className="flex items-center justify-center mt-2 mb-2"
            >
                <button
                    disabled={page === 0}
                    onClick={handleLeftClick}
                    aria-label="Previous team members"
                    className={
                        "hidden lg:flex flex-shrink-0 items-center justify-center p-2 mr-2 rounded-full bg-white shadow-md focus:outline-none " +
                        (page === 0
                            ? "opacity-40"
                            : "transition duration-150 hover:text-brand_primary hover:scale-105")
                    }
                >
                    <Icon path={mdiChevronLeft} size={2} />
                </button>


                {/* Desktop View: Centered Carousel with Flexbox */}
                <div
                    className={`hidden lg:flex flex-none w-[810px] xl:w-[1080px] 2xl:w-[1350px] ${dynamicTeam.length <= 6 ? "justify-center" : "justify-start"}`}
                    style={{ overflow: "hidden" }}
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
                                    <div className="flex flex-col rounded-xl overflow-hidden items-center shadow-xl m-4 mb-6 h-full border-b-[6px] border-b-brand_secondary bg-white">
                                        <img
                                            className="object-cover"
                                            src={person.image.src}
                                            alt={person.image.alt}
                                        />
                                        <div className="flex flex-col items-center w-full min-h-[136px] px-4 py-4">
                                            <h4 className="flex items-center justify-center w-full min-h-[64px] text-center font-semibold mb-0">
                                                {person.name}
                                            </h4>
                                            <p className="text-sm leading-sm text-center font-semibold uppercase text-brand_secondary mt-2 mb-0">
                                                {i18n.t(person.title)}
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center w-full mt-auto py-3 gap-1 border-t border-gray-100">
                                            {person.social.map((item, index) => {
                                                let SocialIcon = InstagramIcon;
                                                let className =
                                                    "p-2 rounded-full text-typography_primary transform duration-150 hover:bg-light focus:bg-light ";

                                                switch (item.logo) {
                                                    case "web":
                                                        SocialIcon = LanguageIcon;
                                                        className += "hover:text-pink-700 hover:scale-125 focus:text-pink-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "linkedin":
                                                        SocialIcon = LinkedInIcon;
                                                        className += "hover:text-blue-700 hover:scale-125 focus:text-blue-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "github":
                                                        SocialIcon = GitHubIcon;
                                                        className += "hover:text-green-700 hover:scale-125 focus:text-green-700 focus:scale-125 focus:outline-none";
                                                        break;
                                                    case "instagram":
                                                    default:
                                                        SocialIcon = InstagramIcon;
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
                                                        <SocialIcon
                                                            sx={{ fontSize: "1.5rem" }}
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

                <button
                    disabled={page >= pageLimit}
                    onClick={handleRightClick}
                    aria-label="Next team members"
                    className={
                        "hidden lg:flex flex-shrink-0 items-center justify-center p-2 ml-2 rounded-full bg-white shadow-md focus:outline-none " +
                        (page >= pageLimit
                            ? "opacity-40"
                            : "transition duration-150 hover:text-brand_primary hover:scale-105")
                    }
                >
                    <Icon path={mdiChevronRight} size={2} />
                </button>

                {/* Mobile View: Horizontal Scrollable Carousel */}
                <div
                    className={`lg:hidden flex overflow-x-auto gap-8 px-4 py-2 snap-x snap-mandatory`}
                >
                    {dynamicTeam.map((person, index) => (
                        <div key={index} className="flex flex-col h-auto team-card mobile-team-card flex-shrink-0 snap-center">
                            <div className="flex flex-col rounded-xl overflow-hidden items-center shadow-xl m-4 mb-6 h-full border-b-[6px] border-b-brand_secondary bg-white">
                                <img
                                    className="object-cover"
                                    src={person.image.src}
                                    alt={person.image.alt}
                                />
                                <div className="flex flex-col items-center w-full min-h-[136px] px-4 py-4">
                                    <h4 className="flex items-center justify-center w-full min-h-[64px] text-center font-semibold mb-0">
                                        {person.name}
                                    </h4>
                                    <p className="text-sm leading-sm text-center font-semibold uppercase text-brand_secondary mt-2 mb-0">
                                        {i18n.t(person.title)}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center items-center w-full mt-auto py-3 gap-1 border-t border-gray-100">
                                    {person.social.map((item, index) => {
                                        let SocialIcon = InstagramIcon;
                                        let className =
                                            "p-2 rounded-full text-typography_primary transform duration-150 hover:bg-light focus:bg-light";

                                        switch (item.logo) {
                                            case "web":
                                                SocialIcon = LanguageIcon;
                                                className += " hover:text-pink-700 hover:scale-125";
                                                break;
                                            case "linkedin":
                                                SocialIcon = LinkedInIcon;
                                                className += " hover:text-blue-700 hover:scale-125";
                                                break;
                                            case "github":
                                                SocialIcon = GitHubIcon;
                                                className += " hover:text-green-700 hover:scale-125";
                                                break;
                                            default:
                                                SocialIcon = InstagramIcon;
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
                                                <SocialIcon sx={{ fontSize: "1.5rem" }} className="focus:outline-none" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

  
        </Section>
    );
}

export default Team;
