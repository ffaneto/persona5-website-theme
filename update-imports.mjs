import fs from 'fs';

const insertImport = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('./utils/audio.js')) {
    content = content.replace(/import \{.*\} from 'react[^']*';?\n*/, "$&\nimport { playSelectSound } from './utils/audio.js';\n");
    // Also inject generic useEffect for the active state changes to play sound if it makes sense
    fs.writeFileSync(file, content);
  }
}

['src/AboutMe.jsx', 'src/ResumePage.jsx', 'src/Socials.jsx', 'src/SideProjectsPage.jsx'].forEach(file => {
  if(fs.existsSync(file)) {
      insertImport(file);
      console.log(`Updated ${file}`);
  }
});
