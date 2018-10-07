import AuxiliarySkills from 'utils/constants/AuxiliarySkills'
import AuxiliaryDiploma from 'utils/constants/AuxiliaryDiploma'
import PeopleCategory from 'utils/constants/PeopleCategory'

const AuxiliarySkillsUtils = {}

const MAPPINGS = [
  // OLD_PEOPLE - ADVF
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - CAPA
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - DEAF
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, 
  // OLD_PEOPLE - AAPAPD
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - TITRE_PRO
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_TITRE_PRO.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  },
  // OLD_PEOPLE - DEAMP
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - FAMILY
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - BAC_ASSP
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - MENTION
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - DEAVS
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_OLD_CARE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - BEP_ACCOMPAGNEMENT
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_OLD_CARE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - DEAES
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_OLD_CARE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - BEPA
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEPA.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // OLD_PEOPLE - NO_DIPLOMA
  { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.OLD_PEOPLE.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  },

  // CHILDREN - ADVF
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_KEEP.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  },
  // CHILDREN - DEAF
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_KEEP.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_SCHOOL.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - FAMILY
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_FAMILY.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_KEEP.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAF.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - DEAVS
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAVS.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  }, 
  // CHILDREN - CAPA
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAPA.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - CAP_ENFANCE
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - BEP_ACCOMPAGNEMENT
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - AUXILIAIRE_PUERI
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AUXILIAIRE_PUERI.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - DEAES
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - DEAMP
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, 
  // CHILDREN - CAP_ENFANCE
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  },  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ENFANCE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_SCHOOL.key
  }, 
  // CHILDREN - BAC_ASSP
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  },  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_SCHOOL.key
  }, 
  // CHILDREN - DEEJE
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEEJE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEEJE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_KEEP.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEEJE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEEJE.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_SCHOOL.key
  }, 
  // CHILDREN - ASSITANT_MATERNEL
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_CARE.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_KEEP.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, 
  { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_GAME.key
  }, { 
    category: PeopleCategory.CHILDREN.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ASSITANT_MATERNEL.key,
    skill: AuxiliarySkills.SKILL_CHILDREN_SCHOOL.key
  }, 

  // HANDICAP - ADVF
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, 
  // HANDICAP - BAC_ASSP
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, 
  // HANDICAP - DEAS
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAS.key,
    skill: AuxiliarySkills.SKILL_OLD_CARE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BAC_ASSP.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  },
  // HANDICAP - TITRE_PRO
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_TITRE_PRO.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  },
  // HANDICAP - DEAMP
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, 
  // HANDICAP - MENTION
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, 
  // HANDICAP - DEAES
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_BEAUTY.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_MENTION.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  },
  // HANDICAP - BEP_ACCOMPAGNEMENT
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_BEP_ACCOMPAGNEMENT.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  },
  // HANDICAP - AAPAPD
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_TRANSPORT.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_ILLNESS.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.DIPLOMA_AAPAPD.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  },
  // HANDICAP - NO_DIPLOMA
  { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_NURSING.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_HANDICAP.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }, { 
    category: PeopleCategory.HANDICAP.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_COMPANY.key
  },

  // AUTONOMOUS - DEAMP
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_BEAUTY.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAMP.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // AUTONOMOUS - CAP_ASSISTANT
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ASSITANT.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ASSITANT.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ASSITANT.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_CAP_ASSITANT.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // AUTONOMOUS - TITRE_PRO
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_TITRE_PRO.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  },
  // AUTONOMOUS - ADVF
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_ADVF.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // AUTONOMOUS - DEAES
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.DIPLOMA_DEAES.key,
    skill: AuxiliarySkills.SKILL_PET.key
  },
  // AUTONOMOUS - NO_DIPLOMA
  { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_FOOD.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_CLOTHES.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_HOUSE.key
  }, { 
    category: PeopleCategory.AUTONOMOUS.key,
    diploma: AuxiliaryDiploma.NO_DIPLOMA.key,
    skill: AuxiliarySkills.SKILL_PET.key
  }
]

AuxiliarySkillsUtils.getDiplomasSkills = function (diplomas) {
  return MAPPINGS
    .filter((mapping) => diplomas.indexOf(mapping.diploma) !== -1)
    .map((mapping) => mapping.skill)
    .reduce((result, skill) => {
      if (result.indexOf(skill) === -1) {
        result.push(skill)
      }
      return result
    }, [])
}

AuxiliarySkillsUtils.getCategorySkills = function (category) {
  console.log(category)
  return MAPPINGS
    .filter((mapping) => category === mapping.category)
    .map((mapping) => mapping.skill)
    .reduce((result, skill) => {
      if (result.indexOf(skill) === -1) {
        result.push(skill)
      }
      return result
    }, [])
}

export default AuxiliarySkillsUtils