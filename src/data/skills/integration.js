import bizSkills from "./biz";
import designerSkills from "./designer";
import developerSkills from "./developer";

const concatSkills = bizSkills.concat(designerSkills, developerSkills);
const sortedSkills = concatSkills.sort();
const integratedSkills = [...new Set(sortedSkills)];

export default integratedSkills;
