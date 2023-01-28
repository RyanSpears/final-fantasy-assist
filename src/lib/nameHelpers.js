import { species } from "fantastical";

function getName() {
  const seed = Math.floor(Math.random() * 18) + 1;
  const gender = seed % 2 ? "male" : "female";
  let name = "";
  switch (seed) {
    case 1:
      name = species.angel(gender);
      break;
    case 2:
      name = species.cavePerson(gender);
      break;
    case 3:
      name = species.darkelf(gender);
      break;
    case 4:
      name = species.demon(gender);
      break;
    case 5:
      name = species.dragon(gender);
      break;
    case 6:
      name = species.drow(gender);
      break;
    case 7:
      name = species.dwarf(gender);
      break;
    case 8:
      name = species.elf(gender);
      break;
    case 9:
      name = species.fairy(gender);
      break;
    case 10:
      name = species.gnome(gender);
      break;
    case 11:
      name = species.goblin(gender);
      break;
    case 12:
      name = species.halfdemon(gender);
      break;
    case 13:
      name = species.halfling(gender);
      break;
    case 14:
      name = species.highelf(gender);
      break;
    case 15:
      name = species.highfairy(gender);
      break;
    case 16:
      name = species.human(gender);
      break;
    case 17:
      name = species.ogre(gender);
      break;
    case 18:
      name = species.orc(gender);
      break;
    default:
      name = species.human(gender);
  }

  return name;
}

export { getName };
