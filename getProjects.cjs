const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'public', 'Potfolio');
const distExts = ['.png', '.jpg', '.jpeg', '.webp'];

const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const projects = dirs.map(dir => {
  const dirPath = path.join(baseDir, dir);
  const files = fs.readdirSync(dirPath);
  let imageFiles = files
    .filter(f => distExts.includes(path.extname(f).toLowerCase()))
    .map(f => `/Potfolio/${dir}/${f}`);
  return {
    name: dir,
    description: `A modern web application built for the ${dir} project, featuring responsive UI and robust functionality.`,
    tech: ['React', 'Tailwind', 'Node.js'],
    images: imageFiles,
    image: imageFiles[0] || '' // Fallback to first image for the main grid cover
  };
});

fs.writeFileSync(path.join(__dirname, 'src', 'projectData.json'), JSON.stringify(projects, null, 2), 'utf8');
console.log("Successfully wrote projectData.json");
