import fs from 'fs';

function fixFile(filePath, hooksPattern, depName) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  // Fix import to include useRef
  if (!code.includes('useRef')) {
    code = code.replace(/import \{.*?\} from ["']react["'];/, str => {
      if (str.includes('useRef')) return str;
      return str.replace('}', ', useRef }');
    });
  }

  // Insert the ref
  if (!code.includes('isFirstRenderAudio')) {
    code = code.replace(/const \[mounted, setMounted\] = useState\(false\);/, 
    'const [mounted, setMounted] = useState(false);\n  const isFirstRenderAudio = useRef(true);');
  }

  // Change the effect
  if (!code.includes('isFirstRenderAudio.current')) {
    code = code.replace(/  useEffect\(\(\) => \{\n\s*playSelectSound\(\);\n\s*\}, \[.*?\]\);/g, 
`  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    playSelectSound();
  }, [${depName}]);`);
  }

  fs.writeFileSync(filePath, code);
}

fixFile('src/AboutMe.jsx', '', 'active');
fixFile('src/ResumePage.jsx', '', 'active');
fixFile('src/Socials.jsx', '', 'active, activeInfoBar, focus');
fixFile('src/SideProjectsPage.jsx', '', 'active');

// For P5Menu.jsx, the logic is slightly different:
let p5Code = fs.readFileSync('src/P5Menu.jsx', 'utf-8');
if (!p5Code.includes('isFirstRenderAudio')) {
  if (!p5Code.includes('useRef')) {
     p5Code = p5Code.replace(/import \{.*?\} from ["']react["'];/, str => {
      if (str.includes('useRef')) return str;
      return str.replace('}', ', useRef }');
    });
  }
  p5Code = p5Code.replace(/const \[mounted, setMounted\] = useState\(false\);/, 
    'const [mounted, setMounted] = useState(false);\n  const isFirstRenderAudio = useRef(true);');
  
  p5Code = p5Code.replace(/  useEffect\(\(\) => \{\n\s*sessionStorage.setItem\('p5-menu-active', active\);\n\s*playSelectSound\(\);\n\s*\}, \[active\]\);/,
`  useEffect(() => {
    sessionStorage.setItem('p5-menu-active', active);
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    playSelectSound();
  }, [active]);`);
  fs.writeFileSync('src/P5Menu.jsx', p5Code);
}
console.log('Fixed duplicate audio');
