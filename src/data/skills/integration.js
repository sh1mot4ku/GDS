import bizSkills from './biz';
import designerSkills from './designer';
import developerSkills from './developer';

const integratedSkills = bizSkills.concat(designerSkills, developerSkills).sort();

export default [...new Set(integratedSkills)];